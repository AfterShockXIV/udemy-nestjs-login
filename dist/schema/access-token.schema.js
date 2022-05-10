"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenSchema = void 0;
const mongoose_1 = require("mongoose");
exports.accessTokenSchema = new mongoose_1.Schema({
    memberID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Member'
    },
    accessToken: String,
    exprise: Date,
    created: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=access-token.schema.js.map