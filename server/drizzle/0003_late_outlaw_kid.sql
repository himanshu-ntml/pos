ALTER TABLE "venue_settings" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "venue_settings" ADD COLUMN "logo" text;--> statement-breakpoint
ALTER TABLE "venue_settings" DROP COLUMN IF EXISTS "images";