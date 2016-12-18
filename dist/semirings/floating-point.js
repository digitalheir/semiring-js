(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "../abstract-expression/arithmetic", "../abstract-expression/atom/number"], function (require, exports) {
    "use strict";
    var arithmetic_1 = require("../abstract-expression/arithmetic");
    var number_1 = require("../abstract-expression/atom/number");
    function ADD(x, y) {
        if (x === 0)
            return y;
        else if (y === 0)
            return x;
        else
            return x + y;
    }
    exports.ADD = ADD;
    function MULTIPLY(x, y) {
        if (x === 0 || y === 0)
            return 0;
        else if (y === 1)
            return x;
        else if (x === 1)
            return y;
        else
            return x * y;
    }
    exports.MULTIPLY = MULTIPLY;
    exports.FloatingPointSemiring = {
        additiveIdentity: 0,
        multiplicativeIdentity: 1,
        plus: ADD,
        times: MULTIPLY
    };
    function createMultiplication(x, y) {
        return new arithmetic_1.Multiplication(x, y);
    }
    exports.createMultiplication = createMultiplication;
    function createAddition(x, y) {
        return new arithmetic_1.Addition(x, y);
    }
    exports.createAddition = createAddition;
    var ZERO = new number_1.Num(0);
    var ONE = new number_1.Num(1);
    exports.FloatingPointTreeSemiring = {
        additiveIdentity: ZERO,
        multiplicativeIdentity: ONE,
        plus: createAddition,
        times: createMultiplication
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = exports.FloatingPointTreeSemiring;
});
//# sourceMappingURL=floating-point.js.map