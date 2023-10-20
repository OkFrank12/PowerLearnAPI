import mongoose from "mongoose";

export interface iUser {
  email: string;
  password: string;
  verified: boolean;
  token: string;
  profile: {}[];
  history: {}[];
  beg: {}[];
}

export interface iProfile {
  avatar: string;
  avatarID: string;
  name: string;
  phoneNumber: string;
  address: string;
  userID: string;
  aboutUs: string;
  user: {};
}

export interface iBeg {
  title: string;
  motivation: string;
  description: string;
  amountNeeded: number;
  amountRaised: number;
  category: string;
  userID: string;
  image: string;
  imageID: string;
  like: Array<string>;
  checkOut: Array<string>;

  user: {};
}

export interface iUserData extends iUser, mongoose.Document {}
export interface iProfileData extends iProfile, mongoose.Document {}
export interface iBegData extends iBeg, mongoose.Document {}
