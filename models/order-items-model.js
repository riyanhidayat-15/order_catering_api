import { DataTypes } from "sequelize";
import db from "../config/database.js";

const OrderItems = db.define(
  "order_items",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "orders", key: "id" },
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "menus", key: "id" },
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "order_items",
    timestamps: true,
  }
);

export default OrderItems;
