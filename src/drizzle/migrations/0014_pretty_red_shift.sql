ALTER TABLE "users" RENAME COLUMN "birthday" TO "birthdate";--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "phone" varchar(11) NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "is_whatsapp" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "zipcode" varchar(8) NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "city" text NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "state" text NOT NULL;