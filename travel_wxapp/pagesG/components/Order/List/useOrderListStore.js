!(function () {
  "use strict";
  const e = require("../../../../common/vendor.js"),
    r = require("../../../../hooks/useRequest.js"),
    t = require("../../../domain/order/dto.js"),
    s = require("../../../../utils/api.js"),
    o = e.defineStore("orderList", () => {
      const o = e.ref("all"),
        a = e.reactive({ total: -1, list: [] }),
        i = e.reactive({ total: -1, list: [] }),
        d = e.computed(() => e.concat(a.list, i.list)),
        { run: n } = r.useRequest(
          (e) =>
            s.api.updateInstantRsOrder({
              cancelDes: "",
              remark: "",
              oderNo: e,
              operation: "cancel",
              changeHandlerUserCode: "",
              userCode: "guest",
            }),
          {
            manual: !0,
            onSuccess: (r, t) => {
              const s = (r) =>
                e.adjust(
                  e.findIndex(e.propEq(t, "orderNo"), r),
                  e.modify("status", e.always("X")),
                  r,
                );
              (a.list = s(a.list)), (i.list = s(i.list));
            },
          },
        ),
        { run: l, loading: c } = r.useRequest(
          (r = { pageNo: 1, orderSta: "" }) => {
            var t;
            const o =
              (null == (t = e.index.getStorageSync("wxuser"))
                ? void 0
                : t.openid) || "";
            return s.api.orderList({
              openid: o,
              pageNo: r.pageNo,
              pageSize: 20,
              orderSta: r.orderSta,
              crossHotelList: e.index.getStorageSync("crossHotelList"),
            });
          },
          {
            manual: !0,
            onSuccess: (e, r) => {
              const s = t.OrderListRes2ServiceOrderList(e.data),
                o = 1 === r.pageNo;
              r && "R" === r.orderSta
                ? ((i.list = o ? s : [...i.list, ...s]), (i.total = e.count))
                : ((a.list = o ? s : [...a.list, ...s]), (a.total = e.count));
            },
          },
        ),
        u = e.computed(() => ("all" === o.value ? 0 : 1));
      return {
        activeTab: o,
        setActiveTab: (e) => {
          o.value = e;
        },
        index: u,
        allOrders: a,
        waitOrders: i,
        fetchOrders: l,
        refresh: async () =>
          Promise.all([
            l({ pageNo: 1, orderSta: "" }),
            l({ pageNo: 1, orderSta: "R" }),
          ]),
        runCancelOrder: n,
        joinedOrders: d,
        fetchOrdersLoading: c,
      };
    });
  exports.useOrderListStore = o;
})();
