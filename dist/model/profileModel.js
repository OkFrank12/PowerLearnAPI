"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const profileModel = new mongoose_1.default.Schema({
    avatar: {
        type: String,
    },
    avatarID: {
        type: String,
    },
    userID: {
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
        type: mongoose_1.default.Types.ObjectId,
        ref: "users",
    },
    aboutUs: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("profiles", profileModel);
