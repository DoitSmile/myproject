import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input.dto';
import { Repository } from 'typeorm';
import { User } from './entites/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}
  //회원 조회 API
  @Get('/:userId')
  fetchUser(@Param('userId') userId: string) {
    return this.userService.fetchUser({ userId });
  }

  // 회원가입 API
  @Post('/user/create')
  async createUser(@Body() createUserInput: CreateUserInput): Promise<User> {
    console.log('가입요청');
    return await this.userService.createUser(createUserInput);
  }
}
