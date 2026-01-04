import { Router } from "express";
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviews.controller.js";

const router = Router();

// ALLES PUBLIC
router.get("/", getReviews);
router.post("/", createReview);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
