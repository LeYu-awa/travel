!(function () {
  "use strict";
  const e = require("../../../../../common/vendor.js"),
    t = e.defineComponent({
      __name: "KeyValue",
      props: {
        separate: { type: Boolean },
        label: null,
        value: null,
        flex: { type: Boolean },
      },
      setup(t) {
        const l = t,
          a = e.useSlots(),
          o = e.computed(() => e.isNil$1(l.value) && !a.default);
        return (t, a) => ({
          a: e.t(l.label),
          b: e.t(o.value ? "-" : l.value),
          c: l.flex ? 1 : "",
          d: l.separate ? 1 : "",
        });
      },
    }),
    l = e._export_sfc(t, [["__scopeId", "data-v-2d45ed34"]]);
  wx.createComponent(l);
})();
