!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../hooks/useSubscribeMessage.js"),
    o = require("../../hooks/useSysOptions.js"),
    u = require("../../utils/api.js"),
    i = require("../../utils/config.js"),
    a = require("../../utils/user.js"),
    l = require("../../utils/utils.js"),
    r = require("../../utils/wxuser.js");
  Math || n();
  const n = () => "../new/StDialog.js",
    s = "user_agreement",
    c = e.defineComponent({
      __name: "UserAgreement",
      emits: ["close"],
      setup(n, { emit: c }) {
        const v = c,
          { subscribeMessage: d } = t.useSubscribeMessage([
            "NEW_ACTIVITY_MA",
            "POINT_VALID_MA",
            "TRAVEL_GUIDE_MA",
          ]),
          p = e.ref(),
          g = e.ref(!1),
          m = e.ref(),
          f = e.ref(!1),
          h = e.ref(!1),
          y = e.ref(),
          { result: A, refresh: x } = o.useSysOptions(["rule", "PrivacyRule"], {
            manual: !0,
          }),
          _ = e.computed(() =>
            A.value.map((e) => ({
              code: e.code,
              modifyDatetime: e.modifyDatetime,
            })),
          ),
          P = e.ref(!1),
          w = e.ref(!1);
        function b() {
          (P.value = !1), (w.value = !0);
        }
        async function j() {
          (P.value = !1),
            (g.value = !0),
            (m.value = !0),
            _.value.length &&
              ((y.value = { isAgree: !0, agreementVersions: _.value }),
              r.setStorage(s, y.value)),
            await d(),
            v("close");
        }
        function I() {
          (g.value = !0),
            (m.value = !1),
            (w.value = !1),
            e.index.exitMiniProgram(),
            v("close");
        }
        function U() {
          (w.value = !1), (P.value = !0);
        }
        e.watch([p, g], () => {
          var e;
          (null == (e = p.value) ? void 0 : e.openid) &&
            g.value &&
            (async function () {
              var e, t;
              (null == (e = p.value) ? void 0 : e.openid) &&
                !f.value &&
                g.value &&
                (await u.api.saveUserViewPrivacyPop({
                  hotelGroupCode: i.config.hotelGroupCode,
                  openId: null == (t = p.value) ? void 0 : t.openid,
                  isAgree: m.value ? "T" : "F",
                }),
                (f.value = !0));
            })();
        });
        const C = {
          rule: {
            title: "用户协议",
            url: `/pagesA/other/codeText?title=${encodeURIComponent(
              "用户协议",
            )}&code=rule`,
          },
          PrivacyRule: {
            title: "隐私政策",
            url: `/pagesA/other/codeText?title=${encodeURIComponent(
              "隐私政策",
            )}&code=PrivacyRule`,
          },
        };
        function M(e) {
          var t;
          (null == (t = null == C ? void 0 : C[e]) ? void 0 : t.url) &&
            l.goPage(C[e].url);
        }
        return (
          e.watch(h, (e) => {
            e && !P.value && (P.value = !0);
          }),
          e.onMounted(async () => {
            var e;
            if (
              (a.getWxUserInfo().then((e) => {
                p.value = e;
              }),
              (y.value = r.getStorage(s)),
              !(null == (e = y.value) ? void 0 : e.isAgree))
            )
              return x(), void (h.value = !0);
            v("close"),
              (function () {
                var e, t;
                console.log(
                  "<UserAgreement> {getAgreementUpdateFlag} cachedUserAgreement:",
                  y.value,
                ),
                  (null ==
                  (t = null == (e = y.value) ? void 0 : e.agreementVersions)
                    ? void 0
                    : t.length) &&
                    u.api
                      .getUserViewPrivacyPop({
                        appid: i.config.appid,
                        componentAppid: i.config.componentAppid,
                        clientType: "wechat_mini",
                        hotelGroupCode: i.config.hotelGroupCode,
                        codeParamList: y.value.agreementVersions.map((e) => ({
                          code: e.code,
                          modifyDatetime: e.modifyDatetime,
                        })),
                      })
                      .then((e) => {
                        1 === e.result && e.retVal && r.removeStorage(s);
                      })
                      .catch((e) => {
                        console.log(e);
                      });
              })();
          }),
          (t, o) => ({
            a: e.t(C.rule.title),
            b: e.o((e) => M("rule")),
            c: e.t(C.PrivacyRule.title),
            d: e.o((e) => M("PrivacyRule")),
            e: e.o(b),
            f: e.o(j),
            g: e.p({
              show: P.value,
              "z-index": 1e4,
              title: "用户隐私保护提示",
              "cancel-button-text": "不同意并退出",
              "confirm-button-text": "同意并继续",
            }),
            h: e.o(I),
            i: e.o(U),
            j: e.p({
              show: w.value,
              "z-index": 1e4,
              title: "是否确定退出",
              "cancel-button-text": "不同意并退出",
              "confirm-button-text": "再次查看协议",
            }),
          })
        );
      },
    }),
    v = e._export_sfc(c, [["__scopeId", "data-v-e3c594ea"]]);
  wx.createComponent(v);
})();
