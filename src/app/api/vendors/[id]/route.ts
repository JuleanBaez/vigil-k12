import { NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { auth } from "@/auth"
import { approveChromeExtension } from "@/lib/google-admin"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const body = await req.json()
    const { status, chromeAppId, orgUnit } = body

    if (!status) {
      return new NextResponse("Status is required", { status: 400 })
    }

    if (status === "APPROVED" && chromeAppId) {
      await approveChromeExtension(chromeAppId, orgUnit || "/")
    }

    await pool.query(
      "UPDATE vendors SET status = ?, last_audited = CURRENT_TIMESTAMP WHERE id = ?",
      [status, params.id]
    )

    return NextResponse.json({ success: true, id: params.id, status })
  } catch (error: any) {
    console.error("GOOGLE ADMIN / DB ERROR:", error)
    return NextResponse.json({ error: error.message || "Failed to execute approval pipeline" }, { status: 500 })
  }
}