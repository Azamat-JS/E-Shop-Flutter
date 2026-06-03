export declare class CreateAuthDto {
    name: string;
    email: string;
    password: string;
    type?: string;
    address?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class UpdateAuthDto {
    name?: string;
    email?: string;
    password?: string;
    type?: string;
    address?: string;
}
