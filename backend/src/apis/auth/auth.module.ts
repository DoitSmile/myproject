import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PhoneAuthentication } from './checkphone';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PhoneAuthentication],
})
export class AuthModule {}
