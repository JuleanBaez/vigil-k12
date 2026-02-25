
import { auth } from "@/auth"
import { ComplianceDashboard } from "@/components/compliance-dashboard"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await auth()

  if (!session) {
    redirect("/api/auth/signin")
  }

  return <ComplianceDashboard />
}