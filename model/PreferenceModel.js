import mongoose, { Schema } from "mongoose";

const preferenceSchema = new Schema({
  cuisines: {
    type: [String],
    default: [],
  },
  diets: {
    type: [String],
    default: [],
  },
  allergies: {
    type: [String],
    default: [],
  },
  ingredients: {
    type: [String],
    default: [],
  },
});

export const Preference =
  mongoose.models.Preference ?? mongoose.model("Preference", preferenceSchema);
