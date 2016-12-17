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
})(["require", "exports", "../atom/number", "../../index", "../../expression/binary-function", "../../semirings/floating-point"], function (require, exports) {
    "use strict";
    var number_1 = require("../atom/number");
    var index_1 = require("../../index");
    var binary_function_1 = require("../../expression/binary-function");
    var floating_point_1 = require("../../semirings/floating-point");
    var Multiplication = (function (_super) {
        __extends(Multiplication, _super);
        function Multiplication() {
            return _super.apply(this, arguments) || this;
        }
        Multiplication.prototype.resolve = function () {
            return floating_point_1.MULTIPLY(this.left.resolve(), this.right.resolve());
        };
        return Multiplication;
    }(binary_function_1.TimesExpression));
    exports.Multiplication = Multiplication;
    var Addition = (function (_super) {
        __extends(Addition, _super);
        function Addition() {
            return _super.apply(this, arguments) || this;
        }
        Addition.prototype.resolve = function () {
            return floating_point_1.ADD(this.left.resolve(), this.right.resolve());
        };
        return Addition;
    }(binary_function_1.PlusExpression));
    exports.Addition = Addition;
    exports.ZERO = new number_1.NumberLeaf(0);
    exports.ONE = new number_1.NumberLeaf(1);
    var FloatingPointTreeSemiring = (function (_super) {
        __extends(FloatingPointTreeSemiring, _super);
        function FloatingPointTreeSemiring() {
            var _this = _super.call(this, {}) || this;
            _this.AdditiveIdentity = exports.ZERO;
            _this.MultiplicativeIdentity = exports.ONE;
            return _this;
        }
        FloatingPointTreeSemiring.prototype.plus = function (x, y) {
            return new Addition(x, y);
        };
        FloatingPointTreeSemiring.prototype.times = function (x, y) {
            return new Multiplication(x, y);
        };
        return FloatingPointTreeSemiring;
    }(index_1.Semiring));
    exports.FloatingPointTreeSemiring = FloatingPointTreeSemiring;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = FloatingPointTreeSemiring;
});
//# sourceMappingURL=floating-point.js.map