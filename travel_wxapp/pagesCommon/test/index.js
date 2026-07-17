!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/utils.js");
  Math || n();
  const n = () => "../../components/linkItem.js",
    a = e.defineComponent({
      __name: "index",
      setup(n) {
        const a = e.reactive([
            {
              key: "2",
              title: "功能",
              children: [{ key: "scan", name: "扫一扫", type: "scan" }],
            },
            {
              key: "1",
              title: "快捷入口",
              children: [
                {
                  key: "memberExchangeAuth",
                  name: "会员互通（跳第三方）",
                  link: "/pagesActivity/member-exchange/auth?id=1",
                },
                {
                  key: "microPageMember",
                  name: "会员季微页面",
                  link: "/pages/mall/webview?url=https%3A%2F%2Fm.songtsam.com%2Fmall2%2F%3F%2F%23%2Fpolymerization%3Fid%3Db9a15822fb854a46a33690b54a505fb5",
                },
              ],
            },
          ]),
          i = e.computed(() =>
            a.filter((e) => e.children.some((e) => !e.hidden)),
          );
        function s(n) {
          (null == n ? void 0 : n.link)
            ? t.goPage(n.link)
            : n.type &&
              "scan" === n.type &&
              e.index.scanCode({
                success(e) {
                  console.log("<pagesCommon/test> {scan} res:", e);
                  let { scanType: n, path: a, result: i } = e;
                  "WX_CODE" === n && a
                    ? (a.startsWith("/") || (a = "/" + a), t.goPage(a))
                    : "QR_CODE" === n &&
                      i &&
                      i.startsWith("http") &&
                      t.goPage(i);
                },
              });
        }
        return (t, n) => ({
          a: e.f(i.value, (t, n, a) =>
            e.e({ a: t.title }, t.title ? { b: e.t(t.title) } : {}, {
              c: e.f(t.children, (t, n, i) => ({
                a: e.o(s, t.key),
                b: "0d986a7d-0-" + a + "-" + i,
                c: e.p({ linkItem: t }),
                d: t.key,
              })),
              d: "menu-" + t.key,
            }),
          ),
        });
      },
    }),
    i = e._export_sfc(a, [["__scopeId", "data-v-0d986a7d"]]);
  wx.createPage(i);
})();
