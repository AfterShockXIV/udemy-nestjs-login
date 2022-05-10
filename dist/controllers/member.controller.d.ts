import { SearchModel } from './../models/serch.model';
import { changePasswordModel } from './../models/change-password.model';
import { MemberService } from './../services/member.service';
import { ProfileModel } from './../models/profile.model';
import { IMemberDocument } from './../interfaces/member.interface';
import { Request } from "express";
export declare class MemberController {
    private service;
    constructor(service: MemberService);
    getUserLogin(req: Request): IMemberDocument;
    updateProfile(req: Request, body: ProfileModel): Promise<IMemberDocument & {
        _id: any;
    }>;
    changPassword(req: Request, body: changePasswordModel): Promise<import("mongodb").UpdateResult>;
    showMember(query: SearchModel): Promise<import("../interfaces/app.interface").IMember>;
}
