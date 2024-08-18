import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // 사용할 entitiy를 명시한 대상 repository로 주입 ( forFeature에 등록한 repository들이 대상)
    private readonly userRepository: Repository<User>,
  ) {}

  // 이메일로 유저 찾기
  async findEmail({ email }) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  // 회원가입
  async createUser(createUserInput): Promise<User> {
    const { email, age, phone, address, password } = createUserInput;
    const user = await this.findEmail({ email });
    if (user) throw new ConflictException('이미 존재하는 이메일입니다.');
    const hashpassword = await bcrypt.hash(password, 10);
    console.log(hashpassword);
    return await this.userRepository.save({
      email,
      age,
      phone,
      address,
      password: hashpassword,
    });
  }
}
