import { Semiring } from "../index";
export declare const ZERO = 0;
export declare const ONE = 1;
export declare function ADD(x: number, y: number): number;
export declare function MULTIPLY(x: number, y: number): number;
export default class FloatingPointSemiring extends Semiring<number> {
    AdditiveIdentity: number;
    MultiplicativeIdentity: number;
    constructor();
    plus(x: number, y: number): number;
    times(x: number, y: number): number;
}
