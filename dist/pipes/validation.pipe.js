"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsComparePassword = exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let ValidationPipe = class ValidationPipe {
    async transform(value, { metatype }) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToClass)(metatype, value);
        const errors = await (0, class_validator_1.validate)(object);
        if (errors.length > 0) {
            const constraints = errors.map(m => m.constraints);
            if (constraints.length > 0) {
                const constraint = constraints[0];
                const message = Object.keys(constraint).map(key => constraint[key]);
                if (message.length > 0) {
                    throw new common_1.BadRequestException(message[message.length - 1]);
                }
            }
            throw new common_1.BadRequestException('Validation faild');
        }
        return value;
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
ValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;
function IsComparePassword(property, validationOptions) {
    return function (object, propertyName) {
        if (validationOptions == undefined) {
            validationOptions = {};
            validationOptions.message = 'password and confirm password do not match';
        }
        (0, class_validator_1.registerDecorator)({
            name: 'isLongerThan',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return args.object[property] === value;
                },
            },
        });
    };
}
exports.IsComparePassword = IsComparePassword;
//# sourceMappingURL=validation.pipe.js.map