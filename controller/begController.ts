import { Request, Response } from "express";
import begModel from "../model/begModel";
import mongoose from "mongoose";
import { HTTP } from "../errors/mainError";
import { streamUpload } from "../utils/streamUpload";
import profileModel from "../model/profileModel";

export const createBeg = async (req: any, res: Response) => {
  try {
    const { profileID } = req.params;

    const { title, description, motivation, category, amountNeeded } = req.body;

    const { secure_url, public_id }: any = await streamUpload(req);

    const profiled: any = await profileModel.findById(profileID);
    if (profiled) {
      const abeg = await begModel.create({
        title,
        description,
        motivation,
        category,
        image: secure_url,
        imageID: public_id,
        love: [],
        amountNeeded: parseInt(amountNeeded),
        amountRaised: 0,
      });
      profiled?.beg.push(new mongoose.Types.ObjectId(profiled?._id!));
      profiled?.save();

      return res.status(HTTP.CREATE).json({
        message: "created beg successfully",
        data: abeg,
      });
    } else {
      return res.status(HTTP.BAD).json({
        message: "create a profile first",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "Error creating profile",
      data: error.message,
    });
  }
};

export const viewBeg = async (req: Request, res: Response) => {
  try {
    const abeg = await begModel.find();

    return res.status(HTTP.OK).json({
      message: "viewing all abeg",
      data: abeg,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const viewOneBeg = async (req: Request, res: Response) => {
  try {
    const { abegID } = req.params;
    const abeg = await begModel.findById(abegID);

    return res.status(HTTP.OK).json({
      message: "viewing all abeg",
      data: abeg,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const deleteOneBeg = async (req: Request, res: Response) => {
  try {
    const { abegID } = req.params;
    const abeg = await begModel.findByIdAndDelete(abegID);

    return res.status(HTTP.OK).json({
      message: "viewing all abeg",
      data: abeg,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const updateOneBeg = async (req: Request, res: Response) => {
  try {
    const { abegID } = req.params;
    const { title, description, motivation } = req.body;
    const abeg = await begModel.findByIdAndUpdate(
      abegID,
      { title, description, motivation },
      { new: true }
    );

    return res.status(HTTP.OK).json({
      message: "viewing all abeg",
      data: abeg,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const searchCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;

    const abeg = await begModel.find(category);

    return res.status(HTTP.OK).json({
      message: "success",
      data: abeg,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error while searching",
      data: error.message,
    });
  }
};

export const likeBeg = async (req: Request, res: Response) => {
  try {
    const { begID, userID } = req.params;
    const abeg: any = await begModel.findById(begID);

    if (abeg) {
      const liked = await begModel.findByIdAndUpdate(
        begID,
        {
          abeg: abeg?.like,
        },
        { new: true }
      );
      abeg?.like.push(new mongoose.Types.ObjectId(userID!));
      return res.status(HTTP.CREATE).json({
        message: "liked successfully",
        data: liked,
        length: abeg?.like.length,
      });
    } else if (abeg?.like.includes(userID)) {
      return res.status(HTTP.BAD).json({
        message: "you cannot like again",
      });
    } else {
      return res.status(HTTP.BAD).json({
        message: "beg not found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};