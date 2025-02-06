ALTER TABLE "photo" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "photo" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "photo" ADD COLUMN "size" integer NOT NULL;