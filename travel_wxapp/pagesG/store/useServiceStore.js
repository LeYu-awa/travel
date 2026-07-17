!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../utils.js"),
    r = e.defineStore("service", () => {
      const r = e.ref({}),
        i = e.computed(() =>
          r.value.startTime ? `${r.value.startTime}-${r.value.endTime}` : "-",
        ),
        u = e.computed(() => !t.saleTime(r.value));
      return {
        service: r,
        setService: (e) => {
          r.value = e;
        },
        duration: i,
        inServiceTime: u,
        getServiceButtonTxt: (e) => (u.value ? e : "不在服务时间"),
      };
    });
  exports.useServiceStore = r;
})();
