"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = String(process.env.SECRET);
// middlewares
const generateToken = (userPayload) => {
    return jsonwebtoken_1.default.sign(userPayload, SECRET, { expiresIn: '2w' });
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        jsonwebtoken_1.default.verify(token, SECRET);
        next();
    }
    catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};
exports.verifyToken = verifyToken;
