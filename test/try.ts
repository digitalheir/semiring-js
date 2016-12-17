import ProbabilitySemiring from "../src/abstract-expression/semirings/floating-point";
import {TimesExpression} from "../src/expression/binary-function";
import {NumberLeaf} from "../src/abstract-expression/atom/number";
import {BooleanTreeSemiring, Conjunction} from "../src/abstract-expression/semirings/boolean";
import {Bool} from "../src/abstract-expression/atom/boolean";
import {Property} from "../src/index";
import LogSemiring from "../src/semirings/log";

const sr = new ProbabilitySemiring();
let changeMe = new NumberLeaf(15);
const e: TimesExpression<number> = sr.times(changeMe, new NumberLeaf(19));
let value: number = e.resolve();
console.log(value);
changeMe.value = 10;
value = e.resolve();
console.log(value);

const bsr = new BooleanTreeSemiring();
const be: Conjunction = bsr.and(Bool.TRUE, Bool.TRUE);

let bvalue:boolean = be.resolve();
console.log(bvalue.valueOf());
console.log(bsr.hasProperty(Property.Idempotent));
console.log(bsr.hasProperty(Property.Commutative));

const lsr = new LogSemiring();
const lvalue = lsr.times(LogSemiring.fromProbability(0.3), LogSemiring.fromProbability(0.5));
console.log(
    LogSemiring.toProbability(lvalue) // 0.15
);