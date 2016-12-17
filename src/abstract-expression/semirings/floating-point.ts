import {NumberLeaf} from "../atom/number";
import {Semiring} from "../../index";
import {PlusExpression, TimesExpression} from "../../expression/binary-function";
import {Expression} from "../expression";
import {MULTIPLY, ADD} from "../../semirings/floating-point";

export class Multiplication extends TimesExpression<number> {
    resolve(): number {
        return MULTIPLY(this.left.resolve(), this.right.resolve());
    }
}

export class Addition extends PlusExpression<number> {
    resolve(): number {
        return ADD(this.left.resolve(), this.right.resolve());
    }
}

export const ZERO = new NumberLeaf(0);
export const ONE = new NumberLeaf(1);

export class FloatingPointTreeSemiring extends Semiring<Expression<number>> {
    public AdditiveIdentity: Expression<number> = ZERO;
    public MultiplicativeIdentity: Expression<number> = ONE;

    constructor() {
        super({});
    }


    plus(x: Expression<number>, y: Expression<number>): Addition {
        return new Addition(x, y);
    }

    times(x: Expression<number>, y: Expression<number>): Multiplication {
        return new Multiplication(x, y);
    }
}

export default FloatingPointTreeSemiring;