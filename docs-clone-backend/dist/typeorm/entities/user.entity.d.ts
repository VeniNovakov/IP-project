export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    refresh_token: string;
    comparePassword(password: string): Promise<boolean>;
}
