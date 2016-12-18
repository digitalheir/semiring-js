# Semiring.js

A simple library for working with semirings, useful for generalizing notions of 'plus' and 'times'.

# Motivation
I have two uses for this library:

* I want to make a long probabilistic computation 0.1 * 0.1 * ... * 0.1, and at some point floating point arithmetic will be unable to represent a number so small, leading to arithmetic underflow. To counter, we use the Log semiring which holds the `-log` value of the probability. So it maps the numbers between 0 and 1 to the numbers between infinity and zero, skewed towards lower probabilities:
#### Graph plot of f(x) = -log(x)
![Graph for f(x) = -log x](https://leibniz.cloudant.com/assets/_design/ddoc/graph%20for%20-log%20x.PNG)

* I want to create an arithmetic expression of which values may change over time, i.e. pass around a value like `(x + 5) * 2`, and `x` is a pointer to a changing value. So I need an abstract expression tree, basically.

# Usage
````js
import {LogSemiring, makeDeferrable, BooleanSemiring} from "semiring";
import {fromProbability, toProbability} from "semiring/semirings/log";
import {Atom} from "semiring/abstract-expression/atom";
import {Bool} from "semiring/abstract-expression/atom/boolean";


let minLogProb = LogSemiring.times(
    fromProbability(0.3),
    fromProbability(0.5)
);
console.log(toProbability(minLogProb)); // 0.15


const deferrableBooleanSemiring = makeDeferrable(BooleanSemiring);
const AND = deferrableBooleanSemiring.times;
const OR = deferrableBooleanSemiring.plus;

const changeMyValue = new Atom(false);
const TRUE = Bool.TRUE;

const expressionTree = AND(changeMyValue, TRUE);

console.log(expressionTree.resolve()); // > false
changeMyValue.value = !changeMyValue.value; // Change expression tree
console.log(expressionTree.resolve()); // > true

````