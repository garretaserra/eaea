'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
let user = mongoose.Schema({
    email: String,
    name: String,
    password: String,
    profilePhoto: String,
    follows: [],
    following: [],
    events: []
});
module.exports = mongoose.model('User', user);
