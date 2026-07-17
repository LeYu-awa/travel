!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    l = require("../../utils/wxuser.js"),
    o = require("../../base/jAlert/jAlert.js"),
    a = require("../../base/channel.js"),
    r = require("../../utils/filter.js"),
    s = require("../../hooks/useScroll.js"),
    u = require("../../utils/utils.js");
  Array || e.resolveComponent("FloatButtonKf")(),
    Math || (d + i + n + f + p + c)();
  const n = () => "../../components/notice.js",
    i = () => "../../components/swiperBox.js",
    f = () => "../../components/tabs.js",
    c = () => "../../components/bottomNav.js",
    d = () => "../../components/coustomHead.js",
    p = () => "../../components/empty.js",
    g = e.defineComponent({
      __name: "scenery",
      setup(n) {
        const { scrollTop: i, onPageScroll: f } = s.useScroll();
        let c = l.getStorage("config"),
          d = e.ref(a.defaultChannel),
          p = e.ref(!1),
          g = e.ref(-1),
          h = e.reactive({
            indicatorDots: !1,
            autoplay: !0,
            circular: !0,
            dotPosStyle: "left: 50%;transform: translateX(-50%);bottom:8px;",
          }),
          v = e.reactive({
            indicatorDots: !1,
            autoplay: !0,
            circular: !0,
            dotPosStyle: "right:24px;bottom:48px;left:auto;",
          }),
          m = e.ref({}),
          b = e.reactive({}),
          C = e.ref([]),
          T = e.ref([]);
        const S = e.ref([]),
          y = e.ref({}),
          j = e.ref([]),
          w = e.ref(!1);
        let x = e.ref(0);
        const I = e.ref(0);
        let V = e.ref(),
          P = e.ref(!0);
        f((t) => {
          i.value = t.scrollTop;
          const l = e.index.createSelectorQuery();
          l.selectAll(".tabs").boundingClientRect(),
            l.exec((e) => {
              e[0][0].top < I.value + 44 ? (w.value = !0) : (w.value = !1);
            });
        });
        let L = e.computed(() => {
          let e = [],
            t = [],
            l = {};
          return (
            m.value.goodsIds &&
              m.value.goodsIds.length > 0 &&
              m.value.goodsIds.forEach((e) => {
                l[e] = !0;
              }),
            T.value.forEach((o) => {
              l[o.goodsId] ? t.push(o) : e.push(o);
            }),
            (e = [...t, ...e]),
            m.value.number && (e = e.slice(0, Number(m.value.number))),
            console.log(e),
            e
          );
        });
        const N = (e) => {
            e && u.goPage(e);
          },
          q = () => {
            e.index.pageScrollTo({
              selector: "#tabs",
              offsetTop: -90,
              complete: (e) => {},
            });
          },
          U = (e, t) => {
            if (((P.value = !1), (m.value = e), e[e.id]))
              return (T.value = e[e.id]), (g.value = T.value.length), void q();
            A(e, 1);
          },
          A = (e, l) => {
            (g.value = -1),
              t.api
                .weimoInterfaceTransfer({
                  config: {
                    path: "/weimob_shop/v2.0/goods/getList",
                    requestMethod: "POST",
                    hotelGroupCode: c.hotelGroupCode,
                    hotelCode: "0",
                  },
                  params: {
                    pageNum: l,
                    pageSize: 20,
                    queryParameter: { classifyId: e.id },
                    basicInfo: { vid: 6016433635204 },
                  },
                })
                .then((t) => {
                  if (0 == t.result) {
                    1 == l && (T.value = []);
                    let o = 0;
                    t.retVal.pageList.forEach((e) => {
                      T.value.push(e);
                    }),
                      (o =
                        t.retVal.totalCount <= e.number
                          ? t.retVal.totalCount
                          : e.number),
                      T.value.length < o
                        ? A(e, l + 1)
                        : P.value ||
                          setTimeout(() => {
                            q();
                          }, 200),
                      (e[e.id] = T.value);
                  }
                  g.value = T.value.length;
                });
          },
          G = () => {
            t.api
              .modePage({
                hotelCode: c.hotelCode,
                hotelGroupCode: c.hotelGroupCode,
                clientTypes: d.value,
                firstResult: 0,
                pageSize: 10,
                showLocation: "2",
              })
              .then((e) => {
                0 == e.result &&
                  e.retVal &&
                  e.retVal.datas &&
                  e.retVal.datas.length > 0 &&
                  ((j.value = JSON.parse(e.retVal.datas[0].infos)),
                  console.log(j.value));
              });
          },
          O = () => {
            let l = {
              hotelGroupCode: c.hotelGroupCode,
              firstResult: 0,
              pageSize: 15,
              clientTypes: d.value,
            };
            t.api.marketingPage(l).then((t) => {
              0 == t.result
                ? ((C.value = []),
                  (T.value = []),
                  (P.value = !0),
                  t.retVal &&
                    t.retVal.datas &&
                    t.retVal.datas.length > 0 &&
                    (t.retVal.datas.forEach((e) => {
                      if ("3" == e.showLocation) {
                        let t = JSON.parse(e.infos);
                        console.log(t),
                          t &&
                            t.length > 0 &&
                            t.forEach((e) => {
                              C.value.push({
                                name: e.typeName,
                                id: e.type[e.type.length - 1],
                                goodsIds: e.goodsIds,
                                number: e.number,
                              });
                            });
                      }
                    }),
                    C.value.length > 0 &&
                      (m.value.id ? A(m.value, 1) : A(C.value[0], 1))),
                  e.index.stopPullDownRefresh())
                : o.jAlert3(t.msg, 2e3);
            });
          },
          _ = () => {
            t.api
              .advertisementPage({
                hotelCode: c.hotelCode,
                hotelGroupCode: c.hotelGroupCode,
                clientTypes: d.value,
                firstResult: 0,
                pageSize: 20,
              })
              .then((e) => {
                0 == e.result &&
                  e.retVal &&
                  e.retVal.datas &&
                  e.retVal.datas.length > 0 &&
                  e.retVal.datas.forEach((e) => {
                    if ("10" == e.showLocation) {
                      let t = JSON.parse(e.infos);
                      S.value = t;
                    }
                    "9" == e.showLocation && (y.value = JSON.parse(e.infos)),
                      "8" == e.showLocation && (b = JSON.parse(e.infos));
                  });
              });
          };
        return (
          e.onPullDownRefresh(() => {
            O(), _(), G();
          }),
          e.onShow(() => {
            V.value.updateData();
          }),
          e.onMounted(() => {
            e.index.getSystemInfo({
              success: (e) => {
                (I.value = e.statusBarHeight || 0),
                  (x.value = I.value),
                  (x.value = I.value + 40);
              },
              fail(e) {
                console.log(e);
              },
            }),
              O(),
              _(),
              G();
          }),
          (l, a) =>
            e.e(
              { a: e.unref(i) > 40 },
              e.unref(i) > 40
                ? { b: e.p({ title: "松赞旅行", bgColor: "#fff" }) }
                : {},
              {
                c: e.p({ slides: S.value, swiperConfig: e.unref(v) }),
                d: j.value.length > 0,
              },
              j.value.length > 0
                ? {
                    e: e.f(j.value, (t, l, o) => ({
                      a: t.imgUrl,
                      b: e.t(t.title),
                      c: l,
                      d: e.o(
                        (e) =>
                          ((e) => {
                            u.goPage(e.link);
                          })(t),
                        l,
                      ),
                    })),
                  }
                : {},
              {
                f: e.sr(V, "3a6d1b11-2", { k: "noticeRef" }),
                g: e.p({ showLocation: "2" }),
                h: e.unref(b).left || e.unref(b).right,
              },
              e.unref(b).left || e.unref(b).right
                ? e.e(
                    { i: e.unref(b).left && e.unref(b).left.length > 0 },
                    e.unref(b).left && e.unref(b).left.length > 0
                      ? {
                          j: e.p({
                            slides: e.unref(b).left,
                            swiperConfig: e.unref(h),
                          }),
                        }
                      : {},
                    { k: e.unref(b).right && e.unref(b).right.length > 0 },
                    e.unref(b).right && e.unref(b).right.length > 0
                      ? {
                          l: e.f(e.unref(b).right, (t, l, o) =>
                            e.e(
                              { a: t.imgUrl, b: t.title || t.subTitle },
                              t.title || t.subTitle
                                ? e.e(
                                    { c: t.title },
                                    t.title ? { d: e.t(t.title) } : {},
                                    { e: t.subTitle },
                                    t.subTitle ? { f: e.t(t.subTitle) } : {},
                                  )
                                : {},
                              { g: l, h: e.o((e) => N(t.link), l) },
                            ),
                          ),
                        }
                      : {},
                  )
                : {},
              { m: w.value },
              w.value
                ? e.e({ n: e.unref(C).length > 0 }, (e.unref(C).length, {}))
                : {},
              { o: e.unref(C).length > 0 },
              e.unref(C).length > 0
                ? {
                    p: e.o(U),
                    q: e.p({
                      datas: e.unref(C),
                      type: "line",
                      color: "#A43127",
                      titleInactiveColor: "#808080",
                      titleActiveColor: "#000000",
                      flexNum: "F",
                      isAjax: e.unref(p),
                    }),
                  }
                : {},
              {
                r: w.value ? 1 : "",
                s: e.unref(x) + "px",
                t: e.f(e.unref(L), (l, a, s) =>
                  e.e(
                    { a: l.defaultImageUrl, b: e.t(l.title), c: l.subTitle },
                    l.subTitle ? { d: e.t(l.subTitle) } : {},
                    {
                      e: e.t(e.unref(r.valFormat)(l.goodsPrice.minSalePrice)),
                      f: "2" == l.soldType,
                    },
                    (l.soldType, {}),
                    {
                      g: a,
                      h: e.o(
                        (a) =>
                          ((l) => {
                            t.api
                              .weimoInterfaceTransfer({
                                config: {
                                  path: "/weimob_shop/v2.0/goods/url/getList",
                                  requestMethod: "POST",
                                  hotelGroupCode: c.hotelGroupCode,
                                  hotelCode: "0",
                                },
                                params: {
                                  goodsIdList: [l.goodsId],
                                  basicInfo: { vid: 6016433635204 },
                                },
                              })
                              .then((t) => {
                                0 == t.result
                                  ? t.retVal.goodsUrlOutputList &&
                                    t.retVal.goodsUrlOutputList.length > 0 &&
                                    ((l.miniUrl =
                                      t.retVal.goodsUrlOutputList[0].miniUrl),
                                    e.index.navigateToMiniProgram({
                                      appId: "wx85856dcb803b16cc",
                                      path: l.miniUrl,
                                      success(e) {},
                                    }))
                                  : o.jAlert3(t.msg);
                              });
                          })(l),
                        a,
                      ),
                    },
                  ),
                ),
                v: 0 == e.unref(g),
              },
              0 == e.unref(g) ? { w: e.p({ tips: "暂无商品" }) } : {},
              { x: y.value.imgUrl },
              y.value.imgUrl
                ? e.e(
                    {
                      y: y.value.imgUrl,
                      z: e.t(y.value.desc),
                      A: y.value.btDesc,
                    },
                    y.value.btDesc ? { B: e.t(y.value.btDesc) } : {},
                    { C: y.value.phoneNumber },
                    y.value.phoneNumber ? { D: e.t(y.value.phoneNumber) } : {},
                    { E: e.o((e) => N(y.value.link)) },
                  )
                : {},
            )
        );
      },
    });
  g.__runtimeHooks = 1;
  const h = e._export_sfc(g, [["__scopeId", "data-v-3a6d1b11"]]);
  wx.createPage(h);
})();
