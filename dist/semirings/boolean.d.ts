import { Expression } from "../abstract-expression/expression";
import { Disjunction, Conjunction } from "../abstract-expression/boolean";
import { Semiring } from "../semiring";
export declare function OR(x: boolean, y: boolean): boolean;
export declare function AND(x: boolean, y: boolean): boolean;
export declare const BooleanSemiring: Semiring<boolean>;
export declare function makeDisjunction(x: Expression<boolean>, y: Expression<boolean>): Disjunction;
export declare function makeConjunction(x: Expression<boolean>, y: Expression<boolean>): Conjunction;
export declare const BooleanExpressionSemiring: Semiring<Expression<boolean>>;
