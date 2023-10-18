import mongoose from "mongoose";
import { iProfileData } from "../utils/interface";

const profileModel = new mongoose.Schema<iProfileData>(
  {
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    name: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    beg: [
      {
        type: mongoose.Types.ObjectId,
        ref: "begs",
      },
    ],
    aboutUs: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iProfileData>("profiles", profileModel);
