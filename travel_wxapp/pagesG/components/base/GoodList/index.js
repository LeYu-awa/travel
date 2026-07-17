!(function () {
  "use strict";
  const e = require("../../../../common/vendor.js"),
    a = require("../../../../common/assets.js"),
    o = require("../../../domain/goods/modal.js");
  Math || t();
  const t = () => "./GoodItem.js",
    u = e.defineComponent({
      __name: "index",
      props: { goods: null },
      emits: ["increase", "decrease"],
      setup(t, { emit: u }) {
        const l = e.ref(0),
          r = e.ref(0),
          n = t,
          v = e.ref(""),
          d = e.computed(() => n.goods.filter((e) => e.name.includes(v.value))),
          s = e.computed(() => o.getCategories(d.value)),
          c = e.ref(0),
          i = e.computed(() =>
            c.value > d.value.length ? d.value[0] : d.value[c.value],
          ),
          f = e.throttle((e) => {
            if (0 === s.value.length) return;
            const a = e.detail.scrollTop;
            (c.value = Math.floor(a / 112)), (r.value = a);
          }, 100),
          m = u;
        return (t, u) =>
          e.e(
            {
              a: v.value,
              b: e.o((e) => (v.value = e.detail.value)),
              c: v.value,
            },
            v.value ? { d: e.o(() => (v.value = "")) } : {},
            { e: 0 === d.value.length },
            0 === d.value.length ? { f: a._imports_0$2 } : {},
            { g: s.value.length > 0 },
            s.value.length > 0
              ? {
                  h: e.f(s.value, (a, t, u) => ({
                    a: e.t(a),
                    b: a,
                    c: i.value.category === a ? 1 : "",
                    d: e.o(
                      (e) =>
                        ((e) => {
                          const a = o.getFstIndexOfCategory(d.value, e);
                          (l.value = r.value),
                            setTimeout(() => {
                              l.value = 112 * a;
                            }, 0);
                        })(a),
                      a,
                    ),
                  })),
                }
              : {},
            {
              i: e.f(d.value, (a, o, t) => ({
                a: e.o(() => {
                  return (e = a.id), void m("increase", e);
                  var e;
                }, a.id),
                b: e.o(() => {
                  return (e = a.id), void m("decrease", e);
                  var e;
                }, a.id),
                c: "cfc40ed5-0-" + t,
                d: e.p({ good: a, "search-txt": v.value }),
                e: a.id,
              })),
              j: e.o((...a) => e.unref(f) && e.unref(f)(...a)),
              k: l.value,
            },
          );
      },
    }),
    l = e._export_sfc(u, [["__scopeId", "data-v-cfc40ed5"]]);
  wx.createComponent(l);
})();
