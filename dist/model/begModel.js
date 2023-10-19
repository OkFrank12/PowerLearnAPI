"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const begModel = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Types.ObjectId,
            ref: "checkouts",
        },
    ],
    like: [
        {
            type: mongoose_1.default.Types.ObjectId,
        },
    ],
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "users",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("begs", begModel);
