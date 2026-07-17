!(function () {
  "use strict";
  const e = require("../../../common/vendor.js");
  Math || t();
  const t = () => "./CenterDialog.js",
    o = e.defineComponent({
      __name: "EstimatedCenterDialog",
      props: { modelValue: { type: Boolean, default: !1 } },
      emits: ["update:modelValue"],
      setup(t, { emit: o }) {
        const a = o,
          l = t,
          u = e.ref(),
          d = e.ref(!1),
          m = (e) => {
            0 === e && a("update:modelValue", !1);
          },
          n = () => {
            (d.value = !1), a("update:modelValue", !1);
          };
        return (
          e.watch(
            () => l.modelValue,
            (e) => {
              d.value = e;
            },
            { immediate: !0 },
          ),
          (t, o) => ({
            a: e.o(n),
            b: e.sr(u, "328c7b03-0", { k: "hookEstimatedDialog" }),
            c: e.o(m),
            d: e.o((e) => (d.value = e)),
            e: e.p({ title: "预估价格", modelValue: d.value }),
          })
        );
      },
    }),
    a = e._export_sfc(o, [["__scopeId", "data-v-328c7b03"]]);
  wx.createComponent(a);
})();
