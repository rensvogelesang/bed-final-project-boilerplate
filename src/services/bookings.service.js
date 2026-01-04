import { prisma } from "../prisma/client.js";

/**
 * Get all bookings (optionally filtered by userId)
 */
export const listBookings = async (filters = {}) => {
  return prisma.booking.findMany({
    where: filters,
  });
};

/**
 * Get booking by ID
 */
export const getBookingById = async (id) => {
  return prisma.booking.findUnique({
    where: { id },
  });
};

/**
 * Create booking
 */
export const createBooking = async (data) => {
  return prisma.booking.create({
    data,
  });
};

/**
 * Update booking
 */
export const updateBooking = async (id, data) => {
  const existing = await prisma.booking.findUnique({ where: { id } });
  if (!existing) return null;

  return prisma.booking.update({
    where: { id },
    data,
  });
};

/**
 * Delete booking
 */
export const deleteBooking = async (id) => {
  const existing = await prisma.booking.findUnique({ where: { id } });
  if (!existing) return null;

  await prisma.booking.delete({ where: { id } });
  return true;
};
