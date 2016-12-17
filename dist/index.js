(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports"], function (require, exports) {
    "use strict";
    var Property;
    (function (Property) {
        Property[Property["RightSemiring"] = 0] = "RightSemiring";
        Property[Property["LeftSemiring"] = 1] = "LeftSemiring";
        Property[Property["Idempotent"] = 2] = "Idempotent";
        Property[Property["Commutative"] = 3] = "Commutative";
        Property[Property["Path"] = 4] = "Path";
    })(Property = exports.Property || (exports.Property = {}));
    function isPropArray(x) {
        return Object.prototype.toString.call(x) === '[object Array]';
    }
});
//# sourceMappingURL=index.js.map