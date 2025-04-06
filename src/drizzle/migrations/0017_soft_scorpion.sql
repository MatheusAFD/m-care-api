ALTER TABLE "units" ALTER COLUMN "zipcode" SET DATA TYPE varchar(8);--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "unit_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "units" ADD COLUMN "neighborhood" text NOT NULL;