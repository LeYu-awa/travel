!(function () {
  "use strict";
  const e = require("../../../../common/vendor.js"),
    t = e.defineComponent({
      __name: "index",
      props: {
        display: { type: Boolean },
        title: null,
        placeholder: { default: "请选择" },
      },
      emits: ["click"],
      setup(t, { emit: o }) {
        const n = t,
          c = o,
          l = () => {
            c("click");
          };
        return (o, c) =>
          e.e(
            { a: e.t(n.title), b: !t.display },
            t.display ? {} : { c: e.t(n.placeholder) },
            { d: e.o(l) },
          );
      },
    }),
    o = e._export_sfc(t, [["__scopeId", "data-v-4430a3e7"]]);
  wx.createComponent(o);
})();
