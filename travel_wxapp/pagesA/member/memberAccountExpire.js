!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    r = require("../../utils/utils.js"),
    a = require("../../utils/wxuser.js"),
    o = require("../../utils/filter.js");
  Math || (l + n + i)();
  const n = () => "../components/accountItem.js",
    i = () => "../../components/empty.js",
    l = () => "../../components/coustomHead.js",
    s = e.defineComponent({
      __name: "memberAccountExpire",
      setup(n) {
        let i = a.getStorage("config"),
          l = a.getStorage("user"),
          s = e.ref([]),
          u = e.ref(""),
          c = e.ref(""),
          d = e.ref("");
        return (
          e.onLoad((e) => {
            e && e.type && ((u.value = e.type), (c.value = e.cardType));
          }),
          e.onMounted(() => {
            var a;
            (a = c.value),
              t.api
                .queryMemberCardByCondition({
                  hotelGroupCode: i.hotelGroupCode,
                  cardType: a,
                  isIncludeAbnormal: "X",
                  memberId: l.memberId,
                  channel: "wechat",
                })
                .then((e) => {
                  1 == e.result &&
                    0 == e.retVal.result &&
                    e.retVal.retVal.cardList &&
                    e.retVal.retVal.cardList.length > 0 &&
                    (e.retVal.retVal.cardList.forEach((e) => {
                      (e.title = e.cardLevelDescript),
                        (e.validTime = o.timeDay(e.endDate)),
                        (e.price = r.subtraction(e.recharge, e.pay)),
                        (e.type = u.value),
                        (e.isHistory = !0);
                    }),
                    (s.value = e.retVal.retVal.cardList));
                });
            let n = "已过期消费金";
            "reserve" == u.value && (n = "已过期用保留金"),
              e.index.setNavigationBarTitle({ title: n }),
              (d.value = n);
          }),
          (t, o) =>
            e.e(
              {
                a: e.p({ title: e.unref(d), nativeMode: "true" }),
                b: e.f(e.unref(s), (t, o, n) => ({
                  a: e.o(
                    (e) =>
                      ((e) => {
                        a.setStorage("accountItem", e),
                          console.log(e.type),
                          r.goPage(
                            "/pagesA/member/memberAccountInfo?type=" + e.type,
                          );
                      })(t),
                    o,
                  ),
                  b: "2a7fd859-1-" + n,
                  c: e.p({ item: t }),
                  d: o,
                })),
                c: 0 == e.unref(s).length,
              },
              (e.unref(s).length, {}),
            )
        );
      },
    }),
    u = e._export_sfc(s, [["__scopeId", "data-v-2a7fd859"]]);
  wx.createPage(u);
})();
