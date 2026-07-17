!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    r = require("../../../hooks/useRequest.js"),
    o = require("../../../utils/api.js"),
    s = require("../../../utils/config.js"),
    i = require("../../store/useServiceStore.js"),
    d = require("../../store/useBaseStore.js");
  exports.useCreateOrder = () => {
    const a = i.useServiceStore(),
      t = d.useBaseStore(),
      { run: u, loading: n } = r.useRequest(
        (r = {}) => {
          var i;
          return o.api.createServerOrder({
            appid: s.config.appid,
            componentAppid: s.config.componentAppid,
            openId:
              null == (i = e.index.getStorageSync("wxuser"))
                ? void 0
                : i.openid,
            areaCode: t.base.areaCode,
            buildCode: t.base.buildCode,
            deptCode: "",
            floorCode: t.base.floorCode,
            floorName: "",
            isCopy: "F",
            isUrgent: "F",
            masterId: t.base.masterId,
            roomMasterId: t.base.roomMasterId,
            orderDetailList: [],
            serverCode: a.service.serviceItemCode,
            serverName: a.service.serviceName,
            serviceProvider: "ROBOT",
            serverPoint: "",
            guestName: t.base.name,
            userName: "",
            wakeTime: "",
            ...r,
          });
        },
        {
          manual: !0,
          onSuccess: (r) => {
            var o, s, i, d;
            (null == (s = null == (o = r.orderList) ? void 0 : o[0])
              ? void 0
              : s.orderNo) &&
              e.index.redirectTo({
                url: `/pagesG/order/detail/index?orderNo=${
                  null == (d = null == (i = r.orderList) ? void 0 : i[0])
                    ? void 0
                    : d.orderNo
                }&hotelCode=${t.base.hotelCode}&masterId=${t.base.masterId}`,
              });
          },
        },
      );
    return { loading: n, run: u };
  };
})();
