(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "./floating-point"], function (require, exports) {
    "use strict";
    var floating_point_1 = require("./floating-point");
    exports.LogSemiring = {
        additiveIdentity: Infinity,
        multiplicativeIdentity: 0.0,
        plus: function (x, y) {
            if (x === Infinity)
                return y;
            else if (y === Infinity)
                return x;
            else
                return -Math.log(Math.exp(-x) + Math.exp(-y));
        },
        times: floating_point_1.ADD
    };
    function fromProbability(x) {
        if (x > 1.0 || x < 0.0)
            throw new Error("Can't have probabilities >1.0 or <0.0: " + x);
        return -Math.log(x);
    }
    exports.fromProbability = fromProbability;
    function toProbability(x) {
        var p = Math.exp(-x);
        if (p > 1.0 || p < 0.0)
            throw new Error("Can't have probabilities >1.0 or <0.0: " + x);
        return p;
    }
    exports.toProbability = toProbability;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = exports.LogSemiring;
});
//# sourceMappingURL=log.js.map