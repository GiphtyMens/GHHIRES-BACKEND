const { model, Schema } = require("mongoose");

const bookingSchema = new Schema(
  {
    service: {
      type: String,
      required: true,
    },
    shop: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    totalAmount: { type: Number },
    confirmed: { type: Boolean },
    completed: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = model("Booking", bookingSchema);
