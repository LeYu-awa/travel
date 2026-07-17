!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    t = require("../../../utils/platform.js"),
    o = require("../../../utils/preventScroll.js"),
    a = e.defineComponent({
      name: "centerDialog",
      props: {
        title: { type: String, default: () => "" },
        titleBorder: { type: Boolean, default: () => !1 },
        closable: { type: Boolean, default: () => !0 },
        maxDialog: { type: Boolean, default: () => !1 },
        sideslip: { type: Boolean, default: () => !1 },
        closeOnClickMask: { type: Boolean, default: () => !0 },
        modelValue: { type: Boolean, default: () => !1 },
      },
      emits: ["openState"],
      setup(a, { emit: l }) {
        let i = e.ref(!1),
          s = e.ref("90vh"),
          n = e.ref("70vh");
        const r = e.computed(() => {
            var e = "";
            return (
              a.maxDialog && (e = `max-height:${n.value};overflow-y: auto;`), e
            );
          }),
          u = () => {
            (i.value = !1), l("openState", 0), o.restoreScroll();
          };
        return (
          e.onMounted(() => {
            e.index.getSystemInfo({
              success: (e) => {
                const o = t.getMenuButtonBoundingClientRect();
                (s.value = e.screenHeight - o.top - o.height - 6 + "px"),
                  (n.value =
                    e.screenHeight -
                    o.bottom -
                    (o.top - e.statusBarHeight) -
                    56 +
                    "px");
              },
              fail(e) {
                console.log(e);
              },
            });
          }),
          e.watch(
            () => a.modelValue,
            (e, t) => {
              i.value = e;
            },
          ),
          {
            isShowDialog: i,
            showDialog: () => {
              (i.value = !0), l("openState", 1), o.preventScroll();
            },
            hideDialog: u,
            maxHeight: s,
            maxDialogHeight: n,
            maxDialogStyle: r,
            tapMask: () => {
              a.closeOnClickMask && u();
            },
          }
        );
      },
    }),
    l = e._export_sfc(a, [
      [
        "render",
        function (t, o, a, l, i, s) {
          return e.e(
            {
              a: e.o((...e) => t.tapMask && t.tapMask(...e)),
              b: t.isShowDialog ? 1 : "",
              c: t.isShowDialog ? 1 : "",
              d: e.t(t.title),
              e: t.titleBorder,
            },
            (t.titleBorder, {}),
            { f: t.maxDialog },
            t.maxDialog ? { g: e.s(t.maxDialogStyle) } : {},
            {
              h: t.isShowDialog && !t.sideslip ? 1 : "",
              i: t.isShowDialog && t.sideslip ? 1 : "",
              j: t.isShowDialog ? 1 : "",
              k: t.maxHeight,
              l: t.isShowDialog,
            },
          );
        },
      ],
      ["__scopeId", "data-v-53c45944"],
    ]);
  wx.createComponent(l);
})();
