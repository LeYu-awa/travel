!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../utils/helper.js"),
    r = require("../../utils/index.js"),
    l = require("../../utils/wxuser.js"),
    t = require("../../hooks/useRequest.js"),
    u = require("../../hooks/useLoading.js"),
    n = require("../../services/member.js");
  Math || (a + i + v + c + s)();
  const a = () => "../../components/new/Navigator.js",
    s = () => "../../components/new/FixedBottomView.js",
    i = () => "../../components/new/StButton.js",
    c = () => "../../components/new/SafeArea.js",
    v = () => "../../components/new/ErrorBlock.js",
    d = {
      __name: "signup-result",
      props: { cardLevel: String, createTime: String },
      setup(a) {
        const s = a;
        let i = l.getStorage("config");
        const c = e.ref(!1),
          v = e.ref([]),
          d = e.ref(),
          m = e.ref(!0),
          f = e.ref(""),
          p = u.useLoading(),
          { run: g, isError: h } = t.useRequest(n.getMemberCardInfo, {
            manual: !0,
            onSuccess(e) {
              var o, r, l, t;
              if (null == (o = null == e ? void 0 : e.retVal) ? void 0 : o[0]) {
                const o =
                  null ==
                  (l =
                    null == (r = null == e ? void 0 : e.retVal) ? void 0 : r[0])
                    ? void 0
                    : l.membercardInterestList;
                (d.value =
                  null == o
                    ? void 0
                    : o.find((e) => e.cardCode === s.cardLevel)),
                  (m.value = 1 === (null == e ? void 0 : e.result) && d.value);
                try {
                  v.value = JSON.parse(
                    null == (t = d.value) ? void 0 : t.icons,
                  );
                } catch {
                  f.value = void 0;
                }
              } else
                (h.value = !0),
                  (m.value = !1),
                  (f.value = (null == e ? void 0 : e.msg) || void 0);
              p.value = !1;
            },
            onError(e) {
              (p.value = !1),
                (h.value = !0),
                (m.value = !1),
                (f.value = (null == e ? void 0 : e.msg) || void 0);
            },
          });
        function j() {
          (null == s ? void 0 : s.cardLevel) &&
            ((m.value = !1),
            (h.value = !1),
            (p.value = !0),
            g({
              cardLevel: s.cardLevel,
              hotelGroupCode: i.hotelGroupCode,
              hotelCode: i.hotelCode || 0,
            }));
        }
        function b() {
          var o = { title: decodeURIComponent("会员政策"), code: "memberRule" };
          e.index.navigateTo({
            url: "/pagesA/other/codeText?" + r.createUrl(o),
          });
        }
        function x() {
          j();
        }
        return (
          j(),
          e.watchEffect(() => {
            console.log("[activity] <SignupResult> isError:", h.value);
          }),
          (r, l) => {
            var t, u, n;
            return e.e(
              {
                a: e.p({
                  fixed: !0,
                  "use-immersive-style": !0,
                  placeholder: !0,
                }),
                b: e.unref(h),
              },
              e.unref(h)
                ? {
                    c: e.p({ block: !0, theme: "black" }),
                    d: e.o(x),
                    e: e.p({ description: f.value }),
                  }
                : e.unref(p)
                  ? {}
                  : e.e(
                      {
                        g: e.t(null == (t = d.value) ? void 0 : t.faceName),
                        h: null == (u = d.value) ? void 0 : u.faceAttr,
                        i: e.t(null == (n = d.value) ? void 0 : n.faceName),
                        j: a.createTime,
                      },
                      a.createTime
                        ? {
                            k: e.t(
                              e
                                .unref(e.dayjs)(a.createTime)
                                .format("YYYY.MM.DD"),
                            ),
                          }
                        : {},
                      {
                        l: e.o(b),
                        m: e.f(v.value, (o, r, l) => ({
                          a: o.iconUrl,
                          b: e.t(o.name),
                          c: e.t(o.remark),
                          d: "icon-" + r,
                        })),
                        n: e.p({
                          position: "bottom",
                          "custom-style": {
                            height: e.unref(o.pxTransform)(144),
                          },
                        }),
                        o: e.o((e) => (c.value = !0)),
                        p: e.p({ theme: "simple", block: !0 }),
                        q: e.p({ "custom-style": "z-index: 10;" }),
                        r: e.o((e) => (c.value = !1)),
                        s: e.p({
                          position: "bottom",
                          "custom-style": {
                            height: e.unref(o.pxTransform)(116),
                          },
                        }),
                        t: c.value,
                        v: e.o((e) => (c.value = !1)),
                        w: m.value && !e.unref(h) ? 1 : 0,
                      },
                    ),
              { f: !e.unref(p) },
            );
          }
        );
      },
    },
    m = e._export_sfc(d, [["__scopeId", "data-v-e3f8a420"]]);
  wx.createPage(m);
})();
