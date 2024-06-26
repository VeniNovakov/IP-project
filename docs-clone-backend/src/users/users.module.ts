import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtAtAuthGuard } from 'src/auth/guards/jwtAtAuth.guard';
import { JwtRtAuthGuard } from 'src/auth/guards/jwtRtAuthGuard.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, JwtAtAuthGuard, JwtRtAuthGuard],
  exports: [TypeOrmModule],
})
export class UsersModule {}
