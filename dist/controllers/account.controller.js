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
exports.AccountController = void 0;
const login_model_1 = require("./../models/login.model");
const validation_pipe_1 = require("../pipes/validation.pipe");
const common_1 = require("@nestjs/common");
const register_model_1 = require("../models/register.model");
const app_service_1 = require("../services/app.service");
let AccountController = class AccountController {
    constructor(service) {
        this.service = service;
    }
    async register(body) {
        return await this.service.onRegister(body);
    }
    async login(body) {
        return await this.service.onLogin(body);
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_model_1.RegisterModel]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_model_1.LoginModel]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "login", null);
AccountController = __decorate([
    (0, common_1.Controller)('api/account'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map