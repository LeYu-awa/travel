!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    o = require("../../../hooks/useRequest.js"),
    t = require("../../../utils/api.js"),
    u = require("../../../utils/config.js"),
    n = require("../../../base/channel.js");
  exports.useHotelDetail = () => {
    const {
      data: l,
      loading: r,
      run: s,
    } = o.useRequest(
      (e) =>
        t.api.findHotel({
          hotelCode: e,
          hotelGroupCodes: u.config.hotelGroupCode,
          otaChannel: n.defaultOtaChannel,
        }),
      { manual: !0 },
    );
    return {
      run: s,
      hotelDetail: e.computed(() => {
        var e, o;
        return null ==
          (o = null == (e = l.value.retVal) ? void 0 : e.resultInfos)
          ? void 0
          : o[0];
      }),
      loading: r,
    };
  };
})();
