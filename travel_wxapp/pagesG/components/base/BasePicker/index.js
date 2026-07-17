!(function () {
  "use strict";
  const e = require("../../../../common/vendor.js");
  Math || (t + o + l)();
  const o = () => "../SafeBottom/index.js",
    t = () => "../PickTrigger/index.js",
    l = () => "../../../../components/bottomDialog.js",
    a = e.defineComponent({
      __name: "index",
      props: { modelValue: null, options: null, title: null },
      emits: ["update:modelValue"],
      setup(o, { emit: t }) {
        const l = e.ref(!1),
          a = o,
          n = t,
          u = e.computed(() =>
            e.pipe(
              e.find(e.propEq(a.modelValue, "value")),
              e.prop("label"),
            )(a.options),
          ),
          i = () => {
            l.value = !0;
          },
          p = () => {
            l.value = !1;
          };
        return (o, t) => ({
          a: e.t(u.value),
          b: e.p({ title: "意见类型", display: !!u.value }),
          c: e.o(i),
          d: e.f(a.options, (o, t, l) => ({
            a: e.t(o.label),
            b: o.value,
            c: e.o((e) => {
              return (t = o.value), n("update:modelValue", t), void p();
              var t;
            }, o.value),
          })),
          e: e.o(p),
          f: e.o((e) => (l.value = !!e)),
          g: e.p({ visible: l.value, type: "bottom", title: a.title }),
        });
      },
    }),
    n = e._export_sfc(a, [["__scopeId", "data-v-4ccc7ea7"]]);
  wx.createComponent(n);
})();
