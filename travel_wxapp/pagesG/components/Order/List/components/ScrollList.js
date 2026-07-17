!(function () {
  "use strict";
  const e = require("../../../../../common/vendor.js"),
    r = require("../useOrderListStore.js");
  Math || t();
  const t = () => "./Card.js",
    a = e.defineComponent({
      __name: "ScrollList",
      props: { type: null },
      setup(t) {
        const a = t,
          l = r.useOrderListStore(),
          s = e.computed(() =>
            "serve" === a.type ? l.waitOrders.list : l.allOrders.list,
          ),
          o = e.ref(1),
          n = e.ref(!1),
          u = async () => {
            (n.value = !0),
              (o.value = 1),
              await l.fetchOrders({
                pageNo: 1,
                orderSta: "all" === a.type ? "" : "R",
              }),
              (n.value = !1);
          },
          c = () => {
            if ("all" === a.type) {
              if (!(l.allOrders.list.length < l.allOrders.total)) return;
            } else if (!(l.waitOrders.list.length < l.waitOrders.total)) return;
            return (
              (o.value = o.value + 1),
              l.fetchOrders({
                pageNo: o.value,
                orderSta: "all" === a.type ? "" : "R",
              })
            );
          };
        return (r, t) =>
          e.e(
            {
              a: e.f(s.value, (r, t, a) => ({
                a: r.id,
                b: "cc77ac15-0-" + a,
                c: e.p({ ...r }),
              })),
              b: 0 === s.value.length && !e.unref(l).fetchOrdersLoading,
            },
            (0 !== s.value.length || e.unref(l).fetchOrdersLoading, {}),
            { c: e.o(c), d: n.value, e: e.o(u) },
          );
      },
    }),
    l = e._export_sfc(a, [["__scopeId", "data-v-cc77ac15"]]);
  wx.createComponent(l);
})();
