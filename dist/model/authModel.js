"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authModel = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    verified: {
        type: Boolean,
    },
    token: {
        type: String,
    },
    profile: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "profiles",
        },
    ],
    beg: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "begs",
        },
    ],
    history: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "histories",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", authModel);
