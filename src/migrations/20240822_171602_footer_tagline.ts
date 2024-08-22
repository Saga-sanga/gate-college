import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.run(sql`ALTER TABLE \`footer\` RENAME COLUMN \`message\` TO \`tagline\`;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.run(sql`ALTER TABLE \`footer\` ADD \`message\` text;`)
await payload.db.drizzle.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`tagline\`;`)
}
