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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBAuthenStrategy = exports.DBAuthenService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const password_hash_1 = require("password-hash");
const mongoose_2 = require("mongoose");
const passport_1 = require("@nestjs/passport");
const passport_http_bearer_1 = require("passport-http-bearer");
let DBAuthenService = class DBAuthenService {
    constructor(AccessTokenCollection) {
        this.AccessTokenCollection = AccessTokenCollection;
    }
    async generateAccessToken(member) {
        const model = {
            memberID: member._id,
            accessToken: (0, password_hash_1.generate)(Math.random().toString()),
            exprise: new Date().setMinutes(new Date().getMinutes() + 30)
        };
        const token = await this.AccessTokenCollection.create(model);
        return token.accessToken;
    }
    async validateUser(accessToken) {
        try {
            const tokenItem = await this.AccessTokenCollection.findOne({ accessToken }).populate('memberID');
            if (tokenItem.exprise > new Date()) {
                return tokenItem.memberID;
            }
        }
        catch (ex) { }
        return null;
    }
};
DBAuthenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('AccessToken')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DBAuthenService);
exports.DBAuthenService = DBAuthenService;
let DBAuthenStrategy = class DBAuthenStrategy extends (0, passport_1.PassportStrategy)(passport_http_bearer_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    async validate(token, done) {
        const user = await this.authService.validateUser(token);
        if (!user) {
            return done(new common_1.UnauthorizedException('Unauthrized Pless Login !'), false);
        }
        done(null, user);
    }
};
DBAuthenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [DBAuthenService])
], DBAuthenStrategy);
exports.DBAuthenStrategy = DBAuthenStrategy;
//# sourceMappingURL=db-authen.service.js.map