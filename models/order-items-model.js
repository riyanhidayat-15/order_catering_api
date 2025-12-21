import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Menu from "./menu-model.js";
import Order from "./order-model.js";

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
    },
    menu_id: {
      type: DataTypes.INTEGER,
    },
    quatity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "order_items",
    timestamps: true,
  }
);

OrderItems.belongsTo(Menu, { foreignKey: "menu_id" });
OrderItems.belongsTo(Order, { foreignKey: "order_id" });

export default OrderItems;
