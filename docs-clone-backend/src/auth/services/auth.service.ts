import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenConfig } from 'src/config/auth.config';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async hashToken(data) {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(data, salt);
    return hash;
  }

  async validateUser(name: string, password: string) {
    const user = await this.userRepository.findOneBy({ name });

    if (user && (await user.comparePassword(password))) {
      const payload = {
        name: user.name,
        sub: user.id,
      };

      const tokens = await this.tokens(user);

      await this.updateToken(user.id, tokens.refresh_token);

      return {
        code: 200,
        tokens: tokens,
      };
    }
    return null;
  }

  async tokens(user: User) {
    const payload = {
      name: user.name,
      sub: user.id,
      documents: user.documents,
    };
    const accToken = await this.jwtService.signAsync(payload, {
      expiresIn: 60 * 30,
      secret: TokenConfig.at,
    });
    const refrToken = await this.jwtService.signAsync(payload, {
      expiresIn: 60 * 60 * 24 * 15,
      secret: TokenConfig.rt,
    });

    return {
      access_token: accToken,
      refresh_token: refrToken,
    };
  }

  async createUser(userDetails: CreateUserParams) {
    if (
      (await this.userRepository.findOneBy({ name: userDetails.name })) != null
    ) {
      return { code: 403, message: 'Theres already a user with this name' };
    }

    const salt = await bcrypt.genSalt();
    userDetails.password = await bcrypt.hash(userDetails.password, salt);

    const newUser = await this.userRepository.create({ ...userDetails });
    await this.userRepository.save(newUser);
    const tokens = await this.tokens(newUser);

    await this.updateToken(newUser.id, tokens.refresh_token);
    console.log(tokens);
    return { code: 200, tokens };
  }

  async updateToken(uid: number, token: string) {
    const hash = await this.hashToken(token);
    const user = await this.userRepository.findOneBy({ id: uid });
    user.refresh_token = hash;
    await this.userRepository.save(user);
  }

  async logout(uid: number) {
    const user = await this.userRepository.findOneBy({ id: uid });

    user.refresh_token = null;
    await this.userRepository.save(user);
    return { code: 200 };
  }
  async refresh(uid, token) {
    const user = await this.userRepository.findOneBy({ id: uid });
    if (bcrypt.compare(token, user.refresh_token)) {
      return { code: 401 };
    }
    const tokens = await this.tokens(user);
    await this.updateToken(user.id, tokens.refresh_token);
    return { code: 200 };
  }
}
