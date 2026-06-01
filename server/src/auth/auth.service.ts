import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto, LoginDto, UpdateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(AuthEntity) private authRepo: Repository<AuthEntity>) { }
  async register(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    const existingUser = await this.authRepo.findOneBy({ email });

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    if (password.length < 6) {
      throw new BadRequestException(
        "Password must be at least 6 characters",
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = this.authRepo.create({
      ...createAuthDto,
      password: hashedPassword
    });

    await this.authRepo.save(user);

    return user;
  }

  async login(loginDto: LoginDto) { }
}
