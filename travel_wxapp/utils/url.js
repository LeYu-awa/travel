!(function () {
  "use strict";
  exports.createUrl = function (e) {
    if (!e) return "";
    return Object.keys(e).map(function (t) { return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]); }).join("&");
  };
})();
