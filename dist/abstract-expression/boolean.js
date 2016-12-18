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
})(["require", "exports", "../expression/binary-function"], function (require, exports) {
    "use strict";
    var binary_function_1 = require("../expression/binary-function");
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
});
//# sourceMappingURL=boolean.js.map