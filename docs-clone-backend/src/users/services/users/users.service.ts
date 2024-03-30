import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id, permissions: true, documents: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
