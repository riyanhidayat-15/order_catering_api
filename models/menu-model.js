import { DataTypes } from "sequelize";
import db from "../config/database.js";
import OrderItems from "./order-items-model.js";

const Menu = db.define(
  "menus",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    is_ready: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "menus",
    timestamps: true,
  }
);

export default Menu;
