import {Semiring, Property} from "../index";

export function OR(x: boolean, y: boolean) {
    return x || y;
}

export function AND(x: boolean, y: boolean) {
    return x && y;
}

export default class BooleanSemiring extends Semiring<boolean> {
    AdditiveIdentity: boolean = false;
    MultiplicativeIdentity: boolean = true;

    constructor() {
        super([
            Property.Idempotent,
            Property.RightSemiring,
            Property.LeftSemiring,
            Property.Path
        ]);
    }

    public plus(x: boolean, y: boolean): boolean {
        return OR(x, y);
    }

    public times(x: boolean, y: boolean): boolean {
        return AND(x, y);
    }

    public and = this.times;

    public or = this.plus;
}