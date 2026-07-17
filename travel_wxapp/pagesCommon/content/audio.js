!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    l = require("../../utils/api.js"),
    o = require("../../utils/umengAdaptor.js"),
    t = require("../../utils/wxuser.js"),
    a = require("../../utils/utils.js"),
    u = require("../../utils/qdTracker.js");
  Array || e.resolveComponent("dvi")(), Math || r();
  const r = () => "../../components/coustomHead.js",
    i = e.defineComponent({
      __name: "audio",
      setup(r) {
        const i = t.getStorage("config");
        let n = e.ref(t.getStorage("user") || {});
        const c = e.ref(!0),
          v = e.ref(48),
          m = e.ref(0),
          s = e.ref({}),
          d = e.ref(0),
          p = e.ref(0),
          g = e.ref(0),
          h = e.ref([]),
          f = e.ref(!1),
          C = e.ref(!1),
          N = e.ref(!0),
          y = e.ref(!0);
        e.onMounted(() => {
          e.index.showShareMenu({
            menus: ["shareAppMessage", "shareTimeline"],
          }),
            (v.value = e.index.getMenuButtonBoundingClientRect().top + 6);
        }),
          e.onUnload(() => {
            T.stop();
          }),
          e.onShareAppMessage(() => ({
            title: s.value.title,
            imageUrl: s.value.coverUrl,
            path: "/pagesCommon/content/audio?id=" + m.value + "&type=1",
          })),
          e.onShareTimeline(() => ({
            title: s.value.title,
            imageUrl: s.value.coverUrl,
            path: "/pagesCommon/content/audio?id=" + m.value + "&type=1",
          })),
          e.onLoad((l) => {
            o.adaptor.updatePageProperties({
              content_id: l.id,
              content_type: "音频",
            }),
              (m.value = l.id),
              1 == l.type &&
                e.index.reLaunch({
                  url: "/pagesCommon/content/audio?id=" + l.id,
                }),
              S();
          }),
          e.onShow(() => {
            n.value && n.value.memberId && q();
          });
        const x = () => {
          y.value = !1;
        };
        e.index.createVideoContext("myVideo");
        const S = () => {
            l.api
              .interfaceTransfer({
                query: {},
                config: {
                  interfaceType: "GET",
                  interfaceModule: "GC_UCBASE_URL",
                  interfaceMethod: "/marketingContent/toC/detail/" + m.value,
                  interfaceFrom: "GC",
                  hotelGroupCode: i.hotelGroupCode,
                },
              })
              .then((l) => {
                (s.value = l.retVal.retVal),
                  (s.value.tripTime =
                    "" +
                    e.dayjs(l.retVal.retVal.createDatetime).format("M月DD日")),
                  b();
              });
          },
          T = e.index.createInnerAudioContext(),
          b = () => {
            (T.autoplay = !0),
              (T.loop = !0),
              (T.src = s.value.sourceUrl),
              T.onPlay(() => {
                c.value = !0;
              }),
              T.onPause((e) => {
                c.value = !1;
              }),
              T.onStop((e) => {
                c.value = !1;
              }),
              T.onCanplay(() => {
                setTimeout(() => {
                  const e = T.duration.toFixed(0),
                    l = Math.floor(e / 60),
                    o = e % 60;
                  (d.value =
                    (l >= 10 ? l : "0" + l) + ":" + (o >= 10 ? o : "0" + o)),
                    console.log(1111111111, d.value);
                }, 500);
              }),
              T.onTimeUpdate(() => {
                const e = T.currentTime.toFixed(0),
                  l = Math.floor(e / 60),
                  o = e % 60;
                (p.value =
                  (l >= 10 ? l : "0" + l) + ":" + (o >= 10 ? o : "0" + o)),
                  (g.value = 100 * (e / T.duration).toFixed(2));
              });
          },
          G = () => {
            c.value ? T.pause() : T.play();
          },
          I = () => {
            if (
              (e.index.setStorageSync("showRefresh", 1),
              e.index.setStorageSync("idValue", m.value),
              e.index.setStorageSync("whether", !f.value),
              (n.value = t.getStorage("user")),
              !N.value)
            )
              return !1;
            if (
              ((N.value = !1),
              setTimeout(() => {
                N.value = !0;
              }, 2e3),
              !n.value || !n.value.memberId)
            )
              return a.toLogin({ mode: "back" }), T.stop(), !1;
            if (f.value) {
              f.value = !1;
              const e = [h.value[0].id];
              l.api.shopDeleteGoodsCollection(e).then((e) => {
                console.log(e);
              });
            } else
              (f.value = !0),
                l.api
                  .shopAddGoodsCollection({
                    hotelGroupCode: i.hotelGroupCode,
                    goodsId: s.value.id,
                    goodsName: s.value.title,
                    memberId: n.value.memberId,
                    mobile: n.value.mobile,
                    collectionType: "CONTENT",
                  })
                  .then((e) => {
                    (C.value = !0),
                      u.qdTracker.track("collect", { collect_type: "内容" }),
                      setTimeout(() => {
                        C.value = !1;
                      }, 1500);
                  });
            setTimeout(() => {
              M();
            }, 400);
          },
          q = () => {
            (n.value = t.getStorage("user")),
              l.api
                .shopGetGoodsIsCollection({
                  hotelGroupCode: i.hotelGroupCode,
                  mobile: n.value.mobile,
                  memberId: n.value.memberId,
                  goodsId: m.value,
                })
                .then((e) => {
                  (h.value = e.retVal),
                    0 == e.retVal.length ? (f.value = !1) : (f.value = !0);
                });
          },
          M = () => {
            (n.value = t.getStorage("user")),
              l.api
                .shopGetGoodsIsCollection({
                  hotelGroupCode: i.hotelGroupCode,
                  mobile: n.value.mobile,
                  memberId: n.value.memberId,
                  goodsId: m.value,
                })
                .then((l) => {
                  (h.value = l.retVal),
                    0 == l.retVal.length
                      ? ((s.value.collectNum = s.value.collectNum - 1),
                        (f.value = !1))
                      : ((s.value.collectNum = s.value.collectNum + 1),
                        (f.value = !0)),
                    e.index.setStorageSync("quantity", s.value.collectNum);
                });
          },
          U = () => {
            T.stop(),
              e.index.navigateTo({ url: "/pagesA/member/myCollection" });
          },
          V = (e) => e.toFixed(7).slice(0, 3);
        return (l, o) =>
          e.e(
            {
              a: e.p({ color: "#000", bgColor: "#fff" }),
              b: v.value + 40 + "px",
              c: s.value.coverUrl,
              d: e.t(s.value.title),
              e: e.t(s.value.tripTime),
              f: e.t(d.value),
              g: !c.value,
            },
            (c.value, {}),
            { h: e.o(G), i: f.value },
            (f.value, {}),
            { j: 0 == s.value.collectNum },
            (s.value.collectNum, {}),
            { k: s.value.collectNum > 0 && s.value.collectNum < 1e3 },
            s.value.collectNum > 0 && s.value.collectNum < 1e3
              ? { l: e.t(s.value.collectNum) }
              : {},
            { m: s.value.collectNum >= 1e3 && s.value.collectNum < 1e4 },
            s.value.collectNum >= 1e3 && s.value.collectNum < 1e4
              ? { n: e.t(V(s.value.collectNum / 1e3)) }
              : {},
            { o: s.value.collectNum >= 1e4 && s.value.collectNum < 1e5 },
            s.value.collectNum >= 1e4 && s.value.collectNum < 1e5
              ? { p: e.t(V(s.value.collectNum / 1e4)) }
              : {},
            { q: s.value.collectNum >= 1e5 },
            s.value.collectNum >= 1e5
              ? { r: e.t((s.value.collectNum / 1e4).toFixed(0)) }
              : {},
            { s: e.o(I), t: y.value },
            y.value
              ? e.e({ v: s.value.coverUrl, w: c.value }, (c.value, {}), {
                  x: e.o(G),
                  y: e.o(x),
                })
              : {},
            { z: s.value.videoDescription, A: C.value },
            C.value ? { B: e.o(U) } : {},
          );
      },
    });
  (i.__runtimeHooks = 6), wx.createPage(i);
})();
