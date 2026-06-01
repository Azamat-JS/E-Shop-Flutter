import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto, LoginDto, UpdateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(AuthEntity) private authRepo: Repository<AuthEntity>,
    private readonly jwtService: JwtService
  ) { }
  async register(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    const existingUser = await this.authRepo.findOneBy({ email });

    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = this.authRepo.create({
      ...createAuthDto,
      password: hashedPassword
    });

    await this.authRepo.save(user);

    return user;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const foundUser = await this.authRepo.findOneBy({ email });

    if (!foundUser) {
      throw new BadRequestException("User with this email does not exist")
    }

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      throw new BadRequestException("Invalid credentials")
    }

    const payload = {
      userId: foundUser.id,
      email: foundUser.email
    }

    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
