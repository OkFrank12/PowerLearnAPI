"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainError_1 = require("../errors/mainError");
exports.default = (Schema) => {
    return (req, res, next) => {
        const { error } = Schema.validate(req.body);
        if (error) {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "Validation Error",
                data: error.message,
            });
        }
        else {
            next();
        }
    };
};
