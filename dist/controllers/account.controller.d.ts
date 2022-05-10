import { LoginModel } from './../models/login.model';
import { RegisterModel } from '../models/register.model';
import { AppService } from '../services/app.service';
export declare class AccountController {
    private service;
    constructor(service: AppService);
    register(body: RegisterModel): Promise<import("../interfaces/member.interface").IMemberDocument & {
        _id: any;
    }>;
    login(body: LoginModel): Promise<{
        accessToken: string;
    }>;
}
