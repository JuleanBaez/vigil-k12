import { mysqlTable, varchar, text, timestamp, json, boolean, mysqlEnum } from 'drizzle-orm/mysql-core';

// SingleStore prefers Shard Keys for distributed performance
export const vendors = mysqlTable('vendors', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  websiteUrl: varchar('website_url', { length: 500 }),
  lastScrapedAt: timestamp('last_scraped_at'),
});

export const policyData = mysqlTable('policy_data', {
  id: varchar('id', { length: 36 }).primaryKey(),
  vendorId: varchar('vendor_id', { length: 36 }).notNull(),
  rawContent: text('raw_content'), // Playwright scrapes go here
  sourceUrl: varchar('source_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const complianceAudits = mysqlTable('compliance_audits', {
  id: varchar('id', { length: 36 }).primaryKey(),
  vendorId: varchar('vendor_id', { length: 36 }).notNull(),
  coppaCompliant: boolean('coppa_compliant').default(false),
  ferpaCompliant: boolean('ferpa_compliant').default(false),
  riskAnalysis: json('risk_analysis'), // Structured LLM output
  auditDate: timestamp('audit_date').defaultNow(),
});