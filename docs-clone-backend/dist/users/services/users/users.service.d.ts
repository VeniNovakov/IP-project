import { Repository } from 'typeorm';
import { User } from '../../../typeorm/entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
}
