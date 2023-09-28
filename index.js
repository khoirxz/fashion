import express from "express";
import cors from "cors";
import session from "express-session";
import FileUpload from "express-fileupload";
import dotenv from "dotenv";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";

// admin or staff router
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
// customer router
import AuthCustomerRoute from "./routes/AuthCustomerRoute.js";
import CustomerRoute from "./routes/CustomerRoute.js";
// public router
import BannerRoute from "./routes/BannerRoute.js";
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
app.use(FileUpload());
app.use(express.static("public"));
// admin/staff router set
app.use(UserRoute); //? route untuk admin/staff
app.use(ProductRoute); //? route untuk produk
app.use(AuthRoute); //? route untuk login admin/staff
app.use(CategoryRoute); //? route untuk kategori
// customer router set
app.use(CustomerRoute); //? route untuk customer
app.use(AuthCustomerRoute); //? route untuk autentikasi customer
app.use(BannerRoute);
// public router set
app.use(PublicRoute); //? route untuk produk publik
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
