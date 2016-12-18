(function (dependencies, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(dependencies, factory);
    }
})(["require", "exports", "../atom"], function (require, exports) {
    "use strict";
    var atom_1 = require("../atom");
    exports.Atom = atom_1.Atom;
});
//# sourceMappingURL=atom.js.map