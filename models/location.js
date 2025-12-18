"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var LocationSchema = new mongoose_1.Schema({
    province: { type: String, required: true },
    district: { type: String, required: true },
    municipality: { type: String, required: true },
    wardNumber: { type: Number, required: true },
    pollingCenter: { type: String, required: true },
    hoRConstituency: { type: Number }, // प्रतिनिधि सभा निर्वाचन क्षेत्र
    provincialConstituency: { type: Number }, // प्रदेश सभा निर्वाचन क्षेत्र
}, { timestamps: true });
exports.default = mongoose_1.models.Location || (0, mongoose_1.model)("Location", LocationSchema);
