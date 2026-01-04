import { Router } from "express";
import {
  getHosts,
  getHostById,
  createHost,
  updateHost,
  deleteHost,
} from "../controllers/hosts.controller.js";

const router = Router();

// ALLES PUBLIC
router.get("/", getHosts);
router.get("/:id", getHostById);
router.post("/", createHost);
router.put("/:id", updateHost);
router.delete("/:id", deleteHost);

export default router;
