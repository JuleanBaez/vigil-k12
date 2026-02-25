import { google } from "googleapis"

const getAuthClient = () => {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  
  return new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: privateKey,
    scopes: [
      "https://www.googleapis.com/auth/admin.directory.orgunit.readonly",
      "https://www.googleapis.com/auth/chrome.management.policy"
    ],
    subject: process.env.GOOGLE_WORKSPACE_ADMIN_EMAIL
  })
}

export async function getOrganizationalUnits() {
  const auth = getAuthClient()
  const admin = google.admin({ version: "directory_v1", auth: auth as any })
  const res = await admin.orgunits.list({ customerId: "my_customer" })
  return res.data.organizationUnits || []
}

export async function approveChromeExtension(appId: string, orgUnitPath: string = "/") {
  const auth = getAuthClient()
  const chromepolicy = google.chromepolicy({ version: "v1", auth: auth as any })
  const customerId = "customers/my_customer"
  
  await chromepolicy.customers.policies.orgunits.batchModify({
    customer: customerId,
    requestBody: {
      requests: [{
        policyTargetKey: { targetResource: `${customerId}/orgunits/${orgUnitPath.replace(/^\//, '')}` },
        policyValue: {
          policySchema: "chrome.users.apps.InstallType",
          value: { appId, installType: "ALLOWED" }
        },
        updateMask: "installType"
      }]
    }
  })
  return true
}