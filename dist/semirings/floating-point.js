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
})(["require", "exports", "../index"], function (require, exports) {
    "use strict";
    var index_1 = require("../index");
    exports.ZERO = 0;
    exports.ONE = 1;
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
    var FloatingPointSemiring = (function (_super) {
        __extends(FloatingPointSemiring, _super);
        function FloatingPointSemiring() {
            var _this = _super.call(this, [index_1.Property.LeftSemiring,
                index_1.Property.RightSemiring,
                index_1.Property.Commutative]) || this;
            _this.AdditiveIdentity = exports.ZERO;
            _this.MultiplicativeIdentity = exports.ONE;
            return _this;
        }
        FloatingPointSemiring.prototype.plus = function (x, y) {
            return ADD(x, y);
        };
        ;
        FloatingPointSemiring.prototype.times = function (x, y) {
            return MULTIPLY(x, y);
        };
        ;
        return FloatingPointSemiring;
    }(index_1.Semiring));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = FloatingPointSemiring;
});
//# sourceMappingURL=floating-point.js.map