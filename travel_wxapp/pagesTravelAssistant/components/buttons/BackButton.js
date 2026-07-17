!(function () {
  "use strict";
  const o = require("../../../common/vendor.js"),
    e = o.defineComponent({
      __name: "BackButton",
      props: { bgColor: { default: "#cccccc" } },
      emits: ["onClick"],
      setup(e, { emit: c }) {
        const t = c,
          n = e,
          r = () => {
            t("onClick");
          };
        return (e, c) => ({ a: o.o(r), b: n.bgColor });
      },
    }),
    c = o._export_sfc(e, [["__scopeId", "data-v-e648f339"]]);
  wx.createComponent(c);
})();
