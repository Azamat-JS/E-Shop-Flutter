import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;

    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    @IsString()
    address?: string;
}

export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;
}

export class UpdateAuthDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    @IsString()
    address?: string;
}
