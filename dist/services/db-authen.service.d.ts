import { IAuthen } from './../interfaces/authen.interface';
import { IMemberDocument } from './../interfaces/member.interface';
import { IAccessTokenDocument } from './../interfaces/access-token.interface';
import { Model } from 'mongoose';
import { Strategy } from 'passport-http-bearer';
export declare class DBAuthenService implements IAuthen {
    private AccessTokenCollection;
    constructor(AccessTokenCollection: Model<IAccessTokenDocument>);
    generateAccessToken(member: IMemberDocument): Promise<string>;
    validateUser(accessToken: any): Promise<IMemberDocument>;
}
declare const DBAuthenStrategy_base: new (...args: any[]) => Strategy<import("passport-http-bearer").VerifyFunctions>;
export declare class DBAuthenStrategy extends DBAuthenStrategy_base {
    private readonly authService;
    constructor(authService: DBAuthenService);
    validate(token: any, done: Function): Promise<any>;
}
export {};
