import { IProfile, IChangePassword, IMember, ISearch } from './../interfaces/app.interface';
import { IMemberDocument } from 'src/interfaces/member.interface';
import { Model } from 'mongoose';
export declare class MemberService {
    private MemberCollection;
    constructor(MemberCollection: Model<IMemberDocument>);
    getMemberItem(serchOption: ISearch): Promise<IMember>;
    onChangePassword(memberID: any, body: IChangePassword): Promise<import("mongodb").UpdateResult>;
    onUpdateProfile(memberID: any, body: IProfile): Promise<IMemberDocument & {
        _id: any;
    }>;
    private convertUploadImage;
}
