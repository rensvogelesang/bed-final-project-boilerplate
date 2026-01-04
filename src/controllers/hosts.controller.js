import bcrypt from "bcrypt";
import * as hostsService from "../services/hosts.service.js";

const SERVER_ERROR = {
  message: "An error occurred on the server, please double-check your request!",
};

export const getHosts = async (req, res) => {
  try {
    const { name } = req.query;
    const hosts = await hostsService.listHosts({ name });
    return res.status(200).json(hosts);
  } catch {
    return res.status(500).json(SERVER_ERROR);
  }
};

export const getHostById = async (req, res) => {
  try {
    const host = await hostsService.getHostById(req.params.id);
    if (!host) return res.status(404).json({ message: "Host not found" });
    return res.status(200).json(host);
  } catch {
    return res.status(500).json(SERVER_ERROR);
  }
};

export const createHost = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Invalid host data" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const host = await hostsService.createHost({
      ...req.body,
      password: hashedPassword,
    });
    return res.status(201).json(host);
  } catch {
    return res.status(500).json(SERVER_ERROR);
  }
};

export const updateHost = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const data = { ...rest };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const host = await hostsService.updateHost(req.params.id, data);
    if (!host) return res.status(404).json({ message: "Host not found" });

    return res.status(200).json(host);
  } catch {
    return res.status(500).json(SERVER_ERROR);
  }
};

export const deleteHost = async (req, res) => {
  try {
    const deleted = await hostsService.deleteHost(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Host not found" });
    return res.status(200).json({ message: "Host deleted" });
  } catch {
    return res.status(500).json(SERVER_ERROR);
  }
};
