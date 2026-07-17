!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    a = require("../../../utils/api.js"),
    l = require("../../../utils/wxuser.js"),
    t = require("../../../base/jAlert/jAlert.js"),
    o = require("../../utils.js");
  Math || (n + c + u)();
  const u = () => "./BottomDialog.js",
    c = () => "../PickerAddress.js",
    n = () => "../AddAndSub.js",
    i = e.defineComponent({
      __name: "PeopleNumberDateDialog",
      props: {
        modelValue: { type: Boolean, default: !1 },
        data: { default: {} },
      },
      emits: ["update:modelValue", "postData"],
      setup(u, { emit: c }) {
        const n = l.getStorage("config"),
          i = c,
          d = e.ref({
            adult: 0,
            olderChildren: 0,
            middleChildren: 0,
            youngerChildren: 0,
            oldNum: 0,
            hmkNum: 0,
            foreignerNum: 0,
          }),
          r = e.ref(!1),
          s = e.ref(""),
          v = e.ref(""),
          p = e.ref(""),
          m = e.ref(""),
          g = e.ref({}),
          C = e.ref({}),
          f = e.ref(0),
          y = e.ref([]),
          h = e.ref([]),
          N = e.ref(!0),
          S = e.ref(!0),
          D = e.reactive({
            provinceList: [],
            listCodeBaseList: [],
            cityData: [],
            proCheckValue: [],
            checkValue: [],
            provinceData: [],
            selectPlace: [],
          }),
          E = e.ref({ code: "", name: "", descript: "" }),
          j = e.ref({ code: "", name: "", descript: "" }),
          w = e.ref({ code: "", descript: "" }),
          V = e.ref({ code: "", descript: "" }),
          x = u,
          L = e.ref(),
          k = (e) => {
            0 === e && (A(), i("update:modelValue", !1)), console.log("eee", e);
          },
          M = () => {
            r.value = !1;
          },
          _ = (e) => {
            s.value = e.detail.value;
          },
          q = () => {
            const e = new Date(),
              a = new Date(e);
            a.setDate(e.getDate() + 1);
            const l = a.getFullYear(),
              t = (a.getMonth() + 1).toString().padStart(2, "0"),
              o = a.getDate().toString().padStart(2, "0");
            (v.value = `${l}-${t}-${o}`),
              (s.value = v.value),
              console.log(v.value, "获取时间");
          };
        e.onMounted(() => {
          q(), B(), console.log("onMounted，222222222222222", x.data);
        }),
          e.onBeforeMount(() => {
            B(), console.log("onBeforeMount，222222222222222", x.data);
          });
        const P = async (e) => {
            console.log(e, "出发地"),
              (D.selectPlace = e.data),
              (y.value = e.data),
              (N.value = !0);
            let a = e.data || [];
            console.log(a, "出发地数组"),
              (p.value = a.join(" ")),
              "" === m.value && T(e),
              (E.value = D.provinceData.find((e) => e.name == a[0]));
            let l = await F({ address: a[1] });
            (g.value = l),
              b("1", E.value.code),
              console.log(E.value.code, "出发地code");
          },
          T = async (e) => {
            console.log(e, "返程地"),
              (D.selectPlace = e.data),
              (h.value = e.data),
              (S.value = !0);
            let a = e.data || [];
            (m.value = a.join(" ")),
              (j.value = D.provinceData.find((e) => e.name == a[0]));
            let l = await F({ address: a[1] });
            (C.value = l), b("2", j.value.code);
          },
          G = async () => {
            if (
              !(
                d.value.adult >= 1 ||
                d.value.olderChildren >= 1 ||
                d.value.middleChildren >= 1 ||
                d.value.youngerChildren >= 1 ||
                d.value.oldNum >= 1 ||
                d.value.hmkNum >= 1 ||
                d.value.foreignerNum >= 1
              )
            )
              return t.jAlert3("请选择人数"), !1;
            {
              if ("" === p.value) return t.jAlert3("请选择出发地"), !1;
              if ("" === m.value) return t.jAlert3("请选择返程地"), !1;
              let e = {
                adult: d.value.adult,
                olderChildren: d.value.olderChildren,
                middleChildren: d.value.middleChildren,
                youngerChildren: d.value.youngerChildren,
                oldNum: d.value.oldNum,
                hmkNum: d.value.hmkNum,
                foreignerNum: d.value.foreignerNum,
                arrivedDate: s.value,
                placeStartCityName: p.value,
                placeEndCityName: m.value,
                placeStartCityLat: g.value.location.lat,
                placeStartCityLng: g.value.location.lng,
                placeEndCityLat: C.value.location.lat,
                placeEndCityLng: C.value.location.lng,
              };
              console.log("postData1", o.deepClone(e)),
                console.log("currentProvinceSet.value", E.value),
                console.log("currentCitySet.value", w.value),
                E.value &&
                  E.value.code &&
                  (w.value.code.includes(",")
                    ? ((e.placeStartCityCode = w.value.code),
                      (e.placeStartCityName = w.value.descript))
                    : ((e.placeStartCityCode =
                        E.value.code + "," + w.value.code),
                      (e.placeStartCityName =
                        E.value.name + "," + w.value.descript)),
                  (e.placeStartCityLat = g.value.location.lat),
                  (e.placeStartCityLng = g.value.location.lng)),
                j.value &&
                  j.value.code &&
                  (V.value.code.includes(",")
                    ? ((e.placeEndCityCode = V.value.code),
                      (e.placeEndCityName = V.value.descript))
                    : ((e.placeEndCityCode = j.value.code + "," + V.value.code),
                      (e.placeEndCityName =
                        j.value.name + "," + V.value.descript)),
                  (e.placeEndCityLat = C.value.location.lat),
                  (e.placeEndCityLng = C.value.location.lng)),
                console.log(e, "完成"),
                A(),
                M(),
                i("update:modelValue", !1),
                i("postData", e);
            }
          },
          A = () => {
            (N.value = !1), (S.value = !1);
          },
          b = (e, l) => {
            a.api
              .interfaceTransfer({
                config: {
                  interfaceType: "GET",
                  interfaceModule: "GC_INFOMATION_CENTER",
                  interfaceMethod: "api/city/listCities",
                  interfaceFrom: "GC",
                  hotelGroupCode: n.hotelGroupCode,
                },
                query: {
                  countryCode: "CN",
                  provinceCode: l,
                  unitCode: n.hotelGroupCode,
                },
              })
              .then((a) => {
                if ((console.log(D), 1 == a.result && 0 == a.retVal.result)) {
                  D.cityData = a.retVal.retVal;
                  let l = a.retVal.retVal.find(
                    (e) => (
                      console.log(e),
                      e.descript == D.selectPlace[1] ||
                        e.descript.substr(0, 2) == D.selectPlace[1].substr(0, 2)
                    ),
                  );
                  console.log(l, "城市城市");
                  let t = { code: "NoCity", descript: "无匹配城市" };
                  "1" === e
                    ? ((w.value = l || t), console.log(w.value, "出发地"))
                    : ("2" === e || (w.value = l || t), (V.value = l || t));
                }
              });
          },
          B = () => {
            a.api
              .interfaceTransfer({
                config: {
                  interfaceType: "GET",
                  interfaceModule: "GC_INFOMATION_CENTER",
                  interfaceMethod: "api/city/listProvinces",
                  interfaceFrom: "GC",
                  hotelGroupCode: n.hotelGroupCode,
                },
                query: { countryCode: "CN", unitCode: n.hotelGroupCode },
              })
              .then((a) => {
                1 == a.result &&
                  0 == a.retVal.result &&
                  (D.provinceData = e.reactive(a.retVal.retVal));
              });
          },
          F = (a) =>
            new Promise((l, t) => {
              console.log("微信小程序/XHS端"),
                e.index.request({
                  url: "https://apis.map.qq.com/ws/geocoder/v1",
                  data: { key: o.key, output: "json", address: a.address },
                  success(e) {
                    console.log(e.data),
                      0 === e.data.status
                        ? l(e.data.result)
                        : l(Object.assign({}, e.data, { rows: [] }));
                  },
                  fail(e) {
                    console.log(e), t({ rows: [] });
                  },
                });
            }),
          O = async (a) => {
            let l = await ((t = { location: a.latitude + "," + a.longitude }),
            new Promise((a, l) => {
              console.log("微信小程序/XHS端"),
                e.index.request({
                  url: "https://apis.map.qq.com/ws/geocoder/v1",
                  data: { key: o.key, output: "json", location: t.location },
                  success(e) {
                    console.log(e.data),
                      0 === e.data.status
                        ? a(e.data.result)
                        : a(Object.assign({}, e.data, { rows: [] }));
                  },
                  fail(e) {
                    console.log(e), l({ rows: [] });
                  },
                });
            }));
            var t;
            let u = [],
              c = [];
            l.ad_info && l.ad_info.city && (u = [...l.ad_info.city]),
              l.ad_info && l.ad_info.province && (c = [...l.ad_info.province]),
              u.forEach((e, a) => {
                "市" === e && u.splice(a, 1);
              }),
              c.forEach((e, a) => {
                "省" === e && c.splice(a, 1);
              });
            let n = u.join(""),
              i = c.join("");
            (p.value = i + " " + n),
              (m.value = i + " " + n),
              (g.value.location.lat = a.latitude),
              (g.value.location.lng = a.longitude),
              (C.value.location.lat = a.latitude),
              (C.value.location.lng = a.longitude),
              (D.selectPlace = [i, n]),
              console.log("placeStartCityName.value", p.value),
              console.log("placeEndCityName.value", m.value);
            let d = [i, n];
            console.log(d, "当前位置的数组");
            let r = D.provinceData.find((e) => e.name == d[0]);
            r && r.code && b("3", r.code), (E.value = r), (j.value = r);
          },
          I = () => {
            console.log("选择人数PeopleNumberDateDialog", x.data),
              (d.value = o.deepClone(x.data)),
              (s.value = x.data.arrivedDate
                ? e.dayjs(x.data.arrivedDate).format("YYYY-MM-DD")
                : v.value);
            try {
              p.value =
                "" !== x.data.placeStartCityName
                  ? x.data.placeStartCityName.replace(/,/g, " ")
                  : "";
            } catch (e) {}
            try {
              m.value =
                "" !== x.data.placeEndCityName
                  ? x.data.placeEndCityName.replace(/,/g, " ")
                  : "";
            } catch (e) {}
            (w.value = {
              code: x.data.placeStartCityCode,
              descript: x.data.placeStartCityName,
            }),
              (V.value = {
                code: x.data.placeEndCityCode,
                descript: x.data.placeEndCityName,
              }),
              (g.value = {
                location: {
                  lat: x.data.placeStartCityLat,
                  lng: x.data.placeStartCityLng,
                },
              }),
              (C.value = {
                location: {
                  lat: x.data.placeEndCityLat,
                  lng: x.data.placeEndCityLng,
                },
              }),
              ("" !== p.value && "" !== m.value) ||
                ((async () => {
                  e.index.getSetting({
                    success(a) {
                      a.authSetting["scope.userLocation"]
                        ? e.index.getLocation({
                            type: "wgs84",
                            success: function (e) {
                              O(e);
                            },
                            fail(a) {
                              e.index.showModal({
                                title: "提示",
                                content: "若点击不授权，将无法使用位置功能",
                                cancelText: "不授权",
                                cancelColor: "#999",
                                confirmText: "授权",
                                confirmColor: "#f94218",
                                success(a) {
                                  a.confirm
                                    ? e.index.openSetting({
                                        success(e) {
                                          O(e);
                                        },
                                      })
                                    : a.cancel && console.log("用户点击不授权");
                                },
                              });
                            },
                          })
                        : e.index.authorize({
                            scope: "scope.userLocation",
                            success() {
                              e.index.getLocation({
                                type: "wgs84",
                                success: function (e) {
                                  O(e);
                                },
                                fail(e) {
                                  console.log("失败", e);
                                },
                              });
                            },
                            fail(a) {
                              console.log("拒绝授权", a),
                                e.index.showModal({
                                  title: "提示",
                                  content: "若点击不授权，将无法使用位置功能",
                                  cancelText: "不授权",
                                  cancelColor: "#999",
                                  confirmText: "授权",
                                  confirmColor: "#f94218",
                                  success(a) {
                                    a.confirm
                                      ? e.index.openSetting({
                                          success(e) {
                                            O(e);
                                          },
                                        })
                                      : a.cancel &&
                                        console.log("用户点击不授权");
                                  },
                                });
                            },
                          });
                    },
                  });
                })(),
                console.log("111111出发地返程没有"));
          };
        return (
          e.watch(
            () => x.modelValue,
            (e) => {
              (r.value = e), e && (q(), I());
            },
            { immediate: !0 },
          ),
          e.watch(
            () => x.data,
            (e) => {
              I();
            },
            { immediate: !0 },
          ),
          (a, l) =>
            e.e(
              {
                a: e.o(M),
                b: e.o((e) => (d.value.adult = e)),
                c: e.p({ modelValue: d.value.adult }),
                d: e.o((e) => (d.value.olderChildren = e)),
                e: e.p({ modelValue: d.value.olderChildren }),
                f: e.o((e) => (d.value.middleChildren = e)),
                g: e.p({ modelValue: d.value.middleChildren }),
                h: e.o((e) => (d.value.youngerChildren = e)),
                i: e.p({ modelValue: d.value.youngerChildren }),
                j: e.o((e) => (d.value.oldNum = e)),
                k: e.p({ modelValue: d.value.oldNum }),
                l: e.o((e) => (d.value.hmkNum = e)),
                m: e.p({ modelValue: d.value.hmkNum }),
                n: e.o((e) => (d.value.foreignerNum = e)),
                o: e.p({ modelValue: d.value.foreignerNum }),
                p: "" === s.value,
              },
              "" === s.value ? {} : { q: e.t(s.value) },
              { r: s.value, s: v.value, t: e.o(_), v: "" === p.value },
              "" === p.value ? {} : { w: e.t(p.value) },
              { x: e.o(P), y: e.p({ value: y.value }), z: "" === m.value },
              "" === m.value ? {} : { A: e.t(m.value) },
              {
                B: e.o(T),
                C: e.p({ value: h.value }),
                D: e.s(`max-height: calc(90vh - ${f.value}px - 122px)`),
                E: e.o(G),
                F: e.sr(L, "4f5f52fa-0", { k: "hookPeopleNumDate" }),
                G: e.o(k),
                H: e.p({ visible: r.value }),
              },
            )
        );
      },
    }),
    d = e._export_sfc(i, [["__scopeId", "data-v-4f5f52fa"]]);
  wx.createComponent(d);
})();
