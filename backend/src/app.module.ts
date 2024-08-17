import { Module } from '@nestjs/common';
import { AuthModule } from './apis/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE, // env파일에서 수정
      entities: [__dirname + '/apis/**/*.entity.*'], // 수정
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
