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
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: [""],
      get() {
        const rawValue = this.getDataValue("images");
        return JSON.parse(rawValue || [""]);
      },
      set(value) {
        this.setDataValue("images", JSON.stringify(value));
      },
    },
  },
  {
    tableName: "menus",
    timestamps: true,
  }
);

Menu.hasMany(OrderItems, { foreignKey: "menu_id" });

export default Menu;
