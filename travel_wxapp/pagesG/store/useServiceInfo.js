!(function () {
  "use strict";
  const e = require("../../hooks/useRequest.js"),
    s = require("../../utils/api.js"),
    r = require("../../utils/config.js"),
    o = require("./useServiceStore.js"),
    t = require("./useBaseStore.js");
  exports.useServiceInfo = (u) => {
    const i = t.useBaseStore(),
      { setService: c } = o.useServiceStore(),
      { run: n } = e.useRequest(
        () =>
          s.api.getListHotelService({
            hotelGroupCode: r.config.hotelGroupCode,
            hotelCode: i.base.hotelCode,
            sta: "I",
          }),
        {
          manual: !0,
          onSuccess: (e) => {
            c(e.retVal.find((e) => e.serviceCode === u));
          },
        },
      );
    return { run: n };
  };
})();
