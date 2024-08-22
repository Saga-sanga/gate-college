import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.run(sql`ALTER TABLE \`footer\` DROP COLUMN \`message\`;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.run(sql`ALTER TABLE \`footer\` ADD \`message\` text;`)
}
