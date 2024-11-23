ALTER TABLE "users_table" ALTER COLUMN "last_sign_in_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users_table" ALTER COLUMN "last_sign_in_at" SET NOT NULL;