!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/wxuser.js"),
    r = require("../../utils/filter.js"),
    a = require("../../utils/utils.js");
  Math || (o + n + u)();
  const n = () => "../../components/linkItem.js",
    o = () => "../../components/coustomHead.js",
    u = () => "../../components/kfDialog.js",
    l = e.defineComponent({
      __name: "memberAccountInfo",
      setup(n) {
        const o = e.ref();
        let u = e.ref(""),
          l = e.ref(0),
          s = e.ref(0),
          i = e.ref("");
        e.onLoad((t) => {
          t && t.type && (u.value = t.type);
          let r = "消费金详情";
          "reserve" == u.value && (r = "保留金详情"),
            e.index.setNavigationBarTitle({ title: r }),
            (i.value = r);
        });
        let c = e.ref({ rechage: 0, pay: 0 });
        const f = () => {
          o.value.showDialog();
        };
        let m = e.reactive([
            { name: "交易明细", link: "/pagesA/member/tradeInfo" },
          ]),
          v = e.reactive([
            {
              name: "适用范围",
              link: "",
              type: "storageRule",
              value: "rightsRule",
            },
            {
              name: "使用帮助",
              link: "",
              type: "storageRule",
              value: "levelRule",
            },
          ]);
        const d = () => {
            e.index.showModal({
              title: "已过期",
              content:
                ("consumer" == u.value ? "消费金" : "保留金") +
                "已超过有效期，如有疑问请联系客服。",
              confirmText: "我知道了",
              showCancel: !1,
              confirmColor: "#000000",
            });
          },
          p = (r) => {
            r.link && a.goPage(r.link),
              "storageRule" == r.type &&
                (t.setStorage("rule", {
                  desc: c.value[r.value],
                  title: r.name,
                }),
                e.index.navigateTo({
                  url: `/pagesA/other/codeText?title=${encodeURIComponent(
                    r.name,
                  )}&type=storage`,
                }));
          };
        return (
          e.onMounted(() => {
            let r = t.getStorage("accountItem");
            e
              .dayjs()
              .isBefore(
                e.dayjs(e.dayjs(r.endDate).format("YYYY-MM-DD") + " 23:59:59"),
              ) || (r.isHistory = !0),
              (c.value = r),
              (l.value = a.subtraction(c.value.recharge, c.value.pay)),
              (s.value = a.subtraction(l.value, c.value.treatAccountBalance));
          }),
          (t, a) =>
            e.e(
              {
                a: e.p({ title: e.unref(i), nativeMode: "true" }),
                b: e.t(e.unref(c).cardLevelDescript),
                c: e.t(e.unref(l)),
                d: "consumer" == e.unref(u),
              },
              "consumer" == e.unref(u)
                ? {
                    e: e.t(e.unref(r.valFormat)(e.unref(s))),
                    f: e.t(
                      e.unref(r.valFormat)(e.unref(c).treatAccountBalance),
                    ),
                  }
                : {},
              { g: "reserve" == e.unref(u) },
              "reserve" == e.unref(u)
                ? {
                    h: e.t(
                      e.unref(r.valFormat)(e.unref(c).treatAccountBalance),
                    ),
                  }
                : {},
              { i: e.unref(c).isHistory },
              e.unref(c).isHistory ? { j: e.o(d) } : {},
              {
                k: e.t(e.unref(r.timeDay)(e.unref(c).beginDate)),
                l: e.t(e.unref(r.timeDay)(e.unref(c).endDate)),
                m: e.t(e.unref(c).cardNo),
                n: e.f(e.unref(m), (t, r, a) => ({
                  a: r,
                  b: e.o(p, r),
                  c: "3e8794a8-1-" + a,
                  d: e.p({ linkItem: t }),
                })),
                o: e.f(e.unref(v), (t, r, a) => ({
                  a: r,
                  b: e.o(p, r),
                  c: "3e8794a8-2-" + a,
                  d: e.p({ linkItem: t }),
                })),
                p: e.o(f),
                q: e.sr(o, "3e8794a8-3", { k: "kf" }),
                r: e.p({ title: "联系客服" }),
              },
            )
        );
      },
    }),
    s = e._export_sfc(l, [["__scopeId", "data-v-3e8794a8"]]);
  wx.createPage(s);
})();
