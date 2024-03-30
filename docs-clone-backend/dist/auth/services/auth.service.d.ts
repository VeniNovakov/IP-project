import { User } from 'src/users/entities/user.entity';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    hashToken(data: any): Promise<string>;
    validateUser(name: string, password: string): Promise<{
        code: number;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    tokens(user: User): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    createUser(userDetails: CreateUserParams): Promise<{
        code: number;
        message: string;
        tokens?: undefined;
    } | {
        code: number;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
        message?: undefined;
    }>;
    updateToken(uid: number, token: string): Promise<void>;
    logout(uid: number): Promise<{
        code: number;
    }>;
    refresh(uid: any, token: any): Promise<{
        code: number;
    }>;
}
