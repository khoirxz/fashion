import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";

import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
// public router
import PublicRoute from "./routes/PublicRouter.js";

dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({
      mongoUrl: process.env.CONNECTION_URL,
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);
// public router set
app.use(PublicRoute);
app.get("/", (req, res) => {
  res.send("Hello World");
  res.end();
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
