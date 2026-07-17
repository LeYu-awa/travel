!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../utils/wxuser.js"),
    u = require("../../utils/utils.js"),
    o = e.defineComponent({
      __name: "finishSucceed",
      setup(o) {
        let a = e.ref("success");
        r.getStorage("user");
        let s = e.ref(""),
          t = e.ref("");
        return (
          e.onLoad((e) => {
            (s.value = e.orderNo),
              (t.value = e.productType),
              e && e.type && (a.value = e.type);
          }),
          (r, o) =>
            e.e(
              { a: "success" == e.unref(a) },
              (e.unref(a), {}),
              { b: "success" == e.unref(a) },
              (e.unref(a), {}),
              { c: "success" == e.unref(a) },
              "success" == e.unref(a)
                ? {
                    d: e.o((e) => {
                      "hotel" == t.value
                        ? u.goPage("/pagesC/order/orderInfo?orderNo=" + s.value)
                        : "shop" == t.value
                          ? u.goPage(
                              `/pagesB/travel/orderDetail?orderNo=${s.value}&productType=${t.value}`,
                            )
                          : "activity" == t.value
                            ? u.goPage(
                                `/pagesE/dailyActivity/dailyOrderDetail?orderNo=${s.value}&productType=${t.value}`,
                              )
                            : u.goPage(
                                "/pagesB/travel/orderDetail?orderNo=" + s.value,
                              );
                    }),
                  }
                : {},
            )
        );
      },
    }),
    a = e._export_sfc(o, [["__scopeId", "data-v-cf678390"]]);
  wx.createPage(a);
})();
