import db from "../config/database.js";
import { DataTypes } from "sequelize";
import OrderItems from "./order-items-model.js";

const Order = db.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_number: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "PROCESS", "DONE", "CANCEL"),
      defaultValue: "PENDING",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

Order.hasMany(OrderItems, { foreignKey: "order_id", onDelete: "CASCADE" });

export default Order;
