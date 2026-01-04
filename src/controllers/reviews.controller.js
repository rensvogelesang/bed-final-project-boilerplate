import * as reviewsService from "../services/reviews.service.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await reviewsService.listReviews();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({
      message:
        "An error occurred on the server, please double-check your request!",
    });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await reviewsService.getReview(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({
      message:
        "An error occurred on the server, please double-check your request!",
    });
  }
};

export const createReview = async (req, res) => {
  const { userId, propertyId, rating } = req.body;

  if (!userId || !propertyId || rating == null) {
    return res.status(400).json({ message: "Invalid review data" });
  }

  try {
    const review = await reviewsService.createReview(req.body);
    return res.status(201).json(review);
  } catch {
    return res.status(500).json(SERVER_ERROR);
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await reviewsService.updateReview(req.params.id, req.body);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({
      message:
        "An error occurred on the server, please double-check your request!",
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const deleted = await reviewsService.deleteReview(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({
      message:
        "An error occurred on the server, please double-check your request!",
    });
  }
};
