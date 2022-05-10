"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberSchema = void 0;
const mongoose_1 = require("mongoose");
exports.memberSchema = new mongoose_1.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    position: String,
    image: String,
    role: Number,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
}, { toJSON: { virtuals: true } });
//# sourceMappingURL=member.schema.js.map