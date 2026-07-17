!(function () {
  "use strict";
  const e = require("../common/vendor.js"),
    o = require("../hooks/useNavigatorRect.js"),
    r = require("../utils/umengAdaptor.js");
  require("../utils/config.js"),
    require("../utils/request.js"),
    require("../utils/log.js");
  const i = require("../utils/qdTracker.js");
  require("../base/product.js"), require("../services/request/request.js");
  const n = require("../hooks/useSubscribeMessage.js");
  require("../store/index.js");
  const a = require("../utils/helper.js"),
    u = require("./hooks/useMicroPage.js"),
    l = require("../store/modules/micro.js");
  Array || e.resolveComponent("FloatButtonKf")(),
    Math || (c + g + d + m + t + p + s + v)();
  const s = () => "../components/new/ErrorBlock.js",
    t = () => "../components/new/LimitingRetry/index.js",
    c = () => "../components/new/Navigator.js",
    v = () => "../components/new/Spin.js",
    p = () => "../components/new/StButton.js",
    d = () => "./components/Collect.js",
    g = () => "./components/CompList.js",
    m = () => "./components/SubscribeMessage.js",
    f = e.defineComponent({
      __name: "index",
      setup(s) {
        const t = e.ref(),
          c = e.ref(),
          v = l.useMicroStore();
        e.onLoad((e) => {
          console.log("[pagesMicro] <Index> {onLoad} options:", e),
            (null == e ? void 0 : e.id) && (t.value = e.id),
            v.setMemberActivityId(null == e ? void 0 : e.memberActivityId),
            (null == e ? void 0 : e.collectArticleId) &&
              (c.value = e.collectArticleId);
        });
        const p = ["NEW_ACTIVITY_MA", "POINT_VALID_MA", "TRAVEL_GUIDE_MA"],
          { subscribeMessage: d } = n.useSubscribeMessage(p),
          g = o.useNavigatorRect(),
          m = e.ref({}),
          {
            data: f,
            page: _,
            items: b,
            loading: h,
            isError: y,
            isServerLimiting: j,
            refresh: q,
          } = u.useMicroPage(t),
          k = e.computed(() => {
            var e, o, r, i;
            return {
              activity_page_id: (null == (e = f.value) ? void 0 : e.id) || "",
              activity_page_name:
                (null ==
                (i =
                  null == (r = null == (o = _.value) ? void 0 : o.config)
                    ? void 0
                    : r.props)
                  ? void 0
                  : i.title) || "",
            };
          });
        e.watch(k, (e) => {
          (null == e ? void 0 : e.activity_page_id) &&
            (null == e ? void 0 : e.activity_page_name) &&
            (i.qdTracker.track("activity_page_view", {
              activity_page_id: e.activity_page_id,
              activity_page_name: e.activity_page_name,
            }),
            (m.value = { marketing_page_name: e.activity_page_name }),
            i.qdTracker.setData(m.value),
            r.adaptor.updatePageProperties({
              page_id: e.activity_page_id,
              st_page_name: e.activity_page_name,
            }));
        }),
          e.onUnload(() => {
            i.qdTracker.resetData(m.value);
          });
        const S = e.computed(() => {
            var e, o;
            return (
              c.value &&
              (null == (o = null == (e = _.value) ? void 0 : e.config.props)
                ? void 0
                : o.supportCollect)
            );
          }),
          w = e.computed(() => {
            var e, o, r;
            return null ==
              (r =
                null == (o = null == (e = _.value) ? void 0 : e.config)
                  ? void 0
                  : o.props)
              ? void 0
              : r.immersiveNav;
          }),
          M = e.ref({ title: "", imageUrl: "" });
        e.onShareAppMessage(() => ({
          ...M.value,
          imageUrl: a.shareImageTransfrom(M.value.imageUrl),
        })),
          e.onShareTimeline(() => ({
            ...M.value,
            imageUrl: a.shareImageTransfrom(M.value.imageUrl, "timeline"),
          })),
          e.watch(_, (o) => {
            var r, i, n, a, u, l;
            (
              null ==
              (i =
                null == (r = null == o ? void 0 : o.config) ? void 0 : r.props)
                ? void 0
                : i.share
            )
              ? ((M.value.title =
                  (null == (n = o.config.props) ? void 0 : n.shareTitle) ||
                  (null == (a = o.config.props) ? void 0 : a.title)),
                (null == (u = o.config.props) ? void 0 : u.sharePoster) &&
                  (M.value.imageUrl =
                    null == (l = o.config.props) ? void 0 : l.sharePoster))
              : e.wx$1.hideShareMenu();
          });
        const T = e.computed(() => {
          var e, o, r;
          const i = {};
          if (
            null ==
            (r =
              null == (o = null == (e = _.value) ? void 0 : e.config)
                ? void 0
                : o.wrap)
              ? void 0
              : r.background
          ) {
            const e = _.value.config.wrap.background;
            i.background = "color" === e.type ? e.value : `url(${e.value})`;
          }
          return i;
        });
        e.onPageScroll((e) => {});
        const A = e.computed(() => {
          var e, o, r, i, n, a, u, l, s, t;
          return {
            ...(null == (o = null == (e = _.value) ? void 0 : e.config)
              ? void 0
              : o.props),
            background:
              (null ==
              (a =
                null ==
                (n =
                  null == (i = null == (r = _.value) ? void 0 : r.config)
                    ? void 0
                    : i.props)
                  ? void 0
                  : n.navBackground)
                ? void 0
                : a.value) || void 0,
            color:
              (null ==
              (t =
                null ==
                (s =
                  null == (l = null == (u = _.value) ? void 0 : u.config)
                    ? void 0
                    : l.props)
                  ? void 0
                  : s.navColor)
                ? void 0
                : t.value) || void 0,
          };
        });
        return (
          e.provide("handleSubscribeMessage", async function () {
            t.value &&
              !v.hasShownSubscribePopup(t.value) &&
              (await d(), v.addSubscribePopupRecord(t.value));
          }),
          (o, r) => {
            var i, n, u, l, s, d;
            return e.e(
              {
                a: e.p({
                  fixed: !0,
                  placeholder: !w.value,
                  "use-immersive-style": w.value,
                  ...A.value,
                  "custom-style": e.unref(h)
                    ? {
                        opacity: 0,
                        pointerEvents: "none",
                        ...(null == (i = A.value) ? void 0 : i.customStyle),
                      }
                    : { ...(null == (n = A.value) ? void 0 : n.customStyle) },
                }),
                b: e.unref(_),
              },
              e.unref(_)
                ? e.e(
                    {
                      c: e.p({
                        items: e.unref(b),
                        "parent-comp-name": "page",
                        "track-data": k.value,
                        "tab-offset-top": e.unref(g).outerHeight - 1,
                      }),
                      d:
                        null == (u = e.unref(_).config.props)
                          ? void 0
                          : u.showKf,
                    },
                    (null == (l = e.unref(_).config.props) || l.showKf, {}),
                    { e: S.value },
                    S.value ? { f: e.p({ "article-id": c.value }) } : {},
                    {
                      g:
                        null == (s = e.unref(_).config.props)
                          ? void 0
                          : s.subscribe,
                    },
                    (
                      null == (d = e.unref(_).config.props)
                        ? void 0
                        : d.subscribe
                    )
                      ? {
                          h: e.p({
                            visible: !e
                              .unref(v)
                              .hasShownSubscribePopup(t.value),
                            scenes: p,
                            "page-id": t.value,
                          }),
                        }
                      : {},
                    { i: e.unref(h) ? 1 : "" },
                  )
                : {},
              { j: !e.unref(h) },
              e.unref(h)
                ? { q: e.p({ size: 48 }) }
                : e.e(
                    { k: e.unref(y) },
                    e.unref(y)
                      ? e.e(
                          {
                            l: e.o(e.unref(q)),
                            m: e.p({ show: e.unref(j) }),
                            n: !e.unref(j),
                          },
                          e.unref(j)
                            ? {}
                            : {
                                o: e.o(e.unref(q)),
                                p: e.p({
                                  block: !0,
                                  theme: "black",
                                  "custom-style": {
                                    marginTop: e.unref(a.pxTransform)(24, 375),
                                  },
                                }),
                              },
                        )
                      : {},
                  ),
              { r: e.s(T.value) },
            );
          }
        );
      },
    });
  f.__runtimeHooks = 7;
  const _ = e._export_sfc(f, [["__scopeId", "data-v-d966c3e7"]]);
  wx.createPage(_);
})();
