import { Request } from 'express';
import { JwtRtPayload } from 'src/utils/types';
declare const StrategyJwtRT_base: new (...args: any[]) => any;
export declare class StrategyJwtRT extends StrategyJwtRT_base {
    constructor();
    validate(req: Request, payload: JwtRtPayload): Promise<{
        token: string;
        sub: number;
        name: string;
        products: number[];
        refresh_token: string;
    }>;
}
export {};
