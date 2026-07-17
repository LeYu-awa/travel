!(function () {
  "use strict";
  const e = require("../../../common/vendor.js");
  Math || a();
  const a = () => "./CenterDialog.js",
    o = e.defineComponent({
      __name: "IncalculableCenterDialog",
      props: { modelValue: { type: Boolean, default: !1 } },
      emits: ["update:modelValue"],
      setup(a, { emit: o }) {
        const l = o,
          t = a,
          u = e.ref(),
          d = e.ref(!1),
          n = (e) => {
            0 === e && l("update:modelValue", !1);
          },
          c = () => {
            (d.value = !1), l("update:modelValue", !1);
          };
        return (
          e.watch(
            () => t.modelValue,
            (e) => {
              d.value = e;
            },
            { immediate: !0 },
          ),
          (a, o) => ({
            a: e.o(c),
            b: e.sr(u, "3dd900e2-0", { k: "hookIncalculableDialog" }),
            c: e.o(n),
            d: e.o((e) => (d.value = e)),
            e: e.p({ title: "当前行程无法估价", modelValue: d.value }),
          })
        );
      },
    }),
    l = e._export_sfc(o, [["__scopeId", "data-v-3dd900e2"]]);
  wx.createComponent(l);
})();
