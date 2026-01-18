import cartService from "../services/cart-service.js";

const cartController = {
  async getCart(req, res) {
    try {
      const cart = await cartService.getCart(req.user.id);
      res.status(200).json({
        status: "success",
        data: cart,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  async addToCart(req, res) {
    const { menu_id, quantity } = req.body;
    try {
      await cartService.addToCart(req.user.id, menu_id, quantity);
      res.status(200).json({
        status: "success",
        message: "Item added to cart",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  async updateItem(req, res) {
    const { menu_id, quantity } = req.body;
    try {
      await cartService.updateItem(req.user.id, menu_id, quantity);
      res.status(200).json({
        status: "success",
        message: "Cart item updated",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  async removeCartItem(req, res) {
    try {
      await cartService.removeItem(req.user.id, req.params.menu_id);
      res.status(200).json({
        status: "success",
        message: "Cart item removed",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  async clearCart(req, res) {
    try {
      await cartService.clearCart(req.user.id);
      res.status(200).json({
        status: "success",
        message: "Cart cleared",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
};

export default cartController;
