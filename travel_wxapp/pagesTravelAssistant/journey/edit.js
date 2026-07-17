!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/umengAdaptor.js"),
    a = require("../../utils/api.js"),
    o = require("../../utils/wxuser.js"),
    l = require("../../hooks/useScroll.js"),
    i = require("../../base/jAlert/jAlert.js"),
    r = require("../types/enum.js"),
    s = require("../utils.js"),
    n = require("../../utils/helper.js"),
    d = require("../../utils/qdTracker.js");
  Math ||
    (
      x +
      V +
      c +
      u +
      h +
      v +
      E +
      m +
      w +
      p +
      y +
      L +
      _ +
      P +
      b +
      S +
      g +
      B +
      f +
      C +
      T +
      D
    )();
  const c = () => "../../components/new/Navigator.js",
    u = () => "../../components/new/StRadio.js",
    y = () => "../../components/new/FixedBottomView.js",
    p = () => "../../components/new/StButton.js",
    D = () => "../../components/kfDialog.js",
    v = () => "../../components/Alert.js",
    h = () => "../components/RectTabs.js",
    m = () => "../components/DaysAddButton.js",
    g = () => "../components/dialogs/StewardTipsDialog.js",
    f = () => "../components/dialogs/IncalculableCenterDialog.js",
    C = () => "../components/dialogs/EstimatedCenterDialog.js",
    T = () => "../components/dialogs/NoNeedStewardCenterDialog.js",
    _ = () => "../components/dialogs/DeleteDayCenterDialog.js",
    L = () => "../components/dialogs/AddOneDayDialog.js",
    b = () => "../components/dialogs/PeopleNumberDateDialog.js",
    P = () => "../components/dialogs/ChangePlaceDialog.js",
    S = () => "../components/dialogs/IntelligenceFillDialog.js",
    B = () => "../components/dialogs/DetailDialog.js",
    E = () => "../components/DragList.js",
    w = () => "../components/DragDayXList.js",
    x = () => "../components/buttons/BackButton.js",
    V = () => "../components/buttons/KfButton.js",
    A = e.defineComponent({
      __name: "edit",
      setup(c) {
        const u = e.ref(!1),
          y = e.ref(!0),
          { scrollTop: p, onPageScroll: D } = l.useScroll(),
          v = o.getStorage("config"),
          h = o.getStorage("user"),
          m = e.ref(44),
          g = e.ref(),
          f = e.ref([]),
          C = e.ref(!1),
          T = e.ref(""),
          _ = e.ref(""),
          L = e.ref(),
          b = e.ref(0),
          P = e.ref(0),
          S = e.ref(!1),
          B = e.ref(!0),
          E = e.ref(!1),
          w = e.ref(!1),
          x = e.ref(!1),
          V = e.ref(!1),
          A = e.ref(!1),
          O = e.ref(!1),
          G = e.ref(!1),
          N = e.ref(""),
          j = e.ref("all"),
          k = e.ref([]),
          I = e.ref([]),
          $ = e.ref([]),
          F = e.ref([]),
          M = e.ref(!0),
          R = e.ref(!0),
          q = e.ref(""),
          Y = e.ref(!0);
        e.ref(!0);
        const U = e.ref(!1),
          H = e.ref(""),
          J = e.reactive({
            itineraryDays: 0,
            itineraryLatency: 0,
            itineraryPlanCode: "",
            planName: "",
          }),
          X = e.reactive({ picture: "", destination: "", destinationDesc: "" }),
          W = e.reactive({
            base: { activityPrice: 0, carPrice: 0, driverPrice: 0 },
            steward: { butlerPrice: 1 },
            hotelMap: {},
            estimatePrice: 0,
            estimatePriceFormat: "0",
            incalculablePrice: !1,
          });
        let z = e.ref({
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
        const K = e.ref({
            rsvDay: 0,
            dayCode: "",
            dayDetailDtos: [],
            destination: "",
            destinationDesc: "",
            durationByLast: 0,
            itineraryPlanCode: "",
            mileageByLast: 0,
            unitCode: "",
            picture: "",
            _hotel: "",
            _st_durationByLast: "",
            _st_mileageByLast: "",
            _rsvDayTitle: "",
            _date: { month: "", day: "", date: "" },
            disabled: !1,
          }),
          Q = e.reactive({
            visible: !1,
            type: r.AddOneDayDialogTypeType.ADD,
            title: "",
            activeTag: "",
            canTab: !1,
            currentDay: "overview",
          }),
          Z = e.reactive({
            selectedText: "",
            data: {
              adult: 0,
              olderChildren: 0,
              middleChildren: 0,
              youngerChildren: 0,
              oldNum: 0,
              hmkNum: 0,
              foreignerNum: 0,
              arrivedDate: "",
              placeStartCityName: "",
              placeEndCityName: "",
              placeStartCityCode: "",
              placeStartCityLat: 0,
              placeStartCityLng: 0,
              placeEndCityCode: "",
              placeEndCityLat: 0,
              placeEndCityLng: 0,
            },
            dateArr: [],
          }),
          ee = e.reactive({ visible: !1, data: [], adviceList: [] }),
          te = e.reactive({
            visible: !1,
            title: "",
            hotelCode: "",
            cityCode: "",
          }),
          ae = e.reactive({
            visible: !1,
            data: {},
            type: r.DetailType.DESTINATION,
            code: "",
          }),
          oe = e.reactive({
            productIntention: "",
            travelType: "",
            itineraryCode: "",
          });
        let le = null;
        const ie = {
            dayCode: "",
            detailCode: "",
            detailHotelCode: "",
            itineraryPlanCode: "",
            num: 1,
            rmtype: r.RoomTypesClassType.SCF,
            rmtypeDesc: r.RoomTypesClassDescType.SCF_DESC,
            code: r.RoomTypesClassType.SCF,
            descript: r.RoomTypesClassDescType.SCF_DESC,
            unitCode: v.hotelGroupCode,
            _checked: !0,
          },
          re = e.computed(
            () =>
              Q.visible ||
              G.value ||
              te.visible ||
              w.value ||
              ae.visible ||
              ee.visible ||
              x.value ||
              A.value,
          );
        e.onLoad(async (e) => {
          console.log("options", e);
          try {
            await lt();
          } catch (e) {}
          if (
            ((H.value = e.seriesName ? e.seriesName : ""),
            (C.value = e.isBossRecommend),
            e.destCodes)
          )
            (f.value = e.destCodes ? e.destCodes : ""), Ke();
          else if (
            e.fromType &&
            e.fromType === r.JourneyEditFromType.TRAVEL_DETAIL
          )
            (T.value = e.fromType),
              (oe.itineraryCode = e.itineraryCode),
              (oe.productIntention = e.productIntention),
              (oe.travelType = e.travelType),
              Qe(e.itineraryCode);
          else if (
            e.fromType &&
            e.fromType === r.JourneyEditFromType.PLAN_DETAIL
          ) {
            const t = e && e.itineraryPlanCode ? e.itineraryPlanCode : "";
            (T.value = e.fromType),
              (_.value = t),
              (J.itineraryPlanCode = t),
              Ze();
          }
        }),
          e.onShow(() => {
            Y.value = !0;
          }),
          e.onMounted(() => {
            e.index.getSystemInfo({
              success: (e) => {
                m.value = (e.statusBarHeight || 0) + m.value;
              },
              fail(e) {
                console.log(e);
              },
            });
          }),
          e.onHide(() => {
            Y.value && et();
          }),
          e.onBeforeUnmount(() => {
            Y.value && et();
          });
        const se = (e) => {
            y.value = !e;
          },
          ne = (t, a) => {
            if (
              (console.log(t),
              e.index.showLoading({ title: "加载中", mask: !0 }),
              "overview" === a)
            ) {
              for (let e = 0; e < t.length; e++) {
                if (e == t.length - 2) continue;
                const a = t[e];
                for (let e = a.dayDetailDtos.length - 1; e >= 0; e--)
                  "placeStart" === a.dayDetailDtos[e].resourceType &&
                    a.dayDetailDtos.splice(e, 1);
              }
              try {
                t.length &&
                  t[0].dayDetailDtos.unshift({
                    cityDto: {},
                    disabled: !0,
                    resourceType: "placeStart",
                    picture: "",
                    lat: 0,
                    lng: 0,
                    _st_durationByLast: "0",
                    _st_mileageByLast: "0",
                  });
              } catch (e) {}
            }
            e.nextTick$1(async () => {
              if ("overview" === a) {
                I.value = t;
                try {
                  await Ne();
                } catch (e) {}
                he(), nt(), je(I.value.length, I.value), e.index.hideLoading();
              } else
                "dayx" === a &&
                  ((z.value.dayDetailDtos = t), dt(), e.index.hideLoading());
            });
          },
          de = (e) => {
            (p.value = e.detail.scrollTop),
              (u.value = !0),
              clearTimeout(le),
              (le = setTimeout(() => {
                u.value = !1;
              }, 100));
          },
          ce = (e) => {
            console.log("e", e),
              e.hotel &&
                e.hotel.roomTypes &&
                e.hotel.roomTypes.length &&
                (e.hotel.roomTypes = e.hotel.roomTypes.filter(
                  (e) => 0 !== e.num,
                )),
              e.type === r.AddOneDayDialogTypeType.ADD
                ? ue(e)
                : e.type === r.AddOneDayDialogTypeType.EDIT && ye(e);
          },
          ue = async (t) => {
            var a;
            if ("" === t.activeTag || "1" === t.activeTag) {
              const o =
                null == (a = t.hotel.roomTypes.filter((e) => e._checked))
                  ? void 0
                  : a.map((e) => e);
              let l = { month: "", day: "", date: "" };
              if (I.value[I.value.length - 1]._date.date) {
                const t = e
                    .dayjs(I.value[I.value.length - 1]._date.date)
                    .add(1, "day")
                    .format("YYYY-M-D"),
                  a = t.split("-");
                (l.month = a[1] + "月"), (l.day = a[2]), (l.date = t);
              }
              try {
                await rt(t.hotel.code);
              } catch (e) {}
              I.value.splice(I.value.length - 1, 0, {
                destination:
                  t.destination && t.destination.destCode
                    ? t.destination.destCode
                    : "",
                destinationDesc:
                  t.destination && t.destination.destName
                    ? t.destination.destName
                    : "",
                picture:
                  t.destination && t.destination.picUrl
                    ? t.destination.picUrl
                    : "",
                placeOfDeparture:
                  I.value.length > 1 &&
                  I.value[I.value.length - 2] &&
                  I.value[I.value.length - 2].destination
                    ? I.value[I.value.length - 2].destination
                    : "",
                placeOfDepartureDesc:
                  I.value.length > 1 &&
                  I.value[I.value.length - 2] &&
                  I.value[I.value.length - 2].destinationDesc
                    ? I.value[I.value.length - 2].destinationDesc
                    : "",
                rsvDay: -1,
                dayCode: "",
                durationByLast: 0,
                itineraryPlanCode: "",
                mileageByLast: 0,
                unitCode: "",
                dayDetailDtos: [
                  ...t.activity.map((e) => Ae(e)),
                  {
                    hotelDto: {
                      hotelDesc: t.hotel.descript,
                      hotelCode: t.hotel.code,
                      roomDtos: o,
                      hotelPicUrl: t.hotel.photo,
                      _roomTypes: "",
                    },
                    descript: t.hotel.remark,
                    picture: t.hotel.photo,
                    lat: t.hotel.hotelLatitude,
                    lng: t.hotel.hotelLongitude,
                    resourceType: "hotel",
                    _st_durationByLast: "0",
                    _st_mileageByLast: "0",
                    disabled: !0,
                  },
                ],
                _date: l,
                _hotel: "",
                _st_durationByLast: "0",
                _st_mileageByLast: "0",
                _rsvDayTitle: "",
                disabled: !1,
              });
              try {
                await Ne();
              } catch (e) {}
              he(), Xe(), je(I.value.length, I.value), be(), tt();
            }
          },
          ye = (e) => {
            console.log("添加安排/编辑酒店or活动", e),
              e.hotel
                ? ot(e.hotel.code).then(async (t) => {
                    const { placeList: a } = t.retVal.retVal;
                    let o = {};
                    const l = z.value.dayDetailDtos.find(
                      (e) => "hotel" === e.resourceType,
                    );
                    let i = !0;
                    try {
                      await rt(e.hotel.code);
                    } catch (e) {}
                    if (
                      (a.length && (o = a[0]),
                      (i = !(
                        l &&
                        l.hotelDto &&
                        l.hotelDto.hotelCode === e.hotel.code
                      )),
                      e.activity.length)
                    ) {
                      const t = e.activity.map((e) => Ae(e));
                      z.value.dayDetailDtos = [...t, xe(e.hotel)];
                    } else z.value.dayDetailDtos = [xe(e.hotel)];
                    if (1 === z.value.rsvDay)
                      z.value.dayDetailDtos.unshift({
                        cityDto: o,
                        disabled: !0,
                        resourceType: "placeStart",
                        picture: "",
                        lat: 0,
                        lng: 0,
                        _st_durationByLast: "0",
                        _st_mileageByLast: "0",
                      }),
                        Ee(
                          I.value[z.value.rsvDay - 1],
                          z.value.rsvDay - 1,
                          I.value,
                        );
                    else if (z.value.rsvDay === I.value.length - 1) {
                      for (
                        let e =
                          I.value[I.value.length - 1].dayDetailDtos.length - 1;
                        e >= 0;
                        e--
                      )
                        if (
                          "placeEnd" ===
                          I.value[I.value.length - 1].dayDetailDtos[e]
                            .resourceType
                        ) {
                          i
                            ? (I.value[I.value.length - 1].dayDetailDtos = [
                                {
                                  cityDto: o,
                                  disabled: !0,
                                  resourceType: "placeEnd",
                                  picture: "",
                                  lat: 0,
                                  lng: 0,
                                  _st_durationByLast: "0",
                                  _st_mileageByLast: "0",
                                },
                              ])
                            : (I.value[
                                I.value.length - 1
                              ].dayDetailDtos.shift(),
                              I.value[I.value.length - 1].dayDetailDtos.unshift(
                                {
                                  cityDto: o,
                                  disabled: !0,
                                  resourceType: "placeEnd",
                                  picture: "",
                                  lat: 0,
                                  lng: 0,
                                  _st_durationByLast: "0",
                                  _st_mileageByLast: "0",
                                },
                              ));
                          break;
                        }
                      Ee(
                        I.value[z.value.rsvDay - 1],
                        z.value.rsvDay - 1,
                        I.value,
                      ),
                        Ee(
                          I.value[I.value.length - 1],
                          I.value.length - 1,
                          I.value,
                        );
                    } else
                      Ee(
                        I.value[z.value.rsvDay - 1],
                        z.value.rsvDay - 1,
                        I.value,
                      );
                    try {
                      await Ge();
                    } catch (e) {}
                    dt(), console.log(z.value), be(), tt();
                  })
                : (Ve(e), be()),
              e.destination &&
                ((z.value.destination = e.destination.destCode),
                (z.value.destinationDesc = e.destination.destName),
                (z.value.picture = e.destination.picUrl),
                he(),
                tt(),
                je(I.value.length, I.value));
          },
          pe = async () => {
            const e = q.value;
            if (1 === K.value.rsvDay) {
              I.value.splice(0, 1);
              const e = I.value[0];
              (e.placeOfDeparture = ""),
                (e.placeOfDepartureDesc = ""),
                (e.disabled = !1);
              const t = e.dayDetailDtos.find((e) => "hotel" === e.resourceType);
              if (t && t.hotelDto)
                try {
                  const a = await ot(t.hotelDto.hotelCode),
                    { placeList: o } = a.retVal.retVal;
                  let l = {};
                  o.length && (l = o[0]),
                    e.dayDetailDtos.unshift({
                      cityDto: l,
                      disabled: !0,
                      resourceType: "placeStart",
                      picture: "",
                      lat: 0,
                      lng: 0,
                      _st_durationByLast: "0",
                      _st_mileageByLast: "0",
                    });
                } catch (e) {
                  console.error(e);
                }
            } else if (K.value.rsvDay === I.value.length) {
              const e = s.deepClone(I.value[I.value.length - 2]);
              I.value.splice(I.value.length - 2, 1);
              const t = I.value[I.value.length - 1];
              e.dayDetailDtos.length &&
                (t.dayDetailDtos = t.dayDetailDtos.concat(
                  e.dayDetailDtos.filter((e) => "activity" === e.resourceType),
                ));
              const a = I.value[I.value.length - 2].dayDetailDtos.find(
                (e) => "hotel" === e.resourceType,
              );
              if (a && a.hotelDto)
                try {
                  const e = await ot(a.hotelDto.hotelCode),
                    { placeList: o } = e.retVal.retVal;
                  let l = {};
                  o.length && (l = o[0]),
                    t.dayDetailDtos.shift(),
                    t.dayDetailDtos.unshift({
                      cityDto: l,
                      disabled: !0,
                      resourceType: "placeEnd",
                      picture: "",
                      lat: 0,
                      lng: 0,
                      _st_durationByLast: "0",
                      _st_mileageByLast: "0",
                    });
                } catch (e) {
                  console.error(e);
                }
              console.log("lastData", t);
            } else I.value.splice(K.value.rsvDay - 1, 1);
            Je(),
              e != q.value && Xe(),
              he(),
              be(),
              je(I.value.length, I.value),
              console.log("resetDestList", I.value),
              tt();
          },
          De = async () => {
            for (let e = 0; e < ee.adviceList.length; e++) {
              const t = ee.adviceList[e];
              if (t.isAdvice) {
                try {
                  await rt(t.hotelCode);
                } catch (e) {
                  console.error(e);
                }
                I.value.splice(e, 0, {
                  destination: t.destCode,
                  destinationDesc: t.destName,
                  picture: t.picUrl,
                  placeOfDeparture: I.value[e - 1].placeOfDeparture,
                  placeOfDepartureDesc: I.value[e - 1].placeOfDepartureDesc,
                  rsvDay: -1,
                  dayCode: "",
                  durationByLast: 0,
                  itineraryPlanCode: "",
                  mileageByLast: 0,
                  unitCode: "",
                  dayDetailDtos: [
                    {
                      hotelDto: {
                        hotelDesc: t.descript,
                        hotelCode: t.hotelCode,
                        roomDtos: [
                          {
                            rmclass: r.RoomTypesClassType.SCF,
                            rmclassDescript: r.RoomTypesClassDescType.SCF_DESC,
                            num: 1,
                            rmtype: r.RoomTypesClassType.SCF,
                            rmtypeDesc: r.RoomTypesClassDescType.SCF_DESC,
                            detailHotelCode: "",
                            _checked: !0,
                          },
                        ],
                        hotelPicUrl: t.logo,
                        dayCode: "",
                        detailCode: "",
                        itineraryPlanCode: "",
                        unitCode: "",
                        _roomTypes: r.RoomTypesClassDescType.SCF_DESC + " x1",
                      },
                      picture: t.logo,
                      lat: t.hotelLatitude,
                      lng: t.hotelLongitude,
                      resourceType: "hotel",
                      _st_durationByLast: "0",
                      _st_mileageByLast: "0",
                      disabled: !0,
                    },
                  ],
                  _date: { month: "", day: "", date: "" },
                  _hotel: "",
                  _st_durationByLast: "0",
                  _st_mileageByLast: "0",
                  _rsvDayTitle: "",
                  disabled: !1,
                });
              }
            }
            console.log("daysList", s.deepClone(I.value)),
              he(),
              (W.incalculablePrice = !1),
              be(),
              je(I.value.length, I.value),
              t.adaptor.sendEvent("click_diy_trip_control", {
                is_recommend: "接受",
              });
          },
          ve = () => {
            (R.value = !1),
              (ee.visible = !1),
              (W.incalculablePrice = !0),
              t.adaptor.sendEvent("click_diy_trip_control", {
                is_recommend: "未接受",
              });
          },
          he = async (e = !0) => {
            var t, a, o;
            const l = I.value;
            for (let e = 0; e < l.length; e++) {
              const i = l[e];
              try {
                if (
                  ((i.rsvDay = e + 1),
                  0 === e &&
                    ((X.picture = i.picture),
                    (X.destination = i.destination),
                    (X.destinationDesc = i.destinationDesc)),
                  1 == i.rsvDay)
                )
                  try {
                    const e = i.dayDetailDtos.find(
                        (e) => "hotel" === e.resourceType,
                      ),
                      a = i.dayDetailDtos.find(
                        (e) => "placeStart" === e.resourceType,
                      ),
                      o = await ot(
                        (null == (t = null == e ? void 0 : e.hotelDto)
                          ? void 0
                          : t.hotelCode) || "",
                      );
                    console.log("res1res1res1res1", o);
                    const { placeList: l } = o.retVal.retVal;
                    let r = {};
                    l.length && (r = l[0]),
                      a &&
                        a.cityDto &&
                        ((a.cityDto.cityCode =
                          (null == r ? void 0 : r.cityCode) || ""),
                        (a.cityDto.cityName =
                          (null == r ? void 0 : r.cityName) || ""));
                  } catch (e) {}
                if (i.rsvDay == l.length - 1)
                  try {
                    const e = i.dayDetailDtos.find(
                        (e) => "hotel" === e.resourceType,
                      ),
                      t = l[l.length - 1].dayDetailDtos.find(
                        (e) => "placeEnd" === e.resourceType,
                      ),
                      o = await ot(
                        (null == (a = null == e ? void 0 : e.hotelDto)
                          ? void 0
                          : a.hotelCode) || "",
                      );
                    console.log("res2res2res2res2", o);
                    const { placeList: r } = o.retVal.retVal;
                    let s = {};
                    r.length && (s = r[0]),
                      t &&
                        t.cityDto &&
                        ((t.cityDto.cityCode =
                          (null == s ? void 0 : s.cityCode) || ""),
                        (t.cityDto.cityName =
                          (null == s ? void 0 : s.cityName) || ""));
                  } catch (e) {}
                e > 0 &&
                  ((i.placeOfDeparture = l[e - 1].destination),
                  (i.placeOfDepartureDesc = l[e - 1].destinationDesc)),
                  (i._date = { month: "", day: "", date: "" }),
                  Z.data.arrivedDate && Se(i, e),
                  Ee(i, e, l),
                  0 === e
                    ? (i._rsvDayTitle = "抵达地>" + i.destinationDesc)
                    : e === l.length - 1
                      ? (i._rsvDayTitle = i.placeOfDepartureDesc + ">离开地")
                      : i.placeOfDepartureDesc &&
                          i.destinationDesc &&
                          i.placeOfDepartureDesc != i.destinationDesc
                        ? (i._rsvDayTitle = `${i.placeOfDepartureDesc}>${i.destinationDesc}`)
                        : i.placeOfDepartureDesc &&
                          i.destinationDesc &&
                          i.placeOfDepartureDesc == i.destinationDesc &&
                          (i._rsvDayTitle = i.placeOfDepartureDesc);
                for (let t = 0; t < i.dayDetailDtos.length; t++) {
                  const a = i.dayDetailDtos[t];
                  if (
                    ((a.disabled =
                      "hotel" == a.resourceType ||
                      "placeStart" == a.resourceType ||
                      "placeEnd" == a.resourceType),
                    "hotel" === a.resourceType &&
                      (a.hotelDto._roomTypes = we(
                        null == (o = a.hotelDto) ? void 0 : o.roomDtos,
                      )),
                    "activity" === a.resourceType &&
                      (a.activityDto._st_activityDuration = (
                        a.activityDto.activityDuration / 3600
                      ).toFixed(1)),
                    console.log("reset formatMileageAndDuration 前", e),
                    "placeStart" != a.resourceType &&
                      "placeEnd" != a.resourceType &&
                      t !== i.dayDetailDtos.length - 1)
                  )
                    try {
                      Oe(a, i.dayDetailDtos[t + 1]);
                    } catch (e) {
                      console.error(e);
                    }
                }
              } catch (e) {
                console.error(e);
              }
            }
            Be(l, Boolean(Z.data.arrivedDate)),
              (I.value = l),
              e && nt(),
              console.log("resetDestList", I.value);
          },
          me = (e) => {
            console.log(e), (K.value = e);
            let t = "";
            (t =
              e._date && e._date.month && e._date.day
                ? `确认删除 ${e._date.month}${e._date.day}日 吗？`
                : `确认删除 DAY ${e.rsvDay} 吗？`),
              (N.value = t),
              (G.value = !0);
          },
          ge = (e) => {
            console.log(e.index),
              z.value.dayDetailDtos.splice(e.index, 1),
              dt(),
              be();
          },
          fe = () => {
            S.value &&
            I.value.some((e) =>
              e.dayDetailDtos.some((e) => "activity" === e.resourceType),
            )
              ? (O.value = !0)
              : ((S.value = !S.value), be());
          },
          Ce = (e) => {
            (j.value = "" + e.value.id),
              0 !== e.index
                ? ((z.value = I.value[e.index - 1]),
                  dt(),
                  (Q.currentDay = "" + z.value.rsvDay),
                  console.log(z))
                : (nt(), (Q.currentDay = "overview"));
          },
          Te = () => {
            I.value.forEach((e) => {
              for (let t = e.dayDetailDtos.length - 1; t >= 0; t--)
                "activity" === e.dayDetailDtos[t].resourceType &&
                  e.dayDetailDtos.splice(t, 1);
            }),
              (S.value = !1),
              dt(),
              nt(),
              be();
          },
          _e = (e) => ({
            adult: e.adult,
            olderChildren: e.olderChildren,
            middleChildren: e.middleChildren,
            youngerChildren: e.youngerChildren,
            oldNum: e.oldNum,
            hmkNum: e.hmkNum,
            foreignerNum: e.foreignerNum,
            arrivedDate: e.arrivedDate ? e.arrivedDate : null,
            placeStartCityName: e.placeStartCityName,
            placeStartCityCode: e.placeStartCityCode,
            placeStartCityLat: e.placeStartCityLat ? e.placeStartCityLat : 0,
            placeStartCityLng: e.placeStartCityLng ? e.placeStartCityLng : 0,
            placeEndCityName: e.placeEndCityName,
            placeEndCityCode: e.placeEndCityCode,
            placeEndCityLat: e.placeEndCityLat ? e.placeEndCityLat : 0,
            placeEndCityLng: e.placeEndCityLng ? e.placeEndCityLng : 0,
          }),
          Le = (t) => {
            console.log(t),
              (t.arrivedDate = e.dayjs(t.arrivedDate).format("YYYY-M-D"));
            let a = "";
            const o = t.arrivedDate.split("-");
            0 !== t.adult && (a = t.adult + "成人"),
              (0 === t.olderChildren &&
                0 === t.middleChildren &&
                0 === t.youngerChildren) ||
                (a +=
                  t.olderChildren +
                  t.middleChildren +
                  t.youngerChildren +
                  "儿童"),
              (a += ` · ${o[1]}月${o[2]}日抵达`),
              (Z.selectedText = a),
              (Z.data = t),
              (Z.dateArr = o),
              (w.value = !1),
              st().then((e) => {
                console.log("价格2", e), be(), Pe();
              });
          },
          be = () => {
            if ("" !== Z.selectedText) {
              const e = 1 * (I.value.length - 1) * W.steward.butlerPrice,
                t = 1 * I.value.length * W.base.carPrice,
                a = 1 * I.value.length * W.base.driverPrice;
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
                        (W && W.hotelMap && W.hotelMap[e.hotelDto.hotelCode]
                          ? W.hotelMap[e.hotelDto.hotelCode]
                          : 0) * t);
                  }
                });
              }),
                console.log("活动数量", o),
                (o = W.base.activityPrice * o),
                console.log("活动价格", o),
                console.log("酒店价格", l),
                console.log("酒店价格map", null == W ? void 0 : W.hotelMap);
              let i = 0;
              return (
                (i = S.value
                  ? Math.round(e + t + a + l + o)
                  : Math.round(t + a + l)),
                (W.estimatePrice = i),
                (W.estimatePriceFormat = s.formatPrice(i)),
                W.estimatePriceFormat
              );
            }
            return "";
          },
          Pe = () => {
            let e = [];
            I.value.forEach((t, a) => {
              Se(t, a),
                e.push({
                  id: "" + (a + 1),
                  name: `${t._date.month}${t._date.day}日`,
                });
            }),
              (k.value = e),
              k.value.unshift({ id: "all", name: "概览" }),
              nt(),
              console.log("formatDayXDate", I.value);
          },
          Se = (t, a) => {
            if (0 === a)
              (t._date.month = Z.dateArr[1] + "月"),
                (t._date.day = Z.dateArr[2]),
                (t._date.date = Z.data.arrivedDate);
            else {
              const o = e
                  .dayjs(I.value[a - 1]._date.date)
                  .add(1, "day")
                  .format("YYYY-M-D"),
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
          Be = (e, t = !1) => {
            (k.value = e.map((e, a) =>
              t
                ? { id: "" + (a + 1), name: `${e._date.month}${e._date.day}日` }
                : { id: "" + e.rsvDay, name: "DAY " + e.rsvDay },
            )),
              k.value.unshift({ id: "all", name: "概览" }),
              console.log("tab", k.value);
          },
          Ee = (e, t, a) => {
            var o, l, i, r, s;
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
                    null == (i = null == t ? void 0 : t.cityDto)
                      ? void 0
                      : i.cityName
                  } - ${e._hotel}`)
                : (e._hotel = "" + e._hotel);
            } else if (t === a.length - 1) {
              const t = e.dayDetailDtos.find(
                (e) => "placeEnd" === e.resourceType,
              );
              (
                null == (r = null == t ? void 0 : t.cityDto)
                  ? void 0
                  : r.cityName
              )
                ? (e._hotel =
                    (null == (s = null == t ? void 0 : t.cityDto)
                      ? void 0
                      : s.cityName) + "离开")
                : (e._hotel = "");
            }
          },
          we = (e, t = "rmtypeDesc", a = "num") =>
            e && e.length
              ? e
                  .filter((e) => e._checked)
                  .map((e) => `${e[t]} x${e[a]}`)
                  .join(",")
              : "",
          xe = (e) => ({
            hotelDto: {
              hotelCode: e.code,
              hotelDesc: e.descript,
              hotelPicUrl: e.photo,
              roomDtos: e.roomTypes.filter((e) => e._checked),
              _roomTypes: we(e.roomTypes),
            },
            descript: e.remark,
            picture: e.photo,
            resourceType: "hotel",
            lat: e.hotelLatitude,
            lng: e.hotelLongitude,
            _st_durationByLast: "0",
            _st_mileageByLast: "0",
            disabled: !0,
          }),
          Ve = async (t, a = !0) => {
            var o, l, i;
            let s = t.activity.map((e) => Ae(e)),
              n = [],
              d = [],
              c = [],
              u = [];
            for (let e = z.value.dayDetailDtos.length - 1; e >= 0; e--)
              "placeStart" ===
                (null == (o = z.value.dayDetailDtos[e])
                  ? void 0
                  : o.resourceType) && (n = z.value.dayDetailDtos.splice(e, 1)),
                "placeEnd" ===
                  (null == (l = z.value.dayDetailDtos[e])
                    ? void 0
                    : l.resourceType) &&
                  (d = z.value.dayDetailDtos.splice(e, 1)),
                "hotel" ===
                  (null == (i = z.value.dayDetailDtos[e])
                    ? void 0
                    : i.resourceType) &&
                  (c = z.value.dayDetailDtos.splice(e, 1));
            t.type === r.AddOneDayDialogTypeType.ADD
              ? (u = z.value.dayDetailDtos.concat(s))
              : t.type === r.AddOneDayDialogTypeType.EDIT && (u = s),
              (z.value.dayDetailDtos = Ie(u)),
              console.log("resHotelArr", c),
              n.length && z.value.dayDetailDtos.unshift(n[0]),
              d.length && z.value.dayDetailDtos.unshift(d[0]),
              c.length && z.value.dayDetailDtos.push(c[0]);
            try {
              await Ge();
            } catch (e) {}
            console.log("dayXData.value.dayDetailDtos", z.value.dayDetailDtos),
              a &&
                e.nextTick$1(() => {
                  dt();
                });
          },
          Ae = (e) => ({
            activityDto: {
              activityCode: e.activityCode,
              activityDesc: e.name,
              activityDuration: e.activityDuration ? e.activityDuration : 0,
              activityPicUrl: e.indexPicture,
              recommend: e.recommend,
              introduce: e.introduce,
              _st_activityDuration: (e.activityDuration / 3600).toFixed(1),
            },
            descript: e.introduce,
            picture: e.indexPicture,
            lat: e.latitude,
            lng: e.longitude,
            resourceType: "activity",
            _st_durationByLast: "0",
            _st_mileageByLast: "0",
            disabled: !1,
          }),
          Oe = (e, t) =>
            new Promise(async (a, o) => {
              let l = { rows: [] };
              if (e.lat && e.lng && t.lat && t.lng)
                try {
                  (l = await s.calculateDistanceByQQmap({
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
          Ge = () =>
            new Promise(async (e, t) => {
              for (let e = 0; e < z.value.dayDetailDtos.length; e++) {
                const a = z.value.dayDetailDtos[e];
                if (
                  "placeStart" != a.resourceType &&
                  "placeEnd" != a.resourceType &&
                  e !== z.value.dayDetailDtos.length - 1
                )
                  try {
                    await Oe(a, z.value.dayDetailDtos[e + 1]);
                  } catch (e) {
                    console.error(e), t(e);
                  }
              }
              e(1);
            }),
          Ne = () =>
            new Promise(async (e, t) => {
              const a = I.value[I.value.length - 2].dayDetailDtos.find(
                (e) => "hotel" === e.resourceType,
              );
              if (a && a.hotelDto)
                try {
                  const t = await ot(a.hotelDto.hotelCode),
                    { placeList: o } = t.retVal.retVal;
                  let l = {};
                  o.length && (l = o[0]),
                    I.value[I.value.length - 1].dayDetailDtos.shift(),
                    I.value[I.value.length - 1].dayDetailDtos.unshift({
                      cityDto: l,
                      disabled: !0,
                      resourceType: "placeEnd",
                      picture: "",
                      lat: 0,
                      lng: 0,
                      _st_durationByLast: "0",
                      _st_mileageByLast: "0",
                    }),
                    e(1);
                } catch (e) {
                  console.error(e), t(e);
                }
              else t(2);
            }),
          je = (e, t) => {
            const a = e - 1,
              o = t
                .map((e) => e.destinationDesc)
                .filter((e) => e && "" !== e.trim()),
              l = `${ke(o).join("-")} ${a}晚${e}天 行程计划`;
            return (J.planName = l), l;
          },
          ke = (e) => {
            if (!e || 0 === e.length) return e;
            const t = [];
            let a = null;
            for (const o of e) o !== a && t.push(o), (a = o);
            return t;
          },
          Ie = (e) => {
            const t = [],
              a = new Set();
            for (const o of e)
              if ("activity" === o.resourceType && o.activityDto) {
                const { activityCode: e } = o.activityDto;
                a.has(e) || (a.add(e), t.push(o));
              } else t.push(o);
            return t;
          },
          $e = () => {
            w.value = !0;
          },
          Fe = () => {
            (Q.type = r.AddOneDayDialogTypeType.ADD),
              (Q.visible = !0),
              (Q.activeTag = "1"),
              (Q.title = "DAY " + (1 * I.value[I.value.length - 1].rsvDay + 1));
          },
          Me = () => {
            (Q.type = r.AddOneDayDialogTypeType.EDIT),
              (Q.visible = !0),
              (Q.activeTag = "3"),
              (Q.title = "DAY " + z.value.rsvDay);
          };
        D((e) => {
          p.value = e.scrollTop;
        });
        const Re = () => {
            x.value = !0;
          },
          qe = (e) => {
            switch ((console.log(e), e.resourceType)) {
              case "hotel":
                (ae.visible = !0),
                  (ae.code =
                    e && e.hotelDto && e.hotelDto.hotelCode
                      ? e.hotelDto.hotelCode
                      : ""),
                  (ae.type = r.DetailType.HOTEL);
                break;
              case "activity":
                (ae.visible = !0),
                  (ae.code =
                    e && e.activityDto && e.activityDto.activityCode
                      ? e.activityDto.activityCode
                      : ""),
                  (ae.type = r.DetailType.ACTIVITY);
            }
          },
          Ye = (e) => {
            console.log(e), console.log(z.value);
            const t = { placeStart: "修改抵达地", placeEnd: "修改离开地" };
            if (
              "placeStart" == e.resourceType ||
              "placeEnd" == e.resourceType
            ) {
              (te.visible = !0),
                (te.title = t[e.resourceType]),
                (te.cityCode =
                  e && e.cityDto && e.cityDto.cityCode
                    ? e.cityDto.cityCode
                    : "");
              let a = null;
              return (
                "placeStart" === e.resourceType
                  ? (a = z.value.dayDetailDtos.find(
                      (e) => "hotel" === e.resourceType,
                    ))
                  : "placeEnd" === e.resourceType &&
                    (a = I.value[z.value.rsvDay - 2].dayDetailDtos.find(
                      (e) => "hotel" === e.resourceType,
                    )),
                void (te.hotelCode =
                  a && a.hotelDto && a.hotelDto.hotelCode
                    ? a.hotelDto.hotelCode
                    : "")
              );
            }
            "hotel" == e.resourceType
              ? (Q.activeTag = "2")
              : "activity" == e.resourceType && (Q.activeTag = "3"),
              (Q.type = r.AddOneDayDialogTypeType.EDIT),
              (Q.visible = !0),
              (Q.title = "DAY " + z.value.rsvDay),
              z.value.dayDetailDtos.forEach((e) => {
                e.resourceType, e.resourceType;
              }),
              1 != z.value.rsvDay &&
                I.value[z.value.rsvDay - 2].dayDetailDtos.forEach((e) => {
                  e.resourceType;
                });
          },
          Ue = (e) => {
            console.log(e),
              z.value.dayDetailDtos.forEach((t) => {
                ("placeStart" !== t.resourceType &&
                  "placeEnd" !== t.resourceType) ||
                  (t.cityDto = e);
              }),
              Ee(I.value[z.value.rsvDay - 1], z.value.rsvDay - 1, I.value),
              dt(),
              nt();
          },
          He = () => {
            (R.value = !0), tt();
          },
          Je = () => {
            if (I.value.length >= 2) {
              const e = I.value[I.value.length - 2].dayDetailDtos.find(
                (e) => "hotel" === e.resourceType,
              );
              q.value = e ? e.hotelDto.hotelCode : "";
            }
          },
          Xe = () => {
            const e = I.value[I.value.length - 1];
            for (let t = e.dayDetailDtos.length - 1; t >= 0; t--)
              "activity" === e.dayDetailDtos[t].resourceType &&
                e.dayDetailDtos.splice(t, 1);
          },
          We = () => {
            B.value = !1;
          },
          ze = () => {
            new Promise((e, t) => {
              for (let e = 0; e < I.value.length; e++) {
                const a = I.value[e];
                for (let e = 0; e < a.dayDetailDtos.length; e++) {
                  const o = a.dayDetailDtos[e];
                  if (
                    "hotel" === o.resourceType &&
                    (!o.hotelDto.roomDtos || 0 === o.hotelDto.roomDtos.length)
                  ) {
                    t();
                    break;
                  }
                }
              }
              e();
            })
              .then(() => {
                at();
              })
              .catch(() => {
                i.jAlert3("请选择酒店房型");
              });
          },
          Ke = () => {
            e.index.showLoading({ title: "加载中" }),
              a.api
                .interfaceTransfer({
                  query: { destCodes: f.value, unitCode: v.hotelGroupCode },
                  config: {
                    interfaceType: "GET",
                    interfaceModule: "GC_TRAVEL_ASSISTANT",
                    interfaceMethod: "/api/itinerary/plan/getByDestList",
                    interfaceFrom: "GC",
                    hotelGroupCode: v.hotelGroupCode,
                  },
                })
                .then(async (a) => {
                  var o;
                  console.log("getByDestList", a);
                  const l = a.retVal.retVal.dayDtos;
                  for (let e = 0; e < l.length; e++) {
                    const t = l[e];
                    try {
                      0 === e &&
                        ((X.picture = t.picture),
                        (X.destination = t.destination),
                        (X.destinationDesc = t.destinationDesc)),
                        (t._date = { month: "", day: "", date: "" }),
                        Ee(t, e, l),
                        0 === e
                          ? ((t._rsvDayTitle = "抵达地>" + t.destinationDesc),
                            (t.disabled = !1))
                          : e === l.length - 1
                            ? ((t._rsvDayTitle =
                                t.placeOfDepartureDesc + ">离开地"),
                              (t.disabled = !0))
                            : ((t.disabled = !1),
                              t.placeOfDepartureDesc &&
                              t.destinationDesc &&
                              t.placeOfDepartureDesc != t.destinationDesc
                                ? (t._rsvDayTitle = `${t.placeOfDepartureDesc}>${t.destinationDesc}`)
                                : t.placeOfDepartureDesc &&
                                  t.destinationDesc &&
                                  t.placeOfDepartureDesc == t.destinationDesc &&
                                  (t._rsvDayTitle = t.placeOfDepartureDesc));
                      for (let e = 0; e < t.dayDetailDtos.length; e++) {
                        const a = t.dayDetailDtos[e];
                        if (
                          ("placeStart" != a.resourceType &&
                            "placeEnd" != a.resourceType &&
                            e !== t.dayDetailDtos.length - 1 &&
                            (await Oe(a, t.dayDetailDtos[e + 1])),
                          (a.disabled =
                            "hotel" == a.resourceType ||
                            "placeStart" == a.resourceType ||
                            "placeEnd" == a.resourceType),
                          "hotel" == a.resourceType)
                        ) {
                          a.hotelDto &&
                            ((a.hotelDto.roomDtos &&
                              0 !== a.hotelDto.roomDtos.length) ||
                              ((a.hotelDto.roomDtos = [s.deepClone(ie)]),
                              (a.hotelDto._roomTypes =
                                null == (o = a.hotelDto)
                                  ? void 0
                                  : o.roomDtos
                                      .map((e) => `${e.rmtypeDesc} x${e.num}`)
                                      .join(","))));
                          try {
                            await rt(a.hotelDto.hotelCode);
                          } catch (e) {
                            console.error("get酒店价格失败", e);
                          }
                        }
                      }
                    } catch (e) {
                      console.error(e);
                    }
                  }
                  e.index.hideLoading();
                  try {
                    (I.value = l),
                      nt(!1),
                      console.log(I.value),
                      (J.itineraryDays = a.retVal.retVal.itineraryDays),
                      (J.itineraryLatency = a.retVal.retVal.itineraryLatency),
                      (J.planName = a.retVal.retVal.planName),
                      Je();
                  } catch (e) {
                    console.error(e);
                  }
                  Be(l),
                    et().then(() => {
                      t.adaptor.updatePageProperties({
                        itinerary_plan_id: J.itineraryPlanCode,
                        source_type: "diy",
                      });
                    });
                })
                .catch((t) => {
                  e.index.hideLoading();
                });
          },
          Qe = (o) => {
            e.index.showLoading({ title: "加载中" }),
              a.api
                .interfaceTransfer({
                  config: {
                    interfaceType: "GET",
                    interfaceModule: "GC_TRAVEL_ASSISTANT",
                    interfaceMethod:
                      "/api/itinerary/plan/getByProductItinerary",
                    interfaceFrom: "GC",
                    hotelGroupCode: v.hotelGroupCode,
                  },
                  query: { unitCode: v.hotelGroupCode, itineraryCode: o },
                })
                .then(async (a) => {
                  var o;
                  console.log("getDestListByProductCode", a);
                  const l = a.retVal.retVal.dayDtos;
                  for (let e = 0; e < l.length; e++) {
                    const t = l[e];
                    try {
                      0 === e &&
                        ((X.picture = t.picture),
                        (X.destination = t.destination),
                        (X.destinationDesc = t.destinationDesc)),
                        (t._date = { month: "", day: "", date: "" }),
                        Ee(t, e, l),
                        0 === e
                          ? ((t._rsvDayTitle = "抵达地>" + t.destinationDesc),
                            (t.disabled = !1))
                          : e === l.length - 1
                            ? ((t._rsvDayTitle =
                                t.placeOfDepartureDesc + ">离开地"),
                              (t.disabled = !0))
                            : ((t.disabled = !1),
                              t.placeOfDepartureDesc &&
                              t.destinationDesc &&
                              t.placeOfDepartureDesc != t.destinationDesc
                                ? (t._rsvDayTitle = `${t.placeOfDepartureDesc}>${t.destinationDesc}`)
                                : t.placeOfDepartureDesc &&
                                  t.destinationDesc &&
                                  t.placeOfDepartureDesc == t.destinationDesc &&
                                  (t._rsvDayTitle = t.placeOfDepartureDesc));
                      for (let e = 0; e < t.dayDetailDtos.length; e++) {
                        const a = t.dayDetailDtos[e];
                        if (
                          ("placeStart" != a.resourceType &&
                            "placeEnd" != a.resourceType &&
                            e !== t.dayDetailDtos.length - 1 &&
                            (await Oe(a, t.dayDetailDtos[e + 1])),
                          (a.disabled =
                            "hotel" == a.resourceType ||
                            "placeStart" == a.resourceType ||
                            "placeEnd" == a.resourceType),
                          "hotel" == a.resourceType)
                        ) {
                          a.hotelDto &&
                            ((a.hotelDto.roomDtos &&
                              0 !== a.hotelDto.roomDtos.length) ||
                              ((a.hotelDto.roomDtos = [s.deepClone(ie)]),
                              (a.hotelDto._roomTypes =
                                null == (o = a.hotelDto)
                                  ? void 0
                                  : o.roomDtos
                                      .map((e) => `${e.rmtypeDesc} x${e.num}`)
                                      .join(","))));
                          try {
                            await rt(a.hotelDto.hotelCode);
                          } catch (e) {
                            console.error("get酒店价格失败", e);
                          }
                        }
                        if ("activity" == a.resourceType) {
                          try {
                            a.descript = a.descript.replace(
                              /<\/?[^>]+(>|$)/g,
                              "",
                            );
                          } catch (e) {}
                          a.activityDto._st_activityDuration = (
                            a.activityDto.activityDuration / 3600
                          ).toFixed(2);
                        }
                      }
                    } catch (e) {
                      console.error(e);
                    }
                  }
                  e.index.hideLoading(),
                    (I.value = l),
                    nt(!1),
                    console.log(I.value),
                    (J.itineraryDays = a.retVal.retVal.itineraryDays),
                    (J.itineraryLatency = a.retVal.retVal.itineraryLatency),
                    (J.planName = a.retVal.retVal.planName),
                    (S.value = a.retVal.retVal.needButler),
                    Be(l),
                    Je(),
                    tt(),
                    et().then(() => {
                      t.adaptor.updatePageProperties({
                        itinerary_plan_id: J.itineraryPlanCode,
                        source_type: "product_recommend",
                      });
                    });
                })
                .catch((t) => {
                  e.index.hideLoading();
                });
          },
          Ze = () => {
            e.index.showLoading({ title: "加载中" }),
              a.api
                .interfaceTransfer({
                  config: {
                    interfaceType: "GET",
                    interfaceModule: "GC_TRAVEL_ASSISTANT",
                    interfaceMethod: "/api/itinerary/plan/info",
                    interfaceFrom: "GC",
                    hotelGroupCode: v.hotelGroupCode,
                  },
                  query: {
                    unitCode: v.hotelGroupCode,
                    itineraryPlanCode: _.value,
                  },
                })
                .then(async (a) => {
                  var o;
                  console.log("getDestListByPlanDetail", a);
                  const { retVal: l } = a.retVal,
                    i = l.dayDtos;
                  for (let e = 0; e < i.length; e++) {
                    const t = i[e];
                    try {
                      0 === e &&
                        ((X.picture = t.picture),
                        (X.destination = t.destination),
                        (X.destinationDesc = t.destinationDesc)),
                        (t._date = { month: "", day: "", date: "" }),
                        Ee(t, e, i),
                        0 === e
                          ? ((t._rsvDayTitle = "抵达地>" + t.destinationDesc),
                            (t.disabled = !1))
                          : e === i.length - 1
                            ? ((t._rsvDayTitle =
                                t.placeOfDepartureDesc + ">离开地"),
                              (t.disabled = !0))
                            : ((t.disabled = !1),
                              t.placeOfDepartureDesc &&
                              t.destinationDesc &&
                              t.placeOfDepartureDesc != t.destinationDesc
                                ? (t._rsvDayTitle = `${t.placeOfDepartureDesc}>${t.destinationDesc}`)
                                : t.placeOfDepartureDesc &&
                                  t.destinationDesc &&
                                  t.placeOfDepartureDesc == t.destinationDesc &&
                                  (t._rsvDayTitle = t.placeOfDepartureDesc));
                      for (let e = 0; e < t.dayDetailDtos.length; e++) {
                        const a = t.dayDetailDtos[e];
                        if (
                          ((a.disabled =
                            "hotel" == a.resourceType ||
                            "placeStart" == a.resourceType ||
                            "placeEnd" == a.resourceType),
                          a.durationByLast
                            ? (a._st_durationByLast = (
                                a.durationByLast / 3600
                              ).toFixed(1))
                            : (a._st_durationByLast = "0"),
                          a.mileageByLast
                            ? (a._st_mileageByLast = (
                                a.mileageByLast / 1e3
                              ).toFixed(1))
                            : (a._st_mileageByLast = "0"),
                          "hotel" == a.resourceType)
                        ) {
                          a.hotelDto &&
                            a.hotelDto.roomDtos &&
                            a.hotelDto.roomDtos.length &&
                            a.hotelDto.roomDtos.forEach((e) => {
                              (e.code = e.rmtype),
                                (e.descript = e.rmtypeDesc),
                                (e._checked = !0);
                            }),
                            (a.hotelDto._roomTypes =
                              null == (o = a.hotelDto)
                                ? void 0
                                : o.roomDtos
                                    .map((e) => `${e.rmtypeDesc} x${e.num}`)
                                    .join(","));
                          try {
                            await rt(a.hotelDto.hotelCode);
                          } catch (e) {
                            console.error("get酒店价格失败", e);
                          }
                        }
                        if ("activity" == a.resourceType) {
                          try {
                            a.descript = a.descript.replace(
                              /<\/?[^>]+(>|$)/g,
                              "",
                            );
                          } catch (e) {}
                          a.activityDto._st_activityDuration = (
                            a.activityDto.activityDuration / 3600
                          ).toFixed(1);
                        }
                      }
                    } catch (e) {
                      console.error(e);
                    }
                  }
                  e.index.hideLoading();
                  try {
                    (I.value = i),
                      nt(!1),
                      console.log(I.value),
                      (J.itineraryDays = l.itineraryDays),
                      (J.itineraryLatency = l.itineraryLatency),
                      (J.planName = l.planName),
                      (S.value = l.needButler),
                      (E.value = "adviser" === l.modifyType),
                      l.arrivedDate ? Le(_e(l)) : (Z.data = _e(l));
                  } catch (e) {
                    console.error(e);
                  }
                  Be(i),
                    Je(),
                    et().then(() => {
                      C.value &&
                        t.adaptor.updatePageProperties({
                          itinerary_plan_id: J.itineraryPlanCode,
                          source_type: "veteran_recommend",
                        });
                    });
                })
                .catch((t) => {
                  e.index.hideLoading();
                });
          },
          et = () =>
            new Promise((e, t) => {
              let o =
                  Z.data.adult +
                  Z.data.olderChildren +
                  Z.data.middleChildren +
                  Z.data.youngerChildren,
                l = {
                  unitCode: v.hotelGroupCode,
                  memberId: h.memberId,
                  dayDtos: I.value,
                  ...Z.data,
                  ...J,
                  needButler: S.value,
                  travelPeople: o,
                  itineraryPlanCode: J.itineraryPlanCode || null,
                  estimatedPrice: W.estimatePrice,
                };
              T.value === r.JourneyEditFromType.TRAVEL_DETAIL &&
                ((l.itineraryCode = oe.itineraryCode),
                (l.productIntention = oe.productIntention),
                (l.travelType = oe.travelType)),
                console.log(
                  "destListObj.itineraryPlanCode",
                  J.itineraryPlanCode,
                ),
                a.api
                  .interfaceTransfer({
                    config: {
                      interfaceType: "POST",
                      interfaceModule: "GC_TRAVEL_ASSISTANT",
                      interfaceMethod: "/api/itinerary/plan/draftSave",
                      interfaceFrom: "GC",
                      hotelGroupCode: v.hotelGroupCode,
                    },
                    query: l,
                  })
                  .then((a) => {
                    console.log("保存草稿", a),
                      0 === a.retVal.result
                        ? ((J.itineraryPlanCode = a.retVal.retVal), e(a))
                        : (i.jAlert3(a.retVal.msg), t());
                  })
                  .catch((e) => {
                    t(e);
                  });
            }),
          tt = () => {
            const t = I.value.map((e) => {
              const t = e.dayDetailDtos.find((e) => "hotel" === e.resourceType);
              return {
                hotelCode:
                  t && t.hotelDto && t.hotelDto.hotelCode
                    ? t.hotelDto.hotelCode
                    : "",
                destCode: e.destination,
              };
            });
            t.pop(),
              console.log("handleViaCheck list", t),
              a.api
                .interfaceTransfer({
                  config: {
                    interfaceType: "POST",
                    interfaceModule: "GC_TRAVEL_ASSISTANT",
                    interfaceMethod: "/api/itinerary/plan/viaCheck",
                    interfaceFrom: "GC",
                    hotelGroupCode: v.hotelGroupCode,
                  },
                  query: { unitCode: v.hotelGroupCode, list: t },
                })
                .then((t) => {
                  console.log("规则命中", t);
                  const {
                    isMatchNewPath: a,
                    isMatchRecommendPath: o,
                    adviceList: l,
                  } = t.retVal.retVal;
                  (M.value = R.value && !o),
                    M.value && a
                      ? ((ee.visible = !0),
                        (ee.adviceList = l),
                        (ee.data = ((e) => {
                          const t = [],
                            a = new Set();
                          for (const o of e)
                            o.destCode
                              ? a.has(o.destCode) ||
                                (a.add(o.destCode), t.push(o))
                              : t.push(o);
                          return t;
                        })(l.filter((e) => e.isAdvice))))
                      : o ||
                        a ||
                        e.index.showToast({
                          title: "暂无匹配行程推荐",
                          icon: "none",
                        }),
                    (R.value = o),
                    o && ((W.incalculablePrice = !1), be());
                })
                .catch((e) => {});
          },
          at = () => {
            e.index.showLoading({ title: "加载中" });
            let t =
                Z.data.adult +
                Z.data.olderChildren +
                Z.data.middleChildren +
                Z.data.youngerChildren,
              o = {
                unitCode: v.hotelGroupCode,
                memberId: h.memberId,
                dayDtos: I.value,
                ...Z.data,
                ...J,
                needButler: S.value,
                travelPeople: t,
                itineraryPlanCode: J.itineraryPlanCode || null,
                estimatedPrice: W.estimatePrice,
              };
            T.value === r.JourneyEditFromType.TRAVEL_DETAIL &&
              ((o.itineraryCode = oe.itineraryCode),
              (o.productIntention = oe.productIntention),
              (o.travelType = oe.travelType)),
              (Y.value = !1),
              a.api
                .interfaceTransfer({
                  config: {
                    interfaceType: "POST",
                    interfaceModule: "GC_TRAVEL_ASSISTANT",
                    interfaceMethod: "/api/itinerary/plan/commit",
                    interfaceFrom: "GC",
                    hotelGroupCode: v.hotelGroupCode,
                  },
                  query: o,
                })
                .then((t) => {
                  var a;
                  console.log("commit order", t),
                    e.index.hideLoading(),
                    0 === t.retVal.result
                      ? (d.qdTracker.track("edit_travel", {
                          line: H.value,
                          destination: (
                            (null == (a = I.value)
                              ? void 0
                              : a.map((e) => e.destinationDesc)) || []
                          ).join(","),
                          need_butler: S.value,
                          travel_date: Z.data.arrivedDate,
                          adult_num: Z.data.adult,
                          children_num:
                            Z.data.olderChildren +
                            Z.data.middleChildren +
                            Z.data.youngerChildren,
                        }),
                        e.index.navigateTo({
                          url: `/pagesTravelAssistant/plan/detail?itineraryPlanCode=${J.itineraryPlanCode}&memberId=${h.memberId}`,
                        }))
                      : i.jAlert3(t.retVal.msg);
                })
                .catch((t) => {
                  e.index.hideLoading();
                });
          },
          ot = (t) =>
            new Promise((o, l) => {
              e.index.showLoading({ title: "加载中" }),
                a.api
                  .interfaceTransfer({
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_INFOMATION_CENTER",
                      interfaceMethod: "/api/hotel/hotelInfoWithPlace",
                      interfaceFrom: "GC",
                      hotelGroupCode: v.hotelGroupCode,
                    },
                    query: { unitCode: v.hotelGroupCode, hotelCode: t },
                  })
                  .then((t) => {
                    e.index.hideLoading(), console.log("抵离地列表", t), o(t);
                  })
                  .catch((t) => {
                    e.index.hideLoading(), l(t);
                  });
            }),
          lt = () =>
            new Promise((t, a) => {
              it()
                .then((a) => {
                  e.index.hideLoading(),
                    console.log("价格", a),
                    (W.base = a.retVal.retVal),
                    t(a);
                })
                .catch((e) => {
                  a(e);
                });
            }),
          it = () =>
            new Promise((e, t) => {
              a.api
                .interfaceTransfer({
                  config: {
                    interfaceType: "GET",
                    interfaceModule: "GC_PRODUCT_CBD",
                    interfaceMethod: "/api/price/base",
                    interfaceFrom: "GC",
                    hotelGroupCode: v.hotelGroupCode,
                  },
                  query: { unitCode: v.hotelGroupCode },
                })
                .then((t) => {
                  e(t);
                })
                .catch((e) => {
                  t(e);
                });
            }),
          rt = (e) =>
            new Promise((t, o) => {
              a.api
                .interfaceTransfer({
                  config: {
                    interfaceType: "GET",
                    interfaceModule: "GC_PRODUCT_ROOM",
                    interfaceMethod: "/api/price/hotel",
                    interfaceFrom: "GC",
                    hotelGroupCode: v.hotelGroupCode,
                  },
                  query: { unitCode: v.hotelGroupCode, hotelCode: e },
                })
                .then((a) => {
                  console.log("酒店价格", a);
                  const { hotelPrice: o } = a.retVal.retVal;
                  W.hotelMap[e] || (W.hotelMap[e] = o), t(a);
                })
                .catch((e) => {
                  o(e);
                });
            }),
          st = () => {
            const {
                adult: e,
                olderChildren: t,
                middleChildren: o,
                youngerChildren: l,
              } = Z.data,
              r = e + t + o + l;
            return new Promise((e, t) => {
              a.api
                .interfaceTransfer({
                  config: {
                    interfaceType: "GET",
                    interfaceModule: "GC_PRODUCT_CBD",
                    interfaceMethod: "/api/price/butler",
                    interfaceFrom: "GC",
                    hotelGroupCode: v.hotelGroupCode,
                  },
                  query: { unitCode: v.hotelGroupCode, count: r },
                })
                .then((a) => {
                  console.log("管家价格", a),
                    0 === a.retVal.result
                      ? ((W.steward.butlerPrice = a.retVal.retVal.butlerPrice),
                        e(a))
                      : (i.jAlert3(a.retVal.msg), t(a));
                })
                .catch((e) => {
                  t(e);
                });
            });
          },
          nt = (t = !0) => {
            t
              ? e.nextTick$1(() => {
                  $.value.splice(0, $.value.length, ...s.deepClone(I.value)),
                    b.value++;
                })
              : ($.value.splice(0, $.value.length, ...s.deepClone(I.value)),
                b.value++);
          },
          dt = () => {
            e.nextTick$1(() => {
              F.value.splice(
                0,
                F.value.length,
                ...s.deepClone(z.value.dayDetailDtos),
              ),
                P.value++;
            });
          },
          ct = () => {
            A.value = !0;
          },
          ut = () => {
            e.index.navigateTo({
              url:
                "/pagesTravelAssistant/journey/map?data=" +
                encodeURIComponent(JSON.stringify(I.value)),
            });
          },
          yt = (e) => {
            0 == e && (y.value = !0);
          };
        return (
          e.watch(re, (e) => {
            (U.value = e), (y.value = !e);
          }),
          (a, o) =>
            e.e(
              {
                a: e.o(e.unref(s.goBack)),
                b: e.p({ bgColor: "rgba(255, 255, 255, 0.8)" }),
                c: !U.value,
                d: e.o(
                  (e) => (
                    g.value.showDialog(),
                    (y.value = !1),
                    void t.adaptor.sendEvent("click_travel_assistant_control", {
                      button_name: "联系客服",
                    })
                  ),
                ),
                e: !U.value,
                f: e.p({
                  fixed: !0,
                  useImmersiveStyle: !0,
                  customStyle: {
                    backgroundColor:
                      e.unref(p) > 40 && !U.value
                        ? "#fff"
                        : U.value
                          ? "#3D3D3D"
                          : "",
                  },
                }),
                g: e.unref(n.imageView2)({
                  url: X.picture,
                  mode: 1,
                  width: 750,
                  height: 564,
                }),
                h: e.t(J.planName),
                i: e.o(ut),
                j: e.p({ "model-value": S.value }),
                k: e.o(fe),
                l: e.o(Re),
                m: "" === Z.selectedText,
              },
              "" === Z.selectedText ? {} : { n: e.t(Z.selectedText) },
              {
                o: e.o($e),
                p: e.o(Ce),
                q: e.o((e) => (j.value = e)),
                r: e.p({
                  data: k.value,
                  canCancel: !1,
                  fkDefaultFontSize: 14,
                  modelValue: j.value,
                }),
                s: m.value + "px",
                t: B.value,
              },
              B.value
                ? {
                    v: e.o(We),
                    w: e.p({
                      type: "warning",
                      tips: "长按卡片标题移动，左滑卡片删除",
                    }),
                  }
                : {},
              {
                x: e.o(se),
                y: e.o((e) => ne(e, "overview")),
                z: e.o(me),
                A: e.p({
                  itemHeight: 90,
                  list: $.value,
                  wrapScrolling: u.value,
                }),
                B: $.value.length < 20,
              },
              $.value.length < 20 ? { C: e.o(Fe) } : {},
              {
                D: "all" == j.value,
                E: e.t(e.unref(z)._rsvDayTitle),
                F: e.sr(L, "1f5db7ec-8", { k: "hookDayXDragSort" }),
                G: e.o(se),
                H: e.o((e) => ne(e, "dayx")),
                I: e.o(ge),
                J: e.o(Ye),
                K: e.o(qe),
                L: e.p({
                  itemHeight: 122,
                  dayXData: e.unref(z),
                  daysList: I.value,
                  list: F.value,
                  wrapScrolling: u.value,
                }),
                M: S.value,
              },
              S.value ? { N: e.o(Me), O: e.p({ text: "添加安排" }) } : {},
              { P: "all" != j.value, Q: W.incalculablePrice },
              W.incalculablePrice
                ? { R: e.o((e) => (V.value = !0)), S: e.o(He) }
                : e.e(
                    { T: e.o(ct), U: E.value },
                    E.value || 0 == W.estimatePrice
                      ? {}
                      : { W: e.t(W.estimatePriceFormat) },
                    { V: 0 == W.estimatePrice },
                  ),
              { X: E.value },
              E.value
                ? {
                    Y: e.o(ze),
                    Z: e.p({
                      theme: "black",
                      customStyle: {
                        minWidth: "144px",
                        height: "48px",
                        color: "#fff",
                        borderRadius: "4px",
                      },
                      block: !0,
                    }),
                  }
                : e.e(
                    { aa: "" === Z.selectedText || "" === J.itineraryPlanCode },
                    "" === Z.selectedText || "" === J.itineraryPlanCode
                      ? {
                          ab: e.p({
                            customStyle: {
                              minWidth: "144px",
                              height: "48px",
                              color: "#ccc",
                              backgroundColor: "#eee",
                              borderRadius: "4px",
                            },
                            disabled: !0,
                            block: !0,
                          }),
                        }
                      : {
                          ac: e.o(ze),
                          ad: e.p({
                            theme: "black",
                            customStyle: {
                              minWidth: "144px",
                              height: "48px",
                              color: "#fff",
                              borderRadius: "4px",
                            },
                            block: !0,
                          }),
                        },
                  ),
              {
                ae: e.p({
                  theme: "white",
                  "custom-style": { backgroundColor: "#fff", zIndex: 10 },
                }),
                af: e.o(ce),
                ag: e.o((e) => (Q.visible = e)),
                ah: e.p({
                  type: Q.type,
                  title: Q.title,
                  activeTag: Q.activeTag,
                  canTab: Q.canTab,
                  needSteward: S.value,
                  daysList: I.value,
                  currentDay: Q.currentDay,
                  modelValue: Q.visible,
                }),
                ai: e.o(pe),
                aj: e.o((e) => (G.value = e)),
                ak: e.p({ title: N.value, modelValue: G.value }),
                al: e.o(Ue),
                am: e.o((e) => (te.visible = e)),
                an: e.p({
                  title: te.title,
                  hotelCode: te.hotelCode,
                  cityCode: te.cityCode,
                  modelValue: te.visible,
                }),
                ao: e.o(Le),
                ap: e.o((e) => (w.value = e)),
                aq: e.p({ data: Z.data, modelValue: w.value }),
                ar: e.o(De),
                as: e.o(ve),
                at: e.o((e) => (ee.visible = e)),
                av: e.p({ data: ee.data, modelValue: ee.visible }),
                aw: e.o((e) => (x.value = e)),
                ax: e.p({ modelValue: x.value }),
                ay: e.o((e) => (ae.visible = e)),
                az: e.p({
                  data: ae.data,
                  type: ae.type,
                  code: ae.code,
                  modelValue: ae.visible,
                }),
                aA: e.o((e) => (V.value = e)),
                aB: e.p({ modelValue: V.value }),
                aC: e.o((e) => (A.value = e)),
                aD: e.p({ modelValue: A.value }),
                aE: e.o(Te),
                aF: e.o((e) => (O.value = e)),
                aG: e.p({ modelValue: O.value }),
                aH: e.sr(g, "1f5db7ec-24", { k: "kf" }),
                aI: e.o(yt),
                aJ: e.p({ title: "联系客服" }),
                aK: y.value,
                aL: e.o(de),
              },
            )
        );
      },
    });
  A.__runtimeHooks = 1;
  const O = e._export_sfc(A, [["__scopeId", "data-v-1f5db7ec"]]);
  wx.createPage(O);
})();
