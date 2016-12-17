import {Semiring} from "../index";
import {Bool} from "../abstract-expression/atom/boolean";
import {Expression} from "../abstract-expression/expression";
import {Disjunction, Conjunction} from "../abstract-expression/boolean";

export function OR(x: boolean, y: boolean) {
    return x || y;
}

export function AND(x: boolean, y: boolean) {
    return x && y;
}

export const BooleanSemiring: Semiring<boolean> = {
    AdditiveIdentity:  false,
    MultiplicativeIdentity:  true,
    plus: OR,
    times: AND,
};




export function makeDisjunction(x: Expression<boolean>, y: Expression<boolean>): Disjunction {
    return new Disjunction(x, y);
}

export function makeConjunction(x: Expression<boolean>, y: Expression<boolean>): Conjunction {
    return new Conjunction(x, y);
}

export const BooleanExpressionSemiring: Semiring<Expression<boolean>> = {
    AdditiveIdentity: Bool.FALSE,
    MultiplicativeIdentity: Bool.TRUE,

    plus: makeDisjunction,
    times: makeConjunction
};