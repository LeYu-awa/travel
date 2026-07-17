!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    r = require("../../domain/goods/dto.js"),
    o = require("../../../hooks/useRequest.js"),
    s = require("../../../utils/api.js"),
    d = require("../../../utils/config.js"),
    i = require("../../store/useGoodsStore.js"),
    t = require("../../store/useServiceStore.js"),
    a = require("../../store/useBaseStore.js");
  exports.useCreateOrder = (u = {}) => {
    const { replace: n = !1 } = u,
      l = i.useGoodsStore(),
      c = t.useServiceStore(),
      v = a.useBaseStore(),
      { run: m, loading: p } = o.useRequest(
        (o = {}) => {
          var i;
          return s.api.createServerOrder({
            appid: d.config.appid,
            componentAppid: d.config.componentAppid,
            openId:
              null == (i = e.index.getStorageSync("wxuser"))
                ? void 0
                : i.openid,
            areaCode: v.base.areaCode,
            buildCode: v.base.buildCode,
            deptCode: "",
            floorCode: v.base.floorCode,
            floorName: "",
            isCopy: "F",
            isUrgent: "F",
            masterId: v.base.masterId,
            roomMasterId: v.base.roomMasterId,
            orderDetailList: r.Goods2OrderDetailList(l.goods),
            serverCode: c.service.serviceItemCode,
            serverName: c.service.serviceName,
            serviceProvider: "ROBOT",
            serverPoint: "",
            guestName: v.base.name,
            userName: "",
            ...o,
          });
        },
        {
          manual: !0,
          onSuccess: (r) => {
            var o, s, d, i;
            if (
              null == (s = null == (o = r.orderList) ? void 0 : o[0])
                ? void 0
                : s.orderNo
            ) {
              const o = `/pagesG/order/detail/index?orderNo=${
                null == (i = null == (d = r.orderList) ? void 0 : d[0])
                  ? void 0
                  : i.orderNo
              }&hotelCode=${v.base.hotelCode}&masterId=${v.base.masterId}`;
              n
                ? e.index.redirectTo({ url: o })
                : e.index.navigateTo({ url: o });
            }
          },
        },
      );
    return { loading: p, run: m };
  };
})();
