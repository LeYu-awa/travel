!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    o = require("../../store/useGoodsStore.js"),
    a = require("../../domain/goods/modal.js"),
    t = require("../Borrowing/useCreateOrder.js"),
    r = require("../../store/useBaseStore.js"),
    s = require("../../../hooks/useLayoutStart.js");
  Math || (d + l + i + u + n)();
  const n = () => "../base/SafeBottom/index.js",
    u = () => "../../../components/bottomBtn.js",
    l = () => "../Order/Detail/components/GoodItem.js",
    i = () => "../Order/Detail/components/KeyValue.js",
    d = () => "../../../components/coustomHead.js",
    p = e.defineComponent({
      __name: "index",
      props: { payOnline: { type: Boolean } },
      setup(n) {
        const u = n,
          l = o.useGoodsStore(),
          i = r.useBaseStore(),
          d = e.computed(() => a.getTotalPrice(l.goods)),
          p = e.computed(() => a.getSelection(l.goods)),
          c = e.ref(""),
          { run: m, loading: v } = t.useCreateOrder({ replace: !0 }),
          f = () => {
            m({ orderRemark: c.value });
          },
          { layoutStart: j } = s.useLayoutStart();
        return (
          e.onUnmounted(() => {
            l.setGoods([]);
          }),
          (o, t) =>
            e.e(
              {
                a: e.p({ title: "确认订单", position: "fixed" }),
                b: e.f(p.value, (o, a, t) => ({
                  a: o.id,
                  b: "c7223692-1-" + t,
                  c: e.p({
                    img: o.picture,
                    name: o.name,
                    amount: o.quantity,
                    price: o.price,
                  }),
                })),
                c: e.p({
                  label: "商品总额",
                  value: "¥ " + d.value.toFixed(2),
                  separate: !0,
                }),
                d: e.p({ label: "服务费", value: "¥ 0.00", separate: !0 }),
                e: d.value > 0,
              },
              d.value > 0
                ? {
                    f: e.p({
                      label: "支付方式",
                      value: "退房付",
                      separate: !0,
                    }),
                  }
                : {},
              {
                g: e.p({ label: "房间号", value: e.unref(i).base.areaCode }),
                h: c.value,
                i: e.o((e) => (c.value = e.detail.value)),
                j: e.p({ label: "服务备注", flex: !0 }),
                k: u.payOnline,
              },
              (u.payOnline, {}),
              { l: d.value > 0 },
              d.value > 0 ? { m: e.t(e.unref(a.renderPrice)(d.value)) } : {},
              {
                n: e.o(f),
                o: e.p({ layoutFlow: !0, disabled: e.unref(v) }),
                p: e.unref(j),
              },
            )
        );
      },
    }),
    c = e._export_sfc(p, [["__scopeId", "data-v-c7223692"]]);
  wx.createComponent(c);
})();
