import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

import postRoutes from "./routes/posts.js";
app.use("/api", postRoutes);

const URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8000;

mongoose
  .connect(URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server Running on Port: http://localhost:${PORT}`);
    })
  )
  .catch((err) => console.log(err));
