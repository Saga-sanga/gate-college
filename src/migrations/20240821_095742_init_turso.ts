import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.run(sql`CREATE TABLE \`pages_hero_links\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`link_type\` text DEFAULT 'reference',
	\`link_new_tab\` integer,
	\`link_url\` text,
	\`link_label\` text,
	\`link_appearance\` text DEFAULT 'default',
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_cta_links\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`link_type\` text DEFAULT 'reference',
	\`link_new_tab\` integer,
	\`link_url\` text,
	\`link_label\` text,
	\`link_appearance\` text DEFAULT 'default',
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_cta\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`rich_text\` text,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_content_columns\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`size\` text DEFAULT 'oneThird',
	\`rich_text\` text,
	\`enable_link\` integer,
	\`link_type\` text DEFAULT 'reference',
	\`link_new_tab\` integer,
	\`link_url\` text,
	\`link_label\` text,
	\`link_appearance\` text DEFAULT 'default',
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_content\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_media_block\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`position\` text DEFAULT 'default',
	\`media_id\` integer,
	\`block_name\` text,
	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_archive\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`intro_content\` text,
	\`populateBy\` text DEFAULT 'collection',
	\`relationTo\` text DEFAULT 'posts',
	\`limit\` numeric DEFAULT 10,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`pages_blocks_form_block\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`form_id\` integer,
	\`enable_intro\` integer,
	\`intro_content\` text,
	\`block_name\` text,
	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`pages\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`title\` text,
	\`hero_type\` text DEFAULT 'lowImpact',
	\`hero_rich_text\` text,
	\`hero_media_id\` integer,
	\`meta_title\` text,
	\`meta_image_id\` integer,
	\`meta_description\` text,
	\`published_at\` text,
	\`slug\` text,
	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`_status\` text DEFAULT 'draft',
	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`pages_rels\` (
	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	\`order\` integer,
	\`parent_id\` integer NOT NULL,
	\`path\` text NOT NULL,
	\`pages_id\` integer,
	\`categories_id\` integer,
	\`posts_id\` integer,
	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_version_hero_links\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`id\` integer PRIMARY KEY NOT NULL,
	\`link_type\` text DEFAULT 'reference',
	\`link_new_tab\` integer,
	\`link_url\` text,
	\`link_label\` text,
	\`link_appearance\` text DEFAULT 'default',
	\`_uuid\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_cta_links\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`id\` integer PRIMARY KEY NOT NULL,
	\`link_type\` text DEFAULT 'reference',
	\`link_new_tab\` integer,
	\`link_url\` text,
	\`link_label\` text,
	\`link_appearance\` text DEFAULT 'default',
	\`_uuid\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_cta\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` integer PRIMARY KEY NOT NULL,
	\`rich_text\` text,
	\`_uuid\` text,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_content_columns\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`id\` integer PRIMARY KEY NOT NULL,
	\`size\` text DEFAULT 'oneThird',
	\`rich_text\` text,
	\`enable_link\` integer,
	\`link_type\` text DEFAULT 'reference',
	\`link_new_tab\` integer,
	\`link_url\` text,
	\`link_label\` text,
	\`link_appearance\` text DEFAULT 'default',
	\`_uuid\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_content\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` integer PRIMARY KEY NOT NULL,
	\`_uuid\` text,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_media_block\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` integer PRIMARY KEY NOT NULL,
	\`position\` text DEFAULT 'default',
	\`media_id\` integer,
	\`_uuid\` text,
	\`block_name\` text,
	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_archive\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` integer PRIMARY KEY NOT NULL,
	\`intro_content\` text,
	\`populateBy\` text DEFAULT 'collection',
	\`relationTo\` text DEFAULT 'posts',
	\`limit\` numeric DEFAULT 10,
	\`_uuid\` text,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_blocks_form_block\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` integer PRIMARY KEY NOT NULL,
	\`form_id\` integer,
	\`enable_intro\` integer,
	\`intro_content\` text,
	\`_uuid\` text,
	\`block_name\` text,
	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`parent_id\` integer,
	\`version_title\` text,
	\`version_hero_type\` text DEFAULT 'lowImpact',
	\`version_hero_rich_text\` text,
	\`version_hero_media_id\` integer,
	\`version_meta_title\` text,
	\`version_meta_image_id\` integer,
	\`version_meta_description\` text,
	\`version_published_at\` text,
	\`version_slug\` text,
	\`version_updated_at\` text,
	\`version_created_at\` text,
	\`version__status\` text DEFAULT 'draft',
	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`latest\` integer,
	\`autosave\` integer,
	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (\`version_hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`_pages_v_rels\` (
	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	\`order\` integer,
	\`parent_id\` integer NOT NULL,
	\`path\` text NOT NULL,
	\`pages_id\` integer,
	\`categories_id\` integer,
	\`posts_id\` integer,
	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`posts_populated_authors\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`posts\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`title\` text,
	\`content\` text,
	\`meta_title\` text,
	\`meta_image_id\` integer,
	\`meta_description\` text,
	\`published_at\` text,
	\`slug\` text,
	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`_status\` text DEFAULT 'draft',
	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`posts_rels\` (
	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	\`order\` integer,
	\`parent_id\` integer NOT NULL,
	\`path\` text NOT NULL,
	\`posts_id\` integer,
	\`categories_id\` integer,
	\`users_id\` integer,
	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`_posts_v_version_populated_authors\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`id\` integer PRIMARY KEY NOT NULL,
	\`_uuid\` text,
	\`name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`_posts_v\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`parent_id\` integer,
	\`version_title\` text,
	\`version_content\` text,
	\`version_meta_title\` text,
	\`version_meta_image_id\` integer,
	\`version_meta_description\` text,
	\`version_published_at\` text,
	\`version_slug\` text,
	\`version_updated_at\` text,
	\`version_created_at\` text,
	\`version__status\` text DEFAULT 'draft',
	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`latest\` integer,
	\`autosave\` integer,
	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`_posts_v_rels\` (
	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	\`order\` integer,
	\`parent_id\` integer NOT NULL,
	\`path\` text NOT NULL,
	\`posts_id\` integer,
	\`categories_id\` integer,
	\`users_id\` integer,
	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`media\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`alt\` text NOT NULL,
	\`caption\` text,
	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`url\` text,
	\`thumbnail_u_r_l\` text,
	\`filename\` text,
	\`mime_type\` text,
	\`filesize\` numeric,
	\`width\` numeric,
	\`height\` numeric,
	\`focal_x\` numeric,
	\`focal_y\` numeric
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`categories_breadcrumbs\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`doc_id\` integer,
	\`url\` text,
	\`label\` text,
	FOREIGN KEY (\`doc_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`categories\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`title\` text NOT NULL,
	\`parent_id\` integer,
	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`users_roles\` (
	\`order\` integer NOT NULL,
	\`parent_id\` integer NOT NULL,
	\`value\` text,
	\`id\` integer PRIMARY KEY NOT NULL,
	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`users\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`name\` text,
	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`email\` text NOT NULL,
	\`reset_password_token\` text,
	\`reset_password_expiration\` text,
	\`salt\` text,
	\`hash\` text,
	\`login_attempts\` numeric DEFAULT 0,
	\`lock_until\` text
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`redirects\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`from\` text NOT NULL,
	\`to_type\` text DEFAULT 'reference',
	\`to_url\` text,
	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`redirects_rels\` (
	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	\`order\` integer,
	\`parent_id\` integer NOT NULL,
	\`path\` text NOT NULL,
	\`pages_id\` integer,
	\`posts_id\` integer,
	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`forms_blocks_checkbox\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`name\` text NOT NULL,
	\`label\` text,
	\`width\` numeric,
	\`required\` integer,
	\`default_value\` integer,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`forms_blocks_country\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`name\` text NOT NULL,
	\`label\` text,
	\`width\` numeric,
	\`required\` integer,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`forms_blocks_email\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`name\` text NOT NULL,
	\`label\` text,
	\`width\` numeric,
	\`required\` integer,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`forms_blocks_message\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`message\` text,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`forms_blocks_number\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`name\` text NOT NULL,
	\`label\` text,
	\`width\` numeric,
	\`default_value\` numeric,
	\`required\` integer,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`forms_blocks_select_options\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`label\` text NOT NULL,
	\`value\` text NOT NULL,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`forms_blocks_select\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`name\` text NOT NULL,
	\`label\` text,
	\`width\` numeric,
	\`default_value\` text,
	\`required\` integer,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`forms_blocks_state\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`name\` text NOT NULL,
	\`label\` text,
	\`width\` numeric,
	\`required\` integer,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`forms_blocks_text\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`name\` text NOT NULL,
	\`label\` text,
	\`width\` numeric,
	\`default_value\` text,
	\`required\` integer,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`forms_blocks_textarea\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`_path\` text NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`name\` text NOT NULL,
	\`label\` text,
	\`width\` numeric,
	\`default_value\` text,
	\`required\` integer,
	\`block_name\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`forms_emails\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`email_to\` text,
	\`cc\` text,
	\`bcc\` text,
	\`reply_to\` text,
	\`email_from\` text,
	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
	\`message\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`forms\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`title\` text NOT NULL,
	\`submit_button_label\` text,
	\`confirmationType\` text DEFAULT 'message',
	\`confirmation_message\` text,
	\`redirect_url\` text,
	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`field\` text NOT NULL,
	\`value\` text NOT NULL,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`form_submissions\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`form_id\` integer NOT NULL,
	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`payload_preferences\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`key\` text,
	\`value\` text,
	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`payload_preferences_rels\` (
	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	\`order\` integer,
	\`parent_id\` integer NOT NULL,
	\`path\` text NOT NULL,
	\`users_id\` integer,
	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`payload_migrations\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`name\` text,
	\`batch\` numeric,
	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`header_nav_items\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`link_type\` text DEFAULT 'reference',
	\`link_new_tab\` integer,
	\`link_url\` text,
	\`link_label\` text NOT NULL,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`header\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`updated_at\` text,
	\`created_at\` text
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`header_rels\` (
	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	\`order\` integer,
	\`parent_id\` integer NOT NULL,
	\`path\` text NOT NULL,
	\`pages_id\` integer,
	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`footer_nav_items\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`link_type\` text DEFAULT 'reference',
	\`link_new_tab\` integer,
	\`link_url\` text,
	\`link_label\` text NOT NULL,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`footer\` (
	\`id\` integer PRIMARY KEY NOT NULL,
	\`updated_at\` text,
	\`created_at\` text
);
`)
await payload.db.drizzle.run(sql`CREATE TABLE \`footer_rels\` (
	\`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	\`order\` integer,
	\`parent_id\` integer NOT NULL,
	\`path\` text NOT NULL,
	\`pages_id\` integer,
	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_hero_links_order_idx\` ON \`pages_hero_links\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_hero_links_parent_id_idx\` ON \`pages_hero_links\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_cta_links_order_idx\` ON \`pages_blocks_cta_links\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_cta_links_parent_id_idx\` ON \`pages_blocks_cta_links\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_content_columns_order_idx\` ON \`pages_blocks_content_columns\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_content_columns_parent_id_idx\` ON \`pages_blocks_content_columns\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_content_order_idx\` ON \`pages_blocks_content\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_content_parent_id_idx\` ON \`pages_blocks_content\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_content_path_idx\` ON \`pages_blocks_content\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_media_block_order_idx\` ON \`pages_blocks_media_block\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_media_block_parent_id_idx\` ON \`pages_blocks_media_block\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_media_block_path_idx\` ON \`pages_blocks_media_block\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_archive_order_idx\` ON \`pages_blocks_archive\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_archive_parent_id_idx\` ON \`pages_blocks_archive\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_archive_path_idx\` ON \`pages_blocks_archive\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_form_block_order_idx\` ON \`pages_blocks_form_block\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_form_block_parent_id_idx\` ON \`pages_blocks_form_block\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_blocks_form_block_path_idx\` ON \`pages_blocks_form_block\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_hero_links_order_idx\` ON \`_pages_v_version_hero_links\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_hero_links_parent_id_idx\` ON \`_pages_v_version_hero_links\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_cta_links_order_idx\` ON \`_pages_v_blocks_cta_links\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_cta_links_parent_id_idx\` ON \`_pages_v_blocks_cta_links\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_cta_order_idx\` ON \`_pages_v_blocks_cta\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_cta_parent_id_idx\` ON \`_pages_v_blocks_cta\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_cta_path_idx\` ON \`_pages_v_blocks_cta\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_content_columns_order_idx\` ON \`_pages_v_blocks_content_columns\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_content_columns_parent_id_idx\` ON \`_pages_v_blocks_content_columns\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_content_order_idx\` ON \`_pages_v_blocks_content\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_content_parent_id_idx\` ON \`_pages_v_blocks_content\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_content_path_idx\` ON \`_pages_v_blocks_content\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_order_idx\` ON \`_pages_v_blocks_media_block\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_parent_id_idx\` ON \`_pages_v_blocks_media_block\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_path_idx\` ON \`_pages_v_blocks_media_block\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_archive_order_idx\` ON \`_pages_v_blocks_archive\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_archive_parent_id_idx\` ON \`_pages_v_blocks_archive\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_archive_path_idx\` ON \`_pages_v_blocks_archive\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_order_idx\` ON \`_pages_v_blocks_form_block\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_parent_id_idx\` ON \`_pages_v_blocks_form_block\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_path_idx\` ON \`_pages_v_blocks_form_block\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`posts_populated_authors_order_idx\` ON \`posts_populated_authors\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`posts_populated_authors_parent_id_idx\` ON \`posts_populated_authors\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_posts_v_version_populated_authors_order_idx\` ON \`_posts_v_version_populated_authors\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_posts_v_version_populated_authors_parent_id_idx\` ON \`_posts_v_version_populated_authors\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`categories_breadcrumbs_order_idx\` ON \`categories_breadcrumbs\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`categories_breadcrumbs_parent_id_idx\` ON \`categories_breadcrumbs\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
await payload.db.drizzle.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`redirects_rels_order_idx\` ON \`redirects_rels\` (\`order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`redirects_rels_parent_idx\` ON \`redirects_rels\` (\`parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`redirects_rels_path_idx\` ON \`redirects_rels\` (\`path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_state_order_idx\` ON \`forms_blocks_state\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_state_parent_id_idx\` ON \`forms_blocks_state\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_state_path_idx\` ON \`forms_blocks_state\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`footer_nav_items_order_idx\` ON \`footer_nav_items\` (\`_order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`footer_nav_items_parent_id_idx\` ON \`footer_nav_items\` (\`_parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
await payload.db.drizzle.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.run(sql`DROP TABLE \`pages_hero_links\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_cta_links\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_content_columns\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_content\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_media_block\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_archive\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`pages_blocks_form_block\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`pages\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`pages_rels\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_version_hero_links\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_cta_links\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_cta\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_content_columns\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_content\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_media_block\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_archive\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_blocks_form_block\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`_pages_v_rels\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`posts_populated_authors\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`posts\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`posts_rels\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`_posts_v_version_populated_authors\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`_posts_v\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`_posts_v_rels\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`media\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`categories_breadcrumbs\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`categories\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`users_roles\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`users\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`redirects\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`redirects_rels\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`forms_blocks_country\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`forms_blocks_email\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`forms_blocks_message\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`forms_blocks_number\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`forms_blocks_select_options\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`forms_blocks_select\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`forms_blocks_state\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`forms_blocks_text\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`forms_blocks_textarea\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`forms_emails\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`forms\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`form_submissions\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`payload_preferences\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`payload_migrations\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`header_nav_items\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`header\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`header_rels\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`footer_nav_items\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`footer\`;`)
await payload.db.drizzle.run(sql`DROP TABLE \`footer_rels\`;`)
}
