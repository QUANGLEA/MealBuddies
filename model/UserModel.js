import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  preference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Preference",
  },
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
