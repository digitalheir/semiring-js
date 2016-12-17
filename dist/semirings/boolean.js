(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "../abstract-expression/atom/boolean", "../abstract-expression/boolean"], function (require, exports) {
    "use strict";
    var boolean_1 = require("../abstract-expression/atom/boolean");
    var boolean_2 = require("../abstract-expression/boolean");
    function OR(x, y) {
        return x || y;
    }
    exports.OR = OR;
    function AND(x, y) {
        return x && y;
    }
    exports.AND = AND;
    exports.BooleanSemiring = {
        AdditiveIdentity: false,
        MultiplicativeIdentity: true,
        plus: OR,
        times: AND,
    };
    function makeDisjunction(x, y) {
        return new boolean_2.Disjunction(x, y);
    }
    exports.makeDisjunction = makeDisjunction;
    function makeConjunction(x, y) {
        return new boolean_2.Conjunction(x, y);
    }
    exports.makeConjunction = makeConjunction;
    exports.BooleanExpressionSemiring = {
        AdditiveIdentity: boolean_1.Bool.FALSE,
        MultiplicativeIdentity: boolean_1.Bool.TRUE,
        plus: makeDisjunction,
        times: makeConjunction
    };
});
//# sourceMappingURL=boolean.js.map