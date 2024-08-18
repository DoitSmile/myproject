import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PhoneAuthentication } from './checkphone';
import { JwtModule } from '@nestjs/jwt';
import { JWtAccessStrategy } from './strategies/jwt-access.strategy';
import { UserModule } from '../user/user.module';
@Module({
  imports: [JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [AuthService, PhoneAuthentication, JWtAccessStrategy],
})
export class AuthModule {}
