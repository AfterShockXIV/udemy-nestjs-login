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
exports.AppService = void 0;
const jwt_authen_service_1 = require("./jwt-authen.service");
const app_interface_1 = require("./../interfaces/app.interface");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const password_hash_1 = require("password-hash");
let AppService = class AppService {
    constructor(authenService, MemberCollertion) {
        this.authenService = authenService;
        this.MemberCollertion = MemberCollertion;
    }
    async onRegister(body) {
        const count = await this.MemberCollertion.count({ email: body.email });
        if (count > 0)
            throw new common_1.BadRequestException('มี Email นี้ในระบบแล้ว');
        delete body.cpassword;
        const model = body;
        model.password = (0, password_hash_1.generate)(model.password);
        model.image = '';
        model.position = '';
        model.role = app_interface_1.RoleAccount.Member;
        const modelIIem = await this.MemberCollertion.create(model);
        modelIIem.password = '';
        return modelIIem;
    }
    async onLogin(body) {
        const member = await this.MemberCollertion.findOne({ email: body.email });
        if (!member)
            throw new common_1.BadRequestException('ไม่มีผู้ใช้งานในระบบ');
        if ((0, password_hash_1.verify)(body.password, member.password)) {
            return { accessToken: await this.authenService.generateAccessToken(member) };
        }
        else {
            throw new common_1.BadRequestException('email หรือ รหัสผ่านไม่ถูกต้อง');
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('Member')),
    __metadata("design:paramtypes", [jwt_authen_service_1.JwtAuthenService,
        mongoose_2.Model])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map