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
import cookieParser from "cookie-parser";

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

app.use(cookieParser());
app.use("/public", express.static("public"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());



// app.use(authMiddleware);

app.use("/user", userRouter);
app.use("/table", tableRouter);
app.use("/reservation", reservationRouter);
app.use("/order", orderRouter);
app.use("/item", itemRouter);
app.use("/nutrition", nutritionRouter);
app.use("/category", categoryRouter);
app.use("/ingredient", ingredientRouter);
app.use("/upload", fileRouter);
app.use("/store", storeRouter);
app.use("/bill", billRouter);
app.use("/auth", authRouter);
app.use("/payment", paymentRouter);
app.use("/venueSettings", venueSettingsRouter);

// app.get("/", (req: Request, res: Response) => {
//   res.send("TypeScript Server Wohooo");
// });

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.error);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// module.exports.handler = serverless(app);
