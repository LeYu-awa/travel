!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    n = e.defineComponent({
      __name: "Layout",
      props: { bg: null },
      setup(e) {
        const n = e;
        return (e, o) => ({ a: n.bg });
      },
    }),
    o = e._export_sfc(n, [["__scopeId", "data-v-6c30ec99"]]);
  wx.createComponent(o);
})();
