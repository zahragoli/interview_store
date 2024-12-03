import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from '../use-case/user/user.service';
import { User } from '../core/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: { name: string; email: string }): Promise<User> {
    return this.userService.create(body.name);
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
