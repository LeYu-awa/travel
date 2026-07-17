!(function () {
  "use strict";
  exports.createUrl = function (e) {
    if (!e) return "";
    return Object.keys(e).map(function (t) { return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]); }).join("&");
  };
  exports.genSessionId = function (e) {
    var t = e || 64, r = "abcdefghijklmnopqrstuvwxyz0123456789", n = "";
    for (var o = 0; o < t; o++) n += r.charAt(Math.floor(Math.random() * r.length));
    return n;
  };
  exports.jumpLogin = function (e) {};
})();
