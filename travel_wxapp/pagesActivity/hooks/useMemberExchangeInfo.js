!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../utils/log.js"),
    o = require("../../base/defaultConfig.js"),
    n = require("../../hooks/useRequest.js"),
    a = require("../../hooks/useLoading.js"),
    t = require("../../services/member.js");
  exports.useMemberExchangeInfo = function (u) {
    var i;
    const s = e.ref(),
      {
        data: c,
        run: l,
        loading: v,
      } = n.useRequest(
        (null == (i = u.value) ? void 0 : i.request) ||
          t.getMemberExchangeActivityInfo,
        {
          manual: !0,
          onSuccess(e) {
            var o;
            console.log(
              "[activity] <member-exchange> {getMemberExchangeJumpBackActivityInfo} res:",
              e,
            ),
              r.log.info("{fetchActivityInfo} onSuccess.res:", e),
              (
                null == (o = null == e ? void 0 : e.backgroundImage)
                  ? void 0
                  : o.startsWith("http")
              )
                ? (null == e ? void 0 : e.backgroundImage) !== s.value
                  ? (s.value = null == e ? void 0 : e.backgroundImage)
                  : (d.value = !1)
                : m(!0, "活动配置有误");
          },
          onError(e, o) {
            console.error(
              "[activity] <member-exchange> {getMemberExchangeJumpBackActivityInfo}",
              e,
              o,
            ),
              r.log.error("{fetchActivityInfo} onError.err:", e),
              r.log.error("{fetchActivityInfo} onError.params:", o),
              (d.value = !1),
              m(!0, null == e ? void 0 : e.msg);
          },
        },
      ),
      g = e.ref(!1),
      f = e.ref();
    function m(e, r) {
      g.value !== e && ((g.value = e), (f.value = r));
    }
    const d = a.useLoading(!0);
    function h() {
      var e;
      (null == (e = u.value) ? void 0 : e.id) &&
        (v.value ||
          (m(!1),
          (d.value = !0),
          l({ memberActivityId: u.value.id }, { showToast: !1 })));
    }
    return (
      e.onShow(() => {
        g.value || h();
      }),
      e.watch(
        () => u.value,
        (e) => {
          e && h();
        },
        { immediate: !0 },
      ),
      {
        activityInfo: c,
        bgLoading: d,
        bgLoadingChange: function (e, r) {
          (d.value = e), e || r || m(!0, o.defaultConfig.errorMessage);
        },
        errorMsg: f,
        showErrorBlock: g,
        toggleErrorBlock: m,
        refreshPageData: h,
      }
    );
  };
})();
