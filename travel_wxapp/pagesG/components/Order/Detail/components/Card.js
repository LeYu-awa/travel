!(function () {
  "use strict";
  const e = require("../../../../../common/vendor.js"),
    t = e.defineComponent({
      __name: "Card",
      props: { title: null },
      setup(t) {
        const n = t;
        return (t, o) => ({ a: e.t(n.title) });
      },
    }),
    n = e._export_sfc(t, [["__scopeId", "data-v-6b4f02e0"]]);
  wx.createComponent(n);
})();
