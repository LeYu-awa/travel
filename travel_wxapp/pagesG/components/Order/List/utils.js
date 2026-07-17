!(function () {
  "use strict";
  const o = require("../../../../common/assets.js");
  exports.getIconByServerCode = (e) =>
    "00106" === e
      ? o.borrowing
      : "00104" === e
        ? o.clean
        : "00105" === e
          ? o.supply
          : o.borrowing;
})();
