!(function () {
  "use strict";
  const e = require("../../../common/vendor.js");
  (exports.getLabel = (e) => {
    const { status: t, timeType: r } = e;
    return "R" === t
      ? "待服务"
      : "I" === t
        ? "服务中"
        : "O" === t
          ? "已完成"
          : "S" === t
            ? "已挂起"
            : "P" == t && "P" === r
              ? "已预约"
              : "已取消";
  }),
    (exports.getTotalPrice = (t) => {
      const r = t.map((e) => e.amount * e.price);
      return e.reduce(e.add, 0, r);
    });
})();
