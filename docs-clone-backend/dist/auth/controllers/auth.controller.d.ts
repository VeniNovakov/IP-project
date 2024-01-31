import { AuthService } from '../services/auth.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(b: any, res: any, req: any): Promise<any>;
    register(createUserDto: CreateUserDto): Promise<{
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
    logout(req: any): Promise<{
        code: number;
    }>;
    refresh(req: any): Promise<{
        code: number;
    }>;
}
