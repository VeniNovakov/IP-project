import { JwtAtPayload } from 'src/utils/types';
declare const StrategyJwtAT_base: new (...args: any[]) => any;
export declare class StrategyJwtAT extends StrategyJwtAT_base {
    constructor();
    validate(payload: JwtAtPayload): Promise<JwtAtPayload>;
}
export {};
