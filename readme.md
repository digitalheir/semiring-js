![Build Status](https://travis-ci.org/digitalheir/semiring-js.svg?branch=master)
[![npm version](https://badge.fury.io/js/semiring.svg)](https://www.npmjs.com/package/semiring)
![License](https://img.shields.io/npm/l/semiring.svg)
[![Code Climate](https://codeclimate.com/github/digitalheir/semiring-js/badges/gpa.svg)](https://codeclimate.com/github/digitalheir/bibliography-js)

# Semiring.js
A simple library for working with [ring-like algebraic structures](https://en.wikipedia.org/wiki/Semiring) in Javascript that implements some common semirings. This library does not validate properties of the defined structures, so you could actually define any algebraic structure that has some notion of 'plus' and 'times'. It is a simple utility library I needed for my own purposes: I am not trying to implement all abstract algebra in here.

[Live demo in browser](https://digitalheir.github.io/semiring-js)

Written in Typescript, published as a [commonjs modules on NPM](https://www.npmjs.com/package/semiring) and a [single-file minified UMD module on GitHub](https://github.com/digitalheir/semiring-js/releases) in vulgar ES5.

Note that the set `S` on which the operators apply is defined through generics, eg. `Semiring<number>`. If you don't use Typescript, this behaviour should come from your own logic.

This library currently implements the following semirings:

* [Probability semiring](#probability-semiring)
* [Log semiring](#log-semiring)
* [Tropical semiring](#tropical-semiring)
* [Boolean Semiring](#boolean-semiring)
* [String Semiring](#string-semiring)

# Motivation

I have two uses for this library:

* I want to make a long probabilistic computation 0.1 * 0.1 * ... * 0.1, and at some point Javascript's floating point arithmetic will be unable to represent a number so small, leading to arithmetic underflow. To counter, we use the Log semiring which holds the `-log` value of the probability. So it maps the numbers between 0 and 1 to the numbers between infinity and zero, skewed towards lower probabilities:
#### Graph plot of f(x) = -log(x)

![Graph for f(x) = -log x](https://user-images.githubusercontent.com/178797/200821928-991c99b7-572e-4322-9d58-13e412041e2a.png)

* I want to create an arithmetic expression of which values may change over time, i.e. pass around a value like `(x + 5) * 2`, and `x` is a pointer to a changing value. So I need an abstract expression tree, basically.

# Usage
````js
import {
    LogSemiring,
    makeDeferrable,
    BooleanSemiring,
    fromProbabilityToMinusLog as fromProbability,
    toProbabilityFromMinusLog as toProbability,
    AtomicValue,
    Bool
} from "semiring";

let minLogProb = fromProbability(1)

/**
 * First use case: 1.0 * (0.1 * 0.1 ...a thousand times)
 */
for(let i=0;i<1000;i++) {
    minLogProb = LogSemiring.times(
        minLogProb,
        fromProbability(0.1)
    );
}

console.log(minLogProb); // -log(1.0e-1000) = 2302.58, comfortable :)
console.log(toProbability(minLogProb)); // 1.0e-1000, rounded to 0 :(

/**
 * Second use case: create an expression tree with some two binary operators
 */

const deferrableBooleanSemiring = makeDeferrable(BooleanSemiring);
const AND = deferrableBooleanSemiring.times;
const OR = deferrableBooleanSemiring.plus;

const changeMyValue = new AtomicValue(false);
 
const TRUE = Bool.TRUE;
const FALSE = Bool.FALSE;

/**
 *       OR
 *    /      \
 * FALSE     AND
 *         /     \
 *      {false}  TRUE
 */
const expressionTree = OR(FALSE, AND(changeMyValue, TRUE));

console.log(expressionTree.resolve()); // > false
changeMyValue.value = !changeMyValue.value; // Change expression tree
/**
 *       OR
 *    /      \
 * FALSE     AND
 *         /     \
 *      {true}  TRUE
 */
console.log(expressionTree.resolve()); // > true

````

## Probability semiring
This semiring implements common notion of calculating probabilties.

|Element set|⊕|⊗|0̅|1̅|
|---|---|---|---|---|
|Positive real numbers (**R**+)|+|*|0.0|1.0|

For example: `0.5 ⊗ 1.0 = 0.5`, `0.2 ⊕ 0.7 = 0.9`.

````js
import {
    ProbabilitySemiring
} from "semiring";

console.log(ProbabilitySemiring.times(0.5, 0.5)); // 0.25
````

## Log semiring
A semiring usually used for multiplying numbers close to zero, to avoid arithmetic underflow.

|Element set|⊕|⊗|0̅|1̅|
|---|---|---|---|---|
|Positive real numbers (**R**+) including ±∞|-log(e^{-x} + e^{-y})|+|+∞|0|


For example: 
`p = -log(0.1)`
`q = -log(0.5)`

`p ⊕ q = -log(e^-p + e^-q) = -log(0.6)`.

`p ⊕ q = p + q = -log(0.05)`.

````js
import {
    LogSemiring
} from "semiring";

````

## Boolean semiring
A semiring that represents Boolean logic.

|Element set|⊕|⊗|0̅|1̅|
|---|---|---|---|---|
|{True, False}|∨|∧|False|True|


For example: 
`True ⊕ False = True`.

`True ⊗ False = False`.

````js
import {
    BooleanSemiring
} from "semiring";

````

## Tropical semiring
A semiring that describes [Tropical geometry](https://en.wikipedia.org/wiki/Tropical_geometry). An interesting application of this semiring was made by [Paul Klemperer for use in auctions during the financial crisis](https://www.theguardian.com/science/video/2013/jul/12/geometry-banking-crisis-video).

|Element set|⊕|⊗|0̅|1̅|
|---|---|---|---|---|
|Real numbers **R** including ∞|min|+|∞|0|

For example: 
`4 ⊕ ∞ = 4`.

`4 ⊗ 4 = 8`.

````js
import {
    TropicalSemiring
} from "semiring";

````

## String semiring
A semiring of formal languages. Used in automaton theory. ([An unweighted functional transducer can be seen as as a weighted automaton over the string semiring.](http://www.openfst.org/twiki/pub/FST/FstHltTutorial/tutorial_part1.pdf))

|Element set|⊕|⊗|0̅|1̅|
|---|---|---|---|---|
|All languages over an alphabet Σ|∪|L1 ⊗ L2 = {w⋅v \| w ∈ L1, v ∈ L2}|{}|{""}|

For example: 
`{a, b, c} ⊕ {ab} = {a, b, c, ab}`.

`{ab, ac} ⊗ {ab} = {abab, acab}`.

````js
import {
    StringSemiring
} from "semiring";

````

## License
[MIT](https://github.com/digitalheir/semiring-js/blob/master/LICENSE)

## Contact
Maarten Trompper <<maartentrompper@freedom.nl>>
