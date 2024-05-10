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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import serverless from "serverless-http";
const table_1 = __importDefault(require("./routes/table"));
const reservation_1 = __importDefault(require("./routes/reservation"));
const order_1 = __importDefault(require("./routes/order"));
const user_1 = __importDefault(require("./routes/user"));
const item_1 = __importDefault(require("./routes/item"));
const nutrition_1 = __importDefault(require("./routes/nutrition"));
const category_1 = __importDefault(require("./routes/category"));
const ingredient_1 = __importDefault(require("./routes/ingredient"));
const file_1 = __importDefault(require("./routes/file"));
const cors_1 = __importDefault(require("cors"));
const store_1 = __importDefault(require("./routes/store"));
const bill_1 = __importDefault(require("./routes/bill"));
const auth_1 = __importDefault(require("./routes/auth"));
const payment_1 = __importDefault(require("./routes/payment"));
const venue_1 = __importDefault(require("./routes/venue"));
const auth_middleware_1 = __importDefault(require("./middleware/auth-middleware"));
const errorMiddleware = __importStar(require("./middleware/error-middleware"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cookie_parser_1.default)());
app.use("/public", express_1.default.static("public"));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(auth_middleware_1.default);
app.use("/user", user_1.default);
app.use("/table", table_1.default);
app.use("/reservation", reservation_1.default);
app.use("/order", order_1.default);
app.use("/item", item_1.default);
app.use("/nutrition", nutrition_1.default);
app.use("/category", category_1.default);
app.use("/ingredient", ingredient_1.default);
app.use("/upload", file_1.default);
app.use("/store", store_1.default);
app.use("/bill", bill_1.default);
app.use("/auth", auth_1.default);
app.use("/payment", payment_1.default);
app.use("/venueSettings", venue_1.default);
// app.get("/", (req: Request, res: Response) => {
//   res.send("TypeScript Server Wohooo");
// });
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.error);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
// module.exports.handler = serverless(app);
