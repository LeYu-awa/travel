!(function () {
  "use strict";
  const t = require("../../../common/vendor.js"),
    e = (e, r, o) => t.adjust(t.findIndex(t.propEq(r, "id"), e), o, e),
    r = (e) => t.filter(t.pipe(t.prop("quantity"), t.gt(t.__, 0)), e),
    o = t.pipe(t.prop("quantity"), t.gt(t.__, 0));
  (exports.allowIncrease = (t) =>
    !(t.max && t.quantity >= t.max) &&
    (t.stock ? t.quantity < t.stock : !!t.stock)),
    (exports.decreaseQuantity = (r, o) =>
      e(r, o, t.modify("quantity", t.subtract(t.__, 1)))),
    (exports.getCategories = (e) => {
      const r = t.pipe(t.pluck("category"), t.filter(Boolean), t.uniq)(e);
      return 1 === r.length && "" === r[0] ? [] : r;
    }),
    (exports.getFstIndexOfCategory = (e, r) =>
      t.findIndex(t.propEq(r, "category"), e)),
    (exports.getSelectCount = (e) =>
      t.pipe(r, t.pluck("quantity"), t.reduce(t.add, 0))(e)),
    (exports.getSelection = r),
    (exports.getTotalPrice = (e) => {
      const r = t.filter(o, e),
        i = t.map((t) => t.price * t.quantity, r);
      return t.reduce(t.add, 0, i);
    }),
    (exports.increaseQuantity = (r, o) =>
      e(r, o, t.modify("quantity", t.add(1)))),
    (exports.quantityGtZero = o),
    (exports.renderPrice = (t) => (0 === t ? "免费" : "¥ " + t.toFixed(2)));
})();
