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
})(["require", "exports", "../semirings/floating-point", "../expression/binary-function"], function (require, exports) {
    "use strict";
    var floating_point_1 = require("../semirings/floating-point");
    var binary_function_1 = require("../expression/binary-function");
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
});
//# sourceMappingURL=arithmetic.js.map