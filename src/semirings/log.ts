import {Semiring, Property} from "../index";
import {MULTIPLY, ADD}  from "./floating-point";

export default class LogSemiring extends Semiring<number> {
    public AdditiveIdentity: number = Infinity;
    public MultiplicativeIdentity: number = 0.0;

    constructor() {
        super([Property.LeftSemiring,
            Property.RightSemiring,
            Property.Commutative]);
    }

    plus(x: number, y: number) {
        return MULTIPLY(x, y)
    };

    times(x: number, y: number) {
        return ADD(x, y)
    };

    public static fromProbability(x: number): number {
        if (x > 1.0 || x < 0.0) throw new Error("Can't have probabilities >1.0 or <0.0");
        return -Math.log(x);
    }

    public static toProbability(x: number): number {
        let p = Math.exp(-x);
        if (p > 1.0 || p < 0.0) throw new Error("Can't have probabilities >1.0 or <0.0");
        return p;
    }
}