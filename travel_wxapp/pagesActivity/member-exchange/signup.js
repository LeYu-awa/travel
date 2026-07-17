!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../base/defaultConfig.js"),
    r = require("../../base/jAlert/jAlert.js"),
    n = require("../../hooks/useLoading.js"),
    i = require("../../hooks/useRequest.js"),
    t = require("../../services/member.js"),
    u = require("../../utils/index.js"),
    l = require("../../utils/log.js"),
    a = require("../../utils/url.js"),
    c = require("../../utils/user.js"),
    s = require("../../utils/utils.js"),
    v = require("../../utils/wxuser.js"),
    m = require("../hooks/useMemberExchangeInfo.js");
  Math || (g + p + d + f)();
  const d = () => "../../components/new/ErrorBlock.js",
    g = () => "../../components/new/Navigator.js",
    p = () => "../../components/new/StButton.js",
    f = () => "../components/MemberExchangeContainer.js",
    b = e.defineComponent({
      __name: "signup",
      setup(d) {
        const g = e.ref(0);
        e.onPageScroll((e) => {
          g.value = e.scrollTop;
        });
        const p = e.ref(),
          f = e.ref({});
        e.onLoad((e) => {
          l.log.info("{onLoad} options:", e), (f.value = e);
        });
        const b = v.getStorage("user"),
          h = e.computed(() => !!(null == b ? void 0 : b.memberId)),
          {
            activityInfo: y,
            bgLoading: j,
            bgLoadingChange: x,
            errorMsg: A,
            showErrorBlock: k,
            refreshPageData: E,
          } = m.useMemberExchangeInfo(f),
          I = e.computed(() => {
            var e;
            return (
              (null == (e = y.value) ? void 0 : e.memberActivityId) &&
              !j.value &&
              !k.value
            );
          }),
          q = n.useLoading(!1, "请稍候..."),
          { loading: M, run: w } = i.useRequest(
            t.jumpBackJoinMemberExchangeActivity,
            {
              manual: !0,
              onSuccess(e) {
                var o, r;
                if (
                  (console.log(
                    "[activity] <member-exchange> {jumpBackJoinMemberExchangeActivity} onSuccess.res:",
                    e,
                  ),
                  l.log.info(
                    "{jumpBackJoinMemberExchangeActivity} onSuccess.res:",
                    e,
                  ),
                  null == e ? void 0 : e.landingUrl)
                ) {
                  let n = null == e ? void 0 : e.landingUrl;
                  if (n.includes("/pages/mall/webview")) {
                    const { origin: e, query: r } = a.parseUrl(n);
                    r.url &&
                      (r.url = encodeURIComponent(
                        a.addUrlQuery(decodeURIComponent(r.url), {
                          memberActivityId:
                            null == (o = y.value) ? void 0 : o.memberActivityId,
                        }),
                      )),
                      (n = a.joinUrl(e, r));
                  } else
                    n = a.addUrlQuery(n, {
                      memberActivityId:
                        null == (r = y.value) ? void 0 : r.memberActivityId,
                    });
                  console.log(
                    "[activity] <member-exchange> {jumpBackJoinMemberExchangeActivity} onSuccess.jumpUrl:",
                    n,
                  ),
                    l.log.info(
                      "{jumpBackJoinMemberExchangeActivity} onSuccess.jumpUrl:",
                      n,
                    ),
                    s.goPage(n);
                }
              },
              onError(e, n) {
                if (
                  (console.error(
                    "[activity] <member-exchange> {jumpBackJoinMemberExchangeActivity} onError.err:",
                    e,
                    n,
                  ),
                  1002000011 === (null == e ? void 0 : e.code))
                ) {
                  const { cardLevel: o, createTime: r } =
                    (null == e ? void 0 : e.data) || {};
                  o &&
                    r &&
                    s.goPage(`./signup-result?cardLevel=${o}&createTime=${r}`);
                } else
                  1002000007 === (null == e ? void 0 : e.code)
                    ? r.jAlert5(
                        "提示",
                        async () => {
                          try {
                            (q.value = !0),
                              await c.removeOpenIdAndSignOut(!0),
                              (q.value = !1),
                              u.jumpLogin({
                                backPrevPage: !1,
                                pageQuery: { launchJoin: 1 },
                              });
                          } catch {
                            q.value = !1;
                          }
                        },
                        () => {},
                        null == e ? void 0 : e.msg,
                      )
                    : r.jAlert3(
                        (null == e ? void 0 : e.msg) ||
                          o.defaultConfig.errorMessage,
                      );
                l.log.error(
                  "{jumpBackJoinMemberExchangeActivity} onError.err:",
                  e,
                ),
                  l.log.error(
                    "{jumpBackJoinMemberExchangeActivity} onError.params:",
                    n,
                  );
              },
            },
          );
        async function J() {
          var e, o, r, n, i;
          if (1 !== (null == (e = y.value) ? void 0 : e.status)) return;
          if (!h.value)
            return void u.jumpLogin({
              backPrevPage: !1,
              pageQuery: { launchJoin: 1 },
            });
          const t = { memberId: b.memberId };
          ["id", "key", "mobile", "version"].forEach((e) => {
            f.value[e] && (t[e] = f.value[e]);
          }),
            (null == (r = null == (o = p.value) ? void 0 : o.extraData)
              ? void 0
              : r.extend) &&
              (t.extend =
                null == (i = null == (n = p.value) ? void 0 : n.extraData)
                  ? void 0
                  : i.extend),
            l.log.info("{launchJoinActivity.fetchJoinActivity} params:", t),
            w(t, { showToast: !1 });
        }
        return (
          e.onMounted(() => {
            "1" === (null == f ? void 0 : f.value.launchJoin) &&
              setTimeout(() => {
                J();
              }, 1e3);
          }),
          e.onShow(() => {
            const o = e.index.getEnterOptionsSync();
            (p.value = (null == o ? void 0 : o.referrerInfo) || {}),
              l.log.info("{onShow} enterOptions:", o);
          }),
          (o, r) => {
            var n, i;
            return e.e(
              {
                a: e.p({
                  fixed: !0,
                  theme: I.value ? "black" : "white",
                  "use-blur-style": I.value,
                  placeholder: !0,
                  "scroll-top": g.value,
                }),
                b: e.unref(k),
              },
              e.unref(k)
                ? {
                    c: e.p({ block: !0, theme: "black" }),
                    d: e.o((...o) => e.unref(E) && e.unref(E)(...o)),
                    e: e.p({ description: e.unref(A) }),
                  }
                : (null == (n = e.unref(y)) ? void 0 : n.memberActivityId)
                  ? {
                      g: e.o(e.unref(x)),
                      h: e.o(J),
                      i: e.p({
                        type: 2,
                        "activity-info": e.unref(y),
                        "custom-style": { opacity: I.value ? 1 : 0 },
                        "button-loading": e.unref(M),
                        "scroll-top": g.value,
                      }),
                    }
                  : {},
              { f: null == (i = e.unref(y)) ? void 0 : i.memberActivityId },
            );
          }
        );
      },
    });
  b.__runtimeHooks = 1;
  const h = e._export_sfc(b, [["__scopeId", "data-v-42d3edb0"]]);
  wx.createPage(h);
})();
