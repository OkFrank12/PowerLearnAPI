import mongoose from "mongoose";
import { Request, Response } from "express";
import profileModel from "../model/profileModel";
import { HTTP } from "../errors/mainError";
import authModel from "../model/authModel";
import { streamUpload } from "../utils/streamUpload";

export const createProfile = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;

    const { name, address, phoneNumber } = req.body;

    const { secure_url, public_id }: any = await streamUpload(req);

    const user: any = await authModel.findById(userID);

    if (user) {
      const profiled: any = await profileModel.create({
        name,
        address,
        phoneNumber,
        userID,
        avatar: secure_url,
        avatarID: public_id,
        beg: [],
      });
      user?.profile.push(new mongoose.Types.ObjectId(profiled?._id!));
      user.save();
      return res.status(HTTP.CREATE).json({
        message: "Profile created",
        data: profiled,
      });
    } else {
      return res.status(404).json({
        message: "user not found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error creating profile",
      data: error.message,
    });
  }
};

export const viewAll = async (req: Request, res: Response) => {
  try {
    const profiled = await profileModel.find();

    return res.status(HTTP.OK).json({
      message: "viewing profiles",
      data: profiled,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const viewOne = async (req: Request, res: Response) => {
  try {
    const { profileID } = req.params;

    const profiled = await authModel.findById(profileID).populate({
      path: "profile",
    });

    return res.status(HTTP.OK).json({
      message: "view one profile",
      data: profiled,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const { profileID } = req.params;

    const profiled = await profileModel.findByIdAndDelete(profileID);

    return res.status(HTTP.OK).json({
      message: "delete one profile",
      data: profiled,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const updateOne = async (req: Request, res: Response) => {
  try {
    const { profileID } = req.params;

    const { phoneNumber, address } = req.body;

    const profiled = await profileModel.findByIdAndUpdate(
      profileID,
      { phoneNumber, address },
      { new: true }
    );

    return res.status(HTTP.CREATE).json({
      message: "view one profile",
      data: profiled,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { profileID, userID } = req.params;

    const user: any = await authModel.findById(userID);

    const profile: any = await profileModel.findById(profileID);

    if (user?._id !== profile?.userID) {
      const profiled = await profileModel.find();

      return res.status(HTTP.OK).json({
        message: "User profile",
        data: profiled,
      });
    } else {
      return res.status(HTTP.BAD).json({
        message: "User profile not found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};
