import db from "../config/database.js";

const CartItems = db.define("cart_items", {
    id: {
        type: db.Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cart_id: {
        type: db.Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    menu_id: {
        type: db.Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: db.Sequelize.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: db.Sequelize.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    tableName: "cart_items",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['cart_id', 'menu_id']
        }
    ]
});

export default CartItems;