# Semiring.js

A simple library for working with semirings, useful for generalizing notions of 'plus' and 'times'.

# Motivation
I have two uses for this library:

1. Sometimes I want to make a long probabilistic computation 0.1 * 0.1 * ... * 0.1, and at some point floating point arithmetic will be unable to represent a number so small, leading to arithmetic underflow. To counter, we use the Log semiring which holds the `-log` value of the probability. So it maps the numbers between 0 and 1 to the numbers between infinity and zero, skewed towards lower probabilities:
#### Graph plot of f(x) = -log(x)
![Graph for f(x) = -log x](https://leibniz.cloudant.com/assets/_design/ddoc/graph%20for%20-log%20x.PNG)

2. Sometimes I want to create an arithmetic expression of which values may change over time, i.e. pass around a value like `(x + 5) * 2`, and `x` is a pointer to a changing value. So I need an abstract expression tree, basically.

# Usage
````
import {makeDeferrable} from "semiring";
import {LogSemiring} from "semiring/semirings/log";

````