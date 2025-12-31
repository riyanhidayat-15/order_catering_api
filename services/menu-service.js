import cloudinary from "../config/cloudinary.js";
import menuRepository from "../repositories/menu-repository.js";

const createMenu = async (data, file) => {
  if (!file) {
    throw new Error("Minimal 1 gambar harus diupload");
  }

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "menu_images" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(file.buffer);
  });
  const menu = await menuRepository.create({
    ...data,
    image_url: result.secure_url,
  });

  return menu;
};

const getMenus = async () => {
  return await menuRepository.getAll();
};

const getDetailMenu = async (id) => {
  const menu = await menuRepository.getById(id);

  if (!menu) {
    throw new Error("Menu tidak ditemukan");
  }

  return menu;
};

const editMenu = async (id, data) => {
  await getDetailMenu(id);
  return await menuRepository.update(id, data);
};

const deleteMenu = async (id) => {
  return await menuRepository.deleteById(id);
};

export default {
  createMenu,
  getMenus,
  getDetailMenu,
  editMenu,
  deleteMenu,
};
