ALTER TABLE "companies" ADD CONSTRAINT "companies_cnpj_unique" UNIQUE("cnpj");--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_cpf_unique" UNIQUE("cpf");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id_unique" UNIQUE("id");