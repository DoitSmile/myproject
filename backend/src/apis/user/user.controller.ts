import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entites/user.entity';
import { UpdateUserInput } from './dto/update-user.input.dto';
import { UpdatePasswordInput } from './dto/update-userpassword.input.dto';
import { CreateUserInput } from './dto/create-user.input.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입 API
  @Post('/user/create')
  async createUser(@Body() createUserInput: CreateUserInput): Promise<User> {
    console.log('가입요청');
    return await this.userService.createUser({ createUserInput });
  }

  // 회원조회 api
  @UseGuards(AuthGuard('access')) // UseGuards- > 로그인을 한 유저면 api 실행
  @Post('/user/fetch')
  async fetchUser(@Req() req) {
    const id = req.user.id;
    return await this.userService.fetchUser(id);
  }

  // 회원수정 api
  @UseGuards(AuthGuard('access'))
  // UseGuards- >로그인을 한 유저면 api 실행
  @Post('/user/update') // req 빼고 return 회원 정보로 바꾸기
  async updateUser(@Body() updateUserInput: UpdateUserInput, @Req() req) {
    const id = req.user.id;
    return await this.userService.updateUser(updateUserInput, id);
  }

  // 비밀번호 변경 api
  @UseGuards(AuthGuard('access'))
  // UseGuards- >로그인을 한 유저면 api 실행
  @Post('/user/password/update') // req 빼고 return 회원 정보로 바꾸기
  async updateUserPassword(
    @Body() updatePasswordInput: UpdatePasswordInput,
    @Req() req,
  ) {
    const id = req.user.id;
    return await this.userService.updateUserPassword(
      { updatePasswordInput },
      id,
    );
  }

  //회원탈퇴api
  // 회원 삭제 (비밀번호 받아오기 추가하기)
  @UseGuards(AuthGuard('access'))
  @Post('/user/delete')
  async delUser(@Body() password, @Req() req) {
    const id = req.user.id;
    const myPassword = password.password;
    console.log('myPassword:', myPassword);
    return await this.userService.delUser(myPassword, id);
  }
}
