"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const begController_1 = require("../controller/begController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("image");
const router = (0, express_1.Router)();
router.route("/:userID/create-beg").post(upload, begController_1.createBeg);
router.route("/view-beg").get(begController_1.viewBeg);
router.route("/:abgeID/give-beg").post(begController_1.giveOneBeg);
router.route("/:abegID/view-one-beg").get(begController_1.viewOneBeg);
router.route("/:abegID/delete-one-beg").delete(begController_1.deleteOneBeg);
router.route("/:abegID/update-one-beg").patch(begController_1.updateOneBeg);
router.route("/search-category").get(begController_1.searchCategory);
router.route("/:userID/:abegID/like-beg").patch(begController_1.likeBeg);
exports.default = router;
