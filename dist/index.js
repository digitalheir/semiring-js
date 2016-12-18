(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "./abstract-expression/atom", "./expression/binary-function", "./semirings/log", "./semirings/boolean", "./semirings/floating-point"], function (require, exports) {
    "use strict";
    var atom_1 = require("./abstract-expression/atom");
    var binary_function_1 = require("./expression/binary-function");
    var log_1 = require("./semirings/log");
    var boolean_1 = require("./semirings/boolean");
    var floating_point_1 = require("./semirings/floating-point");
    function isPropArray(x) {
        return Object.prototype.toString.call(x) === '[object Array]';
    }
    function makeDeferrable(semiring) {
        return {
            multiplicativeIdentity: new exports.Atom(semiring.multiplicativeIdentity),
            additiveIdentity: new exports.Atom(semiring.additiveIdentity),
            plus: function (left, right) { return binary_function_1.wrapBinaryFunction(left, right, semiring.plus); },
            times: function (left, right) { return binary_function_1.wrapBinaryFunction(left, right, semiring.times); }
        };
    }
    exports.makeDeferrable = makeDeferrable;
    exports.LogSemiring = log_1.LogSemiring;
    exports.BooleanSemiring = boolean_1.BooleanSemiring;
    exports.FloatingPointSemiring = floating_point_1.FloatingPointSemiring;
    exports.fromProbabilityToMinusLog = log_1.fromProbability;
    exports.toProbabilityFromMinusLog = log_1.toProbability;
    exports.Atom = atom_1.Atom;
});
//# sourceMappingURL=index.js.map