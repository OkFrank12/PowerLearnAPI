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
exports.checkOut = void 0;
const https_1 = __importDefault(require("https"));
const mainError_1 = require("../errors/mainError");
const mongoose_1 = __importDefault(require("mongoose"));
const checkOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, amount } = req.body;
        const { begID } = req.params;
        const beg = JSON.stringify({
            email,
            amount: parseInt(amount),
            begID,
        });
        const options = {
            hostname: "api.paystack.co",
            port: 443,
            path: "/transaction/initialize",
            method: "POST",
            headers: {
                Authorization: "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
                "Content-Type": "application/json",
            },
        };
        const ask = https_1.default
            .request(options, (resp) => {
            let data = "";
            resp.on("data", (chunk) => {
                data + chunk;
            });
            resp.on("end", () => {
                console.log(JSON.parse(data));
                res.status(mainError_1.HTTP.OK).json({
                    message: "Payment made",
                    data: JSON.parse(data),
                });
            });
        })
            .on("error", (error) => {
            console.log(error);
        });
        ask.write(beg);
        ask.end;
        beg === null || beg === void 0 ? void 0 : beg.checkout.push(new mongoose_1.default.Types.ObjectId(beg._id));
        beg === null || beg === void 0 ? void 0 : beg.save();
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error making Payment",
            data: error.message,
        });
    }
});
exports.checkOut = checkOut;
