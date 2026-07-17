!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    o = require("../../../utils/api.js"),
    t = require("../../../utils/wxuser.js"),
    l = require("../../types/enum.js"),
    a = require("../../utils.js"),
    i = require("../../../utils/platform.js");
  Math || (p + s + u + c + v + h + n + d + y + r)();
  const u = () => "../../../components/new/StRadio.js",
    d = () => "../../../components/new/FixedBottomView.js",
    n = () => "../../../components/new/StButton.js",
    s = () => "../../../components/Alert.js",
    c = () => "../../../components/empty.js",
    r = () => "./BottomDialog.js",
    v = () => "../AddAndSub.js",
    h = () => "../RectTabs.js",
    y = () => "./DetailDialog.js",
    p = () => "../LineTabs.js",
    D = e.defineComponent({
      options: { styleIsolation: "shared" },
      __name: "AddOneDayDialog",
      props: {
        modelValue: { type: Boolean, default: !1 },
        type: null,
        title: null,
        activeTag: { default: "" },
        canTab: { type: Boolean, default: !1 },
        needSteward: { type: Boolean },
        daysList: null,
        currentDay: null,
      },
      emits: ["update:modelValue", "complete", "close"],
      setup(u, { emit: d }) {
        const n = d,
          s = u;
        let c = "";
        const r = e.getCurrentInstance(),
          v = e.ref(),
          h = e.ref("90vh"),
          y = e.ref(!1),
          p = e.ref(!1),
          D = e.ref(!1);
        e.ref();
        const m = e.ref(),
          f = t.getStorage("config"),
          g = e.ref(0),
          T = e.ref(50),
          C = e.ref([]),
          _ = e.ref(!1),
          L = e.ref("1"),
          k = e.ref({ id: "1", name: "选目的地" }),
          x = e.ref("-1"),
          w = e.ref([]),
          b = e.ref(!1),
          A = e.ref([]),
          E = e.ref(""),
          I = e.ref([]),
          S = e.ref(!1),
          N = e.ref([]),
          R = e.ref(""),
          O = e.ref([]),
          B = e.ref([]),
          F = e.ref(!1),
          H = e.ref([]),
          G = e.ref(!0),
          V = e.ref(!1),
          j = e.ref(0),
          $ = e.ref([
            { id: "1", name: "选目的地" },
            { id: "2", name: "选酒店" },
            { id: "3", name: "选活动" },
          ]),
          M = e.reactive({
            visible: !1,
            data: { picUrl: "", destName: "", description: "", tagNames: [] },
            type: l.DetailType.DESTINATION,
            code: "",
          }),
          q = e.ref([
            {
              rmclass: l.RoomTypesClassType.SCF,
              rmclassDescript: l.RoomTypesClassDescType.SCF_DESC,
              num: 0,
              rmtype: l.RoomTypesClassType.SCF,
              rmtypeDesc: l.RoomTypesClassDescType.SCF_DESC,
              detailHotelCode: "",
              _checked: !1,
            },
            {
              rmclass: l.RoomTypesClassType.DCF,
              rmclassDescript: l.RoomTypesClassDescType.DCF_DESC,
              num: 0,
              rmtype: l.RoomTypesClassType.DCF,
              rmtypeDesc: l.RoomTypesClassDescType.DCF_DESC,
              detailHotelCode: "",
              _checked: !1,
            },
          ]),
          P = e.computed(() => {
            let e = "继续";
            return (e = 0 == j.value || 1 == j.value ? "继续" : "完成"), e;
          }),
          z = e.computed(() => w.value.find((e) => e._checked)),
          U = e.computed(() => I.value.find((e) => e._checked)),
          Q = e.computed(() => B.value.filter((e) => e._checked));
        e.onMounted(() => {
          console.log("dialogHeight.value", 1),
            e.index.getSystemInfo({
              success: (e) => {
                const o = i.getMenuButtonBoundingClientRect();
                (h.value = e.screenHeight - o.top - o.height - 6 + "px"),
                  console.log("dialogHeight.value", h.value);
              },
              fail(e) {
                console.log(e);
              },
            });
        });
        const J = (o) => {
            var t, a, i, u, d, n, r, v, h, y, p, m, f, g, T, _, x, b, A;
            if (
              (console.log("typeIndex.value", j.value),
              console.log("e", o),
              console.log("props", s),
              (D.value = !0),
              0 === j.value)
            ) {
              if ("2" == o.id && !z.value)
                return void console.log("目的地 -> 酒店 1");
              if (!("3" != o.id || (z.value && U.value)))
                return void console.log("目的地 -> 活动 2");
              if (
                E.value != (null == (t = z.value) ? void 0 : t.destCode) &&
                R.value === (null == (a = U.value) ? void 0 : a.code)
              )
                return void console.log(
                  "目的地 -> 活动 目的地变了 酒店没变 不允许切换到活动",
                );
              if ("3" == o.id && !s.needSteward)
                return void e.index.showToast({
                  title: "请勾选管家后才可以选择活动",
                  icon: "none",
                });
              "2" == o.id
                ? (0 !== I.value.length &&
                    E.value ===
                      (null == (i = z.value) ? void 0 : i.destCode)) ||
                  de((null == (u = z.value) ? void 0 : u.destCode) || "").then(
                    (e) => {
                      var o, t, a, i, u, d, n, c;
                      if (s.type === l.AddOneDayDialogTypeType.ADD) {
                        let e = { hotelDto: { hotelCode: "", roomDtos: [] } };
                        "overview" === s.currentDay &&
                          (e = (null ==
                          (o = s.daysList[s.daysList.length - 2].dayDetailDtos)
                            ? void 0
                            : o.find((e) => "hotel" === e.resourceType)) || {
                            hotelDto: { hotelCode: "", roomDtos: [] },
                          }),
                          E.value !==
                            (null == (t = z.value) ? void 0 : t.destCode) &&
                            (E.value =
                              (null == (a = z.value) ? void 0 : a.destCode) ||
                              ""),
                          console.log("preDayHotelItem", e);
                        for (let o = 0; o < I.value.length; o++) {
                          const t = I.value[o];
                          let a =
                            t.code ===
                            (null == e ? void 0 : e.hotelDto.hotelCode);
                          a &&
                            W()
                              .then((o) => {
                                (t._checked = a),
                                  (C.value = []),
                                  t.roomTypes.forEach((o) => {
                                    if (
                                      e &&
                                      e.hotelDto &&
                                      e.hotelDto.roomDtos
                                    ) {
                                      const t = e.hotelDto.roomDtos.find(
                                        (e) => e.rmtype === o.rmtype,
                                      );
                                      console.log("findRes", t),
                                        (o._checked = Boolean(t)),
                                        (o.num = t ? t.num : 0),
                                        o._checked && C.value.push(o);
                                    } else
                                      o.rmclass === l.RoomTypesClassType.SCF &&
                                        ((o._checked = !0),
                                        (o.num = 1),
                                        C.value.push(o));
                                  }),
                                  console.log(
                                    "selectedRoomTypes.value",
                                    C.value,
                                  );
                              })
                              .catch((e) => {});
                        }
                      } else if (s.type === l.AddOneDayDialogTypeType.EDIT) {
                        const e = s.daysList[Number(s.currentDay) - 1];
                        let o = !0,
                          t = { hotelDto: { hotelCode: "", roomDtos: [] } },
                          a = { hotelDto: { hotelCode: "", roomDtos: [] } };
                        "1" != s.currentDay &&
                          (a =
                            "overview" === s.currentDay
                              ? (null ==
                                (i =
                                  s.daysList[s.daysList.length - 2]
                                    .dayDetailDtos)
                                  ? void 0
                                  : i.find(
                                      (e) => "hotel" === e.resourceType,
                                    )) || {
                                  hotelDto: { hotelCode: "", roomDtos: [] },
                                }
                              : (null ==
                                (u =
                                  s.daysList[Number(s.currentDay) - 2]
                                    .dayDetailDtos)
                                  ? void 0
                                  : u.find(
                                      (e) => "hotel" === e.resourceType,
                                    )) || {
                                  hotelDto: { hotelCode: "", roomDtos: [] },
                                }),
                          (t = (null == (d = e.dayDetailDtos)
                            ? void 0
                            : d.find((e) => "hotel" === e.resourceType)) || {
                            hotelDto: { hotelCode: "", roomDtos: [] },
                          }),
                          E.value !==
                            (null == (n = z.value) ? void 0 : n.destCode) &&
                            (E.value =
                              (null == (c = z.value) ? void 0 : c.destCode) ||
                              ""),
                          console.log("preDayHotelItem", a),
                          console.log("dayHotelItem", t);
                        for (let e = 0; e < I.value.length; e++) {
                          const i = I.value[e];
                          let u =
                            i.code ===
                            (null == t ? void 0 : t.hotelDto.hotelCode);
                          u &&
                            ((o = !1),
                            W()
                              .then((e) => {
                                (i._checked = u),
                                  (C.value = []),
                                  i.roomTypes.forEach((e) => {
                                    if (
                                      a &&
                                      a.hotelDto &&
                                      a.hotelDto.roomDtos
                                    ) {
                                      const o = a.hotelDto.roomDtos.find(
                                        (o) => o.rmtype === e.rmtype,
                                      );
                                      (e._checked = Boolean(o)),
                                        (e.num = o ? o.num : 0),
                                        e._checked && C.value.push(e);
                                    } else
                                      e.rmclass === l.RoomTypesClassType.SCF &&
                                        ((e._checked = !0),
                                        (e.num = 1),
                                        C.value.push(e));
                                  });
                              })
                              .catch((e) => {}));
                        }
                        if (o)
                          for (let e = 0; e < I.value.length; e++) {
                            const t = I.value[e];
                            let i =
                              t.code ===
                              (null == a ? void 0 : a.hotelDto.hotelCode);
                            i &&
                              ((o = !1),
                              W()
                                .then((e) => {
                                  (t._checked = i),
                                    (C.value = []),
                                    t.roomTypes.forEach((e) => {
                                      if (
                                        a &&
                                        a.hotelDto &&
                                        a.hotelDto.roomDtos
                                      ) {
                                        const o = a.hotelDto.roomDtos.find(
                                          (o) => o.rmtype === e.rmtype,
                                        );
                                        (e._checked = Boolean(o)),
                                          (e.num = o ? o.num : 0),
                                          e._checked && C.value.push(e);
                                      } else
                                        e.rmclass ===
                                          l.RoomTypesClassType.SCF &&
                                          ((e._checked = !0),
                                          (e.num = 1),
                                          C.value.push(e));
                                    });
                                })
                                .catch((e) => {}));
                          }
                      }
                    },
                  )
                : "3" == o.id &&
                  ((0 !== B.value.length &&
                    R.value === (null == (d = U.value) ? void 0 : d.code)) ||
                    ((c = (null == (n = U.value) ? void 0 : n.code) || ""),
                    se(c),
                    ne(c).then((e) => {
                      var o, t, a, i, u;
                      if (
                        ((R.value = c),
                        s.type === l.AddOneDayDialogTypeType.ADD)
                      )
                        for (let e = 0; e < B.value.length; e++) {
                          const l = B.value[e];
                          ie({
                            hotelLat:
                              null == (o = U.value) ? void 0 : o.hotelLatitude,
                            hotelLng:
                              null == (t = U.value) ? void 0 : t.hotelLongitude,
                            item: l,
                          });
                        }
                      else if (s.type === l.AddOneDayDialogTypeType.EDIT) {
                        const e =
                          (null ==
                          (a = s.daysList[
                            Number(s.currentDay) - 1
                          ].dayDetailDtos.filter(
                            (e) => "activity" === e.resourceType,
                          ))
                            ? void 0
                            : a.map((e) => e.activityDto.activityCode)) || [];
                        H.value = e;
                        for (let o = 0; o < B.value.length; o++) {
                          const t = B.value[o];
                          (t._checked = e.includes(t.activityCode)),
                            ie({
                              hotelLat:
                                null == (i = U.value)
                                  ? void 0
                                  : i.hotelLatitude,
                              hotelLng:
                                null == (u = U.value)
                                  ? void 0
                                  : u.hotelLongitude,
                              item: t,
                            });
                        }
                      }
                    })));
            } else if (1 === j.value) {
              if (s.type === l.AddOneDayDialogTypeType.ADD) {
                if ("1" == o.id && !z.value) return;
                if ("3" == o.id) {
                  if (!U.value) return;
                  if (!s.needSteward)
                    return void e.index.showToast({
                      title: "请勾选管家后才可以选择活动",
                      icon: "none",
                    });
                  U.value &&
                    s.needSteward &&
                    (0 === O.value.length &&
                      se((null == (r = U.value) ? void 0 : r.code) || ""),
                    (0 !== B.value.length &&
                      R.value === (null == (v = U.value) ? void 0 : v.code)) ||
                      ((c = (null == (h = U.value) ? void 0 : h.code) || ""),
                      se(c),
                      ne(c).then((e) => {
                        var o, t, a, i, u;
                        if (
                          ((R.value = c),
                          s.type === l.AddOneDayDialogTypeType.ADD)
                        )
                          for (let e = 0; e < B.value.length; e++) {
                            const l = B.value[e];
                            ie({
                              hotelLat:
                                null == (o = U.value)
                                  ? void 0
                                  : o.hotelLatitude,
                              hotelLng:
                                null == (t = U.value)
                                  ? void 0
                                  : t.hotelLongitude,
                              item: l,
                            });
                          }
                        else if (s.type === l.AddOneDayDialogTypeType.EDIT) {
                          const e =
                            (null ==
                            (a = s.daysList[
                              Number(s.currentDay) - 1
                            ].dayDetailDtos.filter(
                              (e) => "activity" === e.resourceType,
                            ))
                              ? void 0
                              : a.map((e) => e.activityDto.activityCode)) || [];
                          H.value = e;
                          for (let o = 0; o < B.value.length; o++) {
                            const t = B.value[o];
                            (t._checked = e.includes(t.activityCode)),
                              ie({
                                hotelLat:
                                  null == (i = U.value)
                                    ? void 0
                                    : i.hotelLatitude,
                                hotelLng:
                                  null == (u = U.value)
                                    ? void 0
                                    : u.hotelLongitude,
                                item: t,
                              });
                          }
                        }
                      })));
                }
              } else if (s.type === l.AddOneDayDialogTypeType.EDIT)
                if ("1" == o.id) {
                  const e = s.daysList[Number(s.currentDay) - 1];
                  let o = { hotelDto: { hotelCode: "" } };
                  if (
                    ("1" != s.currentDay &&
                      (o =
                        "overview" === s.currentDay
                          ? (null ==
                            (y =
                              s.daysList[s.daysList.length - 2].dayDetailDtos)
                              ? void 0
                              : y.find((e) => "hotel" === e.resourceType)) || {
                              hotelDto: { hotelCode: "", roomDtos: [] },
                            }
                          : (null ==
                            (p =
                              s.daysList[Number(s.currentDay) - 2]
                                .dayDetailDtos)
                              ? void 0
                              : p.find((e) => "hotel" === e.resourceType)) || {
                              hotelDto: { hotelCode: "", roomDtos: [] },
                            }),
                    0 === w.value.length ||
                      E.value !== (null == (m = z.value) ? void 0 : m.destCode))
                  ) {
                    let t = !0;
                    ue(
                      (null == (f = null == o ? void 0 : o.hotelDto)
                        ? void 0
                        : f.hotelCode) || "",
                    ).then((o) => {
                      w.value.forEach((o) => {
                        (o._checked = o.destCode == e.destination),
                          o._checked && ((t = !1), (E.value = o.destCode));
                      }),
                        t && (E.value = "");
                    });
                  }
                } else if ("3" == o.id) {
                  if (!s.needSteward)
                    return void e.index.showToast({
                      title: "请勾选管家后才可以选择活动",
                      icon: "none",
                    });
                  if (!U.value) return;
                  U.value &&
                    s.needSteward &&
                    ((0 !== B.value.length &&
                      R.value === (null == (g = U.value) ? void 0 : g.code)) ||
                      ((c = (null == (T = U.value) ? void 0 : T.code) || ""),
                      se(c),
                      ne(c).then((e) => {
                        var o, t, a, i, u;
                        if (
                          ((R.value = c),
                          s.type === l.AddOneDayDialogTypeType.ADD)
                        )
                          for (let e = 0; e < B.value.length; e++) {
                            const l = B.value[e];
                            ie({
                              hotelLat:
                                null == (o = U.value)
                                  ? void 0
                                  : o.hotelLatitude,
                              hotelLng:
                                null == (t = U.value)
                                  ? void 0
                                  : t.hotelLongitude,
                              item: l,
                            });
                          }
                        else if (s.type === l.AddOneDayDialogTypeType.EDIT) {
                          const e =
                            (null ==
                            (a = s.daysList[
                              Number(s.currentDay) - 1
                            ].dayDetailDtos.filter(
                              (e) => "activity" === e.resourceType,
                            ))
                              ? void 0
                              : a.map((e) => e.activityDto.activityCode)) || [];
                          H.value = e;
                          for (let o = 0; o < B.value.length; o++) {
                            const t = B.value[o];
                            (t._checked = e.includes(t.activityCode)),
                              ie({
                                hotelLat:
                                  null == (i = U.value)
                                    ? void 0
                                    : i.hotelLatitude,
                                hotelLng:
                                  null == (u = U.value)
                                    ? void 0
                                    : u.hotelLongitude,
                                item: t,
                              });
                          }
                        }
                      })));
                }
            } else if (2 === j.value)
              if (s.type === l.AddOneDayDialogTypeType.ADD) {
                if ("1" == o.id && !z.value) return;
                if ("2" == o.id && !U.value) return;
              } else if (s.type === l.AddOneDayDialogTypeType.EDIT) {
                if (Number(s.currentDay) == s.daysList.length) return;
                if ("1" == o.id) {
                  if (
                    0 === w.value.length ||
                    E.value !== (null == (_ = z.value) ? void 0 : _.destCode)
                  ) {
                    const e = s.daysList[Number(s.currentDay) - 1];
                    let o = { hotelDto: { hotelCode: "" } };
                    "1" != s.currentDay &&
                      (o = (null ==
                      (x = s.daysList[Number(s.currentDay) - 2].dayDetailDtos)
                        ? void 0
                        : x.find((e) => "hotel" === e.resourceType)) || {
                        hotelDto: { hotelCode: "", roomDtos: [] },
                      }),
                      ue(
                        (null == (b = null == o ? void 0 : o.hotelDto)
                          ? void 0
                          : b.hotelCode) || "",
                      ).then((o) => {
                        w.value.forEach((o) => {
                          (o._checked = o.destCode == e.destination),
                            o._checked && (E.value = o.destCode);
                        });
                      });
                  }
                } else if (
                  "2" == o.id &&
                  (0 === I.value.length ||
                    R.value !== (null == (A = U.value) ? void 0 : A.code))
                ) {
                  let e = "";
                  (e = s.daysList[Number(s.currentDay) - 1].destination),
                    de(e).then((e) => {
                      var o, t, a, i, u, d, n, c;
                      if (s.type === l.AddOneDayDialogTypeType.ADD) {
                        let e = { hotelDto: { hotelCode: "", roomDtos: [] } };
                        "overview" === s.currentDay &&
                          (e = (null ==
                          (o = s.daysList[s.daysList.length - 2].dayDetailDtos)
                            ? void 0
                            : o.find((e) => "hotel" === e.resourceType)) || {
                            hotelDto: { hotelCode: "", roomDtos: [] },
                          }),
                          E.value !==
                            (null == (t = z.value) ? void 0 : t.destCode) &&
                            (E.value =
                              (null == (a = z.value) ? void 0 : a.destCode) ||
                              ""),
                          console.log("preDayHotelItem", e);
                        for (let o = 0; o < I.value.length; o++) {
                          const t = I.value[o];
                          let a =
                            t.code ===
                            (null == e ? void 0 : e.hotelDto.hotelCode);
                          a &&
                            W()
                              .then((o) => {
                                (t._checked = a),
                                  (C.value = []),
                                  t.roomTypes.forEach((o) => {
                                    if (
                                      e &&
                                      e.hotelDto &&
                                      e.hotelDto.roomDtos
                                    ) {
                                      const t = e.hotelDto.roomDtos.find(
                                        (e) => e.rmtype === o.rmtype,
                                      );
                                      console.log("findRes", t),
                                        (o._checked = Boolean(t)),
                                        o._checked &&
                                          ((o.num = t.num), C.value.push(o));
                                    } else
                                      o.rmclass === l.RoomTypesClassType.SCF &&
                                        ((o._checked = !0),
                                        (o.num = 1),
                                        C.value.push(o));
                                  }),
                                  console.log(
                                    "selectedRoomTypes.value",
                                    C.value,
                                  );
                              })
                              .catch((e) => {});
                        }
                      } else if (s.type === l.AddOneDayDialogTypeType.EDIT) {
                        const e = s.daysList[Number(s.currentDay) - 1];
                        let o = !0,
                          t = { hotelDto: { hotelCode: "", roomDtos: [] } },
                          a = { hotelDto: { hotelCode: "", roomDtos: [] } };
                        "1" != s.currentDay &&
                          (a =
                            "overview" === s.currentDay
                              ? (null ==
                                (i =
                                  s.daysList[s.daysList.length - 2]
                                    .dayDetailDtos)
                                  ? void 0
                                  : i.find(
                                      (e) => "hotel" === e.resourceType,
                                    )) || {
                                  hotelDto: { hotelCode: "", roomDtos: [] },
                                }
                              : (null ==
                                (u =
                                  s.daysList[Number(s.currentDay) - 2]
                                    .dayDetailDtos)
                                  ? void 0
                                  : u.find(
                                      (e) => "hotel" === e.resourceType,
                                    )) || {
                                  hotelDto: { hotelCode: "", roomDtos: [] },
                                }),
                          (t = (null == (d = e.dayDetailDtos)
                            ? void 0
                            : d.find((e) => "hotel" === e.resourceType)) || {
                            hotelDto: { hotelCode: "", roomDtos: [] },
                          }),
                          E.value !==
                            (null == (n = z.value) ? void 0 : n.destCode) &&
                            (E.value =
                              (null == (c = z.value) ? void 0 : c.destCode) ||
                              ""),
                          console.log("preDayHotelItem", a),
                          console.log("dayHotelItem", t);
                        for (let e = 0; e < I.value.length; e++) {
                          const a = I.value[e];
                          let i =
                            a.code ===
                            (null == t ? void 0 : t.hotelDto.hotelCode);
                          i &&
                            ((o = !1),
                            W()
                              .then((e) => {
                                (a._checked = i),
                                  a._checked && (R.value = a.code),
                                  (C.value = []),
                                  a.roomTypes.forEach((e) => {
                                    if (
                                      t &&
                                      t.hotelDto &&
                                      t.hotelDto.roomDtos
                                    ) {
                                      const o = t.hotelDto.roomDtos.find(
                                        (o) => o.rmtype === e.rmtype,
                                      );
                                      console.log("findRes", o),
                                        (e._checked = Boolean(o)),
                                        e._checked &&
                                          ((e.num = o.num), C.value.push(e));
                                    } else
                                      e.rmclass === l.RoomTypesClassType.SCF &&
                                        ((e._checked = !0),
                                        (e.num = 1),
                                        C.value.push(e));
                                  }),
                                  console.log(
                                    "selectedRoomTypes.value",
                                    C.value,
                                  );
                              })
                              .catch((e) => {}));
                        }
                        if (o)
                          for (let e = 0; e < I.value.length; e++) {
                            const o = I.value[e];
                            let t =
                              o.code ===
                              (null == a ? void 0 : a.hotelDto.hotelCode);
                            t &&
                              W()
                                .then((e) => {
                                  (o._checked = t),
                                    o._checked && (R.value = o.code),
                                    (C.value = []),
                                    o.roomTypes.forEach((e) => {
                                      if (
                                        a &&
                                        a.hotelDto &&
                                        a.hotelDto.roomDtos
                                      ) {
                                        const o = a.hotelDto.roomDtos.find(
                                          (o) => o.rmtype === e.rmtype,
                                        );
                                        (e._checked = Boolean(o)),
                                          e._checked &&
                                            ((e.num = o.num), C.value.push(e));
                                      } else
                                        e.rmclass ===
                                          l.RoomTypesClassType.SCF &&
                                          ((e._checked = !0),
                                          (e.num = 1),
                                          C.value.push(e));
                                    });
                                })
                                .catch((e) => {});
                          }
                      }
                    });
                }
              }
            (k.value = o),
              (L.value = o.id),
              (j.value = $.value.findIndex((e) => e.id === o.id));
          },
          Y = (e, o, t) => {
            console.log("selectData item", o),
              0 === e
                ? (w.value.forEach((e) => {
                    e._checked = !1;
                  }),
                  (w.value[t]._checked = !0),
                  (A.value = [w.value[t]]),
                  I.value.forEach((e) => {
                    (e._checked = !1),
                      e.roomTypes.forEach((e) => {
                        (e._checked = !1), (e.num = 0);
                      });
                  }),
                  (C.value = []))
                : 1 === e
                  ? o._checked ||
                    W()
                      .then((e) => {
                        (C.value = []),
                          I.value.forEach((e) => {
                            (e._checked = !1),
                              e.roomTypes.forEach((e) => {
                                (e._checked = !1),
                                  (e.num = 0),
                                  e.rmclass === l.RoomTypesClassType.SCF &&
                                    ((e._checked = !0),
                                    (e.num = 1),
                                    C.value.push(e));
                              });
                          }),
                          (I.value[t]._checked = !0),
                          (N.value = [I.value[t]]);
                      })
                      .catch((e) => {})
                  : 2 === e &&
                    (console.log(B.value),
                    (B.value[t]._checked = !B.value[t]._checked));
          },
          K = () =>
            new Promise((e, o) => {
              for (let e = 0; e < C.value.length; e++)
                if (C.value[e]._checked && C.value[e].num <= 0) {
                  o();
                  break;
                }
              e();
            }),
          W = (e) =>
            new Promise(async (e, o) => {
              e(1);
            }),
          X = () => {
            0 === j.value
              ? z.value
                ? (j.value + 1 > $.value.length ? (j.value = 0) : j.value++,
                  (L.value = $.value[j.value].id),
                  (0 !== I.value.length && E.value === z.value.destCode) ||
                    de(z.value.destCode).then((e) => {
                      var o, t, a, i, u, d, n, c;
                      if (s.type === l.AddOneDayDialogTypeType.ADD) {
                        let e = { hotelDto: { hotelCode: "", roomDtos: [] } };
                        "overview" === s.currentDay &&
                          (e = (null ==
                          (o = s.daysList[s.daysList.length - 2].dayDetailDtos)
                            ? void 0
                            : o.find((e) => "hotel" === e.resourceType)) || {
                            hotelDto: { hotelCode: "", roomDtos: [] },
                          }),
                          E.value !==
                            (null == (t = z.value) ? void 0 : t.destCode) &&
                            (E.value =
                              (null == (a = z.value) ? void 0 : a.destCode) ||
                              ""),
                          console.log("preDayHotelItem", e);
                        for (let o = 0; o < I.value.length; o++) {
                          const t = I.value[o];
                          let a =
                            t.code ===
                            (null == e ? void 0 : e.hotelDto.hotelCode);
                          a &&
                            W()
                              .then((o) => {
                                (t._checked = a),
                                  (C.value = []),
                                  t.roomTypes.forEach((o) => {
                                    if (
                                      e &&
                                      e.hotelDto &&
                                      e.hotelDto.roomDtos
                                    ) {
                                      const t = e.hotelDto.roomDtos.find(
                                        (e) => e.rmtype === o.rmtype,
                                      );
                                      console.log("findRes", t),
                                        (o._checked = Boolean(t)),
                                        (o.num = t ? t.num : 0),
                                        o._checked && C.value.push(o);
                                    } else
                                      o.rmclass === l.RoomTypesClassType.SCF &&
                                        ((o._checked = !0),
                                        (o.num = 1),
                                        C.value.push(o));
                                  }),
                                  console.log(
                                    "selectedRoomTypes.value",
                                    C.value,
                                  );
                              })
                              .catch((e) => {});
                        }
                      } else if (s.type === l.AddOneDayDialogTypeType.EDIT) {
                        const e = s.daysList[Number(s.currentDay) - 1];
                        let o = !0,
                          t = { hotelDto: { hotelCode: "" } },
                          a = { hotelDto: { hotelCode: "", roomDtos: [] } };
                        "1" != s.currentDay &&
                          (a =
                            "overview" === s.currentDay
                              ? (null ==
                                (i =
                                  s.daysList[s.daysList.length - 2]
                                    .dayDetailDtos)
                                  ? void 0
                                  : i.find(
                                      (e) => "hotel" === e.resourceType,
                                    )) || {
                                  hotelDto: { hotelCode: "", roomDtos: [] },
                                }
                              : (null ==
                                (u =
                                  s.daysList[Number(s.currentDay) - 2]
                                    .dayDetailDtos)
                                  ? void 0
                                  : u.find(
                                      (e) => "hotel" === e.resourceType,
                                    )) || {
                                  hotelDto: { hotelCode: "", roomDtos: [] },
                                }),
                          (t = (null == (d = e.dayDetailDtos)
                            ? void 0
                            : d.find((e) => "hotel" === e.resourceType)) || {
                            hotelDto: { hotelCode: "", roomDtos: [] },
                          }),
                          E.value !==
                            (null == (n = z.value) ? void 0 : n.destCode) &&
                            (E.value =
                              (null == (c = z.value) ? void 0 : c.destCode) ||
                              ""),
                          console.log("preDayHotelItem", a);
                        for (let e = 0; e < I.value.length; e++) {
                          const i = I.value[e];
                          let u =
                            i.code ===
                            (null == t ? void 0 : t.hotelDto.hotelCode);
                          u &&
                            ((o = !1),
                            W()
                              .then((e) => {
                                (i._checked = u),
                                  (C.value = []),
                                  i.roomTypes.forEach((e) => {
                                    if (
                                      a &&
                                      a.hotelDto &&
                                      a.hotelDto.roomDtos
                                    ) {
                                      const o = a.hotelDto.roomDtos.find(
                                        (o) => o.rmtype === e.rmtype,
                                      );
                                      (e._checked = Boolean(o)),
                                        (e.num = o ? o.num : 0),
                                        e._checked && C.value.push(e);
                                    } else
                                      e.rmclass === l.RoomTypesClassType.SCF &&
                                        ((e._checked = !0),
                                        (e.num = 1),
                                        C.value.push(e));
                                  });
                              })
                              .catch((e) => {}));
                        }
                        if (o)
                          for (let e = 0; e < I.value.length; e++) {
                            const t = I.value[e];
                            let i =
                              t.code ===
                              (null == a ? void 0 : a.hotelDto.hotelCode);
                            i &&
                              ((o = !1),
                              W()
                                .then((e) => {
                                  (t._checked = i),
                                    (C.value = []),
                                    t.roomTypes.forEach((e) => {
                                      if (
                                        a &&
                                        a.hotelDto &&
                                        a.hotelDto.roomDtos
                                      ) {
                                        const o = a.hotelDto.roomDtos.find(
                                          (o) => o.rmtype === e.rmtype,
                                        );
                                        (e._checked = Boolean(o)),
                                          (e.num = o ? o.num : 0),
                                          e._checked && C.value.push(e);
                                      } else
                                        e.rmclass ===
                                          l.RoomTypesClassType.SCF &&
                                          ((e._checked = !0),
                                          (e.num = 1),
                                          C.value.push(e));
                                    });
                                })
                                .catch((e) => {}));
                          }
                      }
                    }))
                : e.index.showToast({ title: "请选择目的地", icon: "none" })
              : 1 === j.value
                ? U.value
                  ? C.value.length
                    ? K()
                        .then(() => {
                          var e, o;
                          s.needSteward
                            ? (j.value + 1 > $.value.length
                                ? (j.value = 0)
                                : j.value++,
                              (L.value = $.value[j.value].id),
                              (0 !== B.value.length &&
                                R.value ===
                                  (null == (e = U.value) ? void 0 : e.code)) ||
                                ((c =
                                  (null == (o = U.value) ? void 0 : o.code) ||
                                  ""),
                                se(c),
                                ne(c).then((e) => {
                                  var o, t, a, i, u;
                                  if (
                                    ((R.value = c),
                                    s.type === l.AddOneDayDialogTypeType.ADD)
                                  )
                                    for (let e = 0; e < B.value.length; e++) {
                                      const l = B.value[e];
                                      ie({
                                        hotelLat:
                                          null == (o = U.value)
                                            ? void 0
                                            : o.hotelLatitude,
                                        hotelLng:
                                          null == (t = U.value)
                                            ? void 0
                                            : t.hotelLongitude,
                                        item: l,
                                      });
                                    }
                                  else if (
                                    s.type === l.AddOneDayDialogTypeType.EDIT
                                  ) {
                                    const e =
                                      (null ==
                                      (a = s.daysList[
                                        Number(s.currentDay) - 1
                                      ].dayDetailDtos.filter(
                                        (e) => "activity" === e.resourceType,
                                      ))
                                        ? void 0
                                        : a.map(
                                            (e) => e.activityDto.activityCode,
                                          )) || [];
                                    H.value = e;
                                    for (let o = 0; o < B.value.length; o++) {
                                      const t = B.value[o];
                                      (t._checked = e.includes(t.activityCode)),
                                        ie({
                                          hotelLat:
                                            null == (i = U.value)
                                              ? void 0
                                              : i.hotelLatitude,
                                          hotelLng:
                                            null == (u = U.value)
                                              ? void 0
                                              : u.hotelLongitude,
                                          item: t,
                                        });
                                    }
                                  }
                                })))
                            : oe();
                        })
                        .catch(() => {
                          e.index.showToast({
                            title: "请选择房间数量",
                            icon: "none",
                          });
                        })
                    : e.index.showToast({ title: "请选择房类", icon: "none" })
                  : e.index.showToast({ title: "请选择酒店", icon: "none" })
                : oe();
          },
          Z = (e) => {
            0 === e &&
              ((p.value = !1),
              (A.value = []),
              (N.value = []),
              n("update:modelValue", !1),
              n("close"));
          },
          ee = () => {
            (y.value = !1), (D.value = !1), (p.value = !1);
          },
          oe = () => {
            ee(),
              (A.value = []),
              (N.value = []),
              n("complete", {
                type: s.type,
                destination: z.value,
                hotel: U.value,
                activity: Q.value || [],
                activeTag: s.activeTag,
              });
          },
          te = () => {
            0 === j.value
              ? z.value
                ? s.type === l.AddOneDayDialogTypeType.EDIT &&
                  (U.value
                    ? oe()
                    : e.index.showToast({ title: "请选择酒店", icon: "none" }))
                : e.index.showToast({ title: "请选择目的地", icon: "none" })
              : 1 === j.value
                ? U.value
                  ? C.value.length
                    ? K()
                        .then(() => {
                          oe();
                        })
                        .catch(() => {
                          e.index.showToast({
                            title: "请选择房间数量",
                            icon: "none",
                          });
                        })
                    : e.index.showToast({ title: "请选择房类", icon: "none" })
                  : e.index.showToast({ title: "请选择酒店", icon: "none" })
                : oe();
          },
          le = (e) => {
            console.log(e.value),
              console.log("getActivityByHotelCode", c),
              ne(c, e.value.activityClass).then((e) => {
                var o, t, a, i;
                if (s.type === l.AddOneDayDialogTypeType.ADD)
                  for (let e = 0; e < B.value.length; e++) {
                    const l = B.value[e];
                    ie({
                      hotelLat:
                        null == (o = U.value) ? void 0 : o.hotelLatitude,
                      hotelLng:
                        null == (t = U.value) ? void 0 : t.hotelLongitude,
                      item: l,
                    });
                  }
                else if (s.type === l.AddOneDayDialogTypeType.EDIT) {
                  const e = s.daysList[Number(s.currentDay) - 1];
                  let o = { hotelDto: { hotelCode: "", roomDtos: [] } };
                  (o =
                    Number(s.currentDay) == s.daysList.length
                      ? (null ==
                        (a = s.daysList[s.daysList.length - 2].dayDetailDtos)
                          ? void 0
                          : a.find((e) => "hotel" === e.resourceType)) || {
                          hotelDto: { hotelCode: "", roomDtos: [] },
                        }
                      : (null == (i = e.dayDetailDtos)
                          ? void 0
                          : i.find((e) => "hotel" === e.resourceType)) || {
                          hotelDto: { hotelCode: "", roomDtos: [] },
                        }),
                    console.log("dayHotelItem", o);
                  for (let e = 0; e < B.value.length; e++) {
                    const t = B.value[e];
                    ie({
                      hotelLat: null == o ? void 0 : o.lat,
                      hotelLng: null == o ? void 0 : o.lng,
                      item: t,
                    });
                  }
                }
              });
          },
          ae = () => {
            G.value = !1;
          },
          ie = (e) =>
            new Promise(async (o, t) => {
              let l = { rows: [] };
              if (
                e.hotelLat &&
                e.hotelLng &&
                e.item.latitude &&
                e.item.longitude
              )
                try {
                  (l = await a.calculateDistanceByQQmap({
                    from: `${e.hotelLat},${e.hotelLng}`,
                    to: `${e.item.latitude},${e.item.longitude}`,
                  })),
                    console.log(l),
                    l.rows.length
                      ? (l.rows[0].elements[0].status
                          ? (e.item._durationByHotel = "0.0")
                          : (e.item._durationByHotel = (
                              l.rows[0].elements[0].duration / 3600
                            ).toFixed(1)),
                        (e.item._mileageByHotel = (
                          l.rows[0].elements[0].distance / 1e3
                        ).toFixed(1)))
                      : ((e.item._durationByHotel = "0.0"),
                        (e.item._mileageByHotel = "0.0")),
                    o(l);
                } catch (e) {
                  console.error(e), t(e);
                }
            }),
          ue = (t) =>
            new Promise((l, a) => {
              e.index.showLoading({ title: "加载中" }),
                o.api
                  .interfaceTransfer({
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_TRAVEL_ASSISTANT",
                      interfaceMethod:
                        "/api/destination/combinations/hotel/reachableDestByHotel",
                      interfaceFrom: "GC",
                      hotelGroupCode: f.hotelGroupCode,
                    },
                    query: { hotelCode: t, unitCode: f.hotelGroupCode },
                  })
                  .then((o) => {
                    e.index.hideLoading(),
                      (w.value = o.retVal.retVal.datas || []),
                      (b.value = 0 === w.value.length),
                      w.value.forEach((e) => {
                        e._checked = !1;
                      }),
                      l(o);
                  })
                  .catch((o) => {
                    e.index.hideLoading(), (b.value = !0), a(o);
                  });
            }),
          de = (t) =>
            new Promise((l, i) => {
              e.index.showLoading({ title: "加载中" }),
                o.api
                  .interfaceTransfer({
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_PRODUCT_JOURNEY",
                      interfaceMethod: "/api/planDict/searchHotelByDest",
                      interfaceFrom: "GC",
                      hotelGroupCode: f.hotelGroupCode,
                    },
                    query: { destCode: t, unitCode: f.hotelGroupCode },
                  })
                  .then((o) => {
                    console.log(o),
                      e.index.hideLoading(),
                      (I.value = o.retVal.retVal.datas || []),
                      (S.value = 0 === I.value.length),
                      I.value.forEach((e) => {
                        (e._checked = !1), (e.roomTypes = a.deepClone(q.value));
                      }),
                      l(o);
                  })
                  .catch((o) => {
                    e.index.hideLoading(), (S.value = !0), i(o);
                  });
            }),
          ne = (t, l = "") =>
            new Promise((a, i) => {
              e.index.showLoading({ title: "加载中" }),
                o.api
                  .interfaceTransfer({
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_ACTIVITIES_CENTER",
                      interfaceMethod:
                        "/api/activity/hotel/getActivitiesByHotel",
                      interfaceFrom: "GC",
                      hotelGroupCode: f.hotelGroupCode,
                    },
                    query: {
                      hotelCode: t,
                      activityClass: l,
                      unitCode: f.hotelGroupCode,
                    },
                  })
                  .then(async (o) => {
                    e.index.hideLoading();
                    try {
                      (B.value = o.retVal.retVal.datas || []),
                        (F.value = 0 === B.value.length);
                      for (let e = 0; e < B.value.length; e++) {
                        const o = B.value[e];
                        (o._checked = !1),
                          (o.introduce = o.introduce.replace(
                            /<\/?[^>]+(>|$)/g,
                            "",
                          ));
                      }
                    } catch (e) {
                      console.error(e);
                    }
                    a(o);
                  })
                  .catch((o) => {
                    e.index.hideLoading(), (F.value = !0), i(o);
                  });
            }),
          se = (e) =>
            new Promise((t, l) => {
              o.api
                .interfaceTransfer({
                  config: {
                    interfaceType: "GET",
                    interfaceModule: "GC_ACTIVITIES_CENTER",
                    interfaceMethod:
                      "/api/activity/hotel/getActivityClassByHotel",
                    interfaceFrom: "GC",
                    hotelGroupCode: f.hotelGroupCode,
                  },
                  query: { unitCode: f.hotelGroupCode, hotelCode: e },
                })
                .then((e) => {
                  console.log("活动大类", e),
                    (O.value = e.retVal.retVal.map((e) => ({
                      ...e,
                      id: e.activityClass,
                      name: e.classDescript,
                    }))),
                    O.value.unshift({
                      id: "-1",
                      name: "全部",
                      classDescript: "全部",
                      activityClass: "",
                    }),
                    (x.value = "-1"),
                    t(e);
                })
                .catch((e) => {
                  l(e);
                });
            }),
          ce = (e) => {
            const o = $.value.findIndex((o) => o.id === e);
            (L.value = e), (j.value = -1 === o ? 0 : o), (k.value = $.value[o]);
          };
        return (
          e.watch(
            () => s.modelValue,
            (o) => {
              (y.value = o),
                o &&
                  ((p.value = !0),
                  (w.value = []),
                  (I.value = []),
                  (B.value = []),
                  s.type === l.AddOneDayDialogTypeType.ADD
                    ? (() => {
                        var e;
                        (j.value = 0),
                          (L.value = "1"),
                          (k.value = $.value[j.value]),
                          console.log("initAdd props.daysList", s.daysList);
                        const o = s.daysList[
                          s.daysList.length - 2
                        ].dayDetailDtos.find((e) => "hotel" === e.resourceType);
                        o &&
                          ue(
                            (null == (e = null == o ? void 0 : o.hotelDto)
                              ? void 0
                              : e.hotelCode) || "",
                          );
                      })()
                    : s.type === l.AddOneDayDialogTypeType.EDIT &&
                      (() => {
                        if ("2" == s.activeTag) {
                          if ((ce("2"), "overview" !== s.currentDay)) {
                            const e = s.daysList[Number(s.currentDay) - 1],
                              o = e.dayDetailDtos.find(
                                (e) => "hotel" === e.resourceType,
                              );
                            de(e.destination).then((e) => {
                              for (let e = 0; e < I.value.length; e++) {
                                const t = I.value[e];
                                (t._checked =
                                  t.code ===
                                  (null == o ? void 0 : o.hotelDto.hotelCode)),
                                  (C.value = []),
                                  t.roomTypes.forEach((e) => {
                                    if (
                                      o &&
                                      o.hotelDto &&
                                      o.hotelDto.roomDtos
                                    ) {
                                      const t = o.hotelDto.roomDtos.find(
                                        (o) => o.rmtype === e.rmtype,
                                      );
                                      (e._checked = Boolean(t)),
                                        (e.num = t ? t.num : 0),
                                        e._checked && C.value.push(e);
                                    }
                                  });
                              }
                            });
                          }
                        } else if (
                          "3" == s.activeTag &&
                          (ce("3"), "overview" !== s.currentDay)
                        ) {
                          const e = s.daysList[Number(s.currentDay) - 1];
                          let o = null;
                          (o =
                            Number(s.currentDay) !== s.daysList.length
                              ? e.dayDetailDtos.find(
                                  (e) => "hotel" === e.resourceType,
                                )
                              : s.daysList[
                                  s.daysList.length - 2
                                ].dayDetailDtos.find(
                                  (e) => "hotel" === e.resourceType,
                                )),
                            (c = null == o ? void 0 : o.hotelDto.hotelCode),
                            se(null == o ? void 0 : o.hotelDto.hotelCode),
                            ne(null == o ? void 0 : o.hotelDto.hotelCode).then(
                              (t) => {
                                var l;
                                const a =
                                  (null ==
                                  (l = e.dayDetailDtos.filter(
                                    (e) => "activity" === e.resourceType,
                                  ))
                                    ? void 0
                                    : l.map(
                                        (e) => e.activityDto.activityCode,
                                      )) || [];
                                H.value = a;
                                for (let e = 0; e < B.value.length; e++) {
                                  const t = B.value[e];
                                  (t._checked = a.includes(t.activityCode)),
                                    ie({
                                      hotelLat: null == o ? void 0 : o.lat,
                                      hotelLng: null == o ? void 0 : o.lng,
                                      item: t,
                                    });
                                }
                              },
                            );
                        }
                      })(),
                  e.nextTick$1(() => {
                    console.log(v);
                    try {
                      null == v || v.value.resize();
                    } catch (e) {}
                    if (0 === g.value) {
                      const o = e.index.createSelectorQuery().in(r);
                      o
                        .select(".custom-title__wrapper")
                        .boundingClientRect((e) => {
                          console.log(e),
                            (g.value = e && e.height ? e.height : 0);
                        }),
                        o.exec();
                    }
                  }));
            },
            { immediate: !0 },
          ),
          e.watch(
            () => s.activeTag,
            (e) => {
              ce(e);
            },
          ),
          e.watch(
            () => s.canTab,
            (e) => {
              _.value = e;
            },
            { immediate: !0 },
          ),
          (o, t) =>
            e.e(
              {
                a: e.o(ee),
                b: e.t(s.title),
                c:
                  s.type === e.unref(l.AddOneDayDialogTypeType).EDIT &&
                  "3" !== s.activeTag &&
                  "3" !== L.value,
              },
              s.type === e.unref(l.AddOneDayDialogTypeType).EDIT &&
                "3" !== s.activeTag &&
                "3" !== L.value
                ? { d: e.o(te) }
                : {},
              { e: p.value },
              p.value
                ? {
                    f: e.sr(v, "fef2d936-1,fef2d936-0", { k: "hookTabs" }),
                    g: e.o(J),
                    h: e.p({
                      datas: $.value,
                      activeType: L.value,
                      type: "line",
                      color: "#A43127",
                      titleInactiveColor: "#808080",
                      titleActiveColor: "#000000",
                      flexNum: "F",
                      canTab: _.value,
                      fullWidth: !0,
                      lineDefaultFontSize: 16,
                      isDelayed: !0,
                      isFirstCall: D.value,
                    }),
                  }
                : {},
              { i: G.value },
              G.value
                ? {
                    j: e.o(ae),
                    k: e.p({
                      type: "warning",
                      tips: "更换目的地或酒店后，当日活动需重新选择",
                    }),
                  }
                : {},
              {
                l: e.f(w.value, (o, t, a) => ({
                  a: o.picUrl
                    ? o.picUrl +
                      "?imageView2/1/w/94/h/94&x-oss-process=image/resize,m_fill,w_94,h_94"
                    : "",
                  b: e.t(o.destName),
                  c: e.f(o._tags, (o, t, l) => ({ a: e.t(o), b: t })),
                  d: e.t(o.description),
                  e: e.o(
                    (e) =>
                      ((e) => {
                        (M.visible = !0),
                          (M.data = e),
                          (M.data.tagNames = e._tags),
                          (M.type = l.DetailType.DESTINATION),
                          console.log(e);
                      })(o),
                    t,
                  ),
                  f: "fef2d936-3-" + a + ",fef2d936-0",
                  g: e.p({
                    "model-value": o._checked,
                    customStyle: "width: 20px; height: 20px;",
                  }),
                  h: e.o((e) => Y(0, o, t), t),
                  i: t,
                })),
                m: e.p({ tips: "暂无目的地", subTips: "松赞，期待与您相遇。" }),
                n: b.value,
                o: e.s(
                  `height: calc(${h.value} - 101px - ${
                    G.value ? "62px" : "12px"
                  } - 42px - 76px - constant(safe-area-inset-bottom)); height: calc(${
                    h.value
                  } - 101px - ${
                    G.value ? "62px" : "12px"
                  } - 42px - 76px - env(safe-area-inset-bottom));`,
                ),
                p: 0 === j.value,
                q: G.value,
              },
              G.value
                ? {
                    r: e.o(ae),
                    s: e.p({
                      type: "warning",
                      tips: "更换目的地或酒店后，当日活动需重新选择",
                    }),
                  }
                : {},
              {
                t: e.f(I.value, (o, t, a) =>
                  e.e(
                    {
                      a:
                        o.logo +
                        "?imageView2/1/w/94/h/94&x-oss-process=image/resize,m_fill,w_94,h_94",
                      b: e.t(o.descript),
                      c: e.t(o.remark),
                      d: o.isBack,
                    },
                    o.isBack
                      ? e.e({ e: 1 == s.currentDay }, (s.currentDay, {}))
                      : e.e({ f: 1 == s.currentDay }, (s.currentDay, {})),
                    {
                      g: e.o(
                        (e) =>
                          ((e) => {
                            (M.visible = !0),
                              (M.code = e.code),
                              (M.type = l.DetailType.HOTEL);
                          })(o),
                        t,
                      ),
                      h: "fef2d936-6-" + a + ",fef2d936-0",
                      i: e.p({
                        "model-value": o._checked,
                        customStyle: "width: 20px; height: 20px;",
                      }),
                      j: e.o((e) => Y(1, o, t), t),
                      k: t,
                    },
                  ),
                ),
                v: e.p({ tips: "暂无酒店", subTips: "松赞，期待与您相遇。" }),
                w: S.value,
                x: U.value,
              },
              U.value
                ? {
                    y: e.f(U.value.roomTypes, (o, t, l) =>
                      e.e(
                        {
                          a: e.t(o.rmtypeDesc),
                          b: "fef2d936-8-" + l + ",fef2d936-0",
                          c: e.p({
                            "model-value": o._checked,
                            customStyle: "width: 20px; height: 20px;",
                          }),
                          d: e.o((e) => {
                            return (
                              ((t = o)._checked = !t._checked),
                              t._checked ? (t.num = 1) : (t.num = 0),
                              void (
                                U.value &&
                                ((C.value = []),
                                U.value.roomTypes.forEach((e) => {
                                  e._checked && C.value.push(e);
                                }))
                              )
                            );
                            var t;
                          }, t),
                          e: o._checked,
                        },
                        o._checked
                          ? {
                              f: e.o((e) => {
                                return (o = e), void console.log(o);
                                var o;
                              }, t),
                              g: "fef2d936-9-" + l + ",fef2d936-0",
                              h: e.o((e) => (o.num = e), t),
                              i: e.p({
                                maxNum: T.value,
                                minNum: o._checked ? 1 : 0,
                                modelValue: o.num,
                              }),
                            }
                          : {},
                        { j: t },
                      ),
                    ),
                  }
                : {},
              {
                z: e.s(
                  `height: calc(${h.value} - 101px - ${
                    G.value ? "52px" : "12px"
                  } - 62px - 76px - constant(safe-area-inset-bottom)); height: calc(${
                    h.value
                  } - 101px - ${
                    G.value ? "52px" : "12px"
                  } - 62px - 76px - env(safe-area-inset-bottom));`,
                ),
                A: 1 === j.value,
                B: s.modelValue && O.value && O.value.length,
              },
              s.modelValue && O.value && O.value.length
                ? {
                    C: e.o(le),
                    D: e.o((e) => (x.value = e)),
                    E: e.p({
                      data: O.value,
                      tapAutoSticky: !1,
                      canCancel: !1,
                      itemHeight: "28px",
                      modelValue: x.value,
                    }),
                  }
                : {},
              {
                F: e.f(B.value, (o, t, a) =>
                  e.e(
                    {
                      a:
                        o.indexPicture +
                        "?imageView2/1/w/94/h/94&x-oss-process=image/resize,m_fill,w_94,h_94",
                      b: o.recommend,
                    },
                    (o.recommend, {}),
                    {
                      c: e.t(o.name),
                      d: e.t(o.introduce),
                      e: e.t(o._durationByHotel),
                      f: e.o(
                        (e) =>
                          ((e) => {
                            (M.visible = !0),
                              (M.code = e.activityCode),
                              (M.type = l.DetailType.ACTIVITY);
                          })(o),
                        t,
                      ),
                      g: "fef2d936-11-" + a + ",fef2d936-0",
                      h: e.p({
                        "model-value": o._checked,
                        customStyle: "width: 20px; height: 20px;",
                      }),
                      i: e.o((e) => Y(2, o, t), t),
                      j: t,
                    },
                  ),
                ),
                G: e.p({ tips: "暂无活动", subTips: "松赞，期待与您相遇。" }),
                H: F.value,
                I: e.s(
                  `height: calc(${h.value} - 101px - 52px - 76px - constant(safe-area-inset-bottom)); height: calc(${h.value} - 101px - 52px - 76px - env(safe-area-inset-bottom));`,
                ),
                J: 2 === j.value,
                K: e.s(`height: calc(${h.value} - ${g.value}px)`),
                L: e.t(P.value),
                M: e.o(X),
                N: e.p({
                  theme: "black",
                  customStyle: {
                    height: "52px",
                    color: "#fff",
                    borderRadius: "4px",
                  },
                  block: !0,
                }),
                O: e.p({
                  theme: "white",
                  "custom-style": { backgroundColor: "#fff", zIndex: 10 },
                }),
                P: e.o((e) => (M.visible = e)),
                Q: e.p({
                  data: M.data,
                  type: M.type,
                  code: M.code,
                  modelValue: M.visible,
                }),
                R: V.value,
              },
              (V.value, {}),
              {
                S: e.sr(m, "fef2d936-0", { k: "hookAddOneDayDialog" }),
                T: e.o(Z),
                U: e.p({ visible: y.value, closeOnClickMask: !1 }),
              },
            )
        );
      },
    }),
    m = e._export_sfc(D, [["__scopeId", "data-v-fef2d936"]]);
  wx.createComponent(m);
})();
