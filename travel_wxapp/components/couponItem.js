!(function () {
  "use strict";
  const o = require("../common/vendor.js"),
    e = require("../utils/filter.js"),
    t = require("../utils/wxuser.js");
  Math || n();
  const n = () => "./new/StButton.js",
    u = o.defineComponent({
      name: "CouponItem",
      __name: "couponItem",
      props: {
        couponItem: { default: () => ({ validToDate: "", validFromDate: "" }) },
        mode: { default: "" },
        singleSelect: { type: Boolean, default: !1 },
        showBtn: { type: Boolean, default: !1 },
      },
      emits: ["chooseCoupon", "toggleCoupon"],
      setup(n, { emit: u }) {
        const c = n,
          p = u,
          m = o.computed(() => "select" === c.mode),
          i = o.computed(() => "receive" === c.mode);
        function s(o) {
          if (m.value)
            return (
              (function (o) {
                p("toggleCoupon", o);
              })(o),
              !1
            );
          p("chooseCoupon", o);
        }
        return (u, c) => {
          return o.e(
            { a: n.couponItem.groupName },
            n.couponItem.groupName
              ? {
                  b: o.t(n.couponItem.groupName),
                  c: o.n(n.couponItem.groupCode),
                }
              : {},
            { d: n.couponItem.no },
            n.couponItem.no
              ? o.e(
                  { e: !n.couponItem.isHistory },
                  n.couponItem.isHistory
                    ? { g: o.t("P" === n.couponItem.sta ? "已过期" : "已使用") }
                    : {
                        f: o.o((e) => {
                          return (
                            (u = n.couponItem),
                            t.setStorage("coupon", u),
                            void o.index.navigateTo({
                              url: "/pagesA/member/couponInfo?couponNo=" + u.no,
                            })
                          );
                          var u;
                        }),
                      },
                )
              : {},
            {
              h: o.t(n.couponItem.descript),
              i: n.couponItem.beginDatetime && n.couponItem.endDatetime,
            },
            n.couponItem.beginDatetime && n.couponItem.endDatetime
              ? {
                  j: o.t(o.unref(e.timeDay2)(n.couponItem.beginDatetime)),
                  k: o.t(o.unref(e.timeDay2)(n.couponItem.endDatetime)),
                }
              : {},
            {
              l:
                "EXCHANGECOUPON" !== n.couponItem.groupCode &&
                n.couponItem.discountNum > 0,
            },
            "EXCHANGECOUPON" !== n.couponItem.groupCode &&
              n.couponItem.discountNum > 0
              ? o.e(
                  { m: "RF" === n.couponItem.couponType },
                  "RF" === n.couponItem.couponType
                    ? { n: o.t(n.couponItem.discountNum) }
                    : "LZ" === n.couponItem.discountType ||
                        "MZ" === n.couponItem.discountType
                      ? {
                          p: o.t(
                            ((r = 10 * n.couponItem.discountNum),
                            Number(Number(r).toFixed(2))),
                          ),
                        }
                      : {
                          q: o.t(
                            o.unref(e.valFormat)(n.couponItem.discountNum),
                          ),
                        },
                  {
                    o:
                      "LZ" === n.couponItem.discountType ||
                      "MZ" === n.couponItem.discountType,
                  },
                )
              : {},
            { r: n.couponItem.discountPriceBegin > 0 },
            n.couponItem.discountPriceBegin > 0
              ? {
                  s: o.t(o.unref(e.valFormat)(n.couponItem.discountPriceBegin)),
                }
              : {},
            { t: m.value },
            m.value
              ? o.e(
                  {
                    v:
                      "EXCHANGECOUPON" === n.couponItem.groupCode &&
                      !n.singleSelect,
                  },
                  "EXCHANGECOUPON" !== n.couponItem.groupCode || n.singleSelect
                    ? o.e(
                        { x: n.couponItem.choosed },
                        (n.couponItem.choosed, {}),
                      )
                    : o.e(
                        { w: n.couponItem.choosed },
                        (n.couponItem.choosed, {}),
                      ),
                )
              : {},
            { y: i.value },
            i.value
              ? {
                  z: o.t(n.couponItem.stock <= 0 ? "已抢光" : "立即领取"),
                  A: o.p({
                    block: !0,
                    theme: "black",
                    "custom-style": {
                      height: "30px",
                      width: "94px",
                      fontSize: "14px",
                      lineHeight: "14px",
                    },
                    disabled: n.couponItem.stock <= 0,
                  }),
                  B: o.o((o) => s(n.couponItem)),
                }
              : {},
            { C: n.showBtn && "EXCHANGECOUPON" === n.couponItem.groupCode },
            n.showBtn && "EXCHANGECOUPON" === n.couponItem.groupCode
              ? {
                  D: o.o((o) => {
                    return (e = n.couponItem), void p("chooseCoupon", e, "T");
                    var e;
                  }),
                }
              : {},
            { E: n.couponItem.showGift },
            (n.couponItem.showGift, {}),
            {
              F: n.couponItem.isHistory ? 1 : "",
              G: o.o((o) => (i.value ? "" : s(n.couponItem))),
            },
          );
          var r;
        };
      },
    }),
    c = o._export_sfc(u, [["__scopeId", "data-v-1da7b597"]]);
  wx.createComponent(c);
})();
