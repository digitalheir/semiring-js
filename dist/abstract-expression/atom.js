(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports"], function (require, exports) {
    "use strict";
    function isNumber(x) {
        return typeof x === 'number';
    }
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
        Atom.prototype.toString = function (radix) {
            var str = this._value.toString();
            if (radix && isNumber(this._value))
                str = this._value.toString(radix);
            return "{" + str + "}";
        };
        return Atom;
    }());
    exports.Atom = Atom;
});
//# sourceMappingURL=atom.js.map