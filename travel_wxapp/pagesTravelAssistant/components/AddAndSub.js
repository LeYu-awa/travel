!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    u = e.defineComponent({
      __name: "AddAndSub",
      props: {
        modelValue: null,
        minNum: { default: 0 },
        maxNum: { default: 1e5 },
      },
      emits: ["update:modelValue", "change"],
      setup(u, { emit: a }) {
        const m = a,
          n = u;
        let t = e.ref(0);
        e.watch(
          () => n.modelValue,
          (e) => {
            t.value = e;
          },
          { immediate: !0 },
        );
        const d = (e) => {
          if ("add" == e) t.value < n.maxNum && t.value++;
          else {
            if (!(t.value > n.minNum)) return;
            t.value--;
          }
          m("update:modelValue", t.value), m("change", t.value);
        };
        return (a, m) => ({
          a: e.unref(t) <= u.minNum ? 1 : "",
          b: e.o((e) => d("reduce")),
          c: e.t(e.unref(t)),
          d: e.unref(t) >= u.maxNum ? 1 : "",
          e: e.o((e) => d("add")),
        });
      },
    }),
    a = e._export_sfc(u, [["__scopeId", "data-v-a75d1603"]]);
  wx.createComponent(a);
})();
