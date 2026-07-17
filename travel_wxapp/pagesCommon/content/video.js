!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    l = require("../../utils/api.js"),
    o = require("../../utils/umengAdaptor.js"),
    t = require("../../utils/wxuser.js"),
    u = require("../../utils/utils.js"),
    a = require("../../utils/qdTracker.js"),
    r = e.defineComponent({
      __name: "video",
      setup(r) {
        let c = e.ref(t.getStorage("user") || {});
        const v = t.getStorage("config"),
          i = e.ref({}),
          n = e.ref([]),
          d = e.ref(!1),
          m = e.ref(!1),
          s = e.ref(!1),
          p = e.ref(!0),
          g = e.ref(48),
          h = e.ref(0),
          N = e.ref(!0),
          f = e.ref(!1);
        e.onShareAppMessage(() => ({
          title: i.value.title,
          imageUrl: i.value.coverUrl,
          path: "/pagesCommon/content/video?id=" + h.value + "&type=1",
        })),
          e.onShareTimeline(() => ({
            title: i.value.title,
            imageUrl: i.value.coverUrl,
            path: "/pagesCommon/content/video?id=" + h.value + "&type=1",
          })),
          e.onMounted(() => {
            e.index.showShareMenu({
              menus: ["shareAppMessage", "shareTimeline"],
            }),
              (g.value = e.index.getMenuButtonBoundingClientRect().top + 6),
              1 == getCurrentPages().length && (f.value = !0);
          }),
          e.onUnload(() => {
            G.stop();
          }),
          e.onLoad((l) => {
            o.adaptor.updatePageProperties({
              content_id: l.id,
              content_type: "视频",
            }),
              (h.value = l.id),
              1 == l.type &&
                e.index.reLaunch({
                  url: "/pagesCommon/content/video?id=" + l.id,
                }),
              _();
          }),
          e.onShow(() => {
            c.value && c.value.memberId && V();
          });
        const C = () => {
            s.value = !0;
          },
          x = () => {
            s.value = !0;
          },
          S = () => {
            s.value = !1;
          },
          b = (e) => {
            e.detail.show ? (p.value = !0) : (p.value = !1);
          },
          y = () => {
            e.index.navigateBack({ delta: 1 });
          },
          G = e.index.createVideoContext("myVideo"),
          I = () => {
            G.play();
          },
          T = () => {
            G.pause();
          },
          _ = () => {
            l.api
              .interfaceTransfer({
                query: {},
                config: {
                  interfaceType: "GET",
                  interfaceModule: "GC_UCBASE_URL",
                  interfaceMethod: "/marketingContent/toC/detail/" + h.value,
                  interfaceFrom: "GC",
                  hotelGroupCode: v.hotelGroupCode,
                },
              })
              .then((e) => {
                i.value = e.retVal.retVal;
              });
          },
          q = () => {
            if (
              (e.index.setStorageSync("showRefresh", 1),
              e.index.setStorageSync("idValue", h.value),
              e.index.setStorageSync("whether", !d.value),
              !N.value)
            )
              return !1;
            if (
              ((N.value = !1),
              setTimeout(() => {
                N.value = !0;
              }, 2e3),
              (c.value = t.getStorage("user")),
              !c.value || !c.value.memberId)
            )
              return u.toLogin({ mode: "back" }), !1;
            if (d.value) {
              d.value = !1;
              const e = [n.value[0].id];
              l.api.shopDeleteGoodsCollection(e).then((e) => {
                console.log(e);
              });
            } else
              (d.value = !0),
                l.api
                  .shopAddGoodsCollection({
                    hotelGroupCode: v.hotelGroupCode,
                    goodsId: i.value.id,
                    goodsName: i.value.title,
                    memberId: c.value.memberId,
                    mobile: c.value.mobile,
                    collectionType: "CONTENT",
                  })
                  .then((e) => {
                    (m.value = !0),
                      a.qdTracker.track("collect", { collect_type: "内容" }),
                      setTimeout(() => {
                        m.value = !1;
                      }, 1500);
                  });
            setTimeout(() => {
              k();
            }, 400);
          },
          V = () => {
            (c.value = t.getStorage("user")),
              l.api
                .shopGetGoodsIsCollection({
                  hotelGroupCode: v.hotelGroupCode,
                  mobile: c.value.mobile,
                  memberId: c.value.memberId,
                  goodsId: h.value,
                })
                .then((e) => {
                  (n.value = e.retVal),
                    0 == e.retVal.length ? (d.value = !1) : (d.value = !0);
                });
          },
          k = () => {
            (c.value = t.getStorage("user")),
              l.api
                .shopGetGoodsIsCollection({
                  hotelGroupCode: v.hotelGroupCode,
                  mobile: c.value.mobile,
                  memberId: c.value.memberId,
                  goodsId: h.value,
                })
                .then((l) => {
                  (n.value = l.retVal),
                    0 == l.retVal.length
                      ? ((i.value.collectNum = i.value.collectNum - 1),
                        (d.value = !1))
                      : ((i.value.collectNum = i.value.collectNum + 1),
                        (d.value = !0)),
                    e.index.setStorageSync("quantity", i.value.collectNum);
                });
          },
          w = () => {
            e.index.navigateTo({ url: "/pagesA/member/myCollection" });
          },
          U = () => {
            e.index.reLaunch({ url: "/pages/travel/index" });
          },
          j = (e) => e.toFixed(7).slice(0, 3);
        return (l, o) =>
          e.e(
            { a: f.value },
            f.value ? { b: e.o(U) } : { c: e.o(y) },
            {
              d: g.value + "px",
              e: e.o(b),
              f: e.o(x),
              g: e.o(C),
              h: e.o(S),
              i: i.value.sourceUrl,
              j: m.value,
            },
            m.value ? { k: e.o(w) } : {},
            { l: s.value },
            s.value ? { m: e.o(I) } : {},
            { n: p.value && !s.value },
            p.value && !s.value ? { o: e.o(T) } : {},
            { p: e.t(i.value.title), q: d.value },
            (d.value, {}),
            { r: 0 == i.value.collectNum },
            (i.value.collectNum, {}),
            { s: i.value.collectNum > 0 && i.value.collectNum < 1e3 },
            i.value.collectNum > 0 && i.value.collectNum < 1e3
              ? { t: e.t(i.value.collectNum) }
              : {},
            { v: i.value.collectNum >= 1e3 && i.value.collectNum < 1e4 },
            i.value.collectNum >= 1e3 && i.value.collectNum < 1e4
              ? { w: e.t(j(i.value.collectNum / 1e3)) }
              : {},
            { x: i.value.collectNum >= 1e4 && i.value.collectNum < 1e5 },
            i.value.collectNum >= 1e4 && i.value.collectNum < 1e5
              ? { y: e.t(j(i.value.collectNum / 1e4)) }
              : {},
            { z: i.value.collectNum >= 1e5 },
            i.value.collectNum >= 1e5
              ? { A: e.t((i.value.collectNum / 1e4).toFixed(0)) }
              : {},
            { B: e.o(q) },
          );
      },
    });
  r.__runtimeHooks = 6;
  const c = e._export_sfc(r, [["__scopeId", "data-v-3c1ed642"]]);
  wx.createPage(c);
})();
