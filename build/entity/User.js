"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.User = void 0;
var argon2_1 = __importDefault(require("argon2"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
    }
    /* Functions */
    User.prototype.hashPassword = function (password) {
        if (password === void 0) { password = ""; }
        return argon2_1.default.hash(password);
    };
    User.prototype.verifyPassword = function (hashedPassword, suppliedPassword) {
        return argon2_1.default.verify(hashedPassword, suppliedPassword);
    };
    User.prototype.generateToken = function () {
        var token = jsonwebtoken_1.default.sign({
            userId: this.id,
            username: this.username,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            displayPicId: this.displayPicId,
            joinDate: this.createdAt,
            lastStoryCompleted: this.lastStoryCompleted,
        }, process.env.TOKEN_SECRET);
        return token;
    };
    User.prototype.savePassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.password) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.hashPassword(this.password)];
                    case 1:
                        hashedPassword = _a.sent();
                        this.password = hashedPassword;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.updateLastStoryCompleted = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.lastStoryCompleted = 0;
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        (0, typeorm_1.ObjectIdColumn)(),
        __metadata("design:type", typeorm_1.ObjectID)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text", nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "password_reset_token", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], User.prototype, "displayPicId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], User.prototype, "lastStoryCompleted", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "stripeCustomerId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "lastActiveSubscriptionId", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], User.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], User.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], User.prototype, "savePassword", null);
    __decorate([
        (0, typeorm_1.BeforeInsert)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], User.prototype, "updateLastStoryCompleted", null);
    User = __decorate([
        (0, typeorm_1.Entity)("users")
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map