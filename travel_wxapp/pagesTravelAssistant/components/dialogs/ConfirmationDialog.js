!(function () {
  "use strict";
  const e = require("../../../common/vendor.js");
  Math || o();
  const o = () => "./CenterDialog.js",
    a = e.defineComponent({
      options: { styleIsolation: "shared" },
      __name: "ConfirmationDialog",
      props: { modelValue: { type: Boolean, default: !1 } },
      emits: ["update:modelValue", "confirm"],
      setup(o, { emit: a }) {
        const t = a,
          n = o,
          l = e.ref(),
          i = e.ref(!1),
          s = () => {
            (i.value = !1), t("update:modelValue", !1), t("confirm");
          };
        return (
          e.watch(
            () => n.modelValue,
            (e) => {
              i.value = e;
            },
            { immediate: !0 },
          ),
          (o, a) => ({
            a: e.o(s),
            b: e.sr(l, "dfa55826-0", { k: "confirmationDialog" }),
            c: e.o((e) => (i.value = e)),
            d: e.p({ closeOnClickMask: !1, modelValue: i.value }),
          })
        );
      },
    }),
    t = e._export_sfc(a, [["__scopeId", "data-v-dfa55826"]]);
  wx.createComponent(t);
})();
