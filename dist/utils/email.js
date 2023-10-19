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
exports.resetMail = exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const G_ID = "403139932252-k0ksvgd56ohc39lsckt5bt3oquahgnvb.apps.googleusercontent.com";
const G_SECRET = "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";
const G_REFRESH = "1//04bsN5npSCiQqCgYIARAAGAQSNwF-L9Irifs6Ypy-8tdvnhCU0OPHZDjC8st6x82OOKEzVryQnYpRCh6rzl-4DLsGrrkA7var9dI";
const G_URL = "https://developers.google.com/oauthplayground";
const oAuth = new googleapis_1.google.auth.OAuth2(G_ID, G_SECRET, G_URL);
oAuth.setCredentials({ access_token: G_REFRESH });
const URL = `http://localhost:5173`;
const sendMail = (user, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "cfoonyemmemme@gmail.com",
                clientId: G_ID,
                clientSecret: G_SECRET,
                refreshToken: G_REFRESH,
                accessToken,
            },
        });
        const passedData = {
            email: user.email,
            url: `${URL}/${token}/verify`,
        };
        const locateFile = path_1.default.join(__dirname, "../views/verifyNote.ejs");
        const readData = yield ejs_1.default.renderFile(locateFile, passedData);
        const mailer = {
            from: "verifier <cfoonyemmemme@gmail.com>",
            to: user.email,
            subject: "verify-mail",
            html: readData,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendMail = sendMail;
const resetMail = (user, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "cfoonyemmemme@gmail.com",
                clientId: G_ID,
                clientSecret: G_SECRET,
                refreshToken: G_REFRESH,
                accessToken,
            },
        });
        const passedData = {
            email: user.email,
            url: `${URL}/${token}/reset-user-password`,
        };
        const locateFile = path_1.default.join(__dirname, "../views/resetNote.ejs");
        const readData = yield ejs_1.default.renderFile(locateFile, passedData);
        const mailer = {
            from: "verifier <cfoonyemmemme@gmail.com>",
            to: user.email,
            subject: "verify-mail",
            html: readData,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.resetMail = resetMail;
