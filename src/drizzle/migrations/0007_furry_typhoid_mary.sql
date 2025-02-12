ALTER TABLE "plans" RENAME COLUMN "amount" TO "price";--> statement-breakpoint
ALTER TABLE "plans" ALTER COLUMN "is_recommended" SET DEFAULT false;