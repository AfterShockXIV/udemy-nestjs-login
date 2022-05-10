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
exports.MemberService = void 0;
const password_hash_1 = require("password-hash");
const password_hash_2 = require("password-hash");
const fs_1 = require("fs");
const main_1 = require("../main");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MemberService = class MemberService {
    constructor(MemberCollection) {
        this.MemberCollection = MemberCollection;
    }
    async getMemberItem(serchOption) {
        const items = await this.MemberCollection
            .find({}, { image: false })
            .sort({ updated: -1 })
            .skip((serchOption.startPage - 1) * serchOption.limitPage)
            .limit(serchOption.limitPage);
        const totalItems = await this.MemberCollection.count({});
        return {
            items,
            totalItems,
        };
    }
    async onChangePassword(memberID, body) {
        const memberItem = await this.MemberCollection.findById(memberID);
        if (!(0, password_hash_2.verify)(body.old_pass, memberItem.password))
            throw new common_1.BadRequestException('รหัสผ่านเดินไม่ถูกต้อง');
        const updated = await this.MemberCollection.updateOne({ _id: memberID }, {
            password: (0, password_hash_1.generate)(body.new_pass),
            updated: new Date()
        });
        return updated;
    }
    async onUpdateProfile(memberID, body) {
        const updated = await this.MemberCollection.updateOne({ _id: memberID }, {
            firstname: body.firstname,
            lastname: body.lastname,
            position: body.position,
            image: body.image,
            updated: new Date()
        });
        if (!updated.matchedCount)
            throw new common_1.BadRequestException('ข้อมูลไม่มีการเปลี่ยนแปลง');
        const memberItem = await this.MemberCollection.findById(memberID);
        memberItem.password = "";
        return memberItem;
    }
    convertUploadImage(memberID, image) {
        try {
            const uploadDir = main_1.BASE_DIR + '/uploads';
            if (!(0, fs_1.existsSync)(uploadDir))
                (0, fs_1.mkdirSync)(uploadDir);
            if (image.indexOf('image/jpeg') >= 0) {
                const fileName = `${uploadDir}/${memberID}.jpg`;
                (0, fs_1.writeFileSync)(fileName, Buffer.from(image.replace('data:image/jpeg;base64', ''), 'base64'));
                return fileName.replace(main_1.BASE_DIR, '');
            }
            return '';
        }
        catch (ex) {
            throw new common_1.BadRequestException(ex.message);
        }
    }
};
MemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Member')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MemberService);
exports.MemberService = MemberService;
//# sourceMappingURL=member.service.js.map