import { JwtAuthenService } from './jwt-authen.service';
import { IRegister, ILogin } from './../interfaces/app.interface';
import { IMemberDocument } from './../interfaces/member.interface';
import { Model } from 'mongoose';
export declare class AppService {
    private authenService;
    private MemberCollertion;
    constructor(authenService: JwtAuthenService, MemberCollertion: Model<IMemberDocument>);
    onRegister(body: IRegister): Promise<IMemberDocument & {
        _id: any;
    }>;
    onLogin(body: ILogin): Promise<{
        accessToken: string;
    }>;
}
