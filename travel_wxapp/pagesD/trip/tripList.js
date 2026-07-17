!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    a = require("../../utils/wxuser.js"),
    r = require("../../utils/utils.js"),
    o = require("../../utils/qdTracker.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (s + i + l + n)();
  const i = () => "../../components/switchBar.js",
    s = () => "../../components/coustomHead.js",
    n = () => "../../components/empty.js",
    l = () => "../components/myTrip.js",
    u = e.defineComponent({
      __name: "tripList",
      setup(i) {
        let s = a.getStorage("user"),
          n = a.getStorage("config"),
          l = e.ref(""),
          u = e.ref(!0);
        const d = e.ref([]),
          c = e.ref([]),
          p = e.ref(0);
        let m = e.ref(0),
          f = e.ref([
            { id: 1, name: "行程计划", value: 0, active: !0 },
            { id: 2, name: "我的行程", value: 1, active: !1 },
          ]),
          g = e.computed(() => {
            let e = c.value;
            return (
              e.forEach((e) => {
                "SingleRoom" == e.teamType &&
                  d.value.forEach((t) => {
                    e.teamRsvSrcs &&
                      e.teamRsvSrcs.length > 0 &&
                      e.teamRsvSrcs[0].hotelCode == t.code &&
                      (console.log(e),
                      (e.productDesc = t.descript),
                      e.reserveList.length > 0
                        ? (e.reserveList[0].productUrl = t.extraLogo)
                        : e.reserveList.push({ productUrl: t.extraLogo }));
                  });
              }),
              e
            );
          });
        const v = (e) => {
          o.qdTracker.track("travel_view", {
            current_module_name: 1 === e ? "我的行程" : "行程计划",
          }),
            (f.value[0].active = 0 == e),
            (f.value[1].active = 1 == e);
        };
        return (
          e.onLoad((e) => {
            e.teamNo && (l.value = e.teamNo),
              2 == e.type &&
                ((f.value[0].active = !1), (f.value[1].active = !0));
          }),
          e.onMounted(() => {
            var a;
            e.index.showLoading({ title: "加载中" }),
              t.api
                .interfaceTransfer({
                  query: {
                    curPage: 1,
                    firstResult: 0,
                    isAgency: "T",
                    mobile: s.mobile,
                    pageSize: 999,
                    unitCode: n.hotelGroupCode,
                  },
                  config: {
                    interfaceType: "POST",
                    interfaceModule: "GC_TRAVEL_ORDER",
                    interfaceMethod: "/api/team/order/myTravelList",
                    interfaceFrom: "GC",
                    hotelGroupCode: n.hotelGroupCode,
                  },
                })
                .then((t) => {
                  e.index.hideLoading(),
                    1 == t.result &&
                      0 == t.retVal.result &&
                      ((u.value = !1),
                      t.retVal.retVal.length > 0 &&
                        (t.retVal.retVal.forEach((t) => {
                          "Custom" == t.orderType &&
                            ((t.productCode = t.id),
                            (t.productDesc = t.teamName)),
                            "SingleRoom" == t.teamType
                              ? t.beginDate &&
                                (t.tripTime = `${e
                                  .dayjs(t.beginDate)
                                  .format("YYYY年M月D日")}-${e
                                  .dayjs(t.endDate)
                                  .format("M月D日")}`)
                              : t.beginDate &&
                                ((t.dayDiff = e
                                  .dayjs()
                                  .diff(t.beginDate, "day")),
                                (t.dayDiff = t.dayDiff),
                                t.dayDiff < 0
                                  ? (t.tripTime =
                                      e
                                        .dayjs(t.beginDate)
                                        .format("YYYY年M月D日") + "出发")
                                  : t.dayDiff >= 0 &&
                                    (t.tripTime = `${e
                                      .dayjs(t.beginDate)
                                      .format("YYYY年M月D日")}-${e
                                      .dayjs(t.endDate)
                                      .format("M月D日")}`));
                        }),
                        console.log(t.retVal.retVal),
                        (c.value = t.retVal.retVal)));
                }),
              (a = {
                fromDate: "",
                toDate: "",
                otaChannel: "WECHAT",
                hotelGroupCodes: n.hotelGroupCode,
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
                appid: n.appid,
                componentAppid: n.componentAppid,
                memberNo: "",
              }),
              t.api
                .findHotel(a)
                .then((e) => {
                  1 == e.result && (d.value = e.retVal.resultInfos);
                })
                .catch(function (e) {
                  console.log(e);
                }),
              e.index.getSystemInfo({
                success: (e) => {
                  (p.value = e.statusBarHeight || 0),
                    (m.value = p.value),
                    (m.value = p.value + 40);
                },
                fail(e) {
                  console.log(e);
                },
              });
          }),
          e.onReachBottom(() => {}),
          (t, a) =>
            e.e(
              {
                a: e.p({ title: "全部行程", nativeMode: !0 }),
                b: e.o(v),
                c: e.p({ switchList: e.unref(f), bold: 600, padding: 16 }),
                d: t.fixed ? 1 : "",
                e: e.unref(m) + "px",
                f: e.unref(f)[0].active,
                g: e.unref(f)[1].active,
              },
              e.unref(f)[1].active
                ? e.e(
                    { h: e.unref(g).length > 0 },
                    e.unref(g).length > 0
                      ? {
                          i: e.f(e.unref(g), (t, a, o) =>
                            e.e(
                              { a: t.reserveList && t.reserveList.length > 0 },
                              t.reserveList && t.reserveList.length > 0
                                ? { b: t.reserveList[0].productUrl }
                                : {},
                              {
                                c: e.t(t.tripTime),
                                d: e.t(t.itineraryName),
                                e: a,
                                f: e.o(
                                  (a) =>
                                    ((t) => {
                                      "SingleRoom" == t.teamType
                                        ? r.goPage(
                                            `/pagesD/trip/hotelInfo?teamNo=${
                                              t.teamNo
                                            }&hotelCode=${
                                              t.teamRsvSrcs[0].hotelCode
                                            }&arrDate=${e
                                              .dayjs(t.beginDate)
                                              .format("M月D日")}&depDate=${e
                                              .dayjs(t.endDate)
                                              .format("M月D日")}&rmtype=${
                                              t.teamRsvSrcs[0].rmtype
                                            }`,
                                          )
                                        : r.goPage(
                                            "/pagesD/trip/tripDetail?teamNo=" +
                                              t.teamNo,
                                          );
                                    })(t),
                                  a,
                                ),
                                g: t.teamNo == e.unref(l) ? 1 : "",
                              },
                            ),
                          ),
                        }
                      : {
                          j: e.p({
                            tips: "暂无行程",
                            subTips: "松赞，期待与您相遇。",
                          }),
                        },
                  )
                : {},
            )
        );
      },
    }),
    d = e._export_sfc(u, [["__scopeId", "data-v-910aa7b7"]]);
  wx.createPage(d);
})();
