!(function () {
  "use strict";
  const o = require("../../../../common/vendor.js"),
    e = require("../../../domain/goods/modal.js"),
    t = require("../../../store/useGoodsStore.js");
  Math || (i + s)();
  const s = () => "../../../../components/bottomDialog.js",
    i = () => "../GoodList/GoodItem.js",
    n = o.defineComponent({
      __name: "index",
      props: { visible: { type: Boolean } },
      emits: ["close"],
      setup(s, { emit: i }) {
        const n = s,
          d = t.useGoodsStore(),
          r = o.computed(() => e.getSelection(d.goods)),
          a = i,
          c = (o) => {
            o || a("close");
          };
        return (t, s) =>
          o.e(
            {
              a: o.f(r.value, (t, s, i) => ({
                a: o.o(() => {
                  return (
                    (o = t.id), void d.setGoods(e.increaseQuantity(d.goods, o))
                  );
                  var o;
                }),
                b: o.o(() => {
                  return (
                    (o = t.id), void d.setGoods(e.decreaseQuantity(d.goods, o))
                  );
                  var o;
                }),
                c: "197cfbfb-1-" + i + ",197cfbfb-0",
                d: o.p({ searchTxt: "", good: t }),
              })),
              b: !r.value.length,
            },
            (r.value.length, {}),
            {
              c: o.o(c),
              d: o.p({ visible: n.visible, title: "已选", maxDialog: !0 }),
            },
          );
      },
    }),
    d = o._export_sfc(n, [["__scopeId", "data-v-197cfbfb"]]);
  wx.createComponent(d);
})();
