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
    function OR(x, y) {
        return x || y;
    }
    exports.OR = OR;
    function AND(x, y) {
        return x && y;
    }
    exports.AND = AND;
    var BooleanSemiring = (function (_super) {
        __extends(BooleanSemiring, _super);
        function BooleanSemiring() {
            var _this = _super.call(this, [
                index_1.Property.Idempotent,
                index_1.Property.RightSemiring,
                index_1.Property.LeftSemiring,
                index_1.Property.Path
            ]) || this;
            _this.AdditiveIdentity = false;
            _this.MultiplicativeIdentity = true;
            _this.and = _this.times;
            _this.or = _this.plus;
            return _this;
        }
        BooleanSemiring.prototype.plus = function (x, y) {
            return OR(x, y);
        };
        BooleanSemiring.prototype.times = function (x, y) {
            return AND(x, y);
        };
        return BooleanSemiring;
    }(index_1.Semiring));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = BooleanSemiring;
});
//# sourceMappingURL=boolean.js.map