!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    a = require("../../utils/wxuser.js"),
    u = require("../../base/jAlert/jAlert.js"),
    n = require("../../utils/utils.js"),
    r = require("../../utils/filter.js");
  Math || (s + o + c + l)();
  const o = () => "../../components/switchBar.js",
    c = () => "../../components/empty.js",
    l = () => "../../components/lastText.js",
    s = () => "../../components/coustomHead.js",
    i = e.defineComponent({
      __name: "tradeInfo",
      setup(o) {
        let c = a.getStorage("config");
        a.getStorage("user");
        let l = e.ref(0),
          s = e.ref(15),
          i = e.ref(!1),
          f = e.ref(""),
          m = e.ref([]),
          v = e.ref(0),
          p = e.reactive([
            { name: "全部", active: !0, accountType: "" },
            { name: "消费", active: !1, accountType: "P" },
          ]);
        const d = (e) => {
            p.forEach((e) => {
              e.active = !1;
            }),
              (p[e].active = !0),
              (f.value = p[e].accountType),
              h();
          },
          g = () => {
            if (m.value.length > 0 && m.value.length >= v.value) return !1;
            if (i.value) return !1;
            i.value = !0;
            var e = {
              firstResult: l.value,
              pageSize: s.value,
              cardId: a.getStorage("accountItem").cardId || "",
              hotelGroupId: c.hotelGroupId,
              hotelGroupCode: c.hotelGroupCode,
              accountType: f.value,
            };
            t.api.listAccount(e).then((e) => {
              1 == e.result
                ? (e.retVal.accountList.forEach((e) => {
                    (e.amount = n.addNum(e.amount, e.amountTreat)),
                      "充值" == e.accountType &&
                        (e.amountDesc = "+" + r.valFormat(e.amount)),
                      "消费" == e.accountType &&
                        (e.amount < 0
                          ? (e.amountDesc =
                              "+" + r.valFormat(Math.abs(e.amount)))
                          : (e.amountDesc = "-" + r.valFormat(e.amount)));
                  }),
                  (m.value = m.value.concat(e.retVal.accountList)),
                  (l.value += s.value),
                  (v.value = e.retVal.totalRows),
                  (i.value = !1))
                : (u.jAlert3(e.msg), (i.value = !1));
            });
          },
          h = () => {
            (v.value = 0), (l.value = 0), (m.value = []), g();
          };
        return (
          e.onReachBottom(() => {
            g();
          }),
          e.onMounted(() => {
            g();
          }),
          (t, a) =>
            e.e(
              {
                a: e.p({ title: "交易明细", nativeMode: "true" }),
                b: e.o(d),
                c: e.p({ switchList: e.unref(p), padding: 40 }),
                d: e.f(e.unref(m), (t, a, u) => ({
                  a: e.t(t.remark),
                  b: e.t(t.createDate),
                  c: e.t(t.amountDesc),
                  d: a,
                })),
                e: 0 == e.unref(m).length && !e.unref(i),
              },
              (0 != e.unref(m).length || e.unref(i), {}),
              { f: e.unref(m).length > 0 && e.unref(v) == e.unref(m).length },
              e.unref(m).length > 0 && e.unref(v) == e.unref(m).length
                ? { g: e.p({ tips: "没有更多了" }) }
                : {},
            )
        );
      },
    }),
    f = e._export_sfc(i, [["__scopeId", "data-v-bfdb9a33"]]);
  wx.createPage(f);
})();
