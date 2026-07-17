!(function () {
  "use strict";
  const t = require("../../common/vendor.js"),
    o = t.defineComponent({
      __name: "StDialog",
      props: {
        show: { type: Boolean },
        title: null,
        message: null,
        showCancelButton: { type: Boolean, default: !0 },
        cancelButtonDisabled: { type: Boolean },
        cancelButtonText: { default: "取消" },
        showConfirmButton: { type: Boolean, default: !0 },
        confirmButtonDisabled: { type: Boolean },
        confirmButtonText: { default: "确认" },
        mark: { type: Boolean, default: !0 },
        closeOnClickMark: { type: Boolean },
        rounded: { type: Boolean, default: !0 },
        zIndex: { default: 10 },
        customStyle: null,
        contentStyle: null,
        cancelButtonStyle: null,
        confirmButtonStyle: null,
      },
      emits: ["cancel", "confirm", "update:show"],
      setup(o, { emit: n }) {
        const e = o,
          l = n;
        function a() {
          e.cancelButtonDisabled || (l("cancel"), l("update:show", !1));
        }
        function c() {
          e.confirmButtonDisabled || (l("confirm"), l("update:show", !1));
        }
        function u() {
          e.closeOnClickMark && l("update:show", !1);
        }
        return (n, e) =>
          t.e(
            {
              a: t.o(u),
              b: t.t(o.title),
              c: t.t(o.message),
              d: t.s(o.contentStyle),
              e: o.showCancelButton,
            },
            o.showCancelButton
              ? {
                  f: t.t(o.cancelButtonText),
                  g: t.n({
                    "st-dialog-action--disabled": o.cancelButtonDisabled,
                  }),
                  h: t.s(o.cancelButtonStyle),
                  i: t.o(a),
                }
              : {},
            { j: o.showConfirmButton },
            o.showConfirmButton
              ? {
                  k: t.t(o.confirmButtonText),
                  l: t.n({
                    "st-dialog-action--disabled": o.confirmButtonDisabled,
                  }),
                  m: t.s(o.confirmButtonStyle),
                  n: t.o(c),
                }
              : {},
            {
              o: t.n({ rounded: o.rounded }),
              p: t.n({ "st-dialog--show": o.show }),
              q: o.zIndex,
              r: t.s(o.customStyle),
              s: t.o(() => {}),
            },
          );
      },
    }),
    n = t._export_sfc(o, [["__scopeId", "data-v-182a0a39"]]);
  wx.createComponent(n);
})();
