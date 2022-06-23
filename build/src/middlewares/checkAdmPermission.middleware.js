"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var checkAdmPermission = function (req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "missing authorization token" });
        }
        var token = req.headers.authorization;
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            req.userData = decoded;
            if (err) {
                return res.status(401).json({ error: err });
            }
        });
        if (!req.userData.isAdm) {
            return res.status(401).json({ error: "missing admin permision" });
        }
        next();
    }
    catch (err) {
        return res.status(401).json({ error: err.message });
    }
};
exports.default = checkAdmPermission;
//# sourceMappingURL=checkAdmPermission.middleware.js.map