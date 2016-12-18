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
})(["require", "exports"], function (require, exports) {
    "use strict";
    var BinaryFunction = (function () {
        function BinaryFunction(left, right) {
            this.left = left;
            this.right = right;
        }
        BinaryFunction.prototype.setLeft = function (left) {
            this.left = left;
        };
        BinaryFunction.prototype.setRight = function (left) {
            this.left = left;
        };
        return BinaryFunction;
    }());
    exports.BinaryFunction = BinaryFunction;
    var WrappedBinaryFunction = (function (_super) {
        __extends(WrappedBinaryFunction, _super);
        function WrappedBinaryFunction(left, right, f) {
            var _this = _super.call(this, left, right) || this;
            _this.f = f;
            return _this;
        }
        WrappedBinaryFunction.prototype.resolve = function () {
            return this.f(this.left.resolve(), this.right.resolve());
        };
        ;
        return WrappedBinaryFunction;
    }(BinaryFunction));
    exports.WrappedBinaryFunction = WrappedBinaryFunction;
    function wrapBinaryFunction(left, right, f) {
        return new WrappedBinaryFunction(left, right, f);
    }
    exports.wrapBinaryFunction = wrapBinaryFunction;
    var PlusExpression = (function (_super) {
        __extends(PlusExpression, _super);
        function PlusExpression() {
            return _super.apply(this, arguments) || this;
        }
        return PlusExpression;
    }(BinaryFunction));
    exports.PlusExpression = PlusExpression;
    var TimesExpression = (function (_super) {
        __extends(TimesExpression, _super);
        function TimesExpression() {
            return _super.apply(this, arguments) || this;
        }
        return TimesExpression;
    }(BinaryFunction));
    exports.TimesExpression = TimesExpression;
});
//# sourceMappingURL=binary-function.js.map