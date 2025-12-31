import db from "../config/database.js";
import { DataTypes } from "sequelize";
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
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    delivery_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    delivery_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    delivery_type: {
      type: DataTypes.ENUM("PICKUP", "DELIVERY"),
      defaultValue: "DELIVERY",
    },
    payment_method: {
      type: DataTypes.ENUM("CASH", "TRANSFER", "QRIS"),
      defaultValue: "CASH",
    },
    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "CONFIRMED",
        "PROCESS",
        "DONE",
        "CANCELLED"
      ),
      defaultValue: "PENDING",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

export default Order;
