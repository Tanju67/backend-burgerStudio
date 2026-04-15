import "dotenv/config";
import "express-async-errors";
import cors from "cors";

import express from "express";
import connectDB from "./utils/connectDB.js";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(
  Boolean,
) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);


app.get("/", (req, res) => {
  res.send("Hello World!");
});


const port = process.env.PORT || 5000;

const start = async () => {
  try {
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