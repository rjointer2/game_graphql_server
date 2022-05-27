"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, 'Must match an email address!'],
        required: true,
        unique: true,
    },
    rank: {
        type: Number
    },
    winRecord: {
        type: Number
    },
    loseRecord: {
        type: Number
    }
});
const User = (0, mongoose_1.model)('Users', userSchema);
exports.default = User;
