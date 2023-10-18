import mongoose from "mongoose";

export interface iUser {
  email: string;
  password: string;
  verified: boolean;
  token: string;
  profile: Array<string>;
  history: Array<string>;
}
  

export interface iProfile {
  avatar: string;
  avatarID: string;
  name: string;
  phoneNumber: string;
  address: string;
  userID: string;
  aboutUs: string;
  beg:Array<string>
  user: {};
}

export interface iBeg {
    title: string;
    motivation: string;
    description: string;
    amountNeeded: number;
    amountRaised: number;

    image: string;
    imageID: string;

    like:Array<string>;
    checkOut:Array<string>

    profile:{}
}

export interface iCheckOut {
    email:string;
    amount:number;

    beg:{}
}

export interface iUserData extends iUser, mongoose.Document {}
export interface iProfileData extends iProfile, mongoose.Document {}
export interface iBegData extends iBeg, mongoose.Document {}
export interface iCheckOutData extends iCheckOut, mongoose.Document {}
