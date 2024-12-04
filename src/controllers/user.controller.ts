import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { UserService } from '../use-case/user/user.service';
import { User } from '../core/entities/user.entity';
import { JwtAuthService } from '../frameworks/auth-service/jwt/jwt.service';
import { AppError } from '../error-handling/app.error';
import { GENERAL_CODES } from '../error-handling/consts/codes/general-codes';
import { HttpExceptionFilter } from '../error-handling/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  @Post()
  create(@Body() body: { name: string; email: string }): Promise<User> {
    return this.userService.create(body.name);
  }

  @Get('get_token/:id')
  async getToken(@Param('id') userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new AppError(
        GENERAL_CODES.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
        true,
      );
    }
    const token = this.jwtAuthService.createToken({
      userId: user.id,
      username: user.name,
    });
    return {
      token: token,
    };
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}
