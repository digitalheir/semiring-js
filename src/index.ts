/**
 * Properties that semirings might have
 */
import {Expression} from "./abstract-expression/expression";
import {Atom as AtomClass} from "./abstract-expression/atom";
import {wrapBinaryFunction} from "./expression/binary-function";
import {LogSemiring as ls, fromProbability, toProbability} from "./semirings/log";
import {BooleanSemiring as bs} from "./semirings/boolean";
import {FloatingPointSemiring as fs} from "./semirings/floating-point";
import {Semiring, Property} from "./semiring";


function isPropArray(x: Property[]|{[p: string]: boolean}): x is Property[] {
    return Object.prototype.toString.call(x) === '[object Array]';
}

/**
 * Wrap given semiring objects of type T in an Expression; times and plus will will return TimesExpression<T> and PlusExpression<T> objects respectively. This is useful forrespresting computations as an expression tree, and you may interchange constituent node values (eg. x+3, and set the value x later).
 */
export function makeDeferrable<T>(semiring: Semiring<T>): Semiring<Expression<T>> {
    return {
        multiplicativeIdentity: new Atom(semiring.multiplicativeIdentity),
        additiveIdentity: new Atom(semiring.additiveIdentity),

        plus: (left, right) => wrapBinaryFunction(left, right, semiring.plus),
        times: (left, right) => wrapBinaryFunction(left, right, semiring.times)
    }
}

export const LogSemiring: Semiring<number> = ls;
export const BooleanSemiring: Semiring<boolean> = bs;
export const FloatingPointSemiring: Semiring<number> = fs;

export const fromProbabilityToMinusLog: (x: number)=>number = fromProbability;
export const toProbabilityFromMinusLog: (x: number)=>number = toProbability;

export const Atom = AtomClass;