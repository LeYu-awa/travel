!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    o = e.defineComponent({
      __name: "CloseButton",
      emits: ["onClick"],
      setup(o, { emit: n }) {
        const t = n,
          c = () => {
            t("onClick");
          };
        return (o, n) => ({ a: e.o(c) });
      },
    }),
    n = e._export_sfc(o, [["__scopeId", "data-v-a0530123"]]);
  wx.createComponent(n);
})();
