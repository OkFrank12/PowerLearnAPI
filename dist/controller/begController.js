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
exports.likeBeg = exports.searchCategory = exports.giveOneBeg = exports.updateOneBeg = exports.deleteOneBeg = exports.viewOneBeg = exports.viewOneBegPopulate = exports.viewBeg = exports.createBeg = void 0;
const begModel_1 = __importDefault(require("../model/begModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const mainError_1 = require("../errors/mainError");
const streamUpload_1 = require("../utils/streamUpload");
const authModel_1 = __importDefault(require("../model/authModel"));
const createBeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { title, description, motivation, category, amountNeeded } = req.body;
        const { secure_url, public_id } = yield (0, streamUpload_1.streamUpload)(req);
        const user = yield authModel_1.default.findById(userID);
        if (user) {
            const abeg = yield begModel_1.default.create({
                title,
                description,
                motivation,
                category,
                image: secure_url,
                imageID: public_id,
                love: [],
                userID,
                amountNeeded: parseInt(amountNeeded),
                amountRaised: 0,
            });
            user === null || user === void 0 ? void 0 : user.beg.push(new mongoose_1.default.Types.ObjectId(abeg === null || abeg === void 0 ? void 0 : abeg._id));
            user === null || user === void 0 ? void 0 : user.save();
            return res.status(mainError_1.HTTP.CREATE).json({
                message: "created beg successfully",
                data: abeg,
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "create a profile first",
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
exports.createBeg = createBeg;
const viewBeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const abeg = yield begModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "viewing all abeg",
            data: abeg,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.viewBeg = viewBeg;
const viewOneBegPopulate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { abegID } = req.params;
        const abeg = yield authModel_1.default.findById(abegID).populate({
            path: "beg",
        });
        return res.status(mainError_1.HTTP.OK).json({
            message: "viewing all abeg",
            data: abeg,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.viewOneBegPopulate = viewOneBegPopulate;
const viewOneBeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { abegID } = req.params;
        const abeg = yield begModel_1.default.findById(abegID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "viewing all abeg",
            data: abeg,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.viewOneBeg = viewOneBeg;
const deleteOneBeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { abegID } = req.params;
        const abeg = yield begModel_1.default.findByIdAndDelete(abegID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "viewing all abeg",
            data: abeg,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.deleteOneBeg = deleteOneBeg;
const updateOneBeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { abegID } = req.params;
        const { title, description, motivation } = req.body;
        const abeg = yield begModel_1.default.findByIdAndUpdate(abegID, { title, description, motivation }, { new: true });
        return res.status(mainError_1.HTTP.OK).json({
            message: "viewing all abeg",
            data: abeg,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.updateOneBeg = updateOneBeg;
const giveOneBeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { abegID } = req.params;
        const { amount } = req.body;
        const abegUser = yield begModel_1.default.findById(abegID);
        const abeg = yield begModel_1.default.findByIdAndUpdate(abegID, {
            amountNeeded: (abegUser === null || abegUser === void 0 ? void 0 : abegUser.amountNeeded) - parseInt(amount),
            amountRaised: (abegUser === null || abegUser === void 0 ? void 0 : abegUser.amountRaised) + parseInt(amount),
        }, { new: true });
        return res.status(mainError_1.HTTP.OK).json({
            message: "viewing all abeg",
            data: abeg,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.giveOneBeg = giveOneBeg;
const searchCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.body;
        const abeg = yield begModel_1.default.find(category);
        return res.status(mainError_1.HTTP.OK).json({
            message: "success",
            data: abeg,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error while searching",
            data: error.message,
        });
    }
});
exports.searchCategory = searchCategory;
const likeBeg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, begID } = req.params;
        const abeg = yield begModel_1.default.findById(begID);
        const user = yield authModel_1.default.findById(userID);
        console.log(begID);
        if (abeg && user) {
            const liked = yield begModel_1.default.findByIdAndUpdate(begID, {
                abeg: abeg === null || abeg === void 0 ? void 0 : abeg.like,
            }, { new: true });
            abeg === null || abeg === void 0 ? void 0 : abeg.like.push(new mongoose_1.default.Types.ObjectId(userID));
            return res.status(mainError_1.HTTP.CREATE).json({
                message: "liked successfully",
                data: liked,
                length: abeg === null || abeg === void 0 ? void 0 : abeg.like.length,
            });
        }
        else if (abeg === null || abeg === void 0 ? void 0 : abeg.like.includes(userID)) {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "you cannot like again",
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "beg not found",
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
exports.likeBeg = likeBeg;
