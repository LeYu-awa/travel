!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/utils.js"),
    n = require("../../utils/user.js"),
    o = require("../../base/jAlert/jAlert.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (r + i)();
  const i = () => "../../components/linkItem.js",
    r = () => "../../components/coustomHead.js",
    l = e.defineComponent({
      __name: "setting",
      setup(i) {
        const r = e.computed(() => "release" !== __wxConfig.envVersion),
          l = e.reactive([
            {
              key: "1",
              children: [
                {
                  key: "memberRule",
                  name: "会员政策",
                  link: `/pagesA/other/codeText?title=${decodeURIComponent(
                    "会员政策",
                  )}&code=memberRule`,
                },
                {
                  key: "userAgreement",
                  name: "用户协议",
                  link: `/pagesA/other/codeText?title=${decodeURIComponent(
                    "用户协议",
                  )}&code=rule`,
                },
                {
                  key: "privacyPolicy",
                  name: "隐私政策",
                  link: `/pagesA/other/codeText?title=${decodeURIComponent(
                    "隐私政策",
                  )}&code=PrivacyRule`,
                },
              ],
            },
            {
              key: "2",
              children: [
                { key: "loginOut", name: "退出登录", type: "loginOut" },
              ],
            },
            {
              key: "3",
              children: [
                {
                  key: "testCenter",
                  name: "测试入口",
                  link: "/pagesCommon/test/index",
                  hidden: !r.value,
                },
              ],
            },
          ]),
          s = e.computed(() =>
            l.filter((e) => e.children.some((e) => !e.hidden)),
          ),
          c = (e) => {
            e.link && t.goPage(e.link),
              "loginOut" == e.type &&
                o.jAlert5("是否退出登录", () => {
                  n.removeOpenIdAndSignOut();
                });
          };
        return (t, n) => ({
          a: e.p({ title: "设置", nativeMode: "true" }),
          b: e.f(s.value, (t, n, o) => ({
            a: e.f(t.children, (t, n, i) => ({
              a: t.key,
              b: e.o(c, t.key),
              c: "13a00f21-1-" + o + "-" + i,
              d: e.p({ linkItem: t }),
            })),
            b: "menu-" + t.key,
          })),
        });
      },
    }),
    s = e._export_sfc(l, [["__scopeId", "data-v-13a00f21"]]);
  wx.createPage(s);
})();
