import { NumberLeaf } from "../atom/number";
import { Semiring } from "../../index";
import { PlusExpression, TimesExpression } from "../../expression/binary-function";
import { Expression } from "../expression";
export declare class Multiplication extends TimesExpression<number> {
    resolve(): number;
}
export declare class Addition extends PlusExpression<number> {
    resolve(): number;
}
export declare const ZERO: NumberLeaf;
export declare const ONE: NumberLeaf;
export declare class FloatingPointTreeSemiring extends Semiring<Expression<number>> {
    AdditiveIdentity: Expression<number>;
    MultiplicativeIdentity: Expression<number>;
    constructor();
    plus(x: Expression<number>, y: Expression<number>): Addition;
    times(x: Expression<number>, y: Expression<number>): Multiplication;
}
export default FloatingPointTreeSemiring;
