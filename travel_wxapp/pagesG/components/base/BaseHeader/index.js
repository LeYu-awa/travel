!(function () {
  "use strict";
  const e = require("../../../../common/vendor.js"),
    t = e.defineComponent({
      __name: "index",
      props: { title: null, desc: null, time: null },
      setup(t) {
        const n = t;
        return (t, o) =>
          e.e(
            { a: e.t(n.title), b: e.t(n.desc), c: n.time },
            n.time ? { d: e.t(n.time) } : {},
          );
      },
    }),
    n = e._export_sfc(t, [["__scopeId", "data-v-5ee053ed"]]);
  wx.createComponent(n);
})();
