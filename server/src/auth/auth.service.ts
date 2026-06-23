import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ImageKitService } from 'src/utils/imagekit.service';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity) private authRepo: Repository<AuthEntity>,
    @InjectRepository(CartEntity) private cartRepo: Repository<CartEntity>,
    private readonly jwtService: JwtService,
    private readonly imageKitService: ImageKitService,
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
      email: foundUser.email,
      type: foundUser.type
    }

    const accessToken = this.jwtService.sign(payload);
    const cartItems = await this.cartRepo.find({
      where: { user: { id: foundUser.id } },
      relations: { product: true },
    });
    const cart = cartItems.map(item => ({ product: item.product, quantity: item.quantity }));
    return { token: accessToken, ...foundUser, cart };
  }

  async tokenIsValid(token: string) {
    const payload = this.jwtService.verify(token);
    if (!payload) {
      return false;
    }
    const user = await this.authRepo.findOneBy({ id: payload.userId });
    if (!user) {
      return false;
    }
    return true;
  }

  async getUserData(token: string) {
    const payload = this.jwtService.verify(token);
    if (!payload) {
      throw new UnauthorizedException("Token is not valid");
    }
    const user = await this.authRepo.findOneBy({ id: payload.userId });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const cartItems = await this.cartRepo.find({
      where: { user: { id: user.id } },
      relations: { product: true },
    });
    const cart = cartItems.map(item => ({ product: item.product, quantity: item.quantity }));
    return { ...user, cart };
  }

  async getAuthParams() {
    try {
      return this.imageKitService.getAuthenticationParameters();
    } catch (err: any) {
      throw new InternalServerErrorException({
        message: err.message || 'Failed to generate auth params',
      });
    }
  }
}
