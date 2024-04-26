import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import * as schema from "./schemas/index";
import {
  storeRegularSchedule,
  storeCustomSchedule,
  storeSettings,
  categories,
  items,
  ingredients,
  nutritions,
} from "./schemas";
import type { envVariablesType } from "../envValidation";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends envVariablesType {}
  }
}

// https://github.com/neondatabase/serverless/issues/66
const client: NeonQueryFunction<boolean, boolean> = neon(process.env.DATABASE_URL);
export const db = drizzle(client, { schema });

async function seed() {
  console.log("Seeding...");

  await db.insert(storeSettings).values({
    profileName: "default",
    storeForceClose: false,
    reservationInterval: 30,
    reservationDuration: 60,
    reservationNotArrivalExpirationTime: 15,
    tableNumberLeadingZeros: false,
    leadingZerosQuantity: 2,
  });

  await db.insert(storeRegularSchedule).values([
    { day: "sunday", number: 0, openTime: "10:00:00", closeTime: "16:00:00" },
    { day: "monday", number: 1, openTime: "09:00:00", closeTime: "17:00:00" },
    { day: "tuesday", number: 2, openTime: "09:00:00", closeTime: "17:00:00" },
    { day: "wednesday", number: 3, openTime: "09:00:00", closeTime: "17:00:00" },
    { day: "thursday", number: 4, openTime: "09:00:00", closeTime: "17:00:00" },
    { day: "friday", number: 5, openTime: "09:00:00", closeTime: "17:00:00" },
    { day: "saturday", number: 6, openTime: "10:00:00", closeTime: "16:00:00" },
  ]);

  await db.insert(storeCustomSchedule).values([
    { date: "2024-01-01", name: "New Year's Day", openTime: "11:00:00", closeTime: "16:00:00" },
    { date: "2024-02-14", name: "Valentine's Day", openTime: "11:00:00", closeTime: "16:00:00" },
    { date: "2024-03-17", name: "St. Patrick's Day", openTime: "11:00:00", closeTime: "16:00:00" },
    { date: "2024-04-01", name: "April Fools' Day", openTime: "11:00:00", closeTime: "16:00:00" },
    { date: "2024-05-05", name: "Cinco de Mayo", openTime: "11:00:00", closeTime: "16:00:00" },
    { date: "2024-07-04", name: "Independence Day (USA)", openTime: "11:00:00", closeTime: "16:00:00" },
    { date: "2024-10-31", name: "Halloween", openTime: "11:00:00", closeTime: "16:00:00" },
    { date: "2024-11-11", name: "Veterans Day", openTime: "11:00:00", closeTime: "16:00:00" },
    { date: "2024-12-25", name: "Christmas Day", openTime: "11:00:00", closeTime: "16:00:00" },
  ]);

  await db
    .insert(categories)
    .values([{ name: "Appetizers" }, { name: "Main Course" }, { name: "Desserts" }, { name: "Beverages" }]);

  await db.insert(items).values([
    {
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with Caesar dressing and croutons",
      price: "8.99",
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isSpicy: false,
      preparationTime: "10",
      categoryId: 1,
    },
    {
      name: "Margherita Pizza",
      description: "Classic pizza topped with tomato sauce, mozzarella cheese, and fresh basil",
      price: "12.99",
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isSpicy: false,
      preparationTime: "20",
      categoryId: 2,
    },
    {
      name: "Chocolate Brownie",
      description: "Warm chocolate brownie served with vanilla ice cream",
      price: "6.99",
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isSpicy: false,
      preparationTime: "15",
      categoryId: 3,
    },
    {
      name: "Iced Tea",
      description: "Refreshing iced tea served with lemon wedges",
      price: "2.99",
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      isSpicy: false,
      preparationTime: "5",
      categoryId: 4,
    },
  ]);
}
const ingredientsWithNutritions = async () => {
  const onionNutrition = await db
    .insert(nutritions)
    .values({ calories: "60", carbohydrates: "0", proteins: "1", fat: "0" })
    .returning({ id: nutritions.id });
  await db.insert(ingredients).values({ name: "Onion", stock: 10, nutritionId: onionNutrition[0].id });

  const pastaNutricion = await db
    .insert(nutritions)
    .values({ calories: "208", carbohydrates: "32.1", proteins: "6.7", fat: "7.7" })
    .returning({ id: nutritions.id });
  await db.insert(ingredients).values({ name: "Pasta Casserole", stock: 2, nutritionId: pastaNutricion[0].id });

  const cheddarNutricion = await db
    .insert(nutritions)
    .values({ calories: "408.2", carbohydrates: "2.4", proteins: "23", fat: "34" })
    .returning({ id: nutritions.id });
  await db.insert(ingredients).values({ name: "cheddar", stock: 10, nutritionId: cheddarNutricion[0].id });
  console.log("Done!");
};

seed();
