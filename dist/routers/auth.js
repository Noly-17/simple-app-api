"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
// Sign up user.
router.post('/register', auth_1.register);
// Login user.
router.post('/login', auth_1.login);
exports.default = router;
