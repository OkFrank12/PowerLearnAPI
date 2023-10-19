"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const validate_1 = __importDefault(require("../utils/validate"));
const validation_1 = require("../utils/validation");
const router = express_1.default.Router();
router.route("/all").get(authController_1.viewAllUser);
router.route("/:userID/one").get(authController_1.viewOneUser);
router.route("/:token/verify").get(authController_1.verifyUser);
router.route("/register").post((0, validate_1.default)(validation_1.validAction), authController_1.registerUser);
router.route("/sign-in").post((0, validate_1.default)(validation_1.validActionSign), authController_1.signInUser);
router.route("/:userID/delete").delete(authController_1.deleteUser);
router
    .route("/reset-user-password")
    .patch((0, validate_1.default)(validation_1.validActionReset), authController_1.resetUserPassword);
router
    .route("/:token/change-user-password")
    .post((0, validate_1.default)(validation_1.validActionPass), authController_1.changeUserPassword);
exports.default = router;
