!(function () {
  "use strict";
  const e = require("../../../common/vendor.js");
  Math || t();
  const t = () => "./CenterDialog.js",
    o = e.defineComponent({
      __name: "DeleteDayCenterDialog",
      props: {
        modelValue: { type: Boolean, default: !1 },
        title: null,
        content: { default: "" },
      },
      emits: ["update:modelValue", "confirm", "cancel"],
      setup(t, { emit: o }) {
        const a = o,
          l = t,
          n = e.ref(),
          u = e.ref(!1),
          c = (e) => {
            0 === e && a("update:modelValue", !1);
          },
          d = () => {
            (u.value = !1), a("update:modelValue", !1), a("cancel");
          },
          m = () => {
            (u.value = !1), a("update:modelValue", !1), a("confirm");
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
            a: e.t(t.content),
            b: e.o(m),
            c: e.o(d),
            d: e.sr(n, "5cef8201-0", { k: "hookDelDayDialog" }),
            e: e.o(c),
            f: e.o((e) => (u.value = e)),
            g: e.p({ title: t.title, modelValue: u.value }),
          })
        );
      },
    }),
    a = e._export_sfc(o, [["__scopeId", "data-v-5cef8201"]]);
  wx.createComponent(a);
})();
