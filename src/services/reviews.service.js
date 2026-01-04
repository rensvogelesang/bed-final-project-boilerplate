import { prisma } from "../prisma/client.js";

/**
 * Get all reviews
 */
export const listReviews = async () => {
  return prisma.review.findMany();
};

/**
 * Get single review by ID
 */
export const getReview = async (id) => {
  return prisma.review.findUnique({
    where: { id },
  });
};

/**
 * Create a new review
 */
export const createReview = async (data) => {
  return prisma.review.create({
    data,
  });
};

/**
 * Update existing review
 */
export const updateReview = async (id, data) => {
  const existingReview = await prisma.review.findUnique({
    where: { id },
  });

  if (!existingReview) {
    return null;
  }

  return prisma.review.update({
    where: { id },
    data,
  });
};

/**
 * Delete review
 */
export const deleteReview = async (id) => {
  const existingReview = await prisma.review.findUnique({
    where: { id },
  });

  if (!existingReview) {
    return null;
  }

  await prisma.review.delete({
    where: { id },
  });

  return true;
};
