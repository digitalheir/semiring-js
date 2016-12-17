import { Semiring } from "../../index";
import { PlusExpression, TimesExpression } from "../../expression/binary-function";
import { Expression } from "../expression";
export declare class Disjunction extends PlusExpression<boolean> {
    resolve(): boolean;
}
export declare class Conjunction extends TimesExpression<boolean> {
    resolve(): boolean;
}
export declare class BooleanTreeSemiring extends Semiring<Expression<boolean>> {
    AdditiveIdentity: Expression<boolean>;
    MultiplicativeIdentity: Expression<boolean>;
    constructor();
    plus(x: Expression<boolean>, y: Expression<boolean>): Disjunction;
    times(x: Expression<boolean>, y: Expression<boolean>): Conjunction;
    and: (x: Expression<boolean>, y: Expression<boolean>) => Conjunction;
    or: (x: Expression<boolean>, y: Expression<boolean>) => Disjunction;
}
export default BooleanTreeSemiring;
