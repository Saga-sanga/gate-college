import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "student_life_highlight_reel_highlight_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"picture_id" integer
  );
  
  DO $$ BEGIN
   ALTER TABLE "student_life_highlight_reel_highlight_images" ADD CONSTRAINT "student_life_highlight_reel_highlight_images_picture_id_images_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "student_life_highlight_reel_highlight_images" ADD CONSTRAINT "student_life_highlight_reel_highlight_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."student_life"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "student_life_highlight_reel_highlight_images_order_idx" ON "student_life_highlight_reel_highlight_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "student_life_highlight_reel_highlight_images_parent_id_idx" ON "student_life_highlight_reel_highlight_images" USING btree ("_parent_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "student_life_highlight_reel_highlight_images";`)
}
