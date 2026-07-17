!(function () {
  "use strict";
  const e = require("./modal.js"),
    t = require("../../../common/vendor.js");
  (exports.Goods2OrderDetailList = (i) =>
    t
      .filter(e.quantityGtZero, i)
      .map((e) => ({
        detailCode: e.id,
        detailName: e.name,
        detailNum: e.quantity,
        detailPrice: e.price,
        detailRemark: "",
      }))),
    (exports.MapSysDicRes2Goods = (e) =>
      t
        .flatten(t.pluck("list", e))
        .map((e) => ({
          id: e.code,
          name: e.descript,
          picture: e.picture,
          price: e.price || 0,
          stock: t.isNotNil(e.leftNum) ? Math.max(0, Number(e.leftNum)) : 1 / 0,
          category: e.label,
          quantity: 0,
        })));
})();
