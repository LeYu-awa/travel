!(function () {
  "use strict";
  const e = require("../../../../common/vendor.js"),
    o = require("../../../store/useGoodsStore.js"),
    t = require("../../../domain/goods/modal.js"),
    r = require("../../../store/useServiceStore.js");
  Math || (i + n + s)();
  const s = () => "../SafeBottom/index.js",
    n = () => "../ChosenDialog/index.js",
    i = () => "../../../../components/bottomBtn.js",
    u = e.defineComponent({
      __name: "index",
      props: { serviceType: null },
      setup(s) {
        const n = s,
          i = o.useGoodsStore(),
          u = e.computed(() => t.getSelectCount(i.goods)),
          c = r.useServiceStore(),
          d = e.ref(!1),
          a = () => {
            d.value = !0;
          },
          l = () => {
            e.index.redirectTo({
              url: "/pagesG/confirm-order?type=" + n.serviceType,
            });
          },
          p = e.computed(() => t.getSelection(i.goods));
        return (o, t) => ({
          a: e.t(u.value),
          b: e.o(a),
          c: e.t(e.unref(c).getServiceButtonTxt("我选好了")),
          d: e.o(l),
          e: e.p({
            disabled: 0 === p.value.length || !e.unref(c).inServiceTime,
            layoutFlow: !0,
          }),
          f: e.o(() => (d.value = !1)),
          g: e.p({ visible: d.value }),
        });
      },
    }),
    c = e._export_sfc(u, [["__scopeId", "data-v-d7b02759"]]);
  wx.createComponent(c);
})();
