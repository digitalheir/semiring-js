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
})(["require", "exports", "../../index", "../../expression/binary-function", "../atom/boolean"], function (require, exports) {
    "use strict";
    var index_1 = require("../../index");
    var binary_function_1 = require("../../expression/binary-function");
    var boolean_1 = require("../atom/boolean");
    var Disjunction = (function (_super) {
        __extends(Disjunction, _super);
        function Disjunction() {
            return _super.apply(this, arguments) || this;
        }
        Disjunction.prototype.resolve = function () {
            return (this.left.resolve() || this.right.resolve());
        };
        return Disjunction;
    }(binary_function_1.PlusExpression));
    exports.Disjunction = Disjunction;
    var Conjunction = (function (_super) {
        __extends(Conjunction, _super);
        function Conjunction() {
            return _super.apply(this, arguments) || this;
        }
        Conjunction.prototype.resolve = function () {
            return (this.left.resolve() && this.right.resolve());
        };
        return Conjunction;
    }(binary_function_1.TimesExpression));
    exports.Conjunction = Conjunction;
    var BooleanTreeSemiring = (function (_super) {
        __extends(BooleanTreeSemiring, _super);
        function BooleanTreeSemiring() {
            var _this = _super.call(this, [index_1.Property.Idempotent]) || this;
            _this.AdditiveIdentity = boolean_1.Bool.FALSE;
            _this.MultiplicativeIdentity = boolean_1.Bool.TRUE;
            _this.and = _this.times;
            _this.or = _this.plus;
            return _this;
        }
        BooleanTreeSemiring.prototype.plus = function (x, y) {
            return new Disjunction(x, y);
        };
        BooleanTreeSemiring.prototype.times = function (x, y) {
            return new Conjunction(x, y);
        };
        return BooleanTreeSemiring;
    }(index_1.Semiring));
    exports.BooleanTreeSemiring = BooleanTreeSemiring;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = BooleanTreeSemiring;
});
//# sourceMappingURL=boolean.js.map