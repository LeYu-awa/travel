!(function () {
  "use strict";
  const e = require("../../../common/vendor.js");
  Math || (o + l + t)();
  const t = () => "./BottomDialog.js",
    o = () => "../../../components/new/StButton.js",
    l = () => "../../../components/new/FixedBottomView.js",
    a = e.defineComponent({
      __name: "IntelligenceFillDialog",
      props: {
        modelValue: { type: Boolean, default: !1 },
        title: { default: "智能填充途径地" },
        data: null,
      },
      emits: ["update:modelValue", "confirm", "cancel"],
      setup(t, { emit: o }) {
        const l = o,
          a = t,
          i = e.ref(),
          c = e.ref(!1),
          n = () => {
            d(), l("confirm");
          },
          s = () => {
            d(), l("cancel");
          },
          m = (e) => {
            0 === e && l("update:modelValue", !1);
          },
          d = () => {
            (c.value = !1), l("update:modelValue", !1);
          };
        return (
          e.watch(
            () => a.modelValue,
            (e) => {
              c.value = e;
            },
            { immediate: !0 },
          ),
          (o, l) => ({
            a: e.f(t.data, (t, o, l) => ({
              a: t.picUrl
                ? t.picUrl +
                  "?imageView2/1/w/48/h/48&x-oss-process=image/resize,m_fill,w_48,h_48"
                : "",
              b: e.t(t.destName),
              c: o,
            })),
            b: e.s("max-height: calc(90vh - 56px - 188px)"),
            c: e.o(s),
            d: e.o(n),
            e: e.p({
              theme: "black",
              customStyle: {
                flex: 1,
                height: "48px",
                color: "#fff",
                borderRadius: "4px",
              },
              block: !0,
            }),
            f: e.p({
              theme: "white",
              "custom-style": { backgroundColor: "#fff", zIndex: 10 },
            }),
            g: e.sr(i, "a3b3197d-0", { k: "hookIntelFillDialog" }),
            h: e.o(m),
            i: e.p({ visible: c.value, title: a.title, closeOnClickMask: !1 }),
          })
        );
      },
    }),
    i = e._export_sfc(a, [["__scopeId", "data-v-a3b3197d"]]);
  wx.createComponent(i);
})();
