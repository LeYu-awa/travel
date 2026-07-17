!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/umengAdaptor.js"),
    a = require("../../utils/api.js"),
    o = require("../../utils/wxuser.js"),
    l = require("../../hooks/useScroll.js"),
    r = require("../../utils/platform.js"),
    i = require("../utils.js"),
    n = require("../types/enum.js"),
    c = require("../../utils/utils.js"),
    s = require("../../base/jAlert/jAlert.js"),
    d = require("../../utils/helper.js"),
    u = require("../../utils/qdTracker.js");
  Math || (v + h + y + C + D + m + p + g + _ + f + T + b)();
  const p = () => "../../components/new/FixedBottomView.js",
    m = () => "../../components/new/StButton.js",
    y = () => "../components/buttons/ShareButton.js",
    v = () => "../components/buttons/BackButton.js",
    h = () => "../components/buttons/HomeButton.js",
    D = () => "../components/RectTabs.js",
    g = () => "../components/dialogs/EstimatedCenterDialog.js",
    f = () => "../components/dialogs/ConfirmationDialog.js",
    _ = () => "../../components/kfDialog.js",
    T = () => "../components/CollectSuccess.js",
    C = () => "../../components/new/Navigator.js",
    b = () => "../components/dialogs/DetailDialog.js",
    x = e.defineComponent({
      __name: "detail",
      setup(p) {
        const m = e.ref(""),
          y = e.ref(""),
          v = e.ref(""),
          h = e.ref(""),
          D = e.ref(""),
          g = e.ref(""),
          { scrollTop: f, onPageScroll: _ } = l.useScroll(),
          T = e.ref(),
          C = o.getStorage("config"),
          b = o.getStorage("user");
        o.getStorage("wxuser");
        const x = e.ref(44),
          S = e.ref(!1),
          P = e.ref(!1),
          N = e.ref(!1),
          w = e.ref(!1),
          L = e.ref("all"),
          B = e.ref([]),
          I = e.ref([]),
          E = e.ref(!1),
          A = e.reactive({ picture: "", destination: "", destinationDesc: "" }),
          j = e.reactive({
            visible: !1,
            data: {},
            type: n.DetailType.DESTINATION,
            code: "",
          });
        let M = e.reactive({
          dayDetailDtos: [],
          dayCode: "",
          destination: "",
          destinationDesc: "",
          durationByLast: 0,
          itineraryPlanCode: "",
          mileageByLast: 0,
          rsvDay: 0,
          unitCode: "",
          picture: "",
          _hotel: "",
          _st_durationByLast: "",
          _st_mileageByLast: "",
          _rsvDayTitle: "",
          _date: { month: "", day: "", date: "" },
          disabled: !1,
        });
        const k = e.ref({
            itineraryDays: 0,
            itineraryLatency: 0,
            planName: "",
            adult: 0,
            adviceNo: "",
            adviceSta: "",
            adviserCode: "",
            adviserName: "",
            arrivedDate: "",
            collectNum: 0,
            isCollectShown: !1,
            createDatetime: "",
            createUser: "",
            dayDtos: [],
            estimatedPrice: 0,
            foreignerNum: 0,
            gender: "",
            hmkNum: 0,
            itineraryPlanCode: "",
            memberId: "",
            memberLevel: "",
            memberMobile: "",
            memberName: "",
            middleChildren: 0,
            modifyDatetime: "",
            modifyUser: "",
            modifyType: "member",
            needButler: !1,
            oldNum: 0,
            olderChildren: 0,
            orderNo: "",
            placeEndCityName: "",
            placeStartCityName: "",
            planStatus: "D",
            productIntention: "",
            routeDestinationStr: "",
            travelPeople: 0,
            unitCode: "",
            youngerChildren: 0,
            _title: "",
            _estimatedPrice: "",
            _modifyDatetime: "",
            _arrivedDateArr: [],
            _collectNum: 0,
            _collectNumType: "origin",
            _createDatetime: "",
            headPortraitUrl: "",
            isCollect: !1,
            collectId: "0",
          }),
          G = e.reactive({
            base: { activityPrice: 0, carPrice: 0, driverPrice: 0 },
            steward: { butlerPrice: 1 },
            hotelMap: {},
            estimatePrice: 0,
            estimatePriceFormat: "0",
            incalculablePrice: !1,
          }),
          V = e.ref([]),
          F = e.computed(() => V.value.length > 1),
          $ = e.computed(() => {
            const e = r.getMenuButtonBoundingClientRect();
            return `right: ${e.right - e.left}px;`;
          }),
          q = e.computed(() => {
            switch (k.value.planStatus) {
              case "I":
                return "顾问跟进中";
              case "O":
                return "已下单";
              case "X":
                return "已终止";
              default:
                return "";
            }
          }),
          O = e.ref({}),
          R = e.computed(() => b && b.memberId),
          U = e.computed(() =>
            "1" === g.value
              ? b.memberId == k.value.memberId
              : "" === y.value ||
                y.value == b.memberId ||
                b.memberId == k.value.memberId,
          ),
          Y = e.computed(
            () => "1" !== g.value && ("" === y.value || y.value == b.memberId),
          );
        e.onLoad(async (e) => {
          if ((console.log("options", e), e.itineraryPlanCode)) {
            (m.value = e.itineraryPlanCode), (h.value = e.itineraryPlanCode);
            try {
              await ne();
            } catch (e) {
              console.error("获取价格失败");
            }
            try {
              await le();
            } catch (e) {}
          }
          if (
            (e.fromType && (g.value = e.fromType),
            e.memberId && (y.value = e.memberId),
            e.funcName)
          ) {
            v.value = e.funcName;
            try {
              Q(v.value);
            } catch (e) {
              console.error("登录重定向回来继续执行方法失败");
            }
          }
          console.log("user && user.memberId", b);
        }),
          e.onMounted(() => {
            e.index.getSystemInfo({
              success: (e) => {
                (x.value = (e.statusBarHeight || 0) + x.value),
                  e.screenWidth >= 768
                    ? (console.log("平板设备"), (E.value = !0))
                    : (console.log("手机设备"), (E.value = !1));
              },
              fail(e) {
                console.log(e);
              },
            }),
              (V.value = getCurrentPages());
          }),
          e.onUnload(() => {
            u.qdTracker.resetData(O.value);
          }),
          e.onShareAppMessage(
            (e) => (
              "button" === e.from &&
                t.adaptor.sendEvent("click_travel_assistant_control", {
                  button_name: "分享",
                }),
              {
                title: "好友分享了一个行程计划给你",
                path: `/pagesTravelAssistant/plan/detail?itineraryPlanCode=${h.value}&memberId=${k.value.memberId}`,
                imageUrl: d.imageView2({
                  url: A.picture || "",
                  mode: 1,
                  width: 750,
                  height: 564,
                }),
              }
            ),
          ),
          e.onShareTimeline(
            () => (
              console.log("user.memberId", b.memberId),
              {
                title: "好友分享了一个行程计划给你",
                path: "/pagesTravelAssistant/plan/detail",
                query: `itineraryPlanCode=${h.value}&memberId=${k.value.memberId}`,
                imageUrl: d.imageView2({
                  url: A.picture || "",
                  mode: 1,
                  width: 750,
                  height: 564,
                }),
              }
            ),
          );
        const H = (e, t, a) =>
            !!(
              ("placeStart" !== e.resourceType &&
                "placeEnd" !== e.resourceType) ||
              (e.cityDto && e.cityDto.cityName)
            ) &&
            (t.rsvDay === I.value.length
              ? "hotel" !== e.resourceType && "activity" !== e.resourceType
              : "" !== e.resourceType && "activity" !== e.resourceType),
          X = () =>
            ((y.value && y.value == b.memberId) || "" === y.value) &&
            "adviser" === k.value.modifyType,
          z = (e) => {
            if (1 == M.rsvDay && "placeStart" == e.resourceType)
              return e.cityDto && e.cityDto.cityName;
            if (M.rsvDay === I.value.length) {
              if ("hotel" === e.resourceType) return !1;
              if (
                "placeStart" == e.resourceType ||
                "placeEnd" == e.resourceType
              )
                return e.cityDto && e.cityDto.cityName;
            }
            return !0;
          },
          J = {
            tapCollect: () => {
              R.value ? (k.value.isCollect ? ie() : re()) : he("tapCollect");
            },
            tapSaveAdviceOrder: () => {
              "" === y.value || R.value
                ? U.value
                  ? oe()
                  : ae().then((e) => {
                      (h.value = e.retVal.retVal), le(), oe();
                    })
                : he("tapSaveAdviceOrder");
            },
            tapUseTemplate: () => {
              R.value
                ? (u.qdTracker.track("use_template"),
                  U.value
                    ? setTimeout(() => {
                        e.index.navigateTo({
                          url: `/pagesTravelAssistant/journey/edit?fromType=${
                            n.JourneyEditFromType.PLAN_DETAIL
                          }&itineraryPlanCode=${h.value}&isBossRecommend=${
                            "1" === g.value
                          }`,
                        });
                      }, 300)
                    : ae().then((t) => {
                        console.log("复制：templatePlanCode", D.value),
                          (h.value = t.retVal.retVal),
                          le(),
                          setTimeout(() => {
                            e.index.navigateTo({
                              url: `/pagesTravelAssistant/journey/edit?fromType=${
                                n.JourneyEditFromType.PLAN_DETAIL
                              }&itineraryPlanCode=${D.value}&isBossRecommend=${
                                "1" === g.value
                              }`,
                            });
                          }, 300);
                      }))
                : he("tapUseTemplate");
            },
            toMap: () => {
              R.value
                ? e.index.navigateTo({
                    url:
                      "/pagesTravelAssistant/journey/map?data=" +
                      encodeURIComponent(JSON.stringify(I.value)),
                  })
                : he("toMap");
            },
          },
          Q = (e) => {
            J[e]();
          },
          W = (e) => {
            switch ((console.log(e), e.resourceType)) {
              case "hotel":
                (j.visible = !0),
                  (j.code =
                    e && e.hotelDto && e.hotelDto.hotelCode
                      ? e.hotelDto.hotelCode
                      : ""),
                  (j.type = n.DetailType.HOTEL);
                break;
              case "activity":
                (j.visible = !0),
                  (j.code =
                    e && e.activityDto && e.activityDto.activityCode
                      ? e.activityDto.activityCode
                      : ""),
                  (j.type = n.DetailType.ACTIVITY);
            }
          },
          K = (t) => {
            (L.value = "" + t.value.id),
              0 !== t.index &&
                ((M = e.reactive(I.value[t.index - 1])), console.log(M));
          },
          Z = (t, a) => {
            if (0 === a)
              (t._date.month = k.value._arrivedDateArr[1] + "月"),
                (t._date.day = k.value._arrivedDateArr[2]),
                (t._date.date = k.value.arrivedDate);
            else {
              const o = e
                  .dayjs(I.value[a - 1]._date.date)
                  .add(1, "day")
                  .format("YYYY-MM-DD"),
                l = o.split("-");
              (t._date.month = l[1] + "月"),
                (t._date.day = l[2]),
                (t._date.date = o);
            }
            return {
              item: t,
              month: t._date.month,
              day: t._date.day,
              date: t._date.date,
            };
          },
          ee = (e, t, a) => {
            var o, l, r, i, n;
            if (
              ((e._hotel =
                "hotel" ==
                e.dayDetailDtos[e.dayDetailDtos.length - 1].resourceType
                  ? null ==
                    (o = e.dayDetailDtos[e.dayDetailDtos.length - 1].hotelDto)
                    ? void 0
                    : o.hotelDesc
                  : ""),
              0 === t)
            ) {
              const t = e.dayDetailDtos.find(
                (e) => "placeStart" === e.resourceType,
              );
              (
                null == (l = null == t ? void 0 : t.cityDto)
                  ? void 0
                  : l.cityName
              )
                ? (e._hotel = `抵达${
                    null == (r = null == t ? void 0 : t.cityDto)
                      ? void 0
                      : r.cityName
                  } - ${e._hotel}`)
                : (e._hotel = "" + e._hotel);
            } else if (t === a.length - 1) {
              const t = e.dayDetailDtos.find(
                (e) => "placeEnd" === e.resourceType,
              );
              (
                null == (i = null == t ? void 0 : t.cityDto)
                  ? void 0
                  : i.cityName
              )
                ? (e._hotel =
                    (null == (n = null == t ? void 0 : t.cityDto)
                      ? void 0
                      : n.cityName) + "离开")
                : (e._hotel = "");
            }
          };
        _((e) => {
          f.value = e.scrollTop;
        });
        const te = (e) => {
            if (k.value.needButler && "all" == L.value) return "";
            switch (e.resourceType) {
              case "hotel":
              case "activity":
                return d.imageView2({
                  url: e.picture || "",
                  mode: 1,
                  width: 96,
                  height: 96,
                });
              default:
                return "";
            }
          },
          ae = () =>
            new Promise((t, o) => {
              e.index.showLoading({ title: "加载中", mask: !0 }),
                a.api
                  .interfaceTransfer({
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_TRAVEL_ASSISTANT",
                      interfaceMethod:
                        "/api/itinerary/plan/copyItineraryPlanTemplate",
                      interfaceFrom: "GC",
                      hotelGroupCode: C.hotelGroupCode,
                    },
                    query: {
                      unitCode: C.hotelGroupCode,
                      memberId: b.memberId,
                      itineraryPlanCode: k.value.itineraryPlanCode,
                    },
                  })
                  .then((a) => {
                    e.index.hideLoading(),
                      console.log("复制模板", a),
                      0 === a.retVal.result
                        ? ((D.value = a.retVal.retVal), t(a))
                        : (s.jAlert3(a.retVal.msg), o(a));
                  })
                  .catch((t) => {
                    e.index.hideLoading(), o(t);
                  });
            }),
          oe = () => {
            (S.value = !0),
              t.adaptor.sendEvent("click_travel_assistant_control", {
                button_name: "提交咨询",
              }),
              e.index.showLoading({ title: "加载中", mask: !0 }),
              a.api
                .interfaceTransfer({
                  config: {
                    interfaceType: "POST",
                    interfaceModule: "GC_TRAVEL_ASSISTANT",
                    interfaceMethod: "/api/itinerary/plan/saveAdviceOrder",
                    interfaceFrom: "GC",
                    hotelGroupCode: C.hotelGroupCode,
                  },
                  query: {
                    unitCode: C.hotelGroupCode,
                    memberId: b.memberId,
                    itineraryPlanCode: h.value,
                  },
                })
                .then(async (t) => {
                  if (
                    (e.index.hideLoading(),
                    (S.value = !1),
                    console.log("提交咨询", t),
                    0 === t.retVal.result)
                  ) {
                    P.value = !0;
                    const {
                      adult: e,
                      olderChildren: t,
                      middleChildren: a,
                      youngerChildren: o,
                      arrivedDate: l,
                      needButler: r,
                      placeStartCityName: i,
                      placeEndCityName: n,
                    } = k.value;
                    u.qdTracker.track("consult_order", {
                      travel_date: l,
                      adult_num: e,
                      children_num: t + a + o,
                      start_place: i,
                      end_places: n,
                      need_butler: r,
                    });
                  } else
                    e.index.showToast({ title: t.retVal.msg, icon: "none" });
                })
                .catch((t) => {
                  e.index.hideLoading(), (S.value = !1);
                });
          },
          le = () =>
            new Promise((t, o) => {
              e.index.showLoading({ title: "加载中", mask: !0 }),
                a.api
                  .interfaceTransfer({
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_TRAVEL_ASSISTANT",
                      interfaceMethod: "/api/itinerary/plan/info",
                      interfaceFrom: "GC",
                      hotelGroupCode: C.hotelGroupCode,
                    },
                    query: {
                      unitCode: C.hotelGroupCode,
                      memberId: b && b.memberId ? b.memberId : null,
                      itineraryPlanCode: h.value,
                    },
                  })
                  .then(async (a) => {
                    console.log("getDetail", a);
                    const { retVal: o } = a.retVal;
                    (O.value = {
                      commodity_id: o.itineraryPlanCode,
                      commodity_name: o.planName,
                    }),
                      u.qdTracker.setData(O.value);
                    const l = o.dayDtos;
                    for (let e = 0; e < l.length; e++) {
                      const t = l[e];
                      try {
                        0 === e &&
                          ((A.picture = t.picture),
                          (A.destination = t.destination),
                          (A.destinationDesc = t.destinationDesc)),
                          (t._date = { month: "", day: "", date: "" }),
                          ee(t, e, l),
                          0 === e
                            ? (t._rsvDayTitle = "抵达地>" + t.destinationDesc)
                            : e === l.length - 1
                              ? (t._rsvDayTitle =
                                  t.placeOfDepartureDesc + ">离开地")
                              : t.placeOfDepartureDesc &&
                                  t.destinationDesc &&
                                  t.placeOfDepartureDesc != t.destinationDesc
                                ? (t._rsvDayTitle = `${t.placeOfDepartureDesc}>${t.destinationDesc}`)
                                : t.placeOfDepartureDesc &&
                                  t.destinationDesc &&
                                  t.placeOfDepartureDesc == t.destinationDesc &&
                                  (t._rsvDayTitle = t.placeOfDepartureDesc);
                        for (let e = 0; e < t.dayDetailDtos.length; e++) {
                          const a = t.dayDetailDtos[e];
                          if (
                            ((a.descript = a.descript
                              ? a.descript.replace(/<\/?[^>]+(>|$)/g, "")
                              : ""),
                            a.durationByLast && a.mileageByLast
                              ? ((a._st_durationByLast = (
                                  a.durationByLast / 3600
                                ).toFixed(1)),
                                (a._st_mileageByLast = (
                                  a.mileageByLast / 1e3
                                ).toFixed(1)))
                              : "placeStart" != a.resourceType &&
                                "placeEnd" != a.resourceType &&
                                e !== t.dayDetailDtos.length - 1 &&
                                (await pe(a, t.dayDetailDtos[e + 1])),
                            "hotel" == a.resourceType)
                          ) {
                            a.hotelDto.roomDtos && a.hotelDto.roomDtos.length
                              ? (a.hotelDto._roomTypes = a.hotelDto.roomDtos
                                  .map((e) => `${e.rmtypeDesc} x${e.num}`)
                                  .join(","))
                              : (a.hotelDto._roomTypes = "");
                            try {
                              await ce(a.hotelDto.hotelCode);
                            } catch (e) {
                              console.error("get酒店价格失败", e);
                            }
                          }
                          "activity" == a.resourceType &&
                            a.activityDto &&
                            (a.activityDto.activityDuration
                              ? (a.activityDto._st_activityDuration = (
                                  a.activityDto.activityDuration / 3600
                                ).toFixed(1))
                              : (a.activityDto._st_activityDuration = "0"));
                        }
                      } catch (e) {
                        console.error(e);
                      }
                    }
                    const r = i.formatCollectCount(o.collectNum);
                    (o._collectNum = r.count),
                      (o._collectNumType = r.type),
                      (o._estimatedPrice = 0),
                      (o._title = ue(o)),
                      (o._createDatetime = e
                        .dayjs(o.createDatetime)
                        .format("MM月DD日")),
                      (o._modifyDatetime = e
                        .dayjs(o.modifyDatetime)
                        .format("MM月DD日")),
                      (o.arrivedDate =
                        o && o.arrivedDate ? o.arrivedDate.split(" ")[0] : ""),
                      (o._arrivedDateArr =
                        o && o.arrivedDate ? o.arrivedDate.split("-") : []),
                      (I.value = l),
                      (k.value = o),
                      e.index.hideLoading(),
                      ((e) => {
                        let t = [];
                        I.value.forEach((a, o) => {
                          e && e.arrivedDate
                            ? (Z(a, o),
                              t.push({
                                id: "" + (o + 1),
                                name: `${a._date.month}${a._date.day}日`,
                              }))
                            : ((a._st_rsvDayTitlePrefix = "DAY " + a.rsvDay),
                              t.push({
                                id: "" + (o + 1),
                                name: "DAY " + a.rsvDay,
                              }));
                        }),
                          (B.value = t),
                          B.value.unshift({ id: "all", name: "概览" }),
                          console.log("formatDayXDate", I.value);
                      })(o),
                      se(o),
                      console.log(I.value),
                      console.log("destListObj", k.value),
                      t(a);
                  })
                  .catch((t) => {
                    e.index.hideLoading(), o(t);
                  });
            }),
          re = () => {
            e.index.showLoading({ title: "加载中", mask: !0 }),
              a.api
                .shopAddGoodsCollection({
                  hotelGroupCode: C.hotelGroupCode,
                  goodsId: k.value.itineraryPlanCode,
                  memberId: b.memberId,
                  mobile: b.mobile,
                  goodsName: k.value.planName,
                  collectionType: "TRAVEL",
                })
                .then((t) => {
                  console.log("收藏成功"),
                    e.index.hideLoading(),
                    u.qdTracker.track("collect", { collect_type: "行程" }),
                    (w.value = !0),
                    le();
                })
                .catch(() => {
                  e.index.hideLoading();
                });
          },
          ie = () => {
            k.value.collectId
              ? (e.index.showLoading({ title: "加载中", mask: !0 }),
                a.api
                  .shopDeleteGoodsCollection([k.value.collectId])
                  .then((t) => {
                    console.log("取消收藏成功"), e.index.hideLoading(), le();
                  })
                  .catch(() => {
                    e.index.hideLoading();
                  }))
              : s.jAlert3("无效collectId");
          },
          ne = () =>
            new Promise((t, o) => {
              new Promise((e, t) => {
                a.api
                  .interfaceTransfer({
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_PRODUCT_CBD",
                      interfaceMethod: "/api/price/base",
                      interfaceFrom: "GC",
                      hotelGroupCode: C.hotelGroupCode,
                    },
                    query: { unitCode: C.hotelGroupCode },
                  })
                  .then((t) => {
                    e(t);
                  })
                  .catch((e) => {
                    t(e);
                  });
              })
                .then((a) => {
                  e.index.hideLoading(),
                    console.log("价格", a),
                    (G.base = a.retVal.retVal),
                    t(a);
                })
                .catch((e) => {
                  o(e);
                });
            }),
          ce = (e) =>
            new Promise((t, o) => {
              a.api
                .interfaceTransfer({
                  config: {
                    interfaceType: "GET",
                    interfaceModule: "GC_PRODUCT_ROOM",
                    interfaceMethod: "/api/price/hotel",
                    interfaceFrom: "GC",
                    hotelGroupCode: C.hotelGroupCode,
                  },
                  query: { unitCode: C.hotelGroupCode, hotelCode: e },
                })
                .then((a) => {
                  console.log("酒店价格", a);
                  const { hotelPrice: o } = a.retVal.retVal;
                  G.hotelMap[e] || (G.hotelMap[e] = o), t(a);
                })
                .catch((e) => {
                  o(e);
                });
            }),
          se = (e) => {
            ((e) => {
              const {
                  adult: t,
                  olderChildren: o,
                  middleChildren: l,
                  youngerChildren: r,
                } = e,
                i = t + o + l + r;
              return new Promise((e, t) => {
                a.api
                  .interfaceTransfer({
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_PRODUCT_CBD",
                      interfaceMethod: "/api/price/butler",
                      interfaceFrom: "GC",
                      hotelGroupCode: C.hotelGroupCode,
                    },
                    query: { unitCode: C.hotelGroupCode, count: i },
                  })
                  .then((a) => {
                    console.log("管家价格", a),
                      0 === a.retVal.result
                        ? ((G.steward.butlerPrice =
                            a.retVal.retVal.butlerPrice),
                          e(a))
                        : (s.jAlert3(a.retVal.msg), t(a));
                  })
                  .catch((e) => {
                    t(e);
                  });
              });
            })(e).then((e) => {
              console.log("价格2", e), (k.value._estimatedPrice = de());
            });
          },
          de = () => {
            const e = 1 * (I.value.length - 1) * G.steward.butlerPrice,
              t = 1 * I.value.length * G.base.carPrice,
              a = 1 * I.value.length * G.base.driverPrice;
            console.log("calEstimatePrice stewardNum", e);
            let o = 0,
              l = 0;
            I.value.forEach((e, t) => {
              e.dayDetailDtos.forEach((e) => {
                if (
                  ("activity" === e.resourceType && (o += 1),
                  t !== I.value.length - 1 && "hotel" === e.resourceType)
                ) {
                  let t = 0;
                  e.hotelDto &&
                    e.hotelDto.roomDtos &&
                    e.hotelDto.roomDtos.forEach((e) => {
                      t += e.num;
                    }),
                    (l +=
                      (G && G.hotelMap && G.hotelMap[e.hotelDto.hotelCode]
                        ? G.hotelMap[e.hotelDto.hotelCode]
                        : 0) * t);
                }
              });
            }),
              console.log("活动数量", o),
              (o = G.base.activityPrice * o),
              console.log("活动价格", o),
              console.log("酒店价格", l),
              console.log("酒店价格map", null == G ? void 0 : G.hotelMap);
            let r = 0;
            return (
              (r = k.value.needButler
                ? Math.round(e + t + a + l + o)
                : Math.round(t + a + l)),
              (G.estimatePrice = r),
              (G.estimatePriceFormat = i.formatPrice(r)),
              console.log("num", r),
              G.estimatePriceFormat
            );
          },
          ue = (t) => {
            let a = "",
              o = 0;
            if (
              (0 != t.adult && (a = t.adult + "成人"),
              (0 === t.olderChildren &&
                0 === t.middleChildren &&
                0 === t.youngerChildren) ||
                (a +=
                  t.olderChildren +
                  t.middleChildren +
                  t.youngerChildren +
                  "儿童"),
              t.arrivedDate)
            ) {
              const o = e.dayjs(t.arrivedDate);
              a += ` · ${o.format("MM月DD日")}-${o
                .add(t.dayDtos.length - 1, "day")
                .format("MM月DD日")}`;
            }
            return (
              t.dayDtos.forEach((e) => {
                e.dayDetailDtos.forEach((e) => {
                  e.mileageByLast && (o += e.mileageByLast);
                });
              }),
              o && (a += ` · 车程${(o / 1e3).toFixed(1)}km`),
              t.needButler && (a += " · 含管家"),
              a
            );
          },
          pe = (e, t) =>
            new Promise(async (a, o) => {
              let l = { rows: [] };
              if (
                (null == e ? void 0 : e.lat) &&
                (null == e ? void 0 : e.lng) &&
                (null == t ? void 0 : t.lat) &&
                (null == t ? void 0 : t.lng)
              )
                try {
                  (l = await i.calculateDistanceByQQmap({
                    from: `${e.lat},${e.lng}`,
                    to: `${t.lat},${t.lng}`,
                  })),
                    console.log("mapDisResult", l),
                    l.rows.length
                      ? (l.rows[0].elements[0].status
                          ? ((e.durationByLast = 0),
                            (e._st_durationByLast = "0.0"))
                          : ((e.durationByLast =
                              l.rows[0].elements[0].duration),
                            (e._st_durationByLast = (
                              e.durationByLast / 3600
                            ).toFixed(1))),
                        (e.mileageByLast = l.rows[0].elements[0].distance),
                        (e._st_mileageByLast = (e.mileageByLast / 1e3).toFixed(
                          1,
                        )))
                      : ((e.durationByLast = 0),
                        (e.mileageByLast = 0),
                        (e._st_durationByLast = "0"),
                        (e._st_mileageByLast = "0")),
                    a(l);
                } catch (e) {
                  o(e);
                }
              else
                (e.durationByLast = 0),
                  (e.mileageByLast = 0),
                  (e._st_durationByLast = "0"),
                  (e._st_mileageByLast = "0"),
                  a(l);
            }),
          me = (e) =>
            e.index != M.dayDetailDtos.length - 1 &&
            "placeStart" !== e.item.resourceType &&
            "placeEnd" !== e.item.resourceType,
          ye = (e) => {
            if ("placeStart" === e.item.resourceType) return !0;
            if ("placeEnd" === e.item.resourceType)
              try {
                return !(1 === M.dayDetailDtos.length);
              } catch (e) {
                return !1;
              }
          },
          ve = (e) => {
            T.value.showDialog(),
              t.adaptor.sendEvent("click_travel_assistant_control", {
                button_name: "联系客服",
              });
          },
          he = (t) => {
            const a = getCurrentPages(),
              o = a[a.length - 1],
              l = "/" + o.route,
              r = o.options,
              i = e.index.getEnterOptionsSync();
            let n = { redirect_url: `${l}?${c.createUrl(r)}&funcName=${t}` };
            console.log("enterOptions enterOptions", i),
              i.scene && 1154 === i.scene && (n.flagSinglePage = 1),
              c.toLogin(n);
          },
          De = () => {
            e.index.setClipboardData({
              data: k.value.adviceNo,
              success: () => {
                e.index.showToast({ title: "咨询单号已复制", icon: "none" });
              },
            });
          },
          ge = () => {
            e.index.switchTab({ url: "/pages/trip/index" });
          },
          fe = () => {
            R.value || c.toLogin();
          },
          _e = () => {
            e.index.navigateTo({ url: "/pagesA/member/myCollection?type=1" });
          };
        return (t, a) =>
          e.e(
            { a: F.value },
            F.value
              ? {
                  b: e.o(e.unref(i.goBack)),
                  c: e.p({ bgColor: "rgba(255, 255, 255, 0.8)" }),
                }
              : {},
            {
              d: e.s($.value),
              e: e.o(fe),
              f: e.p({ "open-type": R.value ? "share" : "" }),
              g: e.p({
                fixed: !0,
                useImmersiveStyle: !0,
                customStyle: { backgroundColor: e.unref(f) > 40 ? "#fff" : "" },
              }),
              h: e.unref(d.imageView2)({
                url: A.picture,
                mode: 1,
                width: 750,
                height: 564,
              }),
              i: e.o((...e) => J.toMap && J.toMap(...e)),
              j: Y.value && k.value.isCollectShown,
            },
            Y.value && k.value.isCollectShown
              ? { k: e.t(k.value._collectNum) }
              : {},
            { l: !Y.value },
            Y.value
              ? {}
              : e.e(
                  {
                    m: e.unref(d.imageView2)({
                      url:
                        k.value.headPortraitUrl ||
                        "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/avatar.png",
                      mode: 1,
                      width: 48,
                      height: 48,
                    }),
                    n: e.t(k.value.memberName),
                    o: e.t(k.value._createDatetime),
                    p: k.value.isCollectShown,
                  },
                  k.value.isCollectShown
                    ? e.e(
                        {
                          q: k.value.isCollect,
                          r: !k.value.isCollect,
                          s: 0 != k.value._collectNum,
                        },
                        0 != k.value._collectNum
                          ? {
                              t: e.t(k.value._collectNum),
                              v: e.n(k.value._collectNumType),
                            }
                          : {},
                        {
                          w: e.o((...e) => J.tapCollect && J.tapCollect(...e)),
                        },
                      )
                    : {},
                  { x: e.n(k.value._collectNumType) },
                ),
            {
              y: e.t(k.value.planName),
              z: e.n(k.value._title ? "" : "margin"),
              A: k.value._title,
            },
            k.value._title
              ? {
                  B: e.t(k.value._title),
                  C: e.n(k.value.adviceNo ? "advice-no" : ""),
                }
              : {},
            { D: Y.value && k.value.adviceNo },
            Y.value && k.value.adviceNo
              ? { E: e.t(k.value.adviceNo), F: e.o(De) }
              : {},
            { G: X() },
            X()
              ? { H: e.o((e) => (N.value = !0)) }
              : {
                  I: e.t(k.value._estimatedPrice),
                  J: e.o((e) => (N.value = !0)),
                },
            { K: Y.value },
            Y.value
              ? {
                  L: e.t("adviser" === k.value.modifyType ? "顾问" : "我"),
                  M: e.t(k.value._modifyDatetime),
                }
              : {},
            { N: k.value.needButler },
            k.value.needButler
              ? {
                  O: e.o(K),
                  P: e.o((e) => (L.value = e)),
                  Q: e.p({ data: B.value, canCancel: !1, modelValue: L.value }),
                  R: x.value + "px",
                  S: e.f(I.value, (t, a, o) =>
                    e.e(
                      {
                        a: e.t(t._date.month || "DAY"),
                        b: e.t(t._date.day || t.rsvDay),
                        c: e.t(t._rsvDayTitle),
                        d: t._hotel,
                      },
                      t._hotel ? { e: e.t(t._hotel) } : {},
                      { f: a != I.value.length - 1 },
                      (I.value.length, {}),
                      { g: a },
                    ),
                  ),
                  T: "all" == L.value,
                  U: e.t(e.unref(M)._rsvDayTitle),
                  V: e.f(e.unref(M).dayDetailDtos, (t, a, o) =>
                    e.e(
                      { a: z(t) },
                      z(t)
                        ? e.e(
                            {
                              b:
                                "placeStart" == t.resourceType ||
                                "placeEnd" == t.resourceType,
                            },
                            "placeStart" == t.resourceType ||
                              "placeEnd" == t.resourceType
                              ? {}
                              : { c: te(t) },
                            {
                              d:
                                ("placeStart" == t.resourceType ||
                                  "placeEnd" == t.resourceType) &&
                                t.cityDto &&
                                t.cityDto.cityName,
                            },
                            ("placeStart" == t.resourceType ||
                              "placeEnd" == t.resourceType) &&
                              t.cityDto &&
                              t.cityDto.cityName
                              ? e.e(
                                  { e: "placeStart" == t.resourceType },
                                  "placeStart" == t.resourceType
                                    ? {
                                        f: e.t(
                                          t.cityDto && t.cityDto.cityName
                                            ? t.cityDto.cityName
                                            : "",
                                        ),
                                      }
                                    : {},
                                  { g: "placeEnd" == t.resourceType },
                                  "placeEnd" == t.resourceType
                                    ? {
                                        h: e.t(
                                          t.cityDto && t.cityDto.cityName
                                            ? t.cityDto.cityName
                                            : "",
                                        ),
                                      }
                                    : {},
                                  { i: t.descript },
                                  t.descript ? { j: e.t(t.descript) } : {},
                                )
                              : {},
                            { k: "activity" == t.resourceType },
                            "activity" == t.resourceType
                              ? e.e(
                                  {
                                    l: e.t(t.activityDto.activityDesc),
                                    m: e.t(t.activityDto._st_activityDuration),
                                    n: t.descript,
                                  },
                                  t.descript ? { o: e.t(t.descript) } : {},
                                )
                              : "hotel" == t.resourceType
                                ? e.e(
                                    {
                                      q: e.t(t.hotelDto.hotelDesc),
                                      r: e.t(t.hotelDto._roomTypes),
                                      s: t.descript,
                                    },
                                    t.descript ? { t: e.t(t.descript) } : {},
                                  )
                                : {},
                            {
                              p: "hotel" == t.resourceType,
                              v: e.o((e) => W(t), a),
                              w: me({ item: t, index: a }),
                            },
                            me({ item: t, index: a })
                              ? {
                                  x: e.t(t._st_mileageByLast),
                                  y: e.t(t._st_durationByLast),
                                }
                              : {},
                            { z: ye({ item: t }) },
                            (ye({ item: t }), {}),
                          )
                        : {},
                      { A: a },
                    ),
                  ),
                  W: "all" != L.value,
                }
              : {
                  X: e.f(I.value, (t, a, o) =>
                    e.e(
                      { a: t._st_rsvDayTitlePrefix },
                      t._st_rsvDayTitlePrefix
                        ? {
                            b: e.t(t._st_rsvDayTitlePrefix),
                            c: e.t(t._rsvDayTitle),
                          }
                        : {
                            d: e.t(t._date.month),
                            e: e.t(t._date.day),
                            f: e.t(t._rsvDayTitle),
                          },
                      {
                        g: e.f(t.dayDetailDtos, (a, o, l) =>
                          e.e(
                            { a: H(a, t) },
                            H(a, t)
                              ? e.e(
                                  {
                                    b:
                                      "placeStart" == a.resourceType ||
                                      "placeEnd" == a.resourceType,
                                  },
                                  "placeStart" == a.resourceType ||
                                    "placeEnd" == a.resourceType
                                    ? {}
                                    : { c: te(a) },
                                  {
                                    d:
                                      ("placeStart" == a.resourceType ||
                                        "placeEnd" == a.resourceType) &&
                                      a.cityDto &&
                                      a.cityDto.cityName,
                                  },
                                  ("placeStart" == a.resourceType ||
                                    "placeEnd" == a.resourceType) &&
                                    a.cityDto &&
                                    a.cityDto.cityName
                                    ? e.e(
                                        { e: "placeStart" == a.resourceType },
                                        "placeStart" == a.resourceType
                                          ? { f: e.t(a.cityDto.cityName) }
                                          : {},
                                        { g: "placeEnd" == a.resourceType },
                                        "placeEnd" == a.resourceType
                                          ? { h: e.t(a.cityDto.cityName) }
                                          : {},
                                        { i: a.descript },
                                        a.descript
                                          ? { j: e.t(a.descript) }
                                          : {},
                                      )
                                    : "hotel" == a.resourceType
                                      ? e.e(
                                          {
                                            l: e.t(a.hotelDto.hotelDesc),
                                            m: e.t(a.hotelDto._roomTypes),
                                            n: a.descript,
                                          },
                                          a.descript
                                            ? { o: e.t(a.descript) }
                                            : {},
                                        )
                                      : {},
                                  {
                                    k: "hotel" == a.resourceType,
                                    p: e.o((e) => W(a), o),
                                    q: o !== t.dayDetailDtos.length - 1,
                                  },
                                  (t.dayDetailDtos.length, {}),
                                )
                              : {},
                            { r: o },
                          ),
                        ),
                        h: a,
                      },
                    ),
                  ),
                },
            { Y: e.n(k.value.needButler ? "" : "freedom"), Z: U.value },
            U.value
              ? e.e(
                  {
                    aa: e.o((e) => ve()),
                    ab:
                      "I" === k.value.planStatus ||
                      "O" === k.value.planStatus ||
                      "X" === k.value.planStatus,
                  },
                  "I" === k.value.planStatus ||
                    "O" === k.value.planStatus ||
                    "X" === k.value.planStatus
                    ? {
                        ac: e.t(q.value),
                        ad: e.p({
                          customStyle: [
                            {
                              width: "271px",
                              color: "#ccc",
                              backgroundColor: "#eee",
                              borderRadius: "4px",
                            },
                            E.value ? "min-height: 48px;" : "height: 48px",
                          ],
                          disabled: !0,
                          block: !0,
                        }),
                      }
                    : {
                        ae: e.o(J.tapSaveAdviceOrder),
                        af: e.p({
                          loading: S.value,
                          theme: "black",
                          customStyle: [
                            {
                              width: "271px",
                              color: "#FFFFFF",
                              borderRadius: "4px",
                            },
                            E.value ? "min-height: 48px;" : "height: 48px",
                          ],
                          block: !0,
                        }),
                      },
                )
              : {
                  ag: e.o((e) => ve()),
                  ah: e.o(J.tapUseTemplate),
                  ai: e.p({
                    customStyle: [
                      {
                        width: "131.5px",
                        marginRight: "8px",
                        color: "#000000",
                        borderRadius: "4px",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                      },
                      E.value ? "min-height: 48px;" : "height: 49px",
                    ],
                    block: !0,
                    theme: "simple",
                  }),
                  aj: e.o(J.tapSaveAdviceOrder),
                  ak: e.p({
                    loading: S.value,
                    theme: "black",
                    customStyle: [
                      {
                        width: "131.5px",
                        color: "#FFFFFF",
                        borderRadius: "4px",
                      },
                      E.value ? "min-height: 48px;" : "height: 48px",
                    ],
                    block: !0,
                  }),
                },
            {
              al: e.p({
                theme: "white",
                "custom-style": { backgroundColor: "#fff", zIndex: 10 },
              }),
              am: e.o((e) => (N.value = e)),
              an: e.p({ modelValue: N.value }),
              ao: e.sr(T, "8190e512-11", { k: "kf" }),
              ap: e.p({ title: "联系客服" }),
              aq: e.o(ge),
              ar: e.o((e) => (P.value = e)),
              as: e.p({ modelValue: P.value }),
              at: e.o(_e),
              av: e.o((e) => (w.value = e)),
              aw: e.p({ modelValue: w.value }),
              ax: e.o((e) => (j.visible = e)),
              ay: e.p({
                data: j.data,
                type: j.type,
                code: j.code,
                modelValue: j.visible,
              }),
            },
          );
      },
    });
  x.__runtimeHooks = 7;
  const S = e._export_sfc(x, [["__scopeId", "data-v-8190e512"]]);
  wx.createPage(S);
})();
