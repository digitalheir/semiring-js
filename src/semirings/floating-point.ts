import {Semiring, Property} from "../index";

export const ZERO = 0;
export const ONE = 1;

export function ADD(x: number, y: number): number {
    if (x === 0) return y;
    else if (y === 0) return x;
    else return x + y;
}

export function MULTIPLY(x: number, y: number): number {
    if (x === 0 || y === 0) return 0;
    else if (y === 1) return x;
    else if (x === 1) return y;
    else return x * y;
}

export default class FloatingPointSemiring extends Semiring<number> {
    public AdditiveIdentity: number = ZERO;
    public MultiplicativeIdentity: number = ONE;

    constructor() {
        super([Property.LeftSemiring,
            Property.RightSemiring,
            Property.Commutative]);
    }

    plus(x:number, y:number) {
        return ADD(x, y)
    };

    times(x:number, y:number) {
        return MULTIPLY(x, y)
    };
}