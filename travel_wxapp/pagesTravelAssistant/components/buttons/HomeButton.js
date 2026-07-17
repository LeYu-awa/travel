!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    o = require("../../../utils/utils.js"),
    t = e.defineComponent({
      __name: "HomeButton",
      props: { bgColor: { default: "rgba(255, 255, 255, 0.8)" } },
      emits: ["onClick"],
      setup(t, { emit: n }) {
        const r = t,
          s = () => {
            o.goPage("/pages/travel/index");
          };
        return (o, t) => ({ a: e.o(s), b: r.bgColor });
      },
    }),
    n = e._export_sfc(t, [["__scopeId", "data-v-8019ee4d"]]);
  wx.createComponent(n);
})();
