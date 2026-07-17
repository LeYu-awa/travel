!(function () {
  "use strict";
  const o = require("../base/jAlert/jAlert.js"),
    e = require("../utils/api.js"),
    r = require("../utils/wxuser.js");
  exports.useCouponExclusion = function () {
    const t = r.getStorage("config");
    return {
      checkExclusion: async function (r, n) {
        if (!r || 0 === n.length) return !1;
        try {
          const u = await e.api.checkCouponExclusion({
            currentCouponNo: r,
            selectedCouponNoList: n,
            hotelGroupCode: t.hotelGroupCode,
          });
          if (1 === u.result && 0 === u.retVal.result) {
            const { exclusionCouponInfoList: e, hasExclusion: r } =
              u.retVal.retVal;
            if (r) {
              const r = e.map((o) => o.couponName).join("、");
              return (
                o.jAlert3(`该券与您选择的 ${r} 不可叠加使用，请重新选择`), !0
              );
            }
          }
        } catch (o) {
          console.error("checkCouponExclusion error:", o);
        }
        return !1;
      },
    };
  };
})();
