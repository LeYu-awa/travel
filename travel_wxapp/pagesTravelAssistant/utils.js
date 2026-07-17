!(function () {
  "use strict";
  const e = require("../common/vendor.js"),
    t = "H6YBZ-7M467-IIWXA-PYY3O-4Q4RT-B3B53",
    o = (e) => {
      if (null === e || "object" != typeof e) return e;
      if (e instanceof Date) return new Date(e.getTime());
      if (e instanceof RegExp) return new RegExp(e.source, e.flags);
      if (Array.isArray(e)) {
        const t = [];
        return (
          e.forEach((e, r) => {
            t[r] = o(e);
          }),
          t
        );
      }
      const t = {};
      return (
        Object.keys(e).forEach((r) => {
          t[r] = o(e[r]);
        }),
        t
      );
    };
  (exports.calculateDistanceByQQmap = (o) =>
    new Promise((r, a) => {
      console.log("微信小程序/XHS端"),
        e.index.request({
          url: "https://apis.map.qq.com/ws/distance/v1/matrix",
          data: { key: t, from: o.from, to: o.to, mode: o.mode || "driving" },
          success(e) {
            console.log(e.data),
              0 === e.data.status
                ? r(e.data.result)
                : r(Object.assign({}, e.data, { rows: [] }));
          },
          fail(e) {
            console.log(e), a({ rows: [] });
          },
        });
    })),
    (exports.deepClone = o),
    (exports.formatCollectCount = (e) =>
      e > 0 && e <= 999
        ? { count: "" + e, type: "origin" }
        : e > 999 && e <= 9999
          ? {
              count: (Math.floor(e / 100) / 10).toFixed(1) + "千",
              type: "format",
            }
          : e > 9999
            ? {
                count: (Math.floor(e / 1e3) / 10).toFixed(1) + "万",
                type: "format",
              }
            : { count: "0", type: "invalid" }),
    (exports.formatPrice = (e) =>
      e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")),
    (exports.goBack = () => {
      e.index.navigateBack({ delta: 1 });
    }),
    (exports.key = t);
})();
