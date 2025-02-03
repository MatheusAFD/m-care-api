ALTER TABLE "active_company_plans" ADD COLUMN "stripe_subscription_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "stripe_price_id" text;--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "stripe_product_id" text;