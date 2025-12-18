"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var VoterSchema = new mongoose_1.Schema({
    serial_no: { type: Number, required: true },
    voter_id: { type: Number, required: true, unique: true },
    full_name: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    spouse_name: { type: String },
    parent_name: { type: String },
    location: { type: mongoose_1.Schema.Types.ObjectId, ref: "Location", required: true },
}, { timestamps: true });
exports.default = mongoose_1.models.Voter || (0, mongoose_1.model)("Voter", VoterSchema);
