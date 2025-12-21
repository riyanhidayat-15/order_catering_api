import { createUser, getUserByEmail } from "../repositories/user-repository.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

export const register = async ({ name, email, password }) => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new Error("Email sudah terdaftar");
  }
  return await createUser({
    name,
    email,
    password,
  });
};

export const login = async ({ email, password }) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Email atau password salah");
  }
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Email atau password salah");
  }

  const token = generateToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || "CUSTOMER",
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || "CUSTOMER",
    token,
  };
};
