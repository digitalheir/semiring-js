var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "../index", "./floating-point"], function (require, exports) {
    "use strict";
    var index_1 = require("../index");
    var floating_point_1 = require("./floating-point");
    var LogSemiring = (function (_super) {
        __extends(LogSemiring, _super);
        function LogSemiring() {
            var _this = _super.call(this, [index_1.Property.LeftSemiring,
                index_1.Property.RightSemiring,
                index_1.Property.Commutative]) || this;
            _this.AdditiveIdentity = Infinity;
            _this.MultiplicativeIdentity = 0.0;
            return _this;
        }
        LogSemiring.prototype.plus = function (x, y) {
            return floating_point_1.MULTIPLY(x, y);
        };
        ;
        LogSemiring.prototype.times = function (x, y) {
            return floating_point_1.ADD(x, y);
        };
        ;
        LogSemiring.fromProbability = function (x) {
            if (x > 1.0 || x < 0.0)
                throw new Error("Can't have probabilities >1.0 or <0.0");
            return -Math.log(x);
        };
        LogSemiring.toProbability = function (x) {
            var p = Math.exp(-x);
            if (p > 1.0 || p < 0.0)
                throw new Error("Can't have probabilities >1.0 or <0.0");
            return p;
        };
        return LogSemiring;
    }(index_1.Semiring));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = LogSemiring;
});
//# sourceMappingURL=log.js.map