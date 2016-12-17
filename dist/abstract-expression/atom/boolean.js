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
})(["require", "exports", "./atom"], function (require, exports) {
    "use strict";
    var atom_1 = require("./atom");
    var Bool = (function (_super) {
        __extends(Bool, _super);
        function Bool(value) {
            return _super.call(this, value) || this;
        }
        Bool.from = function (bool) {
            if (bool)
                return this.TRUE;
            else
                return this.FALSE;
        };
        return Bool;
    }(atom_1.Atom));
    Bool.TRUE = new Bool(true);
    Bool.FALSE = new Bool(false);
    exports.Bool = Bool;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Bool;
});
//# sourceMappingURL=boolean.js.map