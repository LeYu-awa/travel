!(function () {
  "use strict";
  const e = require("../../domain/goods/dto.js"),
    s = require("../../../hooks/useRequest.js"),
    o = require("../../../utils/api.js"),
    r = require("../../store/useGoodsStore.js"),
    u = require("../../store/useServiceInfo.js"),
    t = require("../../../utils/config.js"),
    i = require("../../store/useBaseStore.js");
  exports.useFetch = () => {
    const { setGoods: n } = r.useGoodsStore(),
      c = i.useBaseStore(),
      { run: a } = u.useServiceInfo("008"),
      { loading: d, run: l } = s.useRequest(
        () =>
          o.api.mapSysDic({
            hotelCode: c.base.hotelCode,
            hotelGroupCode: t.config.hotelGroupCode,
            categorys: "article",
            classType1: "T",
          }),
        {
          manual: !0,
          onSuccess: (s) => {
            const o = e.MapSysDicRes2Goods(s.labelList);
            n(o);
          },
        },
      );
    return {
      loading: d,
      run: () => {
        l(), a();
      },
    };
  };
})();
