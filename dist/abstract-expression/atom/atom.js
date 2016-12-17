(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports"], function (require, exports) {
    "use strict";
    var Atom = (function () {
        function Atom(value) {
            this._value = value;
        }
        Object.defineProperty(Atom.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        Atom.prototype.resolve = function () {
            return this.value;
        };
        Atom.prototype.toString = function () {
            return "{" + this._value.toString() + "}";
        };
        return Atom;
    }());
    exports.Atom = Atom;
});
//# sourceMappingURL=atom.js.map