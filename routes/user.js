"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let router = express.Router();
let userScripts = require('./../controllers/userScritps');
router.post('/register', userScripts.register);
router.post('/login', userScripts.login);
module.exports = router;
