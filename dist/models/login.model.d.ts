import { ILogin } from './../interfaces/app.interface';
export declare class LoginModel implements ILogin {
    email: string;
    password: string;
    remember: boolean;
}
