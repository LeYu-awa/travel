!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = e.defineComponent({
      __name: "DaysAddButton",
      props: { text: { default: "添加1天" } },
      emits: ["onClick"],
      setup(t, { emit: o }) {
        const n = o,
          s = () => {
            n("onClick");
          };
        return (o, n) => ({ a: e.t(t.text), b: e.o(s) });
      },
    }),
    o = e._export_sfc(t, [["__scopeId", "data-v-fee1b827"]]);
  wx.createComponent(o);
})();
