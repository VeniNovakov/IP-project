import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    renderHome(res: any): void;
    renderLogin(res: any): void;
    renderRegister(res: any): void;
}
