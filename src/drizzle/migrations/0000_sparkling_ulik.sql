CREATE TABLE "active_company_plans" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"is_active" boolean NOT NULL,
	"remaining_days" integer NOT NULL,
	"plan_id" varchar(36) NOT NULL,
	"company_id" varchar(36) NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "active_company_plans_company_id_unique" UNIQUE("company_id")
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"cnpj" text,
	"cpf" text,
	"is_active" boolean NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"status" text NOT NULL,
	"color" text NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"company_id" varchar(36) NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "employees_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "plans" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"duration" integer NOT NULL,
	"is_trial" boolean NOT NULL,
	"amount" numeric NOT NULL,
	"is_free" boolean NOT NULL,
	"name" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"type" text NOT NULL,
	CONSTRAINT "roles_type_unique" UNIQUE("type")
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"floor" text NOT NULL,
	"unit_id" varchar(36) NOT NULL,
	"status" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "units" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zipcode" text NOT NULL,
	"number" text NOT NULL,
	"company_id" varchar(36) NOT NULL,
	"status" text NOT NULL,
	"name" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"company_id" varchar(36) NOT NULL,
	"role_id" varchar(36) NOT NULL,
	"birthday" timestamp,
	"genre" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
