import Order from "./order-model.js";
import OrderItems from "./order-items-model.js";
import Menu from "./menu-model.js";

Menu.hasMany(OrderItems, { foreignKey: "menu_id" });
OrderItems.belongsTo(Menu, { foreignKey: "menu_id" });

Order.hasMany(OrderItems, { foreignKey: "order_id" });
OrderItems.belongsTo(Order, { foreignKey: "order_id" });

export { Menu, OrderItems, Order };
