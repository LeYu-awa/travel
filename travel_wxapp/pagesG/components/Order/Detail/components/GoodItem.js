!(function () {
  "use strict";
  const e = require("../../../../../common/vendor.js"),
    n = require("../../../../domain/goods/modal.js"),
    o = require("../../../../../common/assets.js"),
    r = e.defineComponent({
      __name: "GoodItem",
      props: { img: null, name: null, amount: null, price: null },
      setup(r) {
        const t = r;
        return (r, m) => ({
          a: t.img || e.unref(o.noImg),
          b: e.t(t.name),
          c: e.t(t.amount),
          d: e.t(e.unref(n.renderPrice)(t.price)),
        });
      },
    }),
    t = e._export_sfc(r, [["__scopeId", "data-v-89121a4c"]]);
  wx.createComponent(t);
})();
