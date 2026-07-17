!(function () {
  "use strict";
  const o = require("../../../../common/vendor.js"),
    e = require("../../../../common/assets.js"),
    r = require("../../../domain/goods/modal.js"),
    n = o.defineComponent({
      __name: "GoodItem",
      props: { searchTxt: null, good: null },
      emits: ["increase", "decrease"],
      setup(n, { emit: t }) {
        const s = n,
          d = t,
          a = () => {
            d("decrease");
          },
          c = () => {
            d("increase");
          };
        return (n, t) =>
          o.e(
            {
              a: s.good.picture || o.unref(e.noImg),
              b: o.o(() => {
                var e;
                (e = s.good.picture) && o.index.previewImage({ urls: [e] });
              }),
              c: s.good.name
                .split(s.searchTxt)
                .join(`<span style='color:red'>${s.searchTxt}</span>`),
              d: "number" == typeof s.good.price,
            },
            "number" == typeof s.good.price
              ? { e: o.t(o.unref(r.renderPrice)(s.good.price)) }
              : {},
            { f: s.good.stock !== 1 / 0 },
            s.good.stock !== 1 / 0
              ? { g: o.t(s.good.stock), h: 0 === s.good.stock ? 1 : "" }
              : {},
            { i: s.good.quantity > 0 },
            s.good.quantity > 0
              ? { j: o.o(a), k: e._imports_0$4, l: o.t(s.good.quantity) }
              : {},
            { m: o.unref(r.allowIncrease)(s.good) },
            o.unref(r.allowIncrease)(s.good)
              ? { n: o.o(c), o: e._imports_1 }
              : {},
            { p: !o.unref(r.allowIncrease)(s.good) },
            o.unref(r.allowIncrease)(s.good) ? {} : { q: e._imports_2 },
            { r: 0 === s.good.quantity ? 1 : "" },
          );
      },
    }),
    t = o._export_sfc(n, [["__scopeId", "data-v-1d347428"]]);
  wx.createComponent(t);
})();
