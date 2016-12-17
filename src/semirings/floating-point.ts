import {Semiring, Property} from "../index";
import {Expression} from "../abstract-expression/expression";
import {Multiplication, Addition} from "../abstract-expression/arithmetic";
import {Num} from "../abstract-expression/atom/number";

export function ADD(x: number, y: number): number {
    // console.log(x+" + "+y + " = "+(x+y));
    if (x === 0) return y;
    else if (y === 0) return x;
    else return x + y;
}

export function MULTIPLY(x: number, y: number): number {
    // console.log(x+" * "+y + " = "+(x*y));
    if (x === 0 || y === 0) return 0;
    else if (y === 1) return x;
    else if (x === 1) return y;
    else return x * y;
}

export const FloatingPointSemiring: Semiring<number> = {
    // super([Property.LeftSemiring,
    //     Property.RightSemiring,
    //     Property.Commutative]);
    AdditiveIdentity: 0,
    MultiplicativeIdentity: 1,

    plus: ADD,
    times: MULTIPLY
};


export function createMultiplication(x: Expression<number>, y: Expression<number>): Multiplication {
    return new Multiplication(x, y);

}

export function createAddition(x: Expression<number>, y: Expression<number>): Addition {
    return new Addition(x, y);
}

const ZERO = new Num(0);
const ONE = new Num(1);

export const FloatingPointTreeSemiring: Semiring<Expression<number>> = {
    AdditiveIdentity: ZERO,
    MultiplicativeIdentity: ONE,

    plus: createAddition,
    times: createMultiplication
};

export default FloatingPointTreeSemiring;