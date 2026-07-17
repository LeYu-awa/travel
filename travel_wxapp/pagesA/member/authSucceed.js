!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    s = require("../../utils/wxuser.js"),
    u = require("../../utils/filter.js");
  Math || n();
  const n = () => "../../components/coustomHead.js",
    r = e.defineComponent({
      __name: "authSucceed",
      setup(n) {
        let r = e.ref("success"),
          t = s.getStorage("user"),
          o = e.ref(80);
        return (
          e.onLoad((e) => {
            e && e.type && (r.value = e.type);
          }),
          e.onMounted(() => {
            e.index.getSystemInfo({
              success: (e) => {
                o.value = o.value + e.statusBarHeight;
              },
              fail(e) {
                console.log(e);
              },
            });
          }),
          (s, n) =>
            e.e(
              {
                a: e.p({ color: "#000" }),
                b: e.unref(o) + "px",
                c: "success" == e.unref(r),
              },
              (e.unref(r), {}),
              { d: "success" == e.unref(r) },
              (e.unref(r), {}),
              { e: "edit" == e.unref(r) },
              (e.unref(r), {}),
              {
                f: e.t(e.unref(u.sensitiveName)(e.unref(t).name)),
                g: e.t(e.unref(u.sensitiveIdNo)(e.unref(t).idNo)),
                h: "success" == e.unref(r),
              },
              "success" == e.unref(r)
                ? {
                    i: e.o((s) => {
                      e.index.navigateBack({ delta: 1 });
                    }),
                  }
                : {},
              { j: "edit" == e.unref(r) },
              "edit" == e.unref(r)
                ? {
                    k: e.o((s) => {
                      e.index.redirectTo({ url: "/pagesA/member/memberAuth" });
                    }),
                  }
                : {},
            )
        );
      },
    }),
    t = e._export_sfc(r, [["__scopeId", "data-v-1b3f426b"]]);
  wx.createPage(t);
})();
