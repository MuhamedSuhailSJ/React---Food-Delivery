import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

connectDb();

app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));

app.use("/api/user",userRouter)

app.get("/", (request, response) => {
  response.send("API WORkING");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

//mongodb+srv://<db_username>:<db_password>@cluster0.kck4gss.mongodb.net/
