import express from "express";
import cors from "cors";
import db from "./config/database.js";
import userRoutes from "./routes/user-route.js";
import menuRoutes from "./routes/menu-route.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/menu", menuRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is running, API ready to fetch" });
});

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
