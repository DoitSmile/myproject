import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginInput } from './dto/auth-login.Input';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 로그인 api
  @Post('/user/login')
  login(@Body() authLoginInput: AuthLoginInput): Promise<string> {
    return this.authService.login(authLoginInput);
  }

  // 핸드폰 인증번호 발송 api
  @Post('/user/checkPhone')
  checkValidPhone(@Body('qqq') qqq: string): Promise<any> {
    const myphone = qqq;
    console.log(myphone);
    return this.authService.checkValidPhone(myphone);
  }
}
