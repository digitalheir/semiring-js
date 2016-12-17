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
    var Semiring = (function () {
        function Semiring(properties) {
            if (isPropArray(properties)) {
                this.properties = {};
                for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                    var prop = properties_1[_i];
                    var property = Property[prop];
                    this.properties[property] = true;
                }
            }
            else
                this.properties = properties;
        }
        Semiring.prototype.getProperties = function () {
            return this.properties;
        };
        ;
        Semiring.prototype.hasProperty = function (prop) {
            var propertyName = Property[prop];
            var notHasProperty = !this.properties[propertyName];
            return !notHasProperty;
        };
        ;
        return Semiring;
    }());
    exports.Semiring = Semiring;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Semiring;
});
//# sourceMappingURL=index.js.map