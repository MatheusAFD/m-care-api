ALTER TABLE "users" DROP CONSTRAINT "users_id_unique";--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "is_recommended" boolean NOT NULL;