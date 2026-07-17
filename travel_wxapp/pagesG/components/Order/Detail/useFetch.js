!(function () {
  "use strict";
  const e = require("../../../../common/vendor.js"),
    r = require("../../../../hooks/useRequest.js"),
    o = require("../../../domain/order/dto.js"),
    s = require("../../../../utils/api.js");
  exports.useFetch = () => {
    const t = e.ref(),
      { loading: d, run: i } = r.useRequest(
        (r) => {
          var o;
          return s.api.orderList({
            openid:
              null == (o = e.index.getStorageSync("wxuser"))
                ? void 0
                : o.openid,
            pageNo: 1,
            pageSize: 1,
            orderNo: r.orderNo,
            crossHotelList:
              r.hotelCode && r.masterId
                ? [{ hotelCode: r.hotelCode, masterId: r.masterId }]
                : e.index.getStorageSync("crossHotelList"),
          });
        },
        {
          manual: !0,
          onSuccess(e) {
            const r = o.OrderListRes2ServiceOrderList(e.data);
            t.value = r[0];
          },
        },
      );
    return { data: t, loading: d, run: i };
  };
})();
