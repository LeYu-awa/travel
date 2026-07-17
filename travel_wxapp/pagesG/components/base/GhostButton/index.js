!(function () {
  "use strict";
  const e = require("../../../../common/vendor.js"),
    o = e.defineComponent({
      __name: "index",
      props: { disabled: { type: Boolean } },
      emits: ["click"],
      setup(o, { emit: n }) {
        const t = o,
          s = n,
          c = () => {
            t.disabled || s("click");
          };
        return (o, n) => ({ a: t.disabled ? 1 : "", b: e.o(c) });
      },
    }),
    n = e._export_sfc(o, [["__scopeId", "data-v-f0d122b5"]]);
  wx.createComponent(n);
})();
