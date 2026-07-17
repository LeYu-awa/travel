!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/wxuser.js");
  Math || o();
  const o = () => "../../components/coustomHead.js",
    r = e.defineComponent({
      __name: "receiveSuccess",
      setup(o) {
        t.getStorage("config");
        const r = () => {
          e.index.redirectTo({ url: "/pagesF/prize/prizeList" });
        };
        return (t, o) => ({
          a: e.p({ title: "提交成功", nativeMode: "true" }),
          b: e.o(r),
        });
      },
    }),
    s = e._export_sfc(r, [["__scopeId", "data-v-b460598b"]]);
  wx.createPage(s);
})();
