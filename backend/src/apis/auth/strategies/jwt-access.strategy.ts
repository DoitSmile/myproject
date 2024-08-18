import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/apis/user/user.service';

export class JWtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  //PassportStrategy(인가를처리할방식,설정한인증방식이름)
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //jwtFromRequest를 통해 프론트로부터 받은 요청(fromAuthHeaderAsBearerToken)을 추출해준다(ExtractJwt)
      secretOrKey: '나의비밀번호',
    });
  }

  //검증에 성공(인가에 성공)한다면 payload를 열어서 사용자의 정보를 반환
  async validate(payload) {
    return {
      email: payload.email,
    };
  }
  // return : fetchUser API로 return 되는 것이 아님
  //  context 안의 req에 user라는 이름으로 email과 id 정보가 담긴 객체를 user 안으로 return되는 것(passport에서 user를 자동으로 만들어 주기에, 바꿀 수 없다).
  //  context는 요청 정보이기에 API 중간중간 어디서든 뽑아서 사용할 수 있다.
}
