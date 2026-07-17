!(function () {
  "use strict";
  const e = require("../../components/Suggestions/suggestTypes.js"),
    s = require("../../../common/vendor.js");
  exports.getBizDesc = (n) => {
    var o;
    return null == (o = e.SUGGEST_TYPES.find(s.propEq(n.bizType, "value")))
      ? void 0
      : o.label;
  };
})();
