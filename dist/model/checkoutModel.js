"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const checkoutModel = new mongoose_1.default.Schema({
    amount: {
        type: Number
    },
    email: {
        type: String
    },
    beg: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "begs"
    }
});
exports.default = mongoose_1.default.model("checkouts", checkoutModel);
