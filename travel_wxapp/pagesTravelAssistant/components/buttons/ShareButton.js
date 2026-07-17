!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    o = e.defineComponent({
      __name: "ShareButton",
      props: { openType: { default: "" } },
      emits: ["onClick"],
      setup(o, { emit: n }) {
        const t = n,
          c = () => {
            t("onClick");
          };
        return (n, t) => ({ a: o.openType, b: e.o(c) });
      },
    }),
    n = e._export_sfc(o, [["__scopeId", "data-v-cec008ec"]]);
  wx.createComponent(n);
})();
