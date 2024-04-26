DO $$ BEGIN
 CREATE TYPE "user_roles" AS ENUM('admin', 'user', 'waiter', 'chef', 'manager');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DATA TYPE user_roles;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;