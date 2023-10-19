import mongoose, { Mongoose } from "mongoose";
import { iBegData } from "../utils/interface";

const begModel = new mongoose.Schema<iBegData>(
  {
    title: {
      type: String,
    },
    motivation: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    amountNeeded: {
      type: Number,
    },
    amountRaised: {
      type: Number,
    },
    checkOut: [
      {
        type: mongoose.Types.ObjectId,
        ref: "checkouts",
      },
    ],
    like: [
      {
        type: mongoose.Types.ObjectId,
      },
    ],
    profile: {
      type: mongoose.Types.ObjectId,
      ref: "profiles",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iBegData>("begs", begModel);
