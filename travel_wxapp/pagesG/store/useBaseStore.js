!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../utils/utils.js"),
    t = e.defineStore("base", () => {
      const t = e.reactive({
        areaCode: "",
        masterId: "",
        roomMasterId: "",
        hotelCode: "",
        name: "",
        buildCode: "",
        floorCode: "",
        hotelDesc: "",
      });
      return {
        base: t,
        init: () => {
          const d = o.getQuery();
          d.hotelCode &&
            ((t.areaCode = d.areaCode || ""),
            (t.hotelCode = d.hotelCode || ""),
            (t.roomMasterId = d.masterId || ""),
            (t.masterId = d.pmsId || ""),
            (t.name = decodeURIComponent(d.name) || ""),
            (t.buildCode = d.building || ""),
            (t.floorCode = d.floor || ""),
            (t.hotelDesc = decodeURIComponent(d.hotelDesc) || ""),
            e.index.setStorageSync("hotelCode", d.hotelCode));
        },
      };
    });
  exports.useBaseStore = t;
})();
