import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input.dto';
import { User } from './entites/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입 API
  @Post('/user/create')
  async createUser(@Body() createUserInput: CreateUserInput): Promise<User> {
    console.log('가입요청');
    return await this.userService.createUser(createUserInput);
  }

  // 회원조회 api
  @UseGuards(AuthGuard('access'))
  // UseGuards- >로그인을 한 유저면 api 실행
  @Post('/user/userguard')
  fetchUser(@Req() req): string {
    console.log(req.user);
    return req.user;
  }
}
