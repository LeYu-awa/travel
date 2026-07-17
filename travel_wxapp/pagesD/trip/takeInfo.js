!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    a = require("../../utils/wxuser.js"),
    r = require("../../base/jAlert/jAlert.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || u();
  const u = () => "../../components/coustomHead.js",
    l = e.defineComponent({
      __name: "takeInfo",
      setup(u) {
        let l = a.getStorage("config"),
          i = a.getStorage("user"),
          o = e.dayjs().format("YYYY-MM-DD"),
          s = e.ref(""),
          f = e.ref(""),
          n = e.ref([]),
          c = e.ref([]),
          h = e.ref({}),
          v = e.ref([]),
          p = e.ref([]),
          T = e.ref([]),
          d = e.ref(!0),
          y = e.ref(""),
          m = e.ref(!1),
          g = [
            { value: "T", name: "需要接送" },
            { value: "F", name: "无需接送" },
          ],
          N = e.ref([]),
          S = e.computed(() => {
            let e = [];
            return (
              T.value.forEach((t, a) => {
                e.push({ isShuttleIndex: 0, isShuttleDesc: "" }),
                  g.forEach((r, u) => {
                    r.value == t.isShuttle &&
                      ((e[a].isShuttleDesc = r.name),
                      (e[a].isShuttleIndex = u));
                  });
              }),
              e
            );
          }),
          C = e.computed(() => {
            let e = 0;
            return (
              T.value.forEach((t, a) => {
                "S" == t.shuttleType && e++;
              }),
              e
            );
          }),
          b = e.computed(() => {
            let e = 0;
            return (
              T.value.forEach((t, a) => {
                "J" == t.shuttleType && e++;
              }),
              e
            );
          }),
          G = e.computed(() => {
            let e = 0,
              t = !0;
            return (
              T.value.forEach((t, a) => {
                "J" == t.shuttleType &&
                  t.arrivalGuests.forEach((t) => {
                    t.active && e++;
                  });
              }),
              n.value.forEach((t) => {
                t.activeNotCan && e++;
              }),
              e == n.value.length && (t = !1),
              t
            );
          }),
          E = e.computed(() => {
            let e = 0,
              t = !0;
            return (
              T.value.forEach((t, a) => {
                "S" == t.shuttleType &&
                  t.returnGuests.forEach((t) => {
                    t.active && e++;
                  });
              }),
              c.value.forEach((t) => {
                t.activeNotCan && e++;
              }),
              e == c.value.length && (t = !1),
              t
            );
          });
        const D = (e) => {
            var t = 0;
            return (
              T.value.forEach((a, r) => {
                r <= e && "J" == a.shuttleType && t++;
              }),
              t
            );
          },
          J = (e) => {
            var t = 0;
            return (
              T.value.forEach((a, r) => {
                r <= e && "S" == a.shuttleType && t++;
              }),
              t
            );
          },
          j = (t) => {
            e.index.setClipboardData({
              data: t,
              success: function () {
                r.jAlert3("复制成功");
              },
            });
          },
          A = (e, t) => {
            if (!e.activeNotCan) {
              var a = e.active;
              for (let r = 0; r < T.value.length; r++) {
                let u = T.value[r];
                "S" == t &&
                  "S" == u.shuttleType &&
                  u.returnGuests.forEach((t) => {
                    t.guestNo == e.guestNo && (t.activeNotCan = !a);
                  }),
                  "J" == t &&
                    "J" == u.shuttleType &&
                    u.arrivalGuests.forEach((t) => {
                      t.guestNo == e.guestNo && (t.activeNotCan = !a);
                    });
              }
              (e.activeNotCan = !1),
                e.active ? (e.active = !1) : (e.active = !0);
            }
          },
          M = (e, t) => {
            "J" == t
              ? T.value[e].arrivalGuests.forEach((e) => {
                  e.active && A(e, t);
                })
              : T.value[e].returnGuests.forEach((e) => {
                  e.active && A(e, t);
                }),
              T.value.splice(e, 1);
          },
          O = (t) => {
            e.index.makePhoneCall({ phoneNumber: t });
          },
          x = (e) => {
            if ("S" == e) {
              var t = !1;
              if (
                (c.value.forEach((e) => {
                  e.active || e.activeNotCan || (t = !0);
                }),
                !t)
              )
                return void r.jAlert3("已选择所有出行人信息");
              var a = JSON.parse(JSON.stringify(c.value));
              a.forEach((e) => {
                e.active && ((e.active = !1), (e.activeNotCan = !0));
              }),
                T.value.push({
                  beginDate: "",
                  cityName: "",
                  guestNos: [],
                  guestName: "",
                  isShuttle: "",
                  mobile: "",
                  orderNo: s.value,
                  remark: "",
                  shuttleType: e,
                  startTime: "",
                  station: "",
                  teamNo: "",
                  trafficType: "",
                  trips: "",
                  unitCode: l.hotelGroupCode,
                  returnGuests: a,
                });
            } else {
              if (
                ((t = !1),
                n.value.forEach((e) => {
                  e.active || e.activeNotCan || (t = !0);
                }),
                !t)
              )
                return void r.jAlert3("已选择所有出行人信息");
              var u = JSON.parse(JSON.stringify(n.value));
              u.forEach((e) => {
                e.active && ((e.active = !1), (e.activeNotCan = !0));
              }),
                T.value.splice(b.value, 0, {
                  beginDate: "",
                  cityName: "",
                  guestNos: [],
                  guestName: "",
                  isShuttle: "",
                  mobile: "",
                  orderNo: s.value,
                  remark: "",
                  shuttleType: e,
                  startTime: "",
                  station: "",
                  teamNo: "",
                  trafficType: "",
                  trips: "",
                  unitCode: l.hotelGroupCode,
                  arrivalGuests: u,
                });
            }
          },
          V = () => {
            s.value &&
              t.api
                .interfaceTransfer({
                  query: { orderNo: s.value, unitCode: l.hotelGroupCode },
                  config: {
                    interfaceType: "GET",
                    interfaceModule: "GC_TRAVEL_ORDER",
                    interfaceMethod: "/api/shuttle/listByOrderNo",
                    interfaceFrom: "GC",
                    hotelGroupCode: l.hotelGroupCode,
                  },
                })
                .then((t) => {
                  if (1 == t.result && 0 == t.retVal.result)
                    if (t.retVal.retVal.length <= 0)
                      n.value.forEach((e) => {
                        e.mobile == y.value && (e.active = !0);
                      }),
                        c.value.forEach((e) => {
                          e.mobile == y.value && (e.active = !0);
                        }),
                        (T.value = [
                          {
                            beginDate: "",
                            cityName: "",
                            guestNos: [],
                            guestName: "",
                            isShuttle: "",
                            mobile: "",
                            orderNo: s.value,
                            remark: "",
                            shuttleType: "J",
                            startTime: "",
                            station: "",
                            teamNo: "",
                            trafficType: "",
                            trips: "",
                            unitCode: l.hotelGroupCode,
                            arrivalGuests: n.value,
                          },
                          {
                            beginDate: "",
                            cityName: "",
                            guestNos: [],
                            guestName: "",
                            isShuttle: "",
                            mobile: "",
                            orderNo: s.value,
                            remark: "",
                            shuttleType: "S",
                            startTime: "",
                            station: "",
                            teamNo: "",
                            trafficType: "",
                            trips: "",
                            unitCode: l.hotelGroupCode,
                            returnGuests: c.value,
                          },
                        ]),
                        (d.value = !1);
                    else {
                      (T.value = []), (v.value = []), (p.value = []);
                      let a = 0,
                        r = 0;
                      t.retVal.retVal.forEach((t) => {
                        (t.trafficTypeDesc = ((e) => {
                          let t = "";
                          return (
                            N.value.forEach((a) => {
                              a.code == e && (t = a.descript);
                            }),
                            t
                          );
                        })(t.trafficType)),
                          (t.beginDateF = e
                            .dayjs(t.beginDate)
                            .format("M月D日")),
                          "J" == t.shuttleType &&
                            (t.guests.forEach((e) => {
                              n.value.forEach((t) => {
                                e.guestNo == t.guestNo &&
                                  ((t.active = !1), (t.activeNotCan = !0), a++);
                              });
                            }),
                            v.value.push(t)),
                          "S" == t.shuttleType &&
                            (t.guests.forEach((e) => {
                              c.value.forEach((t) => {
                                e.guestNo == t.guestNo &&
                                  ((t.active = !1), (t.activeNotCan = !0), r++);
                              });
                            }),
                            p.value.push(t));
                      }),
                        a < n.value.length && (d.value = !1),
                        r < n.value.length && (d.value = !1);
                    }
                  else r.jAlert3(t.retVal.msg || t.msg);
                });
          };
        return (
          e.onLoad((e) => {
            e.memberNo && (f.value = e.memberNo),
              e.mobile ? (y.value = e.mobile) : (y.value = i.mobile),
              (s.value = e.orderNo),
              t.api
                .orderDetail({
                  memberNo: f.value || i.memberId,
                  hotelGroupCode: l.hotelGroupCode,
                  hotelCode: l.hotelCode,
                  travelOrderNo: s.value,
                  memberId: f.value || i.memberId,
                  mobile: y.value || i.mobile,
                })
                .then((e) => {
                  var a;
                  1 == e.result
                    ? ((h.value = e.retVal.reserveOrder),
                      (n.value = JSON.parse(JSON.stringify(e.retVal.guests))),
                      (c.value = JSON.parse(JSON.stringify(e.retVal.guests))),
                      (a = () => {
                        V();
                      }),
                      t.api
                        .interfaceTransfer({
                          query: {
                            type: "Transportation",
                            unitCode: l.hotelGroupCode,
                          },
                          config: {
                            interfaceType: "GET",
                            interfaceModule: "GC_INFOMATION_CENTER",
                            interfaceMethod: "api/codeBaseapi/listCodeBase",
                            interfaceFrom: "GC",
                            hotelGroupCode: l.hotelGroupCode,
                          },
                        })
                        .then((e) => {
                          1 == e.result &&
                            0 == e.retVal.result &&
                            ((N.value = e.retVal.retVal), a && a());
                        }))
                    : r.jAlert3(e.msg);
                });
          }),
          e.onMounted(() => {}),
          (a, u) =>
            e.e(
              {
                a: e.p({ title: "接送信息", nativeMode: !0 }),
                b: e.unref(v).length > 0,
              },
              (e.unref(v).length, {}),
              {
                c: e.f(e.unref(v), (t, a, r) =>
                  e.e(
                    { a: "F" != t.isShuttle },
                    "F" != t.isShuttle
                      ? e.e(
                          { b: e.unref(v).length > 1 },
                          e.unref(v).length > 1 ? { c: e.t(a + 1) } : {},
                          { d: t.carNo },
                          t.carNo
                            ? e.e(
                                { e: e.t(t.carNo), f: t.carModelDesc },
                                t.carModelDesc
                                  ? { g: e.t(t.carModelDesc) }
                                  : {},
                                {
                                  h: e.t(t.beginDateF),
                                  i: e.t(t.startTime),
                                  j: t.station,
                                },
                                t.station ? { k: e.t(t.station) } : {},
                              )
                            : {},
                          {
                            l: e.f(t.guests, (t, a, r) => ({
                              a: e.t(t.name),
                              b: a,
                            })),
                            m: e.t(t.trafficTypeDesc),
                            n: e.t(t.trips),
                            o: t.driver,
                          },
                          t.driver
                            ? {
                                p: e.t(t.driver),
                                q: e.t(t.driverPhone),
                                r: e.o((e) => j(t.driverPhone), a),
                                s: e.o((e) => O(t.driverPhone), a),
                              }
                            : {},
                        )
                      : e.e(
                          { t: e.unref(v).length > 1 },
                          e.unref(v).length > 1 ? { v: e.t(a + 1) } : {},
                          {
                            w: e.f(t.guests, (t, a, r) => ({
                              a: e.t(t.name),
                              b: a,
                            })),
                          },
                        ),
                    { x: a },
                  ),
                ),
                d: e.f(e.unref(p), (t, a, r) =>
                  e.e(
                    { a: "F" != t.isShuttle },
                    "F" != t.isShuttle
                      ? e.e(
                          { b: e.unref(p).length > 1 },
                          e.unref(p).length > 1 ? { c: e.t(a + 1) } : {},
                          { d: t.carNo },
                          t.carNo
                            ? e.e(
                                { e: e.t(t.carNo), f: t.carModelDesc },
                                t.carModelDesc
                                  ? { g: e.t(t.carModelDesc) }
                                  : {},
                                {
                                  h: e.t(t.beginDate),
                                  i: e.t(t.startTime),
                                  j: t.station,
                                },
                                t.station ? { k: e.t(t.station) } : {},
                              )
                            : {},
                          {
                            l: e.f(t.guests, (t, a, r) => ({
                              a: e.t(t.name),
                              b: a,
                            })),
                            m: e.t(t.trafficTypeDesc),
                            n: e.t(t.trips),
                            o: t.driver,
                          },
                          t.driver
                            ? {
                                p: e.t(t.driver),
                                q: e.t(t.driverPhone),
                                r: e.o((e) => j(t.driverPhone), a),
                                s: e.o((e) => O(t.driverPhone), a),
                              }
                            : {},
                        )
                      : e.e(
                          { t: e.unref(p).length > 1 },
                          e.unref(p).length > 1 ? { v: e.t(a + 1) } : {},
                          {
                            w: e.f(t.guests, (t, a, r) => ({
                              a: e.t(t.name),
                              b: a,
                            })),
                          },
                        ),
                    { x: a },
                  ),
                ),
                e: e.f(e.unref(T), (t, a, r) =>
                  e.e(
                    { a: "J" == t.shuttleType },
                    "J" == t.shuttleType
                      ? e.e(
                          { b: e.unref(b) > 1 },
                          e.unref(b) > 1 ? { c: e.t(D(a)) } : {},
                          { d: e.unref(b) > 1 },
                          e.unref(b) > 1 ? { e: e.o((e) => M(a, "J"), a) } : {},
                        )
                      : {},
                    { f: "S" == t.shuttleType },
                    "S" == t.shuttleType
                      ? e.e(
                          { g: e.unref(C) > 1 },
                          e.unref(C) > 1 ? { h: e.t(J(a)) } : {},
                          { i: e.unref(C) > 1 },
                          e.unref(C) > 1 ? { j: e.o((e) => M(a, "S"), a) } : {},
                        )
                      : {},
                    { k: "J" == t.shuttleType },
                    "J" == t.shuttleType
                      ? {
                          l: e.f(t.arrivalGuests, (t, a, r) => ({
                            a: e.t(t.name),
                            b: a,
                            c: t.active ? 1 : "",
                            d: t.activeNotCan ? 1 : "",
                            e: e.o((e) => A(t, "J"), a),
                          })),
                        }
                      : {},
                    { m: "S" == t.shuttleType },
                    "S" == t.shuttleType
                      ? {
                          n: e.f(t.returnGuests, (t, a, r) => ({
                            a: e.t(t.name),
                            b: a,
                            c: t.active ? 1 : "",
                            d: t.activeNotCan ? 1 : "",
                            e: e.o((e) => A(t, "S"), a),
                          })),
                        }
                      : {},
                    { o: "J" == t.shuttleType },
                    (t.shuttleType, {}),
                    { p: "S" == t.shuttleType },
                    (t.shuttleType, {}),
                    { q: t.isShuttle },
                    t.isShuttle
                      ? { r: e.t(e.unref(S)[a].isShuttleDesc) }
                      : e.e({ s: "J" == t.shuttleType }, (t.shuttleType, {})),
                    {
                      t: e.unref(S)[a].isShuttleIndex,
                      v: e.o(
                        (e) =>
                          ((e, t) => {
                            const a = e.detail.value,
                              r = g[a].value;
                            T.value[t].isShuttle = r;
                          })(e, a),
                        a,
                      ),
                      w: "F" != t.isShuttle,
                    },
                    "F" != t.isShuttle
                      ? e.e(
                          { x: "J" == t.shuttleType },
                          (t.shuttleType, {}),
                          { y: "S" == t.shuttleType },
                          (t.shuttleType, {}),
                          { z: t.trafficType },
                          t.trafficType
                            ? { A: e.t(t.trafficTypeDesc) }
                            : e.e(
                                { B: "J" == t.shuttleType },
                                (t.shuttleType, {}),
                                { C: "S" == t.shuttleType },
                                (t.shuttleType, {}),
                              ),
                          {
                            D: t.trafficType,
                            E: e.unref(N),
                            F: e.o(
                              (e) =>
                                ((e, t) => {
                                  (T.value[t].trafficType =
                                    N.value[e.detail.value].code),
                                    (T.value[t].trafficTypeDesc =
                                      N.value[e.detail.value].descript);
                                })(e, a),
                              a,
                            ),
                            G:
                              "aircraft" == t.trafficType ||
                              "train" == t.trafficType,
                          },
                          "aircraft" == t.trafficType ||
                            "train" == t.trafficType
                            ? e.e(
                                { H: "aircraft" == t.trafficType },
                                (t.trafficType, {}),
                                { I: "train" == t.trafficType },
                                (t.trafficType, {}),
                                { J: "aircraft" == t.trafficType },
                                "aircraft" == t.trafficType
                                  ? {
                                      K: t.trips,
                                      L: e.o(
                                        (e) => (t.trips = e.detail.value),
                                        a,
                                      ),
                                    }
                                  : {},
                                { M: "train" == t.trafficType },
                                "train" == t.trafficType
                                  ? {
                                      N: t.trips,
                                      O: e.o(
                                        (e) => (t.trips = e.detail.value),
                                        a,
                                      ),
                                    }
                                  : {},
                              )
                            : {},
                          { P: t.trafficType },
                          t.trafficType
                            ? e.e(
                                { Q: "J" == t.shuttleType },
                                (t.shuttleType, {}),
                                { R: "S" == t.shuttleType },
                                (t.shuttleType, {}),
                                { S: "other" == t.trafficType },
                                "other" == t.trafficType
                                  ? {
                                      T: t.station,
                                      U: e.o(
                                        (e) => (t.station = e.detail.value),
                                        a,
                                      ),
                                    }
                                  : {},
                                { V: "aircraft" == t.trafficType },
                                "aircraft" == t.trafficType
                                  ? {
                                      W: t.station,
                                      X: e.o(
                                        (e) => (t.station = e.detail.value),
                                        a,
                                      ),
                                    }
                                  : {},
                                { Y: "train" == t.trafficType },
                                "train" == t.trafficType
                                  ? {
                                      Z: t.station,
                                      aa: e.o(
                                        (e) => (t.station = e.detail.value),
                                        a,
                                      ),
                                    }
                                  : {},
                              )
                            : {},
                          { ab: "J" == t.shuttleType },
                          (t.shuttleType, {}),
                          { ac: "S" == t.shuttleType },
                          (t.shuttleType, {}),
                          { ad: t.beginDate },
                          t.beginDate
                            ? { ae: e.t(t.beginDate) }
                            : e.e(
                                { af: "J" == t.shuttleType },
                                (t.shuttleType, {}),
                                { ag: "S" == t.shuttleType },
                                (t.shuttleType, {}),
                              ),
                          {
                            ah: t.beginDate,
                            ai: e.unref(o),
                            aj: e.unref("2099-01-01"),
                            ak: e.o(
                              (e) =>
                                ((e, t) => {
                                  let a = e.detail.value;
                                  T.value[t].beginDate = a;
                                })(e, a),
                              a,
                            ),
                            al: t.trafficType,
                          },
                          t.trafficType
                            ? e.e(
                                { am: "J" == t.shuttleType },
                                (t.shuttleType, {}),
                                { an: "S" == t.shuttleType },
                                (t.shuttleType, {}),
                                { ao: t.startTime },
                                t.startTime
                                  ? { ap: e.t(t.startTime) }
                                  : e.e(
                                      { aq: "J" == t.shuttleType },
                                      (t.shuttleType, {}),
                                      { ar: "S" == t.shuttleType },
                                      (t.shuttleType, {}),
                                    ),
                                {
                                  as: t.startTime,
                                  at: e.o(
                                    (e) =>
                                      ((e, t) => {
                                        let a = e.detail.value;
                                        T.value[t].startTime = a;
                                      })(e, a),
                                    a,
                                  ),
                                },
                              )
                            : {},
                          {
                            av: t.mobile,
                            aw: e.o((e) => (t.mobile = e.detail.value), a),
                            ax: t.remark,
                            ay: e.o((e) => (t.remark = e.detail.value), a),
                          },
                        )
                      : {},
                    { az: a },
                  ),
                ),
                f: e.unref(g),
                g: e.unref(G),
              },
              e.unref(G) ? { h: e.o((e) => x("J")) } : {},
              { i: e.unref(E) },
              e.unref(E) ? { j: e.o((e) => x("S")) } : {},
              { k: !e.unref(d) },
              e.unref(d)
                ? {}
                : {
                    l: e.o((a) =>
                      (() => {
                        let a = 0;
                        for (let e = 0; e < T.value.length; e++) {
                          let t = T.value[e],
                            u = "抵达";
                          "S" == t.shuttleType && (u = "返程");
                          let l = !1;
                          if (
                            ((t.guestNos = []),
                            (t.hasGuest = !1),
                            "S" == t.shuttleType
                              ? t.returnGuests.forEach((e) => {
                                  e.active &&
                                    (t.guestNos.push(e.guestNo), (l = !0));
                                })
                              : t.arrivalGuests.forEach((e) => {
                                  e.active &&
                                    (t.guestNos.push(e.guestNo), (l = !0));
                                }),
                            l)
                          ) {
                            if (((t.hasGuest = !0), a++, !t.isShuttle))
                              return void r.jAlert3(`请选择${u}接站需求`);
                            if ("T" == t.isShuttle) {
                              if (!t.trips) {
                                if ("aircraft" == t.trafficType)
                                  return void r.jAlert3("请选择航班号");
                                if ("train" == t.trafficType)
                                  return void r.jAlert3("请选择列车号");
                              }
                              if (!t.station)
                                return void r.jAlert3(`请选择${u}站点`);
                              if (!t.beginDate)
                                return void r.jAlert3(`请选择${u}日期`);
                              if (!t.beginDate)
                                return void r.jAlert3(`请选择${u}日期`);
                              if (!t.startTime)
                                return void r.jAlert3(`请选择${u}时间`);
                              if (!t.mobile)
                                return void r.jAlert3(`请输入${u}联系电话`);
                            }
                          }
                        }
                        m.value ||
                          (T.value.length <= 0
                            ? r.jAlert3("请添加抵达接送或返程接送")
                            : 0 != a
                              ? ((m.value = !0),
                                e.index.showModal({
                                  title: "确认提交",
                                  content:
                                    "接送信息提交后，如需修改请联系顾问或管家。",
                                  cancelText: "返回",
                                  confirmText: "确认",
                                  confirmColor: "#000000",
                                  success: (u) => {
                                    if ((console.log(u), u.confirm)) {
                                      let u = 0;
                                      console.log(T.value),
                                        T.value.forEach((i) => {
                                          if ((console.log(i), i.hasGuest)) {
                                            var o = i;
                                            (o.unitCode = l.hotelGroupCode),
                                              (o.orderNo = s.value),
                                              (o.teamNo = h.value.teamNo),
                                              t.api
                                                .interfaceTransfer({
                                                  query: o,
                                                  config: {
                                                    interfaceType: "POST",
                                                    interfaceModule:
                                                      "GC_TRAVEL_ORDER",
                                                    interfaceMethod:
                                                      "/api/shuttle/save",
                                                    interfaceFrom: "GC",
                                                    hotelGroupCode:
                                                      l.hotelGroupCode,
                                                  },
                                                })
                                                .then((t) => {
                                                  1 == t.result &&
                                                    0 == t.retVal.result &&
                                                    (u++,
                                                    u == a &&
                                                      (r.jAlert3("提交成功"),
                                                      (m.value = !1),
                                                      V(),
                                                      e.index.navigateBack({
                                                        delta: 1,
                                                      })));
                                                });
                                          }
                                        });
                                    } else m.value = !1;
                                  },
                                }))
                              : r.jAlert3("请选择接送人"));
                      })(),
                    ),
                  },
            )
        );
      },
    }),
    i = e._export_sfc(l, [["__scopeId", "data-v-b4d0b4ea"]]);
  wx.createPage(i);
})();
