const Booking = require("../models/Booking");
const User = require("../models/User");
const Shop = require("../models/Shop");

const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    if (booking) {
      await User.updateOne(
        { user: req.body.user },
        { $push: { booking: [booking._id] } }
      );
      await Shop.updateOne(
        { shop: req.body.shop },
        { $push: { booking: [booking._id] } }
      );
      res.status(201).json({ booking });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    //   console.log(req.bookings);
    const bookings = await Booking.find();
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSingleBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    let booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }
    booking = await Booking.findByIdAndUpdate(bookingId, req.body, {
      new: true,
    });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }
    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ msg: "Booking Deleted." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
