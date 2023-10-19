"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profileController_1 = require("../controller/profileController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("avatar");
const router = (0, express_1.Router)();
router.route("/:userID/create-profile").post(upload, profileController_1.createProfile);
router.route("/find-profiles").get(profileController_1.viewAll);
router.route("/:profileID/find-profile").get(profileController_1.viewOne);
router.route("/:profileID/delete-profile").delete(profileController_1.deleteOne);
router.route("/:profileID/update-profile").patch(profileController_1.updateOne);
router.route("/:userID/:profileID/view-user-profile").get(profileController_1.getUserProfile);
exports.default = router;
