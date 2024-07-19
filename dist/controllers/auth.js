"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const verifyToken_1 = require("../utils/verifyToken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const register = async (req, res) => {
    const payload = req.body;
    try {
        payload.password = bcrypt_1.default.hashSync(payload.password, 8);
        const user = await prisma.user.create({
            data: payload,
        });
        res.json(user);
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user)
            throw 'User Not Found';
        const checkPassword = bcrypt_1.default.compareSync(password, user.password);
        if (!checkPassword)
            throw 'Email address or password not valid';
        const token = (0, verifyToken_1.generateToken)(req.body);
        res.json({ ...user, token });
    }
    catch (error) {
        console.error('Error loggin in: ', error);
        res.status(500).json({ error: 'Failed to Login' });
    }
};
exports.login = login;
