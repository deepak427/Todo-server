import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import bodyParser from 'body-parser';
import todoroutes from './routes/todoroute.js'

mongoose.set("strictQuery", true);

const app = express();
dotenv.config();

app.use(express.json({ limit: "300mb", extended: true }));
app.use(express.urlencoded({ limit: "300mb", extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/todo', todoroutes);

app.get("/", (req, res) => {
    res.send("This is Todo application.");
});

const PORT =  5000;

const DATABASE_URL =  process.env.CONNECTION_URL;

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));