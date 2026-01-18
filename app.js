import express from "express";
import cors from "cors";
import db from "./config/database.js";
import userRoutes from "./routes/user-route.js";
import menuRoutes from "./routes/menu-route.js";
import orderRoute from "./routes/order-route.js";
import cartRoute from "./routes/cart-route.js";

const app = express();
const port = 4000;

app.use((req, res, next) => {
  console.log(req.method, req.path, req.headers["content-type"], req.body);
  next();
});

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/menus", menuRoutes);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);

const startApp = async () => {
  try {
    await db.authenticate();
    console.log("Database connected");

    await db.sync();
    console.log("Database synced");

    app.listen(port, () => {
      console.log(`server  up and running in port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect database", err);
  }
};

startApp();
