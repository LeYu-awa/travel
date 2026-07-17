!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    a = require("../../hooks/useScroll.js"),
    l = require("../../utils/wxuser.js"),
    o = require("../../utils/utils.js"),
    i = require("../../assets/index.js");
  Math || (r + u)();
  const r = () => "../../components/coustomHead.js",
    u = () => "../../components/empty.js",
    n = e.defineComponent({
      __name: "index",
      setup(r) {
        const u = e.reactive({
          sdk: {},
          key: "H6YBZ-7M467-IIWXA-PYY3O-4Q4RT-B3B53",
        });
        let n = e.ref(l.getStorage("user") || {});
        const { onPageScroll: s } = a.useScroll(),
          v = e.ref(""),
          c = e.ref("");
        e.ref(!1);
        const d = e.ref(""),
          p = l.getStorage("config"),
          m = e.ref(0),
          f = e.ref(48),
          g = e.ref(45),
          h = e.ref(45),
          y = e.ref(0);
        e.ref([]);
        const T = e.ref([]),
          C = e.ref([263, 664, 1107, 1807, 2223, 2876, 3440, 3640]),
          b = e.ref([263, 664, 1107, 1807, 2223, 2876, 3440, 3640]),
          I = e.ref(0),
          L = e.ref([]),
          D = e.ref([]),
          R = e.ref([]),
          S = e.ref(0);
        let H = e.ref("");
        const x = e.ref([
          { id: 0, name: "旅行地图" },
          { id: 0, name: "到达与离开" },
          { id: 2, name: "气候与天气" },
          { id: 3, name: "高原反应与健康" },
          { id: 4, name: "行前准备清单" },
          { id: 5, name: "阅读与观影推荐" },
          { id: 6, name: "旅行亮点" },
          { id: 7, name: "其他事项" },
        ]);
        s((t) => {
          "android" == e.index.getSystemInfoSync().platform
            ? ((m.value = t.scrollTop),
              clearTimeout(H.value),
              (H.value = setTimeout(() => {
                C.value.forEach((e, a) => {
                  t.scrollTop > e - 150 &&
                    ((I.value = b.value[a] - 90), (y.value = a));
                });
              }, 9)))
            : (clearTimeout(H.value),
              (H.value = setTimeout(() => {
                (m.value = t.scrollTop),
                  C.value.forEach((e, a) => {
                    console.log(11111, t.scrollTop),
                      t.scrollTop < 198 &&
                        ((y.value = 0), (I.value = b.value[0] - 90)),
                      t.scrollTop > e - 150 &&
                        ((I.value = b.value[a] - 90), (y.value = a));
                  });
              }, 180)));
        }),
          e.onMounted(() => {
            (f.value = e.index.getMenuButtonBoundingClientRect().top - 5),
              e.index.getSystemInfo({
                success: (e) => {
                  (g.value = e.statusBarHeight || 0), (h.value = g.value + 40);
                },
                fail(e) {
                  console.log(e);
                },
              });
          }),
          e.onLoad((e) => {
            (v.value = e.unitCode),
              (c.value = e.teamNo),
              (d.value = e.itineraryCode),
              M(),
              1 == e.type && (S.value = 1);
          });
        const M = () => {
            (n.value = l.getStorage("user")),
              t.api
                .interfaceTransfer({
                  query: {
                    memberNo: n.value.memberId,
                    mobile: n.value.mobile,
                    unitCode: v.value,
                    teamNo: c.value,
                    itineraryCode: d.value,
                  },
                  config: {
                    interfaceType: "POST",
                    interfaceModule: "GC_TRAVEL_ORDER",
                    interfaceMethod: "/api/team/order/travelTips",
                    interfaceFrom: "GC",
                    hotelGroupCode: p.hotelGroupCode,
                  },
                })
                .then((t) => {
                  if (((T.value = t.retVal.retVal), T.value))
                    if (
                      (T.value.templateTravelTipsSummaryDtoList.forEach((e) => {
                        e.itemList.forEach((e) => {
                          e.tipsContent = e.tipsContent.replace(/\n/g, "<br>");
                        });
                      }),
                      T.value.travelItineraryHotelDtoList.forEach((e, t) => {
                        e.hotelAltitude > 2700 && (T.value.showpls = !0);
                      }),
                      0 != T.value.travelItineraryMapInfoDtoList.length)
                    ) {
                      T.value.travelItineraryMapInfoDtoList.forEach((e, t) => {
                        L.value.push({
                          startHotelName: e.startHotelName,
                          startHotelAltitude: e.startHotelAltitude,
                          distance: e.distance,
                          useTime: e.useTime,
                        }),
                          D.value.push({
                            id: t + 1,
                            latitude: e.startHotelLocation.split(",")[0],
                            longitude: e.startHotelLocation.split(",")[1],
                            iconPath:
                              "https://jingaide.oss-cn-beijing.aliyuncs.com/linshi-tou.png",
                            width: 1,
                            height: 1,
                            label: {
                              content: (t + 1).toString(),
                              color: "#fff",
                              fontSize: 12,
                              bgColor: "#262626",
                              width: 30,
                              height: 30,
                              anchorX: -10,
                              anchorY: -25,
                              borderWidth: 2,
                              borderColor: "#ffffff",
                              borderRadius: 30,
                            },
                          });
                      });
                      const e =
                        T.value.travelItineraryMapInfoDtoList[
                          T.value.travelItineraryMapInfoDtoList.length - 1
                        ];
                      L.value.push({
                        startHotelName: e.reachHotelName,
                        startHotelAltitude: e.reachHotelAltitude,
                      }),
                        D.value.push({
                          id: T.value.travelItineraryMapInfoDtoList.length + 1,
                          latitude: e.reachHotelLocation.split(",")[0],
                          longitude: e.reachHotelLocation.split(",")[1],
                          iconPath:
                            "https://jingaide.oss-cn-beijing.aliyuncs.com/linshi-tou.png",
                          width: 1,
                          height: 1,
                          label: {
                            content: (
                              T.value.travelItineraryMapInfoDtoList.length + 1
                            ).toString(),
                            color: "#fff",
                            fontSize: 12,
                            bgColor: "#262626",
                            width: 30,
                            height: 30,
                            anchorX: -10,
                            anchorY: -25,
                            borderWidth: 2,
                            borderColor: "#ffffff",
                            borderRadius: 30,
                          },
                        }),
                        N();
                    } else x.value.splice(0, 1);
                  C.value.forEach((t, a) => {
                    let l = a;
                    (l = 0 != D.value.length ? a : a + 1),
                      setTimeout(() => {
                        e.index
                          .createSelectorQuery()
                          .select("#box" + l)
                          .boundingClientRect((e) => {
                            console.log(1, e),
                              (C.value[a] = e.bottom - e.height);
                          })
                          .exec();
                      }, 200);
                  }),
                    b.value.forEach((t, a) => {
                      setTimeout(() => {
                        e.index
                          .createSelectorQuery()
                          .select("#warp" + a)
                          .boundingClientRect((e) => {
                            b.value[a] = e.left;
                          })
                          .exec();
                      }, 200);
                    }),
                    0 != D.value.length
                      ? setTimeout(() => {
                          1 == S.value && E(1, 2);
                        }, 1e3)
                      : setTimeout(() => {
                          1 == S.value && E(1, 1);
                        }, 1e3);
                });
          },
          N = () => {
            const t = D.value[0].latitude + "," + D.value[0].longitude,
              a =
                D.value[D.value.length - 1].latitude +
                "," +
                D.value[D.value.length - 1].longitude;
            let l = [];
            (l = D.value
              .slice(1, D.value.length - 1)
              .map((e) => e.latitude + "," + e.longitude)
              .join(";")),
              console.log("微信小程序/XHS端"),
              e.index.request({
                url: "https://apis.map.qq.com/ws/direction/v1/driving/",
                data: {
                  key: u.key,
                  output: "json",
                  from: t,
                  to: a,
                  waypoints: l,
                  callback: "cb",
                },
                success(e) {
                  const t = e.data.result.routes[0].polyline;
                  for (let e = 2; e < t.length; e++)
                    t[e] = t[e - 2] + t[e] / 1e6;
                  const a = [];
                  for (let e = 0; e < t.length; e += 2)
                    a.push({ latitude: t[e], longitude: t[e + 1] });
                  console.log(a),
                    (R.value = [
                      {
                        points: a,
                        color: "#A43127",
                        borderColor: "#A43127",
                        width: 5,
                        dottedLine: !1,
                        arrowLine: !0,
                        borderWidth: 2,
                      },
                    ]);
                },
                fail(e) {
                  console.log(2222222222, e);
                },
              });
          },
          w = () => {
            e.index.navigateBack({ delta: 1 });
          },
          j = () => {
            e.index.switchTab({ url: "/pages/trip/index" });
          },
          E = (t, a) => {
            e.index.pageScrollTo({ scrollTop: C.value[a] - 130 });
          };
        return (t, a) =>
          e.e(
            { a: m.value > 40 || !T.value },
            m.value > 40 || !T.value
              ? { b: e.p({ title: "出行提示", nativeMode: !0 }) }
              : {},
            { c: T.value },
            T.value
              ? e.e(
                  { d: m.value < 40 },
                  m.value < 40 ? { e: e.o(w), f: f.value + "px" } : {},
                  {
                    g: e.unref(i.assets).tipsHeaderBg,
                    h: e.t(T.value.templateGuide),
                    i: e.f(x.value, (t, a, l) =>
                      e.e(
                        {
                          a: e.t(t.name),
                          b: a == y.value ? 1 : "",
                          c: a == y.value,
                        },
                        (y.value, {}),
                        { d: "warp" + a, e: e.o((e) => E(t, a)) },
                      ),
                    ),
                    j: e.o((...e) => t.scrollas && t.scrollas(...e)),
                    k: I.value,
                    l: m.value > 250 ? 1 : "",
                    m: h.value + "px",
                    n: 0 != D.value.length,
                  },
                  0 != D.value.length
                    ? {
                        o: D.value[0].latitude,
                        p: R.value,
                        q: D.value[0].longitude,
                        r: D.value,
                        s: e.f(L.value, (t, a, l) =>
                          e.e(
                            {
                              a: e.t(a + 1),
                              b: e.t(t.startHotelName),
                              c: e.t(t.startHotelAltitude),
                              d: L.value.length - 1 != a,
                            },
                            (L.value.length, {}),
                            { e: L.value.length - 1 != a },
                            L.value.length - 1 != a
                              ? { f: e.t(t.distance), g: e.t(t.useTime) }
                              : {},
                            { h: L.value.length - 1 != a },
                            (L.value.length, {}),
                            { i: a },
                          ),
                        ),
                      }
                    : {},
                  { t: T.value.travelItineraryMapInfoDtoList.length <= 1 },
                  T.value.travelItineraryMapInfoDtoList.length <= 1
                    ? { v: T.value.arriveCityDesc }
                    : { w: T.value.arriveCityDesc, x: T.value.leaveCityDesc },
                  {
                    y: e.f(
                      T.value.travelItineraryDayWeatherDtoList,
                      (t, a, l) =>
                        e.e(
                          {
                            a: e.t(
                              e.unref(e.dayjs)(t.rsvDate).format("M月DD日"),
                            ),
                            b: e.t(t.hotelName),
                            c: e.t(t.temperatureHigh),
                            d: e.t(t.temperatureLow),
                            e: e.t(t.weatherDesc),
                            f: e.t(t.humidity),
                            g: t.ultravioletRays < 2,
                          },
                          (t.ultravioletRays, {}),
                          {
                            h: 3 == t.ultravioletRays || 4 == t.ultravioletRays,
                          },
                          (3 == t.ultravioletRays || t.ultravioletRays, {}),
                          {
                            i: 5 == t.ultravioletRays || 6 == t.ultravioletRays,
                          },
                          (5 == t.ultravioletRays || t.ultravioletRays, {}),
                          {
                            j: 7 == t.ultravioletRays || 8 == t.ultravioletRays,
                          },
                          (7 == t.ultravioletRays || t.ultravioletRays, {}),
                          { k: t.ultravioletRays >= 9 },
                          (t.ultravioletRays, {}),
                          { l: a },
                        ),
                    ),
                    z: e.f(
                      T.value.templateTravelTipsSummaryDtoList,
                      (t, a, l) => ({
                        a: e.f(t.itemList, (t, a, l) => ({
                          a: e.t(t.secondCategoryName),
                          b: t.tipsContent,
                          c: a,
                        })),
                        b: a,
                        c: "气候与天气" == t.firstCategoryName,
                      }),
                    ),
                    A: e.f(T.value.travelItineraryHotelDtoList, (t, a, l) => ({
                      a: e.t(t.hotelName),
                      b: 0 != a ? 1 : "",
                      c: e.t(t.hotelAltitude),
                      d: 0 != a ? 1 : "",
                      e: a,
                    })),
                    B: !T.value.showpls,
                  },
                  T.value.showpls
                    ? {
                        C: e.f(
                          T.value.templateTravelTipsSummaryDtoList,
                          (t, a, l) => ({
                            a: e.f(t.itemList, (t, a, l) => ({
                              a: e.t(t.secondCategoryName),
                              b: t.tipsContent,
                              c: a,
                            })),
                            b: a,
                            c: "高原反应与健康" == t.firstCategoryName,
                          }),
                        ),
                      }
                    : {},
                  {
                    D: e.f(
                      T.value.templateTravelTipsSummaryDtoList,
                      (t, a, l) => ({
                        a: e.f(t.itemList, (t, a, l) => ({
                          a: e.t(t.secondCategoryName),
                          b: t.tipsContent,
                          c: a,
                        })),
                        b: a,
                        c: "行前准备清单" == t.firstCategoryName,
                      }),
                    ),
                    E: e.f(T.value.templateReadMovieItemDtoList, (t, a, l) =>
                      e.e(
                        {
                          a: t.coverUrl,
                          b: e.t(t.name),
                          c: "BOOK" == t.templateType,
                        },
                        (t.templateType, {}),
                        { d: "MOVIE" == t.templateType },
                        (t.templateType, {}),
                        { e: "DOCUMENTARY" == t.templateType },
                        (t.templateType, {}),
                        { f: a },
                      ),
                    ),
                    F: 0 != T.value.templateReadMovieItemDtoList.length,
                    G: e.f(T.value.marketingContentList, (t, a, l) =>
                      e.e(
                        { a: t.coverUrl, b: "VIDEO" == t.contentType },
                        (t.contentType, {}),
                        { c: "MUSIC" == t.contentType },
                        (t.contentType, {}),
                        {
                          d: e.t(t.title),
                          e: a,
                          f: e.o(
                            (a) =>
                              ((t) => {
                                "MUSIC" == t.contentType &&
                                  e.index.navigateTo({
                                    url:
                                      "/pagesCommon/content/audio?id=" + t.id,
                                  }),
                                  "VIDEO" == t.contentType &&
                                    e.index.navigateTo({
                                      url:
                                        "/pagesCommon/content/video?id=" + t.id,
                                    }),
                                  "PIC" == t.contentType &&
                                    o.goPage(
                                      t.sourceUrl +
                                        "&goodsName=" +
                                        t.title +
                                        "&goodsId=" +
                                        t.id,
                                    );
                              })(t),
                            a,
                          ),
                        },
                      ),
                    ),
                    H: e.o(j),
                    I: e.f(
                      T.value.templateTravelTipsSummaryDtoList,
                      (t, a, l) => ({
                        a: e.f(t.itemList, (t, a, l) => ({
                          a: e.t(t.secondCategoryName),
                          b: t.tipsContent,
                          c: a,
                        })),
                        b: a,
                        c: "其他" == t.firstCategoryName,
                      }),
                    ),
                  },
                )
              : { J: e.p({ tips: "暂无提示" }) },
          );
      },
    });
  (n.__runtimeHooks = 1), wx.createPage(n);
})();
