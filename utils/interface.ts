import mongoose from "mongoose";

export interface iUser {
  email: string;
  password: string;
  verified: boolean;
  token: string;
  profile: Array<string>;
  history: Array<string>;
}

export interface iUserData extends iUser, mongoose.Document {}
