import { Strategy } from 'passport-jwt';
import { IAuthen } from './../interfaces/authen.interface';
import { IMemberDocument } from 'src/interfaces/member.interface';
import { Model } from 'mongoose';
export declare class JwtAuthenService implements IAuthen {
    private MemberCollertion;
    constructor(MemberCollertion: Model<IMemberDocument>);
    static secretKey: string;
    generateAccessToken(member: IMemberDocument): Promise<string>;
    validateUser({ email }: {
        email: any;
    }): Promise<IMemberDocument>;
}
declare const JwtAuthenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAuthenStrategy extends JwtAuthenStrategy_base {
    private readonly authService;
    constructor(authService: JwtAuthenService);
    validate(payload: {
        email: string;
    }, done: Function): Promise<any>;
}
export {};
