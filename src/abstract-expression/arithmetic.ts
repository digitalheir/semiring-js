
import {ADD, MULTIPLY} from "../semirings/floating-point";
import {PlusExpression, TimesExpression} from "../expression/binary-function";
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
