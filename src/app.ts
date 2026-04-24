import "dotenv/config";
import "express-async-errors";
import cors from "cors";

import express from "express";
import swaggerUi from "swagger-ui-express";
import connectDB from "./utils/connectDB.js";
import authRouter from "./routes/auth.route.js";
import menuRoute from "./routes/menu.route.js";
import productRoute from "./routes/product.route.js";
import orderRoute from "./routes/order.route.js";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "./docs/swagger.js";

const app = express();

app.use(
  cors({
    origin: true, // Her yerden gelen isteğe izin ver (veya 'http://16.170.251.184' yaz)
    credentials: true, // Cookie ve Token geçişine izin verir
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    console.log(
      "JWT_SECRET Kontrolü:",
      process.env.JWT_SECRET ? "OK ✅" : "BOŞ! ❌",
    );
    console.log(
      "MONGO_URI Kontrolü:",
      process.env.MONGO_URI ? "OK ✅" : "BOŞ! ❌",
    );
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    await connectDB(process.env.MONGO_URI);
    console.log("Connected DB!");
    app.listen(port, () => console.log("Server is listening on port: " + port));
  } catch (error) {
    console.log(error);
  }
};

start();
