import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HTTP } from "../errors/mainError";

export default (Schema: Joi.ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = Schema.validate(req.body);
    if (error) {
      return res.status(HTTP.BAD).json({
        message: "Validation Error",
        data: error.message,
      });
    } else {
      next();
    }
  };
};
