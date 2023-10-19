"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.updateOne = exports.deleteOne = exports.viewOne = exports.viewAll = exports.createProfile = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const profileModel_1 = __importDefault(require("../model/profileModel"));
const mainError_1 = require("../errors/mainError");
const authModel_1 = __importDefault(require("../model/authModel"));
const streamUpload_1 = require("../utils/streamUpload");
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { name, address, phoneNumber } = req.body;
        const { secure_url, public_id } = yield (0, streamUpload_1.streamUpload)(req);
        const user = yield authModel_1.default.findById(userID);
        if (user) {
            const profiled = yield profileModel_1.default.create({
                name,
                address,
                phoneNumber,
                userID,
                avatar: secure_url,
                avatarID: public_id,
                beg: [],
            });
            user === null || user === void 0 ? void 0 : user.profile.push(new mongoose_1.default.Types.ObjectId(profiled === null || profiled === void 0 ? void 0 : profiled._id));
            user.save();
            return res.status(mainError_1.HTTP.CREATE).json({
                message: "Profile created",
                data: profiled,
            });
        }
        else {
            return res.status(404).json({
                message: "user not found",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error creating profile",
            data: error.message,
        });
    }
});
exports.createProfile = createProfile;
const viewAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiled = yield profileModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "viewing profiles",
            data: profiled,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.viewAll = viewAll;
const viewOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileID } = req.params;
        const profiled = yield authModel_1.default.findById(profileID).populate({
            path: "profile",
        });
        return res.status(mainError_1.HTTP.OK).json({
            message: "view one profile",
            data: profiled,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.viewOne = viewOne;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileID } = req.params;
        const profiled = yield profileModel_1.default.findByIdAndDelete(profileID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "delete one profile",
            data: profiled,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.deleteOne = deleteOne;
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileID } = req.params;
        const { phoneNumber, address } = req.body;
        const profiled = yield profileModel_1.default.findByIdAndUpdate(profileID, { phoneNumber, address }, { new: true });
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "view one profile",
            data: profiled,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.updateOne = updateOne;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileID, userID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        const profile = yield profileModel_1.default.findById(profileID);
        if ((user === null || user === void 0 ? void 0 : user._id) !== (profile === null || profile === void 0 ? void 0 : profile.userID)) {
            const profiled = yield profileModel_1.default.find();
            return res.status(mainError_1.HTTP.OK).json({
                message: "User profile",
                data: profiled,
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "User profile not found",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.getUserProfile = getUserProfile;
