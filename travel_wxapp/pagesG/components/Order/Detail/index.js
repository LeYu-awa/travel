!(function () {
  "use strict";
  const e = require("../../../../common/vendor.js"),
    r = require("../../../../common/assets.js"),
    a = require("../../../../hooks/useRequest.js"),
    t = require("../../../../utils/api.js"),
    u = require("./utils.js"),
    l = require("../../../../base/jAlert/jAlert.js"),
    o = require("../../../../hooks/useLayoutStart.js"),
    n = require("../List/useOrderListStore.js"),
    s = require("../../../../utils/utils.js"),
    i = require("../../../domain/order/modal.js"),
    d = require("./useFetch.js"),
    v = require("../../SuggestDetail/useHotelDetail.js");
  Math || (g + m + p + c + j + f)();
  const c = () => "./components/Card.js",
    p = () => "./components/GoodItem.js",
    m = () => "./components/KeyValue.js",
    f = () => "../../base/SafeBottom/index.js",
    g = () => "../../../../components/coustomHead.js",
    j = () => "../../base/GhostButton/index.js",
    h = e.defineComponent({
      __name: "index",
      setup(c) {
        const p = e.ref(""),
          m = e.ref(""),
          f = e.ref(""),
          { data: g, run: j } = d.useFetch(),
          { run: h, hotelDetail: b } = v.useHotelDetail(),
          q = async () =>
            Promise.all([
              j({ orderNo: p.value, masterId: m.value, hotelCode: f.value }),
              h(f.value),
            ]);
        e.onMounted(() => {
          (p.value = s.getQuery().orderNo),
            (m.value = s.getQuery().pmsId || s.getQuery().masterId || ""),
            (f.value = s.getQuery().hotelCode || ""),
            f.value && e.index.setStorageSync("hotelCode", f.value),
            q();
        });
        const D = n.useOrderListStore(),
          y = e.computed(() => {
            var e;
            return null == (e = g.value) ? void 0 : e.goods;
          }),
          { layoutStart: x } = o.useLayoutStart();
        e.watch(g, () => {
          var r;
          e.index.setNavigationBarTitle({
            title: (null == (r = g.value) ? void 0 : r.serviceName) || "",
          });
        }),
          e.onPullDownRefresh(async () => {
            await q(), e.index.stopPullDownRefresh();
          });
        const C = e.ref(!0),
          { run: w } = a.useRequest(
            () => t.api.updateOrder({ operation: "callup", orderNo: p.value }),
            {
              manual: !0,
              onSuccess() {
                l.jAlert3("催单成功"), (C.value = !1);
              },
            },
          ),
          S = () => {
            l.jAlert5("是否确认取消该服务", async () => {
              await D.runCancelOrder(p.value),
                await j({
                  orderNo: p.value,
                  masterId: m.value,
                  hotelCode: f.value,
                });
            });
          },
          N = e.computed(() => {
            var e;
            return "00104" === (null == (e = g.value) ? void 0 : e.serviceCode);
          }),
          O = e.computed(() => {
            var r, a;
            return e.isNil$1(null == (r = g.value) ? void 0 : r.goods)
              ? 0
              : i.getTotalPrice(
                  (null == (a = g.value) ? void 0 : a.goods) || [],
                );
          });
        return (a, t) => {
          var l, o, n, s, d, v, c, m;
          return e.e(
            { a: e.unref(g) },
            e.unref(g)
              ? e.e(
                  {
                    b: e.p({
                      title: e.unref(g).serviceName + "服务详情",
                      color: "#fff",
                    }),
                    c: e.t(e.unref(u.getOrderDesc)(e.unref(g)).title),
                    d: e.t(e.unref(u.getOrderDesc)(e.unref(g)).desc),
                    e: e.unref(x),
                    f: e.unref(g).timeDo,
                  },
                  e.unref(g).timeDo
                    ? {
                        g: e.p({ label: "上门时间", value: e.unref(g).timeDo }),
                      }
                    : {},
                  {
                    h:
                      y.value &&
                      (null == (l = y.value) ? void 0 : l.length) > 0,
                  },
                  y.value && (null == (o = y.value) ? void 0 : o.length) > 0
                    ? {
                        i: e.f(y.value, (a, t, u) => ({
                          a: a.name,
                          b: "8345966c-3-" + u + ",8345966c-1",
                          c: e.p({
                            img: a.picture || e.unref(r.noImg),
                            name: a.name,
                            price: a.price || 0,
                            amount: a.amount,
                          }),
                        })),
                      }
                    : {},
                  { j: null == (n = e.unref(g)) ? void 0 : n.remark },
                  (null == (s = e.unref(g)) ? void 0 : s.remark)
                    ? {
                        k: e.p({
                          label: N.value ? "特殊需求" : "服务备注",
                          value: e.unref(g).remark,
                        }),
                      }
                    : {},
                  {
                    l: e.p({ title: "服务项目" }),
                    m: y.value && y.value.length,
                  },
                  y.value && y.value.length
                    ? {
                        n: e.p({
                          label: "商品总额",
                          value:
                            "¥ " +
                            e
                              .unref(i.getTotalPrice)(
                                (null == (d = e.unref(g)) ? void 0 : d.goods) ||
                                  [],
                              )
                              .toFixed(2),
                          separate: !0,
                        }),
                        o: e.p({
                          label: "服务费",
                          value: "¥ 0.00",
                          separate: !0,
                        }),
                        p: e.t(
                          "¥ " +
                            e
                              .unref(i.getTotalPrice)(
                                (null == (v = e.unref(g)) ? void 0 : v.goods) ||
                                  [],
                              )
                              .toFixed(2),
                        ),
                        q: e.p({ label: "退房需付款", separate: !0 }),
                        r: e.p({ title: "费用明细" }),
                      }
                    : {},
                  {
                    s: e.t(p.value),
                    t: r._imports_0$1,
                    v: e.o((r) => {
                      return (
                        (a = p.value || ""),
                        void e.index.setClipboardData({ data: a })
                      );
                      var a;
                    }),
                    w: e.p({ label: "订单号", separate: !0 }),
                    x: e.p({
                      label: N.value ? "申请时间" : "下单时间",
                      value:
                        null == (c = e.unref(g)) ? void 0 : c.createDateTime,
                      separate: !0,
                    }),
                    y: O.value > 0,
                  },
                  O.value > 0
                    ? {
                        z: e.p({
                          label: "支付方式",
                          value: "退房付",
                          separate: !0,
                        }),
                      }
                    : {},
                  {
                    A: e.p({
                      label: "房间号",
                      value: `${e.defaultTo("", e.unref(b).descript)} ${
                        null == (m = e.unref(g)) ? void 0 : m.roomNo
                      }`,
                      separate: !0,
                    }),
                    B: e.p({ title: "服务单信息" }),
                    C: e.unref(u.showOperation)(e.unref(g)),
                  },
                  e.unref(u.showOperation)(e.unref(g))
                    ? {
                        D: e.o(S),
                        E: e.t(C.value ? "催单" : "已催单"),
                        F: e.o(e.unref(w)),
                        G: e.p({ disabled: !C.value }),
                      }
                    : {},
                )
              : {},
          );
        };
      },
    }),
    b = e._export_sfc(h, [["__scopeId", "data-v-8345966c"]]);
  wx.createComponent(b);
})();
