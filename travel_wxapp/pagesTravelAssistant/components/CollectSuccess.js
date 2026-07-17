!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = e.defineComponent({
      __name: "CollectSuccess",
      props: {
        modelValue: { type: Boolean, default: !1 },
        duration: { default: 3e3 },
        content: { default: "已加入 我的收藏-行程" },
        subContent: { default: "去看看" },
      },
      emits: ["update:modelValue", "jumpTo"],
      setup(t, { emit: o }) {
        const u = o,
          a = t,
          n = e.ref(!1),
          d = () => {
            u("jumpTo");
          };
        return (
          e.watch(
            () => a.modelValue,
            (e) => {
              (n.value = e),
                e &&
                  setTimeout(() => {
                    (n.value = !1), u("update:modelValue", !1);
                  }, a.duration);
            },
            { immediate: !0 },
          ),
          (t, o) =>
            e.e(
              { a: n.value },
              n.value
                ? { b: e.t(a.content), c: e.t(a.subContent), d: e.o(d) }
                : {},
            )
        );
      },
    }),
    o = e._export_sfc(t, [["__scopeId", "data-v-9da1674f"]]);
  wx.createComponent(o);
})();
