const { model, Schema } = require("mongoose");

const shopSchema = new Schema(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
      required: [true, "shop name is required"],
      unique: true,
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    booking: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
      unique: true,
    },
    phone: {
      type: Number,
      unique: true,
      required: [true, "phone number is required"],
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    passcode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Shop", shopSchema);
