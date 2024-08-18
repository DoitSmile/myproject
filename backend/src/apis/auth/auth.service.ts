import { ConflictException, Injectable } from '@nestjs/common';
import 'dotenv/config';
import { PhoneAuthentication } from './checkphone';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authphone: PhoneAuthentication,
    private readonly userService: UserService,
    private readonly jwtService: JwtService, // jwt 관련 비지니스로직 사용가능
  ) {}

  // 로그인
  async login(authLoginInput) {
    // 이메일이 일치하는 user를 db에서 가져옴
    const { email, password } = authLoginInput;
    const user = await this.userService.findEmail({ email });
    const isAuth = await bcrypt.compare(password, user.password);

    if (isAuth && user) {
      return this.getAccessToken({ user });
    } else {
      throw new ConflictException('로그인 실패');
    }
  }

  // 토큰 발급
  getAccessToken({ user }): string {
    return this.jwtService.sign(
      { email: user.email },
      { secret: '나의비밀번호', expiresIn: '1h' },
    ); // return 타입: 발급받은 토큰
  }

  // 핸드폰 토큰 전송
  async checkValidPhone(phone): Promise<any> {
    const checkValid = await this.authphone.checkphone(phone);
    if (checkValid) throw new ConflictException('유효하지 않은 핸드폰 번호');
    const mytoken = await this.authphone.getToken();

    return await this.authphone.sendTokenToSMS(phone, mytoken);
  }
}
