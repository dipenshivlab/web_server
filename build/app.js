"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = exports.app = void 0;
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var body_parser_1 = require("body-parser");
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var status_codes_1 = require("./types/status-codes");
var user_1 = require("./routes/user");
var performance_1 = require("./routes/performance");
var marathon_1 = require("./routes/marathon");
var payments_1 = require("./routes/payments");
var stripe_1 = __importDefault(require("stripe"));
/* App Setup */
var app = (0, express_1.default)();
exports.app = app;
app.set("trust proxy", true);
app.use((0, body_parser_1.json)());
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
/* Stripe Setup */
var stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});
exports.stripe = stripe;
/* Routes */
app.use("/api/users", user_1.userRoutes);
app.use("/api/performance", performance_1.performanceRoutes);
app.use("/api/marathon", marathon_1.marathonRoutes);
app.use("/api/payments", payments_1.paymentRoutes);
/* Catch-Alls */
app.get("/api", function (req, res) {
    return res.send("Welcome to a Afrofit API.");
});
app.all("/*", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res
                .status(status_codes_1.STATUS_CODES.BAD_REQUEST)
                .send("Sorry. Nothing lives here.")];
    });
}); });
//# sourceMappingURL=app.js.map