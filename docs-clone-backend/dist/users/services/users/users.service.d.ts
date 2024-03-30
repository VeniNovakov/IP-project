import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getUserById(id: number): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
