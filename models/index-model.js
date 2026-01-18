import Order from "./order-model.js";
import OrderItems from "./order-items-model.js";
import Menu from "./menu-model.js";
import Cart from "./cart-model.js";
import CartItems from "./cart-items-model.js";

//Cart Associations
Cart.hasMany(CartItems, { foreignKey: "cart_id" });
CartItems.belongsTo(Cart, { foreignKey: "cart_id" });

Menu.hasMany(CartItems, { foreignKey: "menu_id" });
CartItems.belongsTo(Menu, { foreignKey: "menu_id" });

//Order Associations
Menu.hasMany(OrderItems, { foreignKey: "menu_id" });
OrderItems.belongsTo(Menu, { foreignKey: "menu_id" });

Order.hasMany(OrderItems, { foreignKey: "order_id" });
OrderItems.belongsTo(Order, { foreignKey: "order_id" });

export { Menu, OrderItems, Order, Cart, CartItems };
