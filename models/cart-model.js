import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Cart = db.define("cart", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: "carts",
    timestamps: false,
});

export default Cart;