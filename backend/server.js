import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDb();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is running...");
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, (req, res) => {
  console.log("Server started on port 5000...");
});
