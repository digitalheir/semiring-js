import { Semiring } from "../index";
export declare function OR(x: boolean, y: boolean): boolean;
export declare function AND(x: boolean, y: boolean): boolean;
export default class BooleanSemiring extends Semiring<boolean> {
    AdditiveIdentity: boolean;
    MultiplicativeIdentity: boolean;
    constructor();
    plus(x: boolean, y: boolean): boolean;
    times(x: boolean, y: boolean): boolean;
    and: (x: boolean, y: boolean) => boolean;
    or: (x: boolean, y: boolean) => boolean;
}
