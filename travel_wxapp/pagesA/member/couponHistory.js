!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    o = require("../../utils/wxuser.js");
  Math || (s + a + r)();
  const a = () => "../../components/couponItem.js",
    r = () => "../../components/empty.js",
    s = () => "../../components/coustomHead.js",
    n = e.defineComponent({
      __name: "couponHistory",
      setup(a) {
        let r = o.getStorage("config"),
          s = o.getStorage("user"),
          n = e.ref(0),
          u = e.ref(15),
          l = e.ref(!1),
          i = e.ref("O,P"),
          d = e.ref([]);
        const p = () => {
            if (l.value) return !1;
            (l.value = !0),
              t.api
                .listCouponWithHistoryByCardNo({
                  ownMemberId: s.memberId || "",
                  sta: i.value,
                  hotelGroupId: r.hotelGroupId,
                  hotelGroupCode: r.hotelGroupCode,
                  firstResult: n.value,
                  pageSize: u.value,
                  hotelCode: r.hotelCode,
                  beginDatetime: "",
                  endDatetime: "",
                  ownMobile: "",
                  salesChannel: "",
                  salesHotelCode: "",
                  saleType: "",
                  isFromGift: "",
                })
                .then((e) => {
                  if (((l.value = !1), 1 == e.result)) {
                    n.value = n.value + u.value;
                    for (var t = 0; t < e.retVal.datas.length; t++)
                      if (
                        ((e.retVal.datas[t].isHistory = !0),
                        "MZ" == e.retVal.datas[t].discountType ||
                          "LZ" == e.retVal.datas[t].discountType)
                      ) {
                        e.retVal.datas[t].couponType = "RF";
                        let o = (
                          10 * Number(e.retVal.datas[t].discountNum)
                        ).toFixed(1);
                        o - parseInt(o) > 0 || (o = Number(o).toFixed(0)),
                          (e.retVal.datas[t].discountNum = o);
                      }
                    d.value = d.value.concat(e.retVal.datas);
                  }
                });
          },
          c = (e) => {};
        return (
          e.onReachBottom(() => {
            p();
          }),
          e.onMounted(() => {
            p();
          }),
          (t, o) =>
            e.e(
              {
                a: e.p({ title: "历史券包", nativeMode: "true" }),
                b: e.f(e.unref(d), (t, o, a) => ({
                  a: e.o(c, o),
                  b: "fba16d39-1-" + a,
                  c: e.p({ couponItem: t }),
                  d: o,
                })),
                c: 0 == e.unref(d).length,
              },
              0 == e.unref(d).length ? { d: e.p({ tips: "暂无券包" }) } : {},
            )
        );
      },
    }),
    u = e._export_sfc(n, [["__scopeId", "data-v-fba16d39"]]);
  wx.createPage(u);
})();
