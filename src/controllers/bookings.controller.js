import * as bookingsService from "../services/bookings.service.js";

const SERVER_ERROR = {
  message: "An error occurred on the server, please double-check your request!",
};

// 🔧 normalizer → Prisma-safe booking
const normalizeBookingInput = (body) => {
  return {
    userId: body.userId,
    propertyId: body.propertyId,

    checkInDate: body.checkInDate ?? body.checkinDate,
    checkOutDate: body.checkOutDate ?? body.checkoutDate,

    numberOfGuests: body.numberOfGuests ?? null,
    totalPrice: body.totalPrice ?? null,

    bookingStatus: body.bookingStatus
      ? body.bookingStatus.toUpperCase()
      : "PENDING",
  };
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await bookingsService.listBookings();
    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(500).json(SERVER_ERROR);
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await bookingsService.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json(booking);
  } catch (err) {
    return res.status(500).json(SERVER_ERROR);
  }
};

export const createBooking = async (req, res) => {
  const {
    userId,
    propertyId,
    checkInDate,
    checkinDate,
    checkOutDate,
    checkoutDate,
  } = req.body;

  if (
    !userId ||
    !propertyId ||
    !(checkInDate || checkinDate) ||
    !(checkOutDate || checkoutDate)
  ) {
    return res.status(400).json({ message: "Invalid booking data" });
  }

  try {
    const booking = await bookingsService.createBooking(
      normalizeBookingInput(req.body)
    );
    return res.status(201).json(booking);
  } catch {
    return res.status(500).json(SERVER_ERROR);
  }
};

export const updateBooking = async (req, res) => {
  try {
    const data = normalizeBookingInput(req.body);
    const booking = await bookingsService.updateBooking(req.params.id, data);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json(booking);
  } catch (err) {
    return res.status(500).json(SERVER_ERROR);
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const deleted = await bookingsService.deleteBooking(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ message: "Booking deleted" });
  } catch (err) {
    return res.status(500).json(SERVER_ERROR);
  }
};
