!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    o = require("../../domain/goods/modal.js"),
    s = require("./useFetch.js"),
    r = require("../../store/useGoodsStore.js"),
    n = require("../../../common/assets.js"),
    t = require("../../store/useServiceStore.js"),
    i = require("../../store/useBaseStore.js"),
    u = require("../../domain/service/modal.js");
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
          m = i.useBaseStore();
        e.onMounted(() => {
          m.init(), f();
        });
        const p = (e) => {
            c.setGoods(o.increaseQuantity(c.goods, e));
          },
          j = (e) => {
            c.setGoods(o.decreaseQuantity(c.goods, e));
          },
          v = t.useServiceStore();
        return (o, s) =>
          e.e(
            {
              a: e.p({ position: "fixed", color: "#fff" }),
              b: e.p({
                title: "物品借用",
                desc: e.unref(v).inServiceTime
                  ? e.defaultTo(
                      "用品将在下单后30分钟内送达",
                      e.unref(v).service.serviceReminder,
                    )
                  : "",
                time: e.unref(v).inServiceTime ? "" : "" + e.unref(v).duration,
              }),
              c: !e.unref(a),
            },
            e.unref(a)
              ? {}
              : { d: e.o(p), e: e.o(j), f: e.p({ goods: e.unref(c).goods }) },
            {
              g: e.p({ "service-type": e.unref(u.ServiceTypeEnum).borrow }),
              h: e.p({ bg: e.unref(n.bg) }),
            },
          );
      },
    }),
    j = e._export_sfc(p, [["__scopeId", "data-v-449e067b"]]);
  wx.createComponent(j);
})();
