!(function () {
  "use strict";
  const e = require("../../../common/vendor.js");
  Math || o();
  const o = () => "./CenterDialog.js",
    a = e.defineComponent({
      __name: "NoNeedStewardCenterDialog",
      props: { modelValue: { type: Boolean, default: !1 } },
      emits: ["update:modelValue", "confirm", "cancel"],
      setup(o, { emit: a }) {
        const t = a,
          l = o,
          d = e.ref(),
          u = e.ref(!1),
          n = (e) => {
            0 === e && t("update:modelValue", !1);
          },
          m = () => {
            (u.value = !1), t("update:modelValue", !1), t("cancel");
          },
          r = () => {
            (u.value = !1), t("update:modelValue", !1), t("confirm");
          };
        return (
          e.watch(
            () => l.modelValue,
            (e) => {
              u.value = e;
            },
            { immediate: !0 },
          ),
          (o, a) => ({
            a: e.o(r),
            b: e.o(m),
            c: e.sr(d, "d3afff67-0", { k: "hookNoNeedStewardDialog" }),
            d: e.o(n),
            e: e.o((e) => (u.value = e)),
            f: e.p({ title: "是否确认不需要管家？", modelValue: u.value }),
          })
        );
      },
    }),
    t = e._export_sfc(a, [["__scopeId", "data-v-d3afff67"]]);
  wx.createComponent(t);
})();
