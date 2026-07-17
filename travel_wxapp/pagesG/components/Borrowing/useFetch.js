!(function () {
  "use strict";
  const e = require("../../domain/goods/dto.js"),
    s = require("../../../hooks/useRequest.js"),
    o = require("../../../utils/api.js"),
    r = require("../../store/useGoodsStore.js"),
    u = require("../../store/useServiceInfo.js"),
    t = require("../../../utils/config.js"),
    i = require("../../store/useBaseStore.js"),
    n = require("../../../common/vendor.js");
  exports.useFetch = () => {
    const { setGoods: a } = r.useGoodsStore(),
      c = i.useBaseStore(),
      { run: d } = u.useServiceInfo("003"),
      { loading: l, run: q } = s.useRequest(
        () =>
          o.api.mapSysDic({
            categorys: "rent",
            hotelCode: c.base.hotelCode,
            hotelGroupCode: t.config.hotelGroupCode,
          }),
        {
          manual: !0,
          onSuccess: (s) => {
            const o = e.MapSysDicRes2Goods(s.labelList),
              r = n.assoc("max", 2);
            a(o.map((e) => r(e)));
          },
        },
      );
    return {
      loading: l,
      run: () => {
        q(), d();
      },
    };
  };
})();
