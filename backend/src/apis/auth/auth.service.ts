import { ConflictException, Injectable } from '@nestjs/common';
import 'dotenv/config';
import { PhoneAuthentication } from './checkphone';

@Injectable()
export class AuthService {
  constructor(private readonly authphone: PhoneAuthentication) {}

  async checkValidPhone(phone): Promise<any> {
    const checkValid = await this.authphone.checkphone(phone);
    if (checkValid) throw new ConflictException('유효하지 않은 핸드폰 번호');
    const mytoken = await this.authphone.getToken();

    return await this.authphone.sendTokenToSMS(phone, mytoken);
  }
}
