import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(
    email: AuthDto['email'],
    password: AuthDto['password'],
  ) {
    /** find user by email
     * if user not found, throw error
     */
    const user =
      await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    if (!user) {
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    }

    /** if password incorrect, throw error
     * if password correct, return user
     */
    const pwMatches = await argon.verify(
      user.hash,
      password,
    );
    if (!pwMatches) {
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    }

    /** return access token */
    return this.signToken(user.id, user.email);
  }

  async signup(dto: AuthDto) {
    // hash
    const hash = await argon.hash(dto.password);

    // write in db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          nickName: dto.nickName,
          hash,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      return user;
    } catch (error) {
      // if error is a prisma error, check if it is a unique constraint violation
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }

  signToken(
    userId: number,
    email: string,
  ): Promise<string> {
    /**
     * do not need async because
     * we only return promise
     * and not await anything
     */
    const payload = {
      // sub is convention for userId
      sub: userId,
      email,
    };

    /** get secret from environment variables */
    const secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
  }
}
