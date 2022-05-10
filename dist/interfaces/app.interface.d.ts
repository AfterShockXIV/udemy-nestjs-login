export interface IAccount {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    id?: any;
    position?: string;
    image?: string;
    role?: RoleAccount;
    created?: Date;
    updated?: Date;
}
export interface IRegister {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    cpassword: string;
}
export interface ILogin {
    email: string;
    password: string;
    remember: boolean;
}
export interface IProfile {
    firstname: string;
    lastname: string;
    position: string;
    image: string;
}
export interface IChangePassword {
    old_pass: string;
    new_pass: string;
    cnew_pass: string;
}
export interface ISearch {
    searchType?: string;
    searchText?: string;
    startPage: number;
    limitPage: number;
}
export interface IMember {
    items: IAccount[];
    totalItems: number;
}
export declare enum RoleAccount {
    Member = 1,
    Employee = 2,
    Admin = 3
}
