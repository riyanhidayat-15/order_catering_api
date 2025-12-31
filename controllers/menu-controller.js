import cloudinary from "../config/cloudinary.js";
import Menu from "../models/menu-model.js";
import menuService from "../services/menu-service.js";

const createMenuController = async (req, res) => {
  console.log("Data:", req.body, req.file);
  try {
    req.body.price = Number(req.body.price);
    const menu = await menuService.createMenu(req.body, req.file);
    res.status(201).json({
      message: "Menu berhasil dibuat",
      data: menu,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMenusController = async (req, res) => {
  try {
    const menus = await menuService.getMenus();
    res.status(200).json({
      message: "Daftar menu",
      data: menus,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const detailMenuController = async (req, res) => {
  try {
    const menu = await menuService.getDetailMenu(req.params.id);
    res.status(200).json({
      message: "Detail Menu",
      data: menu,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMenuController = async (req, res) => {
  try {
    const menu = await menuService.editMenu(req.params.id, req.body);
    res.status(200).json({
      message: "Menu berhasil di update",
      data: {
        id: menu.id,
        name: menu.name,
        category: menu.category,
        price: menu.price,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMenuController = async (req, res) => {
  try {
    await menuService.deleteMenu(req.params.id);
    res.status(200).json({ message: "Menu telah dihapus" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  createMenuController,
  getMenusController,
  detailMenuController,
  updateMenuController,
  deleteMenuController,
};
