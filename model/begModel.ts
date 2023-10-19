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
    userID: {
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
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iBegData>("begs", begModel);
