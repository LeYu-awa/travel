!(function () {
  "use strict";
  const o = require("../common/vendor.js");
  function e(e) {
    let t = o.dayjs().format("YYYY-MM-DD") + " " + e,
      n = o.dayjs(t, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm");
    return o.dayjs(n).unix();
  }
  exports.saleTime = function (t) {
    let { startTime: n, endTime: Y } = t;
    if ((console.log("startTime:", n), console.log("endTime:", Y), n || Y)) {
      let t = o.dayjs().format("YYYY-MM-DD HH:mm"),
        r = o.dayjs(t).unix(),
        s = n ? e(n) : 0,
        l = Y ? e(Y) : 0;
      if (s && l) {
        if (s <= l)
          return s <= r && r < l
            ? (console.log("111"), !1)
            : (console.log("222"), !0);
        {
          let t = e(o.dayjs().format("YYYY-MM-DD") + " 00:00"),
            n = e(o.dayjs().format("YYYY-MM-DD") + " 23:59");
          return (
            console.log("zeroDate:", t, t <= r && r <= l),
            console.log("lastDate", n, s <= r && r <= n),
            !((t <= r && r <= l) || (s <= r && r <= n))
          );
        }
      }
      return !s && l ? r > l : !(!s || l) && s > r;
    }
    return console.log("888"), !1;
  };
})();
