import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { pool } from "@/lib/db"

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return new NextResponse("Unauthorized", { status: 401 })

  try {
    const { vendorName, vendorUrl } = await req.json()
    let targetUrl = vendorUrl

    if (!targetUrl || targetUrl === "AUTO") {
      const [rows]: any = await pool.query(
        "SELECT url FROM vendors WHERE name LIKE ? LIMIT 1",
        [`%${vendorName}%`]
      )
      if (rows.length > 0) {
        targetUrl = rows[0].url
      }
    }

    const SCRAPER_URL = process.env.PYTHON_SCRAPER_URL || "http://127.0.0.1:8000/analyze"
    const scraperReq = await fetch(SCRAPER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        url: targetUrl || "AUTO", 
        name: vendorName 
      }),
    })

    if (!scraperReq.ok) throw new Error("Python Scraper Failed")
    const analysis = await scraperReq.json()

    return NextResponse.json({
      success: true,
      data: {
        vendor: vendorName,
        url: analysis.discoveredUrl || targetUrl,
        analysis: analysis
      }
    })
  } catch (error: any) {
    console.error("AUDIT_ERR:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}