!(function () {
  "use strict";
  const e = require("../../../hooks/useRequest.js"),
    r = require("../../store/useBaseStore.js"),
    s = require("../../store/useServiceStore.js"),
    o = require("../../../utils/api.js"),
    u = require("../../../common/vendor.js");
  exports.useServePerson = () => {
    const t = u.ref(),
      i = r.useBaseStore(),
      n = s.useServiceStore(),
      { run: a, loading: c } = e.useRequest(
        (e) =>
          o.api.queryUserInfo({
            deptCode: "001",
            roomCode: i.base.areaCode,
            serverCode: n.service.serviceItemCode,
            dutyDate: e,
          }),
        {
          manual: !0,
          onSuccess: (e) => {
            t.value = e[0];
          },
        },
      );
    return { run: a, loading: c, user: t };
  };
})();
