![Build Status](https://travis-ci.org/digitalheir/semiring-js.svg?branch=master)
[![npm version](https://badge.fury.io/js/semiring.svg)](https://www.npmjs.com/package/semiring)
![License](https://img.shields.io/npm/l/semiring.svg)
[![Code Climate](https://codeclimate.com/github/digitalheir/semiring-js/badges/gpa.svg)](https://codeclimate.com/github/digitalheir/bibliography-js)


# Semiring.js

A simple library for working with ring-like algebraic structures in Javascript that implements some common semirings. This library does not check properties of the defined structures, so you could actually define any algebraic structure that has some notion of 'plus' and 'times'. It is just a simple utility library I needed for my own purposes: I am not trying to implement all abstract algebra in here.

Written in Typescript, published as a [commonjs modules on NPM](https://www.npmjs.com/package/semiring) and a [single-file minified UMD module on GitHub](https://github.com/digitalheir/semiring-js/releases) in vulgar ES5.

Note that the set `S` on which the operators apply is defined through generics, eg. `Semiring<number>`. If you don't use Typescript, this behaviour should come from your own logic.

This library currently implements the following semirings:

* [Probability semiring](#probability-semiring)
* Log semiring
* Tropical semiring
* Boolean Semiring

# Motivation

I have two uses for this library:

* I want to make a long probabilistic computation 0.1 * 0.1 * ... * 0.1, and at some point Javascript's floating point arithmetic will be unable to represent a number so small, leading to arithmetic underflow. To counter, we use the Log semiring which holds the `-log` value of the probability. So it maps the numbers between 0 and 1 to the numbers between infinity and zero, skewed towards lower probabilities:
#### Graph plot of f(x) = -log(x)
![Graph for f(x) = -log x](https://leibniz.cloudant.com/assets/_design/ddoc/graph%20for%20-log%20x.PNG)

* I want to create an arithmetic expression of which values may change over time, i.e. pass around a value like `(x + 5) * 2`, and `x` is a pointer to a changing value. So I need an abstract expression tree, basically.

# Usage
````js
import {
    LogSemiring,
    makeDeferrable,
    BooleanSemiring,
    fromProbabilityToMinusLog as fromProbability,
    toProbabilityFromMinusLog as toProbability,
    Atom,
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

const changeMyValue = new Atom(false);
 
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
```
