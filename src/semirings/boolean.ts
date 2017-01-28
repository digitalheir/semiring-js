import {Bool} from "../abstract-expression/atom/boolean";
import {Expression} from "../abstract-expression/expression";
import {Disjunction, Conjunction} from "../abstract-expression/boolean";
import {Semiring} from "../index";

export function OR(x: boolean, y: boolean) {
    return x || y;
}

export function AND(x: boolean, y: boolean) {
    return x && y;
}

export const BooleanSemiring: Semiring<boolean> = {
    additiveIdentity:  false,
    multiplicativeIdentity:  true,
    plus: OR,
    times: AND,
};

export function makeDisjunction(x: Expression<boolean>, y: Expression<boolean>): Disjunction {
    return new Disjunction(x, y);
}

export function makeConjunction(x: Expression<boolean>, y: Expression<boolean>): Conjunction {
    return new Conjunction(x, y);
}

//noinspection JSUnusedGlobalSymbols
export const BooleanExpressionSemiring: Semiring<Expression<boolean>> = {
    additiveIdentity: Bool.FALSE,
    multiplicativeIdentity: Bool.TRUE,

    plus: makeDisjunction,
    times: makeConjunction
};