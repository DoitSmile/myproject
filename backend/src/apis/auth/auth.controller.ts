import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 핸드폰 인증번호 발송 api
  @Post('/user/checkPhone')
  checkValidPhone(@Body('qqq') qqq: string): Promise<any> {
    const myphone = qqq;
    console.log(myphone);
    return this.authService.checkValidPhone(myphone);
  }
}
