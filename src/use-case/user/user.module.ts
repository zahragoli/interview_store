import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../../controllers/user.controller';
import { UserService } from './user.service';
import { User } from '../../core/entities/user.entity';
import { JwtAuthModule } from '../../frameworks/auth-service/jwt/jwt.module';

// import { JwtAuthService } from '../../frameworks/auth-service/jwt/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtAuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
