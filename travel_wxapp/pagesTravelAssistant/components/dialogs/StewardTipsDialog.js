!(function () {
  "use strict";
  const e = require("../../../common/vendor.js");
  Math || (t + o)();
  const o = () => "./BottomDialog.js",
    t = () => "../buttons/CloseButton.js",
    a = e.defineComponent({
      __name: "StewardTipsDialog",
      props: { modelValue: { type: Boolean, default: !1 }, content: null },
      emits: ["update:modelValue"],
      setup(o, { emit: t }) {
        const a = t,
          l = o,
          s = e.ref(!1);
        e.watch(
          () => l.modelValue,
          (e) => {
            s.value = e;
          },
          { immediate: !0 },
        );
        const n = e.ref(),
          r = (e) => {
            0 === e && a("update:modelValue", !1);
          },
          u = () => {
            s.value = !1;
          };
        return (o, t) => ({
          a: e.o(u),
          b: e.s("height: calc(90vh - 282px)"),
          c: e.sr(n, "0b580299-0", { k: "hookDialog" }),
          d: e.o(r),
          e: e.p({
            visible: s.value,
            customWrapStyle:
              "border-top-left-radius: 16px; border-top-right-radius: 16px;",
          }),
        });
      },
    }),
    l = e._export_sfc(a, [["__scopeId", "data-v-0b580299"]]);
  wx.createComponent(l);
})();
