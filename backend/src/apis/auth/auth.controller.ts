import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginInput } from './dto/auth-login.Input';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 로그인 api
  @Post('/user/login')
  async login(
    @Body() authLoginInput: AuthLoginInput,
    @Res() res,
  ): Promise<string> {
    const token = await this.authService.login(authLoginInput, res);
    return res.send(token);
  }

  // 핸드폰 인증번호 발송 api
  @Post('/user/sendPhone')
  async sendPhone(@Body('qqq') qqq: string, @Res() res): Promise<void> {
    const myphone = qqq;
    const result = await this.authService.sendPhone(myphone);
    res.send(result);
  }

  // 핸드폰 인증번호 확인 로직 api
  @Post('/user/checkPhone')
  async checkValidPhone(@Body('qqq') qqq: string, @Res() res): Promise<void> {
    const in_num = qqq;
    const result = await this.authService.checkValidPhone(in_num);
    res.send(result);
  }

  // 토큰 재발급 api
  @UseGuards(AuthGuard('refresh'))
  @Post('/user/reissueToken')
  reissueAccessToken(@Req() req) {
    console.log('req.user:', req.user);
    return this.authService.reissueAccessToken({ user: req.user });
  }
}
