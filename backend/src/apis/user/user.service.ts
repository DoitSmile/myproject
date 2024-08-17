import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // 사용할 entitiy를 명시한 대상 repository로 주입 ( forFeature에 등록한 repository들이 대상)
    private readonly userReopository: Repository<User>,
  ) {}
  // 회원가입
  async createUser(createUserInput): Promise<User> {
    const result = await this.userReopository.save({
      ...createUserInput,
    });
    console.log(result);
    return result;
  }

  // 회원조회
  fetchUser({ userId }) {
    this.userReopository.findOne({
      where: { Id: userId },
    });
  }
}
