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
exports.MemberController = void 0;
const serch_model_1 = require("./../models/serch.model");
const change_password_model_1 = require("./../models/change-password.model");
const member_service_1 = require("./../services/member.service");
const validation_pipe_1 = require("./../pipes/validation.pipe");
const profile_model_1 = require("./../models/profile.model");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let MemberController = class MemberController {
    constructor(service) {
        this.service = service;
    }
    getUserLogin(req) {
        const userLogin = req.user;
        userLogin.password = '';
        return userLogin;
    }
    ;
    updateProfile(req, body) {
        const user = req.user;
        return this.service.onUpdateProfile(user.id, body);
    }
    ;
    changPassword(req, body) {
        const user = req.user;
        return this.service.onChangePassword(user.id, body);
    }
    showMember(query) {
        query.startPage = parseInt(query.startPage);
        query.limitPage = parseInt(query.limitPage);
        return this.service.getMemberItem(query);
    }
};
__decorate([
    (0, common_1.Get)('data'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "getUserLogin", null);
__decorate([
    (0, common_1.Post)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_model_1.ProfileModel]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_model_1.changePasswordModel]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "changPassword", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [serch_model_1.SearchModel]),
    __metadata("design:returntype", void 0)
], MemberController.prototype, "showMember", null);
MemberController = __decorate([
    (0, common_1.Controller)('api/member'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], MemberController);
exports.MemberController = MemberController;
//# sourceMappingURL=member.controller.js.map