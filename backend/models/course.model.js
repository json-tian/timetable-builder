const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const datesSchema = new Schema({
  dayOfWeek: { type: Number, min: 1, max: 5 },
  startTime: { type: Number }, // Stored in 24 hour format HH:MM
  endTime: { type: Number },
  section: { type: Number }
});

const courseSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    discipline: { type: String, required: true },
    dates: [datesSchema],
    sections: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
