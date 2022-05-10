"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const member_service_1 = require("./services/member.service");
const member_controller_1 = require("./controllers/member.controller");
const access_token_schema_1 = require("./schema/access-token.schema");
const db_authen_service_1 = require("./services/db-authen.service");
const account_controller_1 = require("./controllers/account.controller");
const member_schema_1 = require("./schema/member.schema");
const app_controller_1 = require("./controllers/app.controller");
const common_1 = require("@nestjs/common");
const app_service_1 = require("./services/app.service");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_authen_service_1 = require("./services/jwt-authen.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost/member_db'),
            mongoose_1.MongooseModule.forFeature([
                { name: 'Member', schema: member_schema_1.memberSchema },
                { name: 'AccessToken', schema: access_token_schema_1.accessTokenSchema }
            ])
        ],
        controllers: [
            app_controller_1.AppController,
            account_controller_1.AccountController,
            member_controller_1.MemberController
        ],
        providers: [
            app_service_1.AppService,
            db_authen_service_1.DBAuthenService,
            db_authen_service_1.DBAuthenStrategy,
            jwt_authen_service_1.JwtAuthenService,
            jwt_authen_service_1.JwtAuthenStrategy,
            member_service_1.MemberService
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map