!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    o = require("../../../utils/platform.js"),
    t = require("../../../utils/preventScroll.js"),
    l = e.defineComponent({
      name: "bottomDialog",
      props: {
        title: { type: String, default: () => "" },
        titleBorder: { type: Boolean, default: () => !1 },
        closable: { type: Boolean, default: () => !0 },
        maxDialog: { type: Boolean, default: () => !1 },
        sideslip: { type: Boolean, default: () => !1 },
        visible: { type: Boolean, default: () => !1 },
        closeOnClickMask: { type: Boolean, default: () => !0 },
        customWrapStyle: String,
      },
      watch: {
        visible(e) {
          e ? this.showDialog() : this.hideDialog();
        },
      },
      emits: ["openState"],
      setup(l, { emit: i }) {
        let a = e.ref(!1),
          s = e.ref("90vh"),
          n = e.ref("70vh");
        const r = e.computed(() => {
            var e = l.customWrapStyle || "";
            return (
              l.maxDialog && (e += `max-height:${n.value};overflow-y: auto;`), e
            );
          }),
          g = () => {
            (a.value = !1), i("openState", 0), t.restoreScroll();
          };
        return (
          e.onMounted(() => {
            e.index.getSystemInfo({
              success: (e) => {
                const t = o.getMenuButtonBoundingClientRect();
                (s.value = e.screenHeight - t.top - t.height - 6 + "px"),
                  (n.value =
                    e.screenHeight -
                    t.bottom -
                    (t.top - e.statusBarHeight) -
                    56 +
                    "px");
              },
              fail(e) {
                console.log(e);
              },
            });
          }),
          {
            isShowDialog: a,
            showDialog: () => {
              (a.value = !0), i("openState", 1), t.preventScroll();
            },
            hideDialog: g,
            maxHeight: s,
            maxDialogHeight: n,
            maxDialogStyle: r,
            tapMask: () => {
              l.closeOnClickMask && g();
            },
          }
        );
      },
    }),
    i = e._export_sfc(l, [
      [
        "render",
        function (o, t, l, i, a, s) {
          return e.e(
            {
              a: e.o((...e) => o.tapMask && o.tapMask(...e)),
              b: o.isShowDialog ? 1 : "",
              c: o.isShowDialog ? 1 : "",
              d: e.t(o.title),
              e: o.titleBorder,
            },
            (o.titleBorder, {}),
            { f: o.sideslip },
            o.sideslip
              ? e.e(
                  { g: o.closable },
                  o.closable
                    ? { h: e.o((...e) => o.hideDialog && o.hideDialog(...e)) }
                    : {},
                )
              : e.e(
                  { i: o.closable },
                  o.closable
                    ? { j: e.o((...e) => o.hideDialog && o.hideDialog(...e)) }
                    : {},
                ),
            { k: o.maxDialog },
            o.maxDialog ? { l: e.s(o.maxDialogStyle) } : {},
            { m: !o.maxDialog },
            o.maxDialog ? {} : { n: e.s(o.customWrapStyle) },
            {
              o: o.isShowDialog && !o.sideslip ? 1 : "",
              p: o.isShowDialog && o.sideslip ? 1 : "",
              q: o.isShowDialog ? 1 : "",
              r: o.maxHeight,
              s: o.isShowDialog,
            },
          );
        },
      ],
      ["__scopeId", "data-v-dd83c503"],
    ]);
  wx.createComponent(i);
})();
