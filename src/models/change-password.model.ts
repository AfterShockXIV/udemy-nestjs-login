import { IsNotEmpty, Matches } from 'class-validator';
import { IsComparePassword } from 'src/pipes/validation.pipe';
import { IChangePassword } from './../interfaces/app.interface';
export class changePasswordModel implements IChangePassword {
    @IsNotEmpty()
    @Matches(/^[A-z0-9]{6,15}$/)
    old_pass: string;

    @IsNotEmpty()
    @Matches(/^[A-z0-9]{6,15}$/)
    new_pass: string;

    @IsNotEmpty()
    @IsComparePassword('new_pass')
    cnew_pass: string;

}