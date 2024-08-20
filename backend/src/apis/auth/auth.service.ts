import { ConflictException, Injectable } from '@nestjs/common';
import 'dotenv/config';
import { PhoneAuthentication } from './checkphone';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IAuthLoginInput } from './interfaces/auth-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly authphone: PhoneAuthentication,
    private readonly userService: UserService,
    private readonly jwtService: JwtService, // jwt 관련 비지니스로직 사용가능
  ) {}

  //  핸드폰 인증번호 임시 저장
  private users = {};

  // 로그인
  async login(authLoginInput: IAuthLoginInput, res): Promise<string> {
    // 이메일이 일치하는 user를 db에서 가져옴
    const { email, password } = authLoginInput;
    const user = await this.userService.findEmail({ email });
    const isAuth = await bcrypt.compare(password, user.password);

    if (isAuth && user) {
      this.setRefreshToken({ user, res });
      return this.getAccessToken({ user }); // refresh token과 기존 token을 각각 cookie, payload에 따로 저장하고 보안 높이기
    } else {
      throw new ConflictException('로그인 실패');
    }
  }
  // 리프레시 토큰 발급
  setRefreshToken({ user, res }): void {
    const refreshToken = this.jwtService.sign(
      { email: user.email },
      { secret: '리프레시비밀번호', expiresIn: '2w' },
    );

    res.cookie('Authentication', refreshToken, {
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    });
  }

  // 토큰 발급
  getAccessToken({ user }): string {
    return this.jwtService.sign(
      { email: user.email },
      { secret: '나의비밀번호', expiresIn: '10m' },
    ); // return 타입: 발급받은 토큰
  }

  // 토큰 재발급
  reissueAccessToken({ user }) {
    return this.getAccessToken({ user });
  }

  // 핸드폰 인증번호 전송
  async sendPhone(myphone: string): Promise<any> {
    const checkValid = await this.authphone.checkphone(myphone);
    if (checkValid) throw new ConflictException('유효하지 않은 핸드폰 번호');
    const mytoken = this.authphone.getToken();
    this.users = mytoken;
    console.log(this.users);
    // await this.authphone.sendTokenToSMS(phone, mytoken);
    return '토큰전송';
  }

  // 핸드폰 인증번호 검증
  async checkValidPhone(in_num: string): Promise<any> {
    const token = this.users;

    if (token === in_num) {
      return '인증완료';
    } else {
      throw new ConflictException('인증실패');
    }
  }
}
