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
var JwtAuthenService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthenStrategy = exports.JwtAuthenService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_2 = require("mongoose");
let JwtAuthenService = JwtAuthenService_1 = class JwtAuthenService {
    constructor(MemberCollertion) {
        this.MemberCollertion = MemberCollertion;
    }
    async generateAccessToken(member) {
        const payload = { email: member.email };
        return (0, jsonwebtoken_1.sign)(payload, JwtAuthenService_1.secretKey, { expiresIn: 60 * 60 });
    }
    async validateUser({ email }) {
        try {
            return this.MemberCollertion.findOne({ email });
        }
        catch (ex) { }
        return null;
    }
};
JwtAuthenService.secretKey = 'NodeJs Member Workshop';
JwtAuthenService = JwtAuthenService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Member')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], JwtAuthenService);
exports.JwtAuthenService = JwtAuthenService;
let JwtAuthenStrategy = class JwtAuthenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JwtAuthenService.secretKey,
        });
        this.authService = authService;
    }
    async validate(payload, done) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            return done(new common_1.UnauthorizedException('Unauthorized please login!'), false);
        }
        done(null, user);
    }
};
JwtAuthenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [JwtAuthenService])
], JwtAuthenStrategy);
exports.JwtAuthenStrategy = JwtAuthenStrategy;
//# sourceMappingURL=jwt-authen.service.js.map