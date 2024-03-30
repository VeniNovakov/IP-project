import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users/users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUserById(id: number): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
