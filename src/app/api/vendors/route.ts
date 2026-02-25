import { NextResponse } from "next/server"
import { pool } from "@/lib/db"
import { auth } from "@/auth"

export const dynamic = "force-dynamic"

export async function GET() {
  const session = await auth()
  
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const [rows] = await pool.query("SELECT * FROM vendors ORDER BY name ASC")
    return NextResponse.json(rows)
  } catch (error: any) {

    console.error("DATABASE FETCH ERROR:", error) 
    

    return NextResponse.json({ error: error.message || "Database connection failed" }, { status: 500 })
  }
}