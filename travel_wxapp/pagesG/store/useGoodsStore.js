!(function () {
  "use strict";
  const o = require("../../common/vendor.js"),
    e = o.defineStore("goods", () => {
      const e = o.ref([]);
      return {
        goods: e,
        setGoods: (o) => {
          e.value = o;
        },
      };
    });
  exports.useGoodsStore = e;
})();
