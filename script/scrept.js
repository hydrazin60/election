"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var fs = require("fs");
var path = require("path");
var VoterSchema_1 = require("../models/VoterSchema");
var location_1 = require("../models/location");
// Paths to JSON files
var locationPath = path.join(__dirname, "../data/location.json");
var voterPath = path.join(__dirname, "../data/voter.json");
// MongoDB connection string
var MONGO_URI = "mongodb+srv://sureshkhdk45_db_user:ePoTjpqOsDqvNMjV@election.gvh3rav.mongodb.net/election?retryWrites=true&w=majority";
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var locationData, voterData, insertedLocations, firstLocationId_1, votersWithLocation, insertedVoters, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, mongoose_1.default.connect(MONGO_URI)];
                case 1:
                    _a.sent();
                    console.log("✅ Connected to MongoDB");
                    locationData = JSON.parse(fs.readFileSync(locationPath, "utf-8"));
                    voterData = JSON.parse(fs.readFileSync(voterPath, "utf-8"));
                    return [4 /*yield*/, location_1.default.insertMany(locationData)];
                case 2:
                    insertedLocations = _a.sent();
                    console.log("\u2705 Inserted ".concat(insertedLocations.length, " locations"));
                    firstLocationId_1 = insertedLocations[0]._id;
                    votersWithLocation = voterData.map(function (voter) { return (__assign(__assign({}, voter), { location: firstLocationId_1 })); });
                    return [4 /*yield*/, VoterSchema_1.default.insertMany(votersWithLocation)];
                case 3:
                    insertedVoters = _a.sent();
                    console.log("\u2705 Inserted ".concat(insertedVoters.length, " voters"));
                    console.log("✅ Seeding completed!");
                    process.exit(0);
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.error("❌ Error seeding data:", err_1);
                    process.exit(1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
seed();
