const { model, Schema } = require("mongoose");

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    duration: {
      type: Number,
      required: [true, "duration is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    // shop: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = model("Service", serviceSchema);
