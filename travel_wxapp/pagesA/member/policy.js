!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/wxuser.js");
  Math || o();
  const o = () => "../../components/coustomHead.js",
    r = e.defineComponent({
      __name: "policy",
      setup(o) {
        t.getStorage("user");
        let r = e.ref();
        return (
          e.onLoad((e) => {
            r.value = t.getStorage("policyData");
          }),
          (t, o) => ({
            a: e.p({ title: "会员政策", nativeMode: "true" }),
            b: e.unref(r),
          })
        );
      },
    }),
    n = e._export_sfc(r, [["__scopeId", "data-v-341b38e9"]]);
  wx.createPage(n);
})();
