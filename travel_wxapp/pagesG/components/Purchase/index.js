!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    o = require("../../domain/goods/modal.js"),
    s = require("./useFetch.js"),
    r = require("../../store/useGoodsStore.js"),
    n = require("../../../common/assets.js"),
    t = require("../../domain/service/modal.js"),
    i = require("../../store/useBaseStore.js"),
    u = require("../../store/useServiceStore.js");
  Math || (m + c + f + a + d)();
  const d = () => "../Layout.js",
    c = () => "../base/BaseHeader/index.js",
    a = () => "../base/PageFooter/index.js",
    f = () => "../base/GoodList/index.js",
    m = () => "../../../components/coustomHead.js",
    p = e.defineComponent({
      __name: "index",
      setup(d) {
        const c = r.useGoodsStore(),
          { loading: a, run: f } = s.useFetch(),
          { init: m } = i.useBaseStore(),
          p = u.useServiceStore();
        e.onMounted(() => {
          m(), f();
        });
        const j = (e) => {
            c.setGoods(o.increaseQuantity(c.goods, e));
          },
          v = (e) => {
            c.setGoods(o.decreaseQuantity(c.goods, e));
          };
        return (o, s) =>
          e.e(
            {
              a: e.p({ color: "#fff", position: "fixed" }),
              b: e.p({
                title: "客房用品",
                desc: e.unref(p).inServiceTime
                  ? e.defaultTo(
                      "用品将在下单后30分钟内送达",
                      e.unref(p).service.serviceReminder,
                    )
                  : "",
                time: e.unref(p).inServiceTime ? "" : "" + e.unref(p).duration,
              }),
              c: !e.unref(a),
            },
            e.unref(a)
              ? {}
              : { d: e.o(j), e: e.o(v), f: e.p({ goods: e.unref(c).goods }) },
            {
              g: e.p({ "service-type": e.unref(t.ServiceTypeEnum).purchase }),
              h: e.p({ bg: e.unref(n.bg) }),
            },
          );
      },
    }),
    j = e._export_sfc(p, [["__scopeId", "data-v-f9858397"]]);
  wx.createComponent(j);
})();
