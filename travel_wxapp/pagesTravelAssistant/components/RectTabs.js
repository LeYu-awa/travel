!(function () {
  "use strict";
  const e = require("../../common/vendor.js");
  Math || t();
  const t = () => "./LineTabs.js",
    a = e.defineComponent({
      __name: "RectTabs",
      props: {
        modelValue: { default: "-1" },
        data: null,
        tapAutoSticky: { type: Boolean, default: !0 },
        canCancel: { type: Boolean, default: !0 },
        itemHeight: { default: "38px" },
        fkDefaultFontSize: { default: 12 },
      },
      emits: ["change"],
      setup(t, { emit: a }) {
        const o = a,
          l = t,
          n = e.ref(!1);
        e.ref(!0);
        const c = e.ref(0),
          i = e.ref("");
        e.watch(
          () => l.modelValue,
          (e) => {
            i.value = e;
          },
          { immediate: !0 },
        );
        const u = (e, t) => {
            l.tapAutoSticky && d(), o("change", { value: e, index: t });
          },
          d = () => {
            e.index.pageScrollTo({
              selector: ".tabs",
              offsetTop: -94,
              complete: (e) => {},
            });
          };
        return (a, o) =>
          e.e(
            { a: n.value },
            n.value
              ? e.e(
                  { b: t.data && t.data.length > 0 },
                  (t.data && t.data.length, {}),
                )
              : {},
            { c: t.data.length > 0 },
            t.data.length > 0
              ? {
                  d: e.o(u),
                  e: e.p({
                    datas: t.data,
                    init: !1,
                    canCancel: l.canCancel,
                    type: "fk",
                    borderColor: "#eee",
                    borderActiveColor: "#A43127",
                    titleInactiveColor: "#000000",
                    flexNum: "F",
                    color: "#000000",
                    activeType: i.value,
                    itemHeight: t.itemHeight,
                    fkDefaultFontSize: t.fkDefaultFontSize,
                  }),
                }
              : {},
            { f: n.value ? 1 : "", g: c.value + "px" },
          );
      },
    });
  wx.createComponent(a);
})();
