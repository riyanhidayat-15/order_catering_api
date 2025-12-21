import {
  register as registerService,
  login as loginService,
} from "../services/user-service.js";

export const register = async (req, res) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json({
      message: "User berhasil dibuat",
      data: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await loginService(req.body);
    res.status(200).json({
      message: "Login berhasil",
      data: user,
    });
  } catch (error) {
    console.log(error); // TAMBAH INI

    res.status(400).json({ message: error.message });
  }
};
