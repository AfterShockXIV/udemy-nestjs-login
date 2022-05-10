import { IsNotEmpty } from 'class-validator';
import { IProfile } from './../interfaces/app.interface';
export class ProfileModel implements IProfile {
    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;
    
    @IsNotEmpty()
    position: string;

    image: string;

}