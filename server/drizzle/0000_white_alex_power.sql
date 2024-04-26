DO $$ BEGIN
 CREATE TYPE "table_status" AS ENUM('available', 'occupied', 'reserved', 'closed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "reservation_status" AS ENUM('Scheduled', 'In Progress', 'Expired', 'Finished', 'Cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "order_status" AS ENUM('Ready', 'In Progress', 'Completed', 'Cancelled', 'Served');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "day_of_week" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "payment_method" AS ENUM('Card', 'Cash');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text,
	"phone" text,
	"address" text,
	"user_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password" text,
	"role" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tables" (
	"id" serial PRIMARY KEY NOT NULL,
	"number" integer NOT NULL,
	"prefix" varchar(5),
	"description" text,
	"seats" integer NOT NULL,
	"require_cleaning" boolean DEFAULT false NOT NULL,
	"status" "table_status" DEFAULT 'available' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tables_number_prefix_unique" UNIQUE NULLS NOT DISTINCT("number","prefix")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"table_id" integer,
	"customer_name" text NOT NULL,
	"customer_phone_number" text,
	"customer_email" text,
	"guest_predicted_number" integer,
	"special_requests" text,
	"notes" text,
	"status" "reservation_status" DEFAULT 'Scheduled' NOT NULL,
	"scheduled_at" varchar(255) NOT NULL,
	"expire_at" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "allergens" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nutrition" (
	"id" serial PRIMARY KEY NOT NULL,
	"calories" numeric,
	"carbohydrates" numeric,
	"proteins" numeric,
	"fat" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_items" (
	"order_id" integer NOT NULL,
	"item_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "order_items_order_id_item_id_pk" PRIMARY KEY("order_id","item_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"table_id" integer,
	"is_paid" boolean DEFAULT false NOT NULL,
	"order_status" "order_status" DEFAULT 'In Progress' NOT NULL,
	"special_request" text,
	"total_price" numeric,
	"bill_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"price" numeric NOT NULL,
	"image_url" varchar(255),
	"vegetarian" boolean,
	"vegan" boolean,
	"gluten_free" boolean,
	"spicy" boolean,
	"preparation_time" numeric NOT NULL,
	"category_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"nutrition_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"url" text,
	"uploaded_by" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "store_custom_working_times" (
	"date" date PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"open_time" time NOT NULL,
	"close_time" time NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "store_regular_working_times" (
	"number" integer PRIMARY KEY NOT NULL,
	"day" "day_of_week" NOT NULL,
	"open_time" time NOT NULL,
	"close_time" time NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "store_settings" (
	"profile_name" text PRIMARY KEY DEFAULT 'default' NOT NULL,
	"store_force_close" boolean DEFAULT false NOT NULL,
	"reservation_interval" integer,
	"reservation_duration" integer,
	"reservation_not_arrival_expiration_time" integer,
	"table_leading_zeros" boolean DEFAULT false NOT NULL,
	"leading_zeros_quantity" integer DEFAULT 1 NOT NULL,
	"service_fee" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bills" (
	"id" serial PRIMARY KEY NOT NULL,
	"total_amount" numeric NOT NULL,
	"service_fee" numeric,
	"tax" numeric,
	"paid" boolean DEFAULT false,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"order_id" integer NOT NULL,
	CONSTRAINT "bills_user_id_order_id_unique" UNIQUE NULLS NOT DISTINCT("user_id","order_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"bill_id" integer NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"charged_amount" numeric NOT NULL,
	"tip_amount" numeric,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD CONSTRAINT "reservations_table_id_tables_id_fk" FOREIGN KEY ("table_id") REFERENCES "tables"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_table_id_tables_id_fk" FOREIGN KEY ("table_id") REFERENCES "tables"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "items" ADD CONSTRAINT "items_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_nutrition_id_nutrition_id_fk" FOREIGN KEY ("nutrition_id") REFERENCES "nutrition"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bills" ADD CONSTRAINT "bills_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_bill_id_bills_id_fk" FOREIGN KEY ("bill_id") REFERENCES "bills"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
