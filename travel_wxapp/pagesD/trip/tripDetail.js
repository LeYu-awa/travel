!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../base/channel.js"),
    r = require("../../utils/api.js"),
    a = require("../../utils/wxuser.js"),
    o = require("../../base/jAlert/jAlert.js"),
    n = require("../../hooks/useScroll.js"),
    l = require("../../utils/utils.js");
  Math || (d + i + u + f + s + c)();
  const u = () => "../../components/swiperBox.js",
    i = () => "../../components/tripNav.js",
    s = () => "../../components/bottomDialog.js",
    f = () => "../../components/moreText.js",
    d = () => "../../components/coustomHead.js",
    c = () => "../components/v-previewImage.js",
    v = e.defineComponent({
      __name: "tripDetail",
      setup(u) {
        const { scrollTop: i, onPageScroll: s } = n.useScroll();
        let f = a.getStorage("config"),
          d = a.getStorage("user"),
          c = e.ref([]),
          v = e.ref([]),
          m = e.ref(""),
          p = e.ref({}),
          h = e.ref(),
          g = e.ref([]);
        e.ref(t.defaultChannel);
        let D = e.ref(),
          y = e.ref([]);
        e.reactive(a.getStorage("wxuser"));
        const C = e.ref(""),
          T = e.ref(""),
          N = e.ref(""),
          b = e.ref(1);
        let S = e.reactive({
            indicatorDots: !1,
            autoplay: !1,
            slot: !0,
            dotPosStyle:
              "bottom:0px;left:50%;transform: translate(-50%);background:rgba(204, 204, 204, 0.28);",
            dotStyle: "background:#000;",
            duration: 300,
          }),
          G = e.ref({}),
          E = e.reactive({}),
          j = e.ref({}),
          M = e.ref([]),
          _ = e.ref({}),
          V = e.ref({}),
          x = e.ref([]),
          R = e.ref([]),
          w = e.ref({}),
          F = e.ref([]),
          I = e.ref([]);
        const A = e.ref(!1);
        e.ref({ img: "", desc: "" });
        let L = e.ref(),
          O = e.ref(!1);
        const k = e.reactive([
          { name: "早上", icon: "icon-a-12_zaoshang" },
          { name: "上午", icon: "icon-a-12_shangwu" },
          { name: "中午", icon: "icon-a-12_zhongwu" },
          { name: "下午", icon: "icon-a-12_xiawu" },
          { name: "晚上", icon: "icon-a-12_wanshang" },
        ]);
        s((e) => {
          i.value = e.scrollTop;
        });
        const U = (e) => {
            r.api
              .interfaceTransfer({
                query: { type: "Transportation", unitCode: f.hotelGroupCode },
                config: {
                  interfaceType: "GET",
                  interfaceModule: "GC_INFOMATION_CENTER",
                  interfaceMethod: "api/codeBaseapi/listCodeBase",
                  interfaceFrom: "GC",
                  hotelGroupCode: f.hotelGroupCode,
                },
              })
              .then((t) => {
                1 == t.result &&
                  0 == t.retVal.result &&
                  ((x.value = t.retVal.retVal), e && e());
              });
          },
          q = () => {
            var t;
            (t = "/pagesD/trip/tripHotel?teamNo=" + M.value[0].teamNo),
              e.index.navigateTo({ url: t });
          },
          B = (e) => {
            let t = e;
            r.api
              .interfaceTransfer({
                query: { unitCode: f.hotelGroupCode, categoryName: t },
                config: {
                  interfaceType: "GET",
                  interfaceModule: "GC_UCBASE_URL",
                  interfaceMethod: "albumCategory/photoByName",
                  interfaceFrom: "GC",
                  hotelGroupCode: f.hotelGroupCode,
                },
              })
              .then((e) => {
                1 == e.result && 0 == e.retVal.result
                  ? (p.value.photos = e.retVal.retVal)
                  : o.jAlert3(e.result.msg || e.msg);
              });
          },
          P = () => {
            A.value
              ? e.index.navigateTo({
                  url:
                    "/pagesD/trip/takeInfo?orderNo=" +
                    G.value.orderNo +
                    "&teamNo=" +
                    j.value.teamNo +
                    "&memberNo=" +
                    G.value.memberNo +
                    "&mobile=" +
                    G.value.mobile,
                })
              : e.index.showToast({
                  title: "该订单未添加出行人，请添加出行人后再试",
                  icon: "none",
                  duration: 4e3,
                });
          },
          z = (t) => {
            e.index.makePhoneCall({ phoneNumber: t });
          },
          $ = (t) => {
            e.index.setClipboardData({
              data: t,
              success: function () {
                o.jAlert3("复制成功");
              },
            });
          },
          H = (t) => {
            (_.value = t),
              W(() => {
                _.value.itineraryCode &&
                  e.nextTick$1(() => {
                    setTimeout(() => {
                      e.index.pageScrollTo({
                        selector: "#trip-detail",
                        offsetTop: -100,
                        complete: (e) => {},
                      });
                    }, 100);
                  });
              });
          },
          Y = (t) => {
            t &&
              r.api
                .interfaceTransfer({
                  query: { orderNo: t, unitCode: f.hotelGroupCode },
                  config: {
                    interfaceType: "GET",
                    interfaceModule: "GC_TRAVEL_ORDER",
                    interfaceMethod: "/api/shuttle/listByOrderNo",
                    interfaceFrom: "GC",
                    hotelGroupCode: f.hotelGroupCode,
                  },
                })
                .then((t) => {
                  1 == t.result && 0 == t.retVal.result
                    ? t.retVal.retVal.forEach((t) => {
                        (t.trafficTypeDesc = ((e) => {
                          let t = "";
                          return (
                            x.value.forEach((r) => {
                              r.code == e && (t = r.descript);
                            }),
                            t
                          );
                        })(t.trafficType)),
                          (t.beginDateF = e
                            .dayjs(t.beginDate)
                            .format("M月D日")),
                          "J" == t.shuttleType && c.value.push(t),
                          "S" == t.shuttleType && v.value.push(t);
                      })
                    : o.jAlert3(t.retVal.msg || t.msg);
                });
          },
          W = (t) => {
            R.value = [];
            let r = "",
              a = "",
              o = {};
            if (
              (!_.value.itineraryCode &&
                M.value.length > 0 &&
                (("1" != j.value.tripSta && "2" != j.value.tripSta) ||
                  (o = M.value[0]),
                ("4" != j.value.tripSta && "5" != j.value.tripSta) ||
                  (o = M.value[M.value.length - 1]),
                "3" == j.value.tripSta &&
                  M.value.forEach((t) => {
                    t.bizDateF == e.dayjs().format("M月D日") && (o = t);
                  })),
              _.value.itineraryCode && (o = _.value),
              o.teamRsvSrcs &&
                o.teamRsvSrcs.length > 0 &&
                (a = o.teamRsvSrcs[0].hotelDesc),
              I.value.forEach((e) => {
                e.name == a &&
                  e.albumPhotos.forEach((e, t) => {
                    t < 2 && R.value.push(e);
                  });
              }),
              o.actives && o.actives.length > 0)
            )
              for (
                let e = 0;
                e < o.actives.length &&
                ((r = o.actives[e].activeName),
                F.value.forEach((e) => {
                  e.name == r &&
                    e.albumPhotos.forEach((e, t) => {
                      R.value.length < 4 && R.value.push(e);
                    });
                }),
                !(R.value.length >= 4));
                e++
              );
            t && t();
          };
        return (
          e.onShow(() => {
            (c.value = []),
              (v.value = []),
              (d = a.getStorage("user")),
              d && d.memberId
                ? E.reserveOrders
                  ? (U(() => {
                      Y(G.value.orderNo);
                    }),
                    L.value.updateData())
                  : ((d = a.getStorage("user")),
                    (g.value = []),
                    r.api
                      .interfaceTransfer({
                        query: { mobile: d.mobile, unitCode: f.hotelGroupCode },
                        config: {
                          interfaceType: "GET",
                          interfaceModule: "GC_TRAVEL_ORDER",
                          interfaceMethod: "/api/team/order/detail/" + m.value,
                          interfaceFrom: "GC",
                          hotelGroupCode: f.hotelGroupCode,
                        },
                      })
                      .then((t) => {
                        if (1 == t.result && 0 == t.retVal.result) {
                          if (
                            ((E = t.retVal.retVal),
                            t.retVal.retVal.guests.forEach((e) => {
                              e.mobile == d.mobile && (V.value = e);
                            }),
                            E.driverButlerDtos &&
                              E.driverButlerDtos.forEach((e) => {
                                "HOUSEKEEP" == e.personType && (w.value = e);
                              }),
                            0 == E.reserveOrders.length)
                          )
                            return void l.goPage("/pages/travel/index");
                          const n = E.reserveOrders.filter(
                              (e) => e.mobile === d.mobile,
                            ),
                            u = E.guests.map((e) => e.orderNo),
                            i = E.guests.find((e) => e.mobile === d.mobile);
                          n.length
                            ? (G.value = C.value
                                ? n.find((e) => e.orderNo === C.value)
                                : n[0])
                            : (G.value = (null == i ? void 0 : i.orderNo)
                                ? E.reserveOrders.find(
                                    (e) => e.orderNo == i.orderNo,
                                  )
                                : n[0]),
                            (A.value = u.includes(G.value.orderNo)),
                            (j.value = E.teamOrder),
                            "Custom" == j.value.orderType &&
                              ((j.value.productCode = j.value.id),
                              (j.value.productDesc = j.value.teamName)),
                            (M.value = E.teamItineraryInfos[0].teamItineraries),
                            (j.value.dayDiff = e
                              .dayjs()
                              .diff(j.value.beginDate, "day")),
                            (j.value.dayEndDiff = e
                              .dayjs(j.value.endDate)
                              .diff(e.dayjs(), "day")),
                            M.value.forEach((t) => {
                              if (
                                (t.actives &&
                                  t.actives.length > 0 &&
                                  t.actives.forEach((e) => {
                                    t.activesTl
                                      ? (t.activesTl += " - " + e.activeName)
                                      : (t.activesTl = e.activeName);
                                  }),
                                (t.bizDateF = e
                                  .dayjs(j.value.beginDate)
                                  .add(t.dayNum - 1, "day")
                                  .format("M月D日")),
                                (t.moon = e
                                  .dayjs(j.value.beginDate)
                                  .add(t.dayNum - 1, "day")
                                  .format("M")),
                                (t.days = e
                                  .dayjs(j.value.beginDate)
                                  .add(t.dayNum - 1, "day")
                                  .format("D")),
                                t.teamRsvSrcs.length > 0)
                              ) {
                                let r = t.teamRsvSrcs[0];
                                (r.arrDateF = e
                                  .dayjs(r.arrDate)
                                  .format("M月D日")),
                                  (r.depDateF = e
                                    .dayjs(r.depDate)
                                    .format("M月D日")),
                                  g.value.push(r);
                              }
                            }),
                            "W" == j.value.orderSta
                              ? j.value.dayDiff <= -2
                                ? ((j.value.tripSta = "1"),
                                  (j.value.pageTitle = "行前2天以上"))
                                : ((j.value.tripSta = "2"),
                                  (j.value.pageTitle = "行前2天内"))
                              : "I" == j.value.orderSta
                                ? ((j.value.tripSta = "3"),
                                  (j.value.pageTitle = "行中"))
                                : "O" == j.value.orderSta &&
                                  (j.value.dayEndDiff >= -7
                                    ? ((j.value.tripSta = "4"),
                                      (j.value.pageTitle = "行后7天内"))
                                    : ((j.value.tripSta = "5"),
                                      (j.value.pageTitle = "行后7天后"))),
                            (j.value.tripTime = `${e
                              .dayjs(j.value.beginDate)
                              .format("M月DD日")}-${e
                              .dayjs(j.value.endDate)
                              .format("M月DD日")}`),
                            (a = {
                              fromDate: "",
                              toDate: "",
                              otaChannel: "WECHAT",
                              hotelGroupCodes: f.hotelGroupCode,
                              cardLevel: "",
                              hasPriceMin: "T",
                              clientLatitude: "",
                              clientLongitude: "",
                              position: "",
                              positionValue: "",
                              keyWord: "",
                              radius: "",
                              pageSize: 999,
                              firstResult: 0,
                              cardType: "",
                              appid: f.appid,
                              componentAppid: f.componentAppid,
                              memberNo: "",
                            }),
                            r.api
                              .findHotel(a)
                              .then((e) => {
                                1 == e.result &&
                                  g.value.forEach((t) => {
                                    e.retVal.resultInfos.forEach((e, r) => {
                                      t.hotelCode == e.code &&
                                        ((t.extraLogo = e.extraLogo),
                                        (t.phone = e.phone),
                                        (t.pictures = e.pictures),
                                        (t.hotelLatitude = e.hotelLatitude),
                                        (t.hotelLongitude = e.hotelLongitude));
                                    });
                                  });
                              })
                              .catch(function (e) {
                                console.log(e);
                              })
                              .finally(function (e) {}),
                            "5" == j.value.tripSta && (O.value = !0),
                            U(() => {
                              Y(G.value.orderNo);
                            }),
                            r.api
                              .interfaceTransfer({
                                query: {
                                  unitCode: f.hotelGroupCode,
                                  teamNo: m.value,
                                },
                                config: {
                                  interfaceType: "GET",
                                  interfaceModule: "GC_UCBASE_URL",
                                  interfaceMethod:
                                    "albumCategory/listRootCategory",
                                  interfaceFrom: "GC",
                                  hotelGroupCode: f.hotelGroupCode,
                                },
                              })
                              .then((e) => {
                                1 == e.result && 0 == e.retVal.result
                                  ? e.retVal.retVal.forEach((e) => {
                                      "活动相册" == e.name &&
                                        r.api
                                          .interfaceTransfer({
                                            query: {
                                              unitCode: f.hotelGroupCode,
                                              categoryId: e.categoryId,
                                              teamNo: m.value,
                                            },
                                            config: {
                                              interfaceType: "GET",
                                              interfaceModule: "GC_UCBASE_URL",
                                              interfaceMethod:
                                                "albumCategory/photoByRemark",
                                              interfaceFrom: "GC",
                                              hotelGroupCode: f.hotelGroupCode,
                                            },
                                          })
                                          .then((e) => {
                                            1 == e.result &&
                                            0 == e.retVal.result
                                              ? ((F.value = e.retVal.retVal),
                                                H({}))
                                              : o.jAlert3(
                                                  e.result.msg || e.msg,
                                                );
                                          }),
                                        "酒店相册" == e.name &&
                                          r.api
                                            .interfaceTransfer({
                                              query: {
                                                unitCode: f.hotelGroupCode,
                                                categoryId: e.categoryId,
                                                teamNo: m.value,
                                              },
                                              config: {
                                                interfaceType: "GET",
                                                interfaceModule:
                                                  "GC_UCBASE_URL",
                                                interfaceMethod:
                                                  "albumCategory/photoByRemark",
                                                interfaceFrom: "GC",
                                                hotelGroupCode:
                                                  f.hotelGroupCode,
                                              },
                                            })
                                            .then((e) => {
                                              1 == e.result &&
                                              0 == e.retVal.result
                                                ? ((I.value = e.retVal.retVal),
                                                  H({}))
                                                : o.jAlert3(
                                                    e.result.msg || e.msg,
                                                  );
                                            });
                                    })
                                  : o.jAlert3(e.result.msg || e.msg);
                              });
                        }
                        var a;
                      }))
                : l.toLogin();
          }),
          e.onLoad((t) => {
            if (
              (t.teamNo && (m.value = t.teamNo),
              t.orderNo && "undefined" !== t.orderNo && (C.value = t.orderNo),
              t.scene)
            ) {
              let e = l.getUrlParams(
                decodeURIComponent(decodeURIComponent(t.scene)),
              );
              e.teamNo && (m.value = e.teamNo);
            }
            t.unitCode &&
              ((T.value = t.unitCode.toString()),
              (N.value = t.itineraryCode.toString()),
              (b.value = t.type.toString())),
              1 == t.destDateCode &&
                setTimeout(() => {
                  M.value.forEach((t, r) => {
                    const a = new Date().setHours(0, 0, 0, 0);
                    new Date(e.dayjs(t.bizDate).format("YYYY-MM-DD")).setHours(
                      0,
                      0,
                      0,
                      0,
                    ) == a && H(M.value[r]);
                  });
                }, 2e3);
          }),
          e.onMounted(() => {}),
          (t, r) =>
            e.e(
              {
                a: e.p({
                  color: e.unref(i) > 50 ? "#000" : "#fff",
                  bgColor: e.unref(i) > 50 ? "#fff" : "",
                }),
                b: e.t(e.unref(j).productDesc),
                c: e.t(e.unref(j).tripTime),
                d: e.unref(G).productUrl,
                e: e.unref(M) && e.unref(M)[0] && "5" != e.unref(j).tripSta,
              },
              e.unref(M) && e.unref(M)[0] && "5" != e.unref(j).tripSta
                ? {
                    f: e.sr(L, "af9c5e6e-1", { k: "tripNavRef" }),
                    g: e.o((e) => {
                      O.value = !0;
                    }),
                    h: e.p({
                      page: "detail",
                      dayEndDiff: e.unref(j).dayEndDiff,
                      dayDiff: e.unref(j).dayDiff,
                      orderNo: e.unref(G).orderNo,
                      teamOrder: e.unref(j),
                      unitCode: T.value,
                      itineraryCode: N.value,
                      teamNo: e.unref(M)[0].teamNo,
                      typeNumber: b.value,
                    }),
                  }
                : {},
              { i: 1 != b.value },
              (b.value, {}),
              { j: !e.unref(O) },
              e.unref(O)
                ? e.e(
                    { k: e.unref(g).length > 0 },
                    e.unref(g).length > 0 ? { l: e.o((e) => q()) } : {},
                    { m: e.unref(g).length > 0 },
                    e.unref(g).length > 0
                      ? {
                          n: e.w(
                            ({ item: t }, r, a) => ({
                              a:
                                t.extraLogo +
                                "?imageView2/1/w/214/h/160&x-oss-process=image/resize,m_fill,w_214,h_160",
                              b: e.t(t.arrDateF),
                              c: e.t(t.depDateF),
                              d: e.t(t.hotelDesc),
                              e: e.t(t.rmtypeDesc),
                              f: e.o((e) => z(t.phone)),
                              g: e.o((r) => {
                                return (
                                  (a = t),
                                  console.log(229222, a),
                                  void e.index.navigateTo({
                                    url: `/pagesD/trip/hotelInfo?hotelCode=${a.hotelCode}&arrDate=${a.arrDateF}&depDate=${a.depDateF}&rmtype=${a.rmtype}&rmtypeDesc=${a.rmtypeDesc}&type=1`,
                                  })
                                );
                                var a;
                              }),
                              h: a,
                              i: r,
                            }),
                            { name: "item", path: "n", vueId: "af9c5e6e-2" },
                          ),
                          o: e.p({
                            slides: e.unref(g),
                            swiperConfig: e.unref(S),
                          }),
                        }
                      : {},
                    { p: e.unref(M).length > 0 },
                    e.unref(M).length > 0
                      ? {
                          q: e.unref(_).id ? "" : 1,
                          r: e.o((e) => H({})),
                          s: e.f(e.unref(M), (t, r, a) =>
                            e.e(
                              { a: e.t(t.bizDateF), b: 0 == r },
                              {},
                              {
                                c: e.t(t.destinationDesc),
                                d: 0 != r && r == e.unref(M).length - 1,
                              },
                              (0 != r && e.unref(M).length, {}),
                              {
                                e: r,
                                f: e.unref(_).id == t.id ? 1 : "",
                                g: e.o((e) => H(t), r),
                              },
                            ),
                          ),
                        }
                      : {},
                    { t: e.unref(c).length <= 0 && "O" != e.unref(j).orderSta },
                    e.unref(c).length <= 0 && "O" != e.unref(j).orderSta
                      ? { v: e.o((e) => P()) }
                      : {
                          w: e.f(e.unref(c), (t, r, a) =>
                            e.e(
                              { a: "F" != t.isShuttle },
                              "F" != t.isShuttle
                                ? e.e(
                                    { b: e.unref(c).length > 1 },
                                    e.unref(c).length > 1
                                      ? { c: e.t(r + 1) }
                                      : {},
                                    { d: t.carNo },
                                    t.carNo
                                      ? e.e(
                                          {
                                            e: e.t(t.carNo),
                                            f: t.carModelDesc,
                                          },
                                          t.carModelDesc
                                            ? { g: e.t(t.carModelDesc) }
                                            : {},
                                          {
                                            h: e.t(t.beginDateF),
                                            i: e.t(t.startTime),
                                            j: t.station,
                                          },
                                          t.station
                                            ? { k: e.t(t.station) }
                                            : {},
                                        )
                                      : {},
                                    {
                                      l: e.f(t.guests, (t, r, a) => ({
                                        a: e.t(t.name),
                                        b: r,
                                      })),
                                      m: e.t(t.trafficTypeDesc),
                                      n: e.t(t.trips),
                                      o: t.driver || e.unref(w).code,
                                    },
                                    t.driver || e.unref(w).code
                                      ? e.e(
                                          { p: e.unref(w).code },
                                          e.unref(w).code
                                            ? {
                                                q: e.t(e.unref(w).name),
                                                r: e.t(e.unref(w).mobile),
                                                s: e.o(
                                                  (t) => $(e.unref(w).mobile),
                                                  r,
                                                ),
                                                t: e.o(
                                                  (t) => z(e.unref(w).mobile),
                                                  r,
                                                ),
                                              }
                                            : {
                                                v: e.t(t.driver),
                                                w: e.t(t.driverPhone),
                                                x: e.o(
                                                  (e) => $(t.driverPhone),
                                                  r,
                                                ),
                                                y: e.o(
                                                  (e) => z(t.driverPhone),
                                                  r,
                                                ),
                                              },
                                        )
                                      : {},
                                  )
                                : {},
                              { z: r },
                            ),
                          ),
                        },
                    { x: e.unref(c).length > 0 && "O" != e.unref(j).orderSta },
                    (e.unref(c).length > 0 && e.unref(j).orderSta, {}),
                    { y: !e.unref(_).id },
                    e.unref(_).id
                      ? {
                          A: e.f(e.unref(_).actives, (t, r, a) => ({
                            a: e.f(k, (r, a, o) =>
                              e.e(
                                { a: r.name == t.activityTimeDesc },
                                r.name == t.activityTimeDesc
                                  ? {
                                      b: e.n("iconfont " + r.icon),
                                      c: e.t(t.activityTimeDesc),
                                    }
                                  : {},
                                { d: a },
                              ),
                            ),
                            b: e.t(t.activeName),
                            c: e.t(t.startTime),
                            d: t.productUrl,
                            e: e.o(
                              (e) =>
                                ((e) => {
                                  (p.value = e),
                                    B(p.value.activeName),
                                    h.value.showDialog();
                                })(t),
                              r,
                            ),
                            f: r,
                          })),
                        }
                      : {
                          z: e.f(e.unref(M), (t, r, a) =>
                            e.e(
                              { a: e.t(t.moon), b: e.t(t.days), c: 0 == r },
                              0 == r
                                ? {}
                                : e.unref(M)[r - 1] &&
                                    e.unref(M)[r - 1].destinationDesc &&
                                    e.unref(M)[r - 1].destinationDesc !=
                                      t.destinationDesc
                                  ? {
                                      e: e.t(e.unref(M)[r - 1].destinationDesc),
                                    }
                                  : {},
                              {
                                d:
                                  e.unref(M)[r - 1] &&
                                  e.unref(M)[r - 1].destinationDesc &&
                                  e.unref(M)[r - 1].destinationDesc !=
                                    t.destinationDesc,
                                f: e.t(t.destinationDesc),
                                g: 0 != r && r == e.unref(M).length - 1,
                              },
                              (0 != r && e.unref(M).length, {}),
                              { h: t.teamRsvSrcs && t.teamRsvSrcs.length > 0 },
                              t.teamRsvSrcs && t.teamRsvSrcs.length > 0
                                ? { i: e.t(t.teamRsvSrcs[0].hotelDesc) }
                                : {},
                              {
                                j: e.t(t.activesTl),
                                k: r,
                                l: e.o((e) => H(t), r),
                              },
                            ),
                          ),
                        },
                    { B: e.unref(v).length <= 0 && "O" != e.unref(j).orderSta },
                    e.unref(v).length <= 0 && "O" != e.unref(j).orderSta
                      ? { C: e.o((e) => P()) }
                      : {
                          D: e.f(e.unref(v), (t, r, a) =>
                            e.e(
                              { a: "F" != t.isShuttle },
                              "F" != t.isShuttle
                                ? e.e(
                                    { b: e.unref(v).length > 1 },
                                    e.unref(v).length > 1
                                      ? { c: e.t(r + 1) }
                                      : {},
                                    { d: t.carNo },
                                    t.carNo
                                      ? e.e(
                                          {
                                            e: e.t(t.carNo),
                                            f: t.carModelDesc,
                                          },
                                          t.carModelDesc
                                            ? { g: e.t(t.carModelDesc) }
                                            : {},
                                          {
                                            h: e.t(t.beginDateF),
                                            i: e.t(t.startTime),
                                            j: t.station,
                                          },
                                          t.station
                                            ? { k: e.t(t.station) }
                                            : {},
                                        )
                                      : {},
                                    {
                                      l: e.f(t.guests, (t, r, a) => ({
                                        a: e.t(t.name),
                                        b: r,
                                      })),
                                      m: e.t(t.trafficTypeDesc),
                                      n: e.t(t.trips),
                                      o: t.driver || e.unref(w).code,
                                    },
                                    t.driver || e.unref(w).code
                                      ? e.e(
                                          { p: e.unref(w).code },
                                          e.unref(w).code
                                            ? {
                                                q: e.t(e.unref(w).name),
                                                r: e.t(e.unref(w).mobile),
                                                s: e.o(
                                                  (t) => $(e.unref(w).mobile),
                                                  r,
                                                ),
                                                t: e.o(
                                                  (t) => z(e.unref(w).mobile),
                                                  r,
                                                ),
                                              }
                                            : {
                                                v: e.t(t.driver),
                                                w: e.t(t.driverPhone),
                                                x: e.o(
                                                  (e) => $(t.driverPhone),
                                                  r,
                                                ),
                                                y: e.o(
                                                  (e) => z(t.driverPhone),
                                                  r,
                                                ),
                                              },
                                        )
                                      : {},
                                  )
                                : {},
                              { z: r },
                            ),
                          ),
                        },
                    { E: e.unref(R).length > 0 },
                    e.unref(R).length > 0
                      ? {
                          F: e.o(
                            (e) => (
                              a.setStorage("teamInfo", {
                                guestId: V.value.id,
                                guestName: V.value.name,
                                teamNo: j.value.teamNo,
                                teamName: j.value.teamName,
                                teamBeginTime: j.value.beginDate,
                                teamEndTime: j.value.endDate,
                              }),
                              void l.goPage(
                                `/pagesD/trip/album?guestId=${V.value.id}&teamNo=${j.value.teamNo}`,
                              )
                            ),
                          ),
                          G: e.f(e.unref(R), (t, r, a) => ({
                            a: r,
                            b:
                              t.photoUrl +
                              "?imageView2/1/w/332/h/248&x-oss-process=image/resize,m_fill,w_332,h_248",
                            c: e.o((r) => {
                              return (
                                (a = t.photoUrl),
                                (o = e.unref(R)),
                                (y.value = []),
                                o.forEach((e) => {
                                  y.value.push(e.photoUrl);
                                }),
                                void e.nextTick$1(() => {
                                  D.value.open(a);
                                })
                              );
                              var a, o;
                            }, r),
                          })),
                        }
                      : {},
                  )
                : {},
              { H: e.t(e.unref(p).activeName), I: e.unref(p).activeDesc },
              e.unref(p).activeDesc
                ? { J: e.p({ content: e.unref(p).activeDesc }) }
                : {},
              {
                K: e.f(e.unref(p).photos, (e, t, r) => ({
                  a: e.photoUrl,
                  b: t,
                })),
                L: e.sr(h, "af9c5e6e-3", { k: "album" }),
                M: e.p({ maxDialog: !0, titleBorder: !0 }),
                N: e.sr(D, "af9c5e6e-5", { k: "previewImageBox" }),
                O: e.p({ urls: e.unref(y) }),
              },
            )
        );
      },
    });
  v.__runtimeHooks = 1;
  const m = e._export_sfc(v, [["__scopeId", "data-v-af9c5e6e"]]);
  wx.createPage(m);
})();
