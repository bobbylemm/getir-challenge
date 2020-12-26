const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    totalCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
