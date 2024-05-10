"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const neon_http_1 = require("drizzle-orm/neon-http");
const serverless_1 = require("@neondatabase/serverless");
const schema = __importStar(require("./schemas/index"));
// https://github.com/neondatabase/serverless/issues/66
const client = (0, serverless_1.neon)(process.env.DATABASE_URL);
exports.db = (0, neon_http_1.drizzle)(client, { schema });
async function seed() {
    console.log("Seeding...");
    await exports.db.insert(schema.storeSettings).values({
        profileName: "default",
        storeForceClose: false,
        reservationInterval: 30,
        reservationDuration: 60,
        reservationNotArrivalExpirationTime: 15,
        tableNumberLeadingZeros: false,
        leadingZerosQuantity: 2,
    });
    await exports.db.insert(schema.users).values({
        name: "Store Manger",
        password: "password",
        role: "admin",
        email: "store@example.com",
    });
    await exports.db.insert(schema.storeRegularSchedule).values([
        { day: "sunday", number: 0, openTime: "10:00:00", closeTime: "16:00:00" },
        { day: "monday", number: 1, openTime: "09:00:00", closeTime: "17:00:00" },
        { day: "tuesday", number: 2, openTime: "09:00:00", closeTime: "17:00:00" },
        {
            day: "wednesday",
            number: 3,
            openTime: "09:00:00",
            closeTime: "17:00:00",
        },
        { day: "thursday", number: 4, openTime: "09:00:00", closeTime: "17:00:00" },
        { day: "friday", number: 5, openTime: "09:00:00", closeTime: "17:00:00" },
        { day: "saturday", number: 6, openTime: "10:00:00", closeTime: "16:00:00" },
    ]);
    await exports.db.insert(schema.storeCustomSchedule).values([
        {
            date: "2024-01-01",
            name: "New Year's Day",
            openTime: "11:00:00",
            closeTime: "16:00:00",
        },
        {
            date: "2024-02-14",
            name: "Valentine's Day",
            openTime: "11:00:00",
            closeTime: "16:00:00",
        },
        {
            date: "2024-03-17",
            name: "St. Patrick's Day",
            openTime: "11:00:00",
            closeTime: "16:00:00",
        },
        {
            date: "2024-04-01",
            name: "April Fools' Day",
            openTime: "11:00:00",
            closeTime: "16:00:00",
        },
        {
            date: "2024-05-05",
            name: "Cinco de Mayo",
            openTime: "11:00:00",
            closeTime: "16:00:00",
        },
        {
            date: "2024-07-04",
            name: "Independence Day (USA)",
            openTime: "11:00:00",
            closeTime: "16:00:00",
        },
        {
            date: "2024-10-31",
            name: "Halloween",
            openTime: "11:00:00",
            closeTime: "16:00:00",
        },
        {
            date: "2024-11-11",
            name: "Veterans Day",
            openTime: "11:00:00",
            closeTime: "16:00:00",
        },
        {
            date: "2024-12-25",
            name: "Christmas Day",
            openTime: "11:00:00",
            closeTime: "16:00:00",
        },
    ]);
    await exports.db
        .insert(schema.categories)
        .values([
        { name: "Appetizers" },
        { name: "Main Course" },
        { name: "Desserts" },
        { name: "Beverages" },
        { name: "Salad" },
    ]);
    await exports.db.insert(schema.items).values([
        {
            imageUrl: "/img/food.png",
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
            imageUrl: "/img/food.png",
            name: "Margherita Pizza",
            description: "Thin-crust pizza with fresh basil, tomato sauce, and mozzarella cheese",
            price: "12.99",
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: false,
            isSpicy: false,
            preparationTime: "20",
            categoryId: 2,
        },
        {
            imageUrl: "/img/food.png",
            name: "Beef Burger",
            description: "Juicy beef patty with lettuce, tomato, and onion on a brioche bun",
            price: "10.99",
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            isSpicy: false,
            preparationTime: "15",
            categoryId: 2,
        },
        {
            name: "Pad Thai",
            imageUrl: "/img/food.png",
            description: "Stir-fried rice noodles with shrimp, eggs, and bean sprouts in a tangy tamarind sauce",
            price: "14.99",
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isSpicy: true,
            preparationTime: "25",
            categoryId: 3,
        },
        {
            imageUrl: "/img/food.png",
            name: "Vegetable Curry",
            description: "Assorted vegetables in a rich, creamy coconut curry sauce",
            price: "13.99",
            isVegetarian: true,
            isVegan: true,
            isGlutenFree: true,
            isSpicy: true,
            preparationTime: "30",
            categoryId: 3,
        },
        {
            imageUrl: "/img/food.png",
            name: "Grilled Salmon",
            description: "Fresh salmon fillet grilled to perfection, served with roasted potatoes and asparagus",
            price: "18.99",
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isSpicy: false,
            preparationTime: "25",
            categoryId: 4,
        },
        {
            imageUrl: "/img/food.png",
            name: "Falafel Wrap",
            description: "Crispy falafel balls wrapped in pita bread with lettuce, tomato, and tahini sauce",
            price: "9.99",
            isVegetarian: true,
            isVegan: true,
            isGlutenFree: false,
            isSpicy: false,
            preparationTime: "15",
            categoryId: 5,
        },
        {
            imageUrl: "/img/food.png",
            name: "Beef Tacos",
            description: "Seasoned ground beef in soft tortillas topped with lettuce, cheese, and salsa",
            price: "11.99",
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isSpicy: true,
            preparationTime: "20",
            categoryId: 5,
        },
        {
            imageUrl: "/img/food.png",
            name: "Mushroom Risotto",
            description: "Creamy Arborio rice with sautéed mushrooms and Parmesan cheese",
            price: "16.99",
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: true,
            isSpicy: false,
            preparationTime: "35",
            categoryId: 4,
        },
        {
            imageUrl: "/img/food.png",
            name: "Chocolate Lava Cake",
            description: "Warm, gooey chocolate cake with a molten center, served with vanilla ice cream",
            price: "7.99",
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: false,
            isSpicy: false,
            preparationTime: "15",
            categoryId: 4,
        },
    ]);
    await exports.db.insert(schema.venueSettings).values({
        name: "Rest App",
        address: "123 London Main St",
        managerName: "Sergio",
        email: "admin@resto-app.com",
        website: "restro-app.com",
        phone: "555-1234",
        accessibilityInformation: "Accessible",
        amenities: "Pool",
        capacity: 100,
        description: "This is a default venue",
    });
}
const ingredientsWithNutritions = async () => {
    const onionNutrition = await exports.db
        .insert(schema.nutritions)
        .values({ calories: "60", carbohydrates: "0", proteins: "1", fat: "0" })
        .returning({ id: schema.nutritions.id });
    await exports.db
        .insert(schema.ingredients)
        .values({ name: "Onion", stock: 10, nutritionId: onionNutrition[0].id });
    const pastaNutricion = await exports.db
        .insert(schema.nutritions)
        .values({
        calories: "208",
        carbohydrates: "32.1",
        proteins: "6.7",
        fat: "7.7",
    })
        .returning({ id: schema.nutritions.id });
    await exports.db.insert(schema.ingredients).values({
        name: "Pasta Casserole",
        stock: 2,
        nutritionId: pastaNutricion[0].id,
    });
    const cheddarNutricion = await exports.db
        .insert(schema.nutritions)
        .values({
        calories: "408.2",
        carbohydrates: "2.4",
        proteins: "23",
        fat: "34",
    })
        .returning({ id: schema.nutritions.id });
    await exports.db.insert(schema.ingredients).values({
        name: "cheddar",
        stock: 10,
        nutritionId: cheddarNutricion[0].id,
    });
    console.log("Done!");
};
seed();
