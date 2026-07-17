!(function () {
  "use strict";
  var e = {};
  exports.info = function () { for (var t = arguments.length, r = Array(t), n = 0; n < t; n++) r[n] = arguments[n]; console.log.apply(console, r); };
  exports.warn = function () { for (var t = arguments.length, r = Array(t), n = 0; n < t; n++) r[n] = arguments[n]; console.warn.apply(console, r); };
  exports.error = function () { for (var t = arguments.length, r = Array(t), n = 0; n < t; n++) r[n] = arguments[n]; console.error.apply(console, r); };
  exports.setLog = function (t) { Object.assign(e, t); };
  exports.getLog = function () { return e; };
})();
