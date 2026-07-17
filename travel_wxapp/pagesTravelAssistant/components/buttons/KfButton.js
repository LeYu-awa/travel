!(function () {
  "use strict";
  const o = require("../../../common/vendor.js"),
    e = o.defineComponent({
      __name: "KfButton",
      props: { bgColor: { default: "rgba(255, 255, 255, 0.8)" } },
      emits: ["onClick"],
      setup(e, { emit: t }) {
        const n = t,
          r = e,
          c = () => {
            n("onClick");
          };
        return (e, t) => ({ a: o.o(c), b: r.bgColor });
      },
    }),
    t = o._export_sfc(e, [["__scopeId", "data-v-6e60ba96"]]);
  wx.createComponent(t);
})();
