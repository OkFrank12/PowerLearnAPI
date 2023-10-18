import mongoose from "mongoose";
import { iCheckOutData } from "../utils/interface";

const checkoutModel = new mongoose.Schema<iCheckOutData>({
    amount:{
        type: Number
    },
    email:{
        type: String
    },
    beg:{
        type: mongoose.Types.ObjectId,
        ref:"begs"
    }
})

export default mongoose.model<iCheckOutData>("checkouts", checkoutModel)