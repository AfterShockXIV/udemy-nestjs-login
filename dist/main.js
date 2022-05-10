"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_DIR = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express = require("express");
exports.BASE_DIR = __dirname;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use('/uploads', express.static(exports.BASE_DIR + '/uploads'));
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map