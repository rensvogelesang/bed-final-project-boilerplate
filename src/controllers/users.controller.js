import * as usersService from "../services/users.service.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await usersService.listUsers();
    return res.status(200).json(users);
  } catch {
    return res.status(200).json([]);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await usersService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch {
    return res.status(404).json({ message: "User not found" });
  }
};

export const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Invalid user data" });
  }

  try {
    const user = await usersService.createUser(req.body);
    return res.status(201).json(user);
  } catch {
    return res.status(500).json(SERVER_ERROR);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const data = { ...rest };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const user = await usersService.updateUser(req.params.id, data);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch {
    return res.status(404).json({ message: "User not found" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await usersService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User deleted" });
  } catch {
    return res.status(404).json({ message: "User not found" });
  }
};
