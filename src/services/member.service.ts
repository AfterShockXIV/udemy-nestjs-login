import { generate } from 'password-hash';
import { verify } from 'password-hash';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { BASE_DIR } from 'src/main';
import { IAccount, IProfile, IChangePassword, IMember, RoleAccount, ISearch } from './../interfaces/app.interface';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IMemberDocument } from 'src/interfaces/member.interface';
import { Model } from 'mongoose';

@Injectable()
export class MemberService {
    constructor(@InjectModel('Member') private MemberCollection: Model<IMemberDocument>) {
        //     const members: IAccount[] = [];
        //     for (let i = 0; i <= 100; i++) {
        //         members.push({
        //             firstname: `Firstname${i}`,
        //             lastname: `lastname${i}`,
        //             email: `email${i}`,
        //             password: generate(`password-${i}`),
        //             image: '',
        //             position: '',
        //             role: RoleAccount.Member
        //         })
        //     }
        //   this.MemberCollection.create(members,(err) => console.log(err))
    }

    //แสดงข้อมูลสมาชิก 
    async getMemberItem(serchOption: ISearch) {
        //ค้นหาและแบ่งหน้า Page 
        const items = await this.MemberCollection
            .find({}, { image: false })
            .sort({ updated: - 1})
            .skip((serchOption.startPage - 1) * serchOption.limitPage)
            .limit(serchOption.limitPage)

        //หน้ารวมของ page ทั้งหมด
        const totalItems = await this.MemberCollection.count({});

        return <IMember>{
            items,
            totalItems,
        }
    }

    //เปลี่ยนรหัสผ่าน
    async onChangePassword(memberID: any, body: IChangePassword) {
        const memberItem = await this.MemberCollection.findById(memberID);
        if (!verify(body.old_pass, memberItem.password)) throw new BadRequestException('รหัสผ่านเดินไม่ถูกต้อง')
        const updated = await this.MemberCollection.updateOne({ _id: memberID }, <IAccount>{
            password: generate(body.new_pass),
            updated: new Date()
        })

        return updated
    }

    //แก้ไขข้อมูล Profile  
    async onUpdateProfile(memberID: any, body: IProfile) {

        const updated = await this.MemberCollection.updateOne({ _id: memberID }, <IAccount>{
            firstname: body.firstname,
            lastname: body.lastname,
            position: body.position,
            image: body.image,
            // image: this.convertUploadImage(memberID, body.image), เข้าในโปรแกรม
            updated: new Date()

        })
        if (!updated.matchedCount) throw new BadRequestException('ข้อมูลไม่มีการเปลี่ยนแปลง')
        const memberItem = await this.MemberCollection.findById(memberID);
        // memberItem.image = memberItem.image ? 'http://localhost:3000' + memberItem.image + '?ver' + Math.random() : ''
        memberItem.password = ""
        return memberItem;
    }

    //แปลงรุป 64 เป็น ไฟล์
    private convertUploadImage(memberID: any, image: string) {
        try {
            const uploadDir = BASE_DIR + '/uploads'
            //สร้างโฟล์เดอร์
            if (!existsSync(uploadDir)) mkdirSync(uploadDir)
            //ตรวจสอบว่าเป็นชนิด jpg
            if (image.indexOf('image/jpeg') >= 0) {
                const fileName = `${uploadDir}/${memberID}.jpg`
                writeFileSync(fileName, Buffer.from(image.replace('data:image/jpeg;base64', ''), 'base64'))
                return fileName.replace(BASE_DIR, '');

            }
            return '';
        } catch (ex) {
            throw new BadRequestException(ex.message)
        }


    }
}