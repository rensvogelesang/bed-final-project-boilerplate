import { Router } from "express";
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/bookings.controller.js";

const router = Router();

// ALLES PUBLIC
router.get("/", getBookings);
router.post("/", createBooking);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;
