import express, { Express } from "express";
import dotenv from "dotenv";
// import serverless from "serverless-http";

import tableRouter from "./routes/table";
import reservationRouter from "./routes/reservation";
import orderRouter from "./routes/order";
import userRouter from "./routes/user";
import itemRouter from "./routes/item";
import nutritionRouter from "./routes/nutrition";
import categoryRouter from "./routes/category";
import ingredientRouter from "./routes/ingredient";
import fileRouter from "./routes/file";
import { type envVariablesType } from "../envValidation";
import cors from "cors";
import storeRouter from "./routes/store";
import billRouter from "./routes/bill";
import authRouter from "./routes/auth";
import paymentRouter from "./routes/payment";
import venueSettingsRouter from "./routes/venue";
import authMiddleware from "./middleware/auth-middleware";
import * as errorMiddleware from "./middleware/error-middleware";

dotenv.config();

// this allow env variables be available to global for typescript
declare global {
  namespace NodeJS {
    interface ProcessEnv extends envVariablesType {}
  }
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const app: Express = express();
const port = process.env.PORT || 4000;

app.use("/public", express.static("public"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/user", authMiddleware, userRouter);
app.use("/table", authMiddleware, tableRouter);
app.use("/reservation", authMiddleware, reservationRouter);
app.use("/order", authMiddleware, orderRouter);
app.use("/item", authMiddleware, itemRouter);
app.use("/nutrition", authMiddleware, nutritionRouter);
app.use("/category", authMiddleware, categoryRouter);
app.use("/ingredient", authMiddleware, ingredientRouter);
app.use("/upload", authMiddleware, fileRouter);
app.use("/store", authMiddleware, storeRouter);
app.use("/bill", authMiddleware, billRouter);
app.use("/auth", authRouter);
app.use("/payment", authMiddleware, paymentRouter);
app.use("/venueSettings", authMiddleware, venueSettingsRouter);

// app.get("/", (req: Request, res: Response) => {
//   res.send("TypeScript Server Wohooo");
// });

// app.use(errorMiddleware.notFound);
// app.use(errorMiddleware.error);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// module.exports.handler = serverless(app);
