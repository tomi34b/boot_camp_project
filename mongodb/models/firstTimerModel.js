import mongoose from "mongoose";

const { Schema, model } = mongoose;

const firstTimerSchema = new Schema(
  {
    fullname: {
      type: String,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    post_code: {
      type: String,
    },
    mobile_number: {
      type: String,
    },
    home_number: {
      type: String,
    },
    email: {
      type: String,
    },
    worshipped_with_us: {
      type: Boolean,
      default: false,
    },
    worship_location: {
      type: String,
    },
    worship_date: {
      type: String,
    },
    join_us: {
      type: Boolean,
      default: false,
    },
    live_or_work_here: {
      type: Boolean,
      default: false,
    },
    about_us_method: {
      type: String,
      enum: [
        "Letter",
        "Flyer",
        "Social Media",
        "Website",
        "Outreach/Invitation",
        "Others",
      ],
    },
    other_about_us_method: {
      type: String,
    },
    attended_foundation_school: {
      type: Boolean,
      default: false,
    },
    attended_word_of_faith_bible_school: {
      type: Boolean,
      default: false,
    },
    higest_Level: {
      type: String,
    },
    baptised: {
      type: Boolean,
      default: false,
    },
    mode_of_contact: {
      type: String,
      enum: ["Phone", "Email", "Post", "Visit"],
    },
    do_not_contact: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("FirstTimer", firstTimerSchema);
