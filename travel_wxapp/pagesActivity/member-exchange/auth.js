!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../assets/index.js"),
    r = require("../../base/defaultConfig.js"),
    n = require("../../base/jAlert/jAlert.js"),
    t = require("../../hooks/useRequest.js"),
    a = require("../../services/member.js"),
    i = require("../../utils/index.js"),
    u = require("../../utils/helper.js"),
    s = require("../../utils/log.js"),
    l = require("../../utils/wxuser.js");
  require("../../utils/request.js"),
    require("../../utils/config.js"),
    require("../../utils/qdTracker.js"),
    require("../../utils/umengAdaptor.js");
  const c = require("../hooks/useMemberExchangeInfo.js");
  Array || e.resolveComponent("SafeArea")(), Math || (v + g + m + d + p)();
  const m = () => "../../components/new/ErrorBlock.js",
    v = () => "../../components/new/Navigator.js",
    g = () => "../../components/new/StButton.js",
    p = () => "../../components/new/StRadio.js",
    d = () => "../components/MemberExchangeContainer.js",
    f = e.defineComponent({
      __name: "auth",
      setup(m) {
        const v = e.ref(0);
        e.onPageScroll((e) => {
          v.value = e.scrollTop;
        });
        const g = e.ref(),
          p = e.ref({}),
          d = e.ref({ request: a.getJumpMemberExchangeActivityInfo }),
          f = e.ref(!1);
        e.onLoad((e) => {
          var o, r;
          s.log.info("{onLoad} options:", e),
            (d.value = { ...e, request: a.getJumpMemberExchangeActivityInfo }),
            (g.value =
              (null ==
              (r = null == (o = getCurrentPages().pop()) ? void 0 : o.$page)
                ? void 0
                : r.fullPath) ||
              "/pagesActivity/member-exchange/sign?id=" + e.id);
        });
        const b = e.ref(l.getStorage("user")),
          h = e.computed(() => {
            var e;
            return !!(null == (e = b.value) ? void 0 : e.memberId);
          }),
          j = e.ref(!1),
          x = e.ref(
            "https://songtsam-internal-static.oss-cn-chengdu.aliyuncs.com/mobile/member-exchange-activity-songtsam-logo.png",
          ),
          {
            activityInfo: y,
            bgLoading: A,
            bgLoadingChange: q,
            errorMsg: E,
            showErrorBlock: M,
            refreshPageData: I,
          } = c.useMemberExchangeInfo(d);
        e.watch(
          () => y.value,
          (e) => {
            (p.value.title = (null == e ? void 0 : e.memberActivityName) || ""),
              (p.value.imageUrl =
                (null == e ? void 0 : e.backgroundImage) || ""),
              1 !== (null == e ? void 0 : e.needLoginFlag) ||
                h.value ||
                i.jumpLogin();
          },
        );
        const k = e.computed(() => {
            var e;
            return (
              (null == (e = y.value) ? void 0 : e.memberActivityId) &&
              !A.value &&
              !M.value
            );
          }),
          { loading: J, run: w } = t.useRequest(
            a.jumpJoinMemberExchangeActivity,
            {
              manual: !0,
              onSuccess(o) {
                s.log.info(
                  "{jumpJoinMemberExchangeActivity} onSuccess.res:",
                  o,
                ),
                  console.log(
                    "[activity] <member-exchange> {jumpJoinMemberExchangeActivity} onSuccess.res:",
                    o,
                  );
                const {
                    appId: r,
                    jumpUrl: n,
                    jumpEnvVersion: t,
                    jumpBrandParam: a,
                  } = o || {},
                  { extend: i, ...u } = a || {};
                setTimeout(() => {
                  const o = Object.entries(u)
                      .map(([e, o]) => `${e}=${decodeURIComponent(o)}`)
                      .join("&"),
                    a = `${n}${n.includes("?") ? "&" : "?"}${o}`,
                    l = {
                      appId: r,
                      path: a,
                      envVersion: t,
                      extraData: {},
                      success: () => {
                        e.index.navigateBack();
                      },
                    };
                  i && (l.extraData = { extend: encodeURIComponent(i) }),
                    console.log(
                      "[activity] <member-exchange> {jumpJoinMemberExchangeActivity} {navigateToMiniProgram} params:",
                      l,
                    ),
                    s.log.info(
                      "{jumpJoinMemberExchangeActivity} {navigateToMiniProgram} params:",
                      l,
                    ),
                    e.index.navigateToMiniProgram({
                      ...l,
                      success: () => {
                        j.value = !1;
                      },
                    });
                }, 0);
              },
              onError(e, o) {
                s.log.error("{jumpJoinMemberExchangeActivity} onError.err:", e),
                  s.log.error(
                    "{jumpJoinMemberExchangeActivity} onError.params:",
                    o,
                  ),
                  n.jAlert3(
                    (null == e ? void 0 : e.msg) ||
                      r.defaultConfig.errorMessage,
                  ),
                  console.log(
                    "[activity] <member-exchange> {jumpJoinMemberExchangeActivity} onError.err:",
                    e,
                    o,
                  );
              },
            },
          );
        function P() {
          var e;
          f.value
            ? w({
                memberActivityId: d.value.id,
                memberId: null == (e = b.value) ? void 0 : e.memberId,
              })
            : n.jAlert3("请先知悉并勾选下方内容");
        }
        function S() {
          h.value
            ? (j.value = !0)
            : i.jumpLogin({ backPrevPage: !1, pageQuery: { launchJoin: 1 } });
        }
        return (
          e.onShow(() => {
            b.value = l.getStorage("user");
          }),
          e.onMounted(() => {
            var e;
            "1" === (null == (e = d.value) ? void 0 : e.launchJoin) && S();
          }),
          e.onShareAppMessage(() => ({ ...p.value })),
          (r, n) => {
            var t, a, i, s;
            return e.e(
              {
                a: e.p({
                  fixed: !0,
                  theme: k.value ? "black" : "white",
                  "use-blur-style": k.value,
                  placeholder: !0,
                  "custom-style": { display: j.value ? "none" : "block" },
                  "scroll-top": v.value,
                }),
                b: e.unref(M),
              },
              e.unref(M)
                ? {
                    c: e.p({ block: !0, theme: "black" }),
                    d: e.o((...o) => e.unref(I) && e.unref(I)(...o)),
                    e: e.p({ description: e.unref(E) }),
                  }
                : (null == (t = e.unref(y)) ? void 0 : t.memberActivityId)
                  ? {
                      g: e.o(e.unref(q)),
                      h: e.o(S),
                      i: e.p({
                        type: 1,
                        "activity-info": e.unref(y),
                        "custom-style": { opacity: k.value ? 1 : 0 },
                        "button-loading": e.unref(J),
                        "scroll-top": v.value,
                      }),
                      j: e.o((e) => (j.value = !1)),
                      k: e.p({ fixed: !0, placeholder: !0 }),
                      l: x.value,
                      m: e.unref(o.assets).icExchange,
                      n: null == (a = e.unref(y)) ? void 0 : a.brandLogo,
                      o: e.o(P),
                      p: e.p({
                        block: !0,
                        theme: "black",
                        loading: e.unref(J),
                      }),
                      q: e.o((e) => (j.value = !1)),
                      r: e.p({
                        block: !0,
                        theme: "simple",
                        "custom-style": {
                          marginTop: e.unref(u.pxTransform)(24),
                        },
                      }),
                      s: e.o((e) => (f.value = e)),
                      t: e.p({ modelValue: f.value }),
                      v: e.t(
                        (null == (i = e.unref(y)) ? void 0 : i.brandName) ||
                          "品牌方",
                      ),
                      w: e.p({
                        position: "bottom",
                        "custom-style": { height: e.unref(u.pxTransform)(116) },
                      }),
                      x: j.value,
                      y: j.value ? 300 : 0,
                      z: e.o((e) => (j.value = !1)),
                    }
                  : {},
              { f: null == (s = e.unref(y)) ? void 0 : s.memberActivityId },
            );
          }
        );
      },
    });
  f.__runtimeHooks = 3;
  const b = e._export_sfc(f, [["__scopeId", "data-v-168fe8c3"]]);
  wx.createPage(b);
})();
