!(function () {
  "use strict";
  const e = require("../../components/Order/List/utils.js");
  exports.OrderListRes2ServiceOrderList = (r) =>
    r.map((r) => {
      var o;
      return {
        id: r.id,
        status: r.orderSta,
        serviceCode: r.serverCode,
        serviceName: r.serverNameCus,
        serviceIcon: e.getIconByServerCode(r.serverCode),
        goods:
          null == (o = r.orderDetails)
            ? void 0
            : o.map((e) => ({
                name: e.detailName,
                price: e.detailPrice,
                amount: e.detailNum,
                picture: e.detailPicture,
                code: e.detailCode,
              })),
        remark: r.orderRemark,
        roomNo: r.areaCode,
        timeType: r.timeType || void 0,
        orderNo: r.oderNo,
        createDateTime: r.createDatetime,
        timeDo: r.timeDo,
        hotelCode: r.hotelCode,
        hotelName: r.hotelName,
      };
    });
})();
