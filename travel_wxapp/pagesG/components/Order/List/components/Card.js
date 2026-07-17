!(function () {
  "use strict";
  const e = require("../../../../../common/vendor.js"),
    o = require("../../../../domain/order/modal.js"),
    r = require("../useOrderListStore.js"),
    l = require("../../Detail/utils.js"),
    t = require("../../../../../base/jAlert/jAlert.js");
  Math || a();
  const a = () => "../../Detail/components/KeyValue.js",
    n = e.defineComponent({
      __name: "Card",
      props: {
        id: null,
        status: null,
        timeType: null,
        serviceCode: null,
        serviceName: null,
        serviceIcon: null,
        goods: null,
        remark: null,
        roomNo: null,
        orderNo: null,
        createDateTime: null,
        timeDo: null,
        hotelCode: null,
        hotelName: null,
      },
      setup(a) {
        const n = a,
          u = () => {
            e.index.navigateTo({
              url: `/pagesG/order/detail/index?orderNo=${n.orderNo}&hotelCode=${n.hotelCode}`,
            });
          },
          s = r.useOrderListStore(),
          i = () => {
            t.jAlert5("是否确认取消该服务", () => {
              s.runCancelOrder(n.orderNo);
            });
          };
        return (r, t) => {
          var a, s;
          return e.e(
            {
              a: e.t(n.hotelName),
              b: e.t(n.roomNo),
              c: e.t(e.unref(o.getLabel)(n)),
              d: n.serviceIcon,
              e: e.t(n.serviceName),
              f: null == (a = n.goods) ? void 0 : a.length,
            },
            (null == (s = n.goods) ? void 0 : s.length)
              ? {
                  g: e.f(n.goods, (o, r, l) => ({
                    a: o.name,
                    b: "31768aa9-0-" + l,
                    c: e.p({
                      label: o.name,
                      value: `¥${o.price} x${o.amount}`,
                      separate: !0,
                    }),
                  })),
                  h: e.p({
                    label: "退房需付款",
                    value: "¥" + e.unref(o.getTotalPrice)(n.goods),
                    separate: !0,
                  }),
                }
              : {},
            {
              i: e.p({ label: "服务备注", value: n.remark, separate: !0 }),
              j: e.unref(l.showOperation)(n),
            },
            e.unref(l.showOperation)(n) ? { k: e.o(i) } : {},
            { l: e.o(u) },
          );
        };
      },
    }),
    u = e._export_sfc(n, [["__scopeId", "data-v-31768aa9"]]);
  wx.createComponent(u);
})();
