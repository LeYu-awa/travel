!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../hooks/useScroll.js"),
    o = require("../utils.js");
  Math || (l + a)();
  const l = () => "../../components/coustomHead.js",
    a = () => "../components/RectTabs.js",
    n = e.defineComponent({
      __name: "map",
      setup(l) {
        const a = e.getCurrentInstance(),
          n = e.ref(null),
          { scrollTop: s, onPageScroll: i } = t.useScroll(),
          r = e.ref(!0),
          c = e.ref("map1");
        e.ref(44);
        const u = e.ref(0),
          d = e.ref(0),
          g = e.ref(0),
          h = e.ref(0);
        e.ref([]);
        const v = e.ref([]),
          f = e.ref([]),
          p = e.ref([]);
        e.reactive({
          translateMarkerMsg: "",
          animationEnd: !1,
          centerPoints: { latitude: 0, longitude: 0 },
          southwest: { latitude: 0, longitude: 0 },
          northeast: { latitude: 0, longitude: 0 },
          moveToLocationMsg: "",
          scale: 0,
        });
        const m = e.ref([]),
          y = e.ref([{ id: 0, name: "概览" }]),
          x = e.ref([]),
          D = e.ref([]),
          w = e.ref(Number),
          _ = e.ref(13);
        e.ref(null);
        const b = [!0];
        e.onUnload(() => {
          r.value = !1;
        }),
          e.onReady(() => {
            C(), console.log("onready end");
          });
        const C = () => {
          (r.value = !0),
            (n.value = e.index.createMapContext(c.value, a.proxy)),
            (w.value = 0),
            S();
        };
        e.onLoad((e) => {
          (r.value = !1),
            (m.value = JSON.parse(decodeURIComponent(e.data))),
            console.log("行程数据", m),
            y.value.push(
              ...m.value.map((e, t) => ({
                id: t + 1,
                name: "DAY " + e.rsvDay,
              })),
            ),
            m.value
              .flatMap((e) => e.dayDetailDtos)
              .forEach((e) => {
                (e.lat = +e.lat), (e.lng = +e.lng);
              });
          const t = [];
          for (let e of m.value) {
            const o = e.dayDetailDtos.filter(
              (e) => e.lat && e.lat > 0 && "hotel" === e.resourceType,
            );
            let l = {};
            o && o.length > 0 && ((l = o[0]), (l.rsvDay = e.rsvDay), t.push(l));
          }
          const o = JSON.parse(JSON.stringify(t[t.length - 1]));
          (o.rsvDay = +o.rsvDay + 1), t.push(o);
          const l = t.reduce((e, t) => {
              const o = e[e.length - 1];
              return (
                o && o.hotelDto.hotelCode === t.hotelDto.hotelCode
                  ? (o.rsvDay += "/" + t.rsvDay)
                  : e.push({ ...t }),
                e
              );
            }, []),
            a = new Set();
          for (let e = 0; e < l.length; e++) {
            const t = l[e];
            if (a.has(t.hotelDto.hotelCode)) continue;
            const o = [t];
            for (let a = e + 1; a < l.length; a++) {
              const e = l[a];
              t.hotelDto.hotelCode === e.hotelDto.hotelCode &&
                ((t.rsvDay += "/" + e.rsvDay), o.push(e));
            }
            if ((a.add(t.hotelDto.hotelCode), o.length <= 1)) continue;
            const n = o[0];
            for (let e = 1; e < o.length; e++) o[e].rsvDay = n.rsvDay;
          }
          l.forEach((e) => (e.rsvDay = "DAY " + e.rsvDay)),
            (D.value = l),
            0 === D.value.length && O();
        }),
          e.onMounted(() => {
            e.index.getSystemInfo({
              success: (e) => {
                console.log(e),
                  0 !== e.statusBarHeight
                    ? (g.value = e.statusBarHeight + 53)
                    : (g.value = 16);
              },
              fail(e) {
                console.log(e);
              },
            });
          });
        const L = (e) => {
            for (let e = 0; e < b.length; e++) b[e] = !1;
            if (
              ((b[e.value.id] = !0),
              (w.value = e.value.id),
              (x.value = []),
              (v.value = []),
              (p.value = []),
              0 === e.index)
            )
              return void S();
            const t = m.value[e.index - 1];
            t &&
              (x.value = t.dayDetailDtos.filter(
                (e) =>
                  "hotel" === e.resourceType || "activity" === e.resourceType,
              ));
            const o = x.value.filter((e) => e.lat && e.lat > 0);
            0 !== o.length && k(o);
          },
          S = () => {
            if (0 !== D.value.length) {
              if (1 === D.value.length) {
                const e = D.value[0];
                return j(e), void q(D.value);
              }
              P(D.value, "overview"),
                q(D.value),
                T(D.value).then(() => {
                  q(D.value);
                });
            }
          },
          T = async (e) => {
            const t = w.value;
            let o = e[0];
            const l = [];
            for (let t = 1; t < e.length; t++) {
              const a = e[t],
                n = await E({
                  from: o.lat + "," + o.lng,
                  to: a.lat + "," + a.lng,
                  waypoints: "",
                });
              (o.path = n),
                l.push({
                  points: n,
                  color: "#A43127",
                  borderColor: "#A43127",
                  dottedLine: !1,
                  width: 5,
                  borderWidth: 2,
                }),
                (o = a);
            }
            if ((console.log(`LOCK: ${t} --------- ${b}`), b[t])) {
              p.value = l;
              for (let t of e)
                if (t.path) {
                  const e = Math.trunc(t.path.length / 2);
                  t.middlePoint = {
                    lat: t.path[e].latitude,
                    lng: t.path[e].longitude,
                  };
                }
              M();
            }
          },
          M = (e) => {},
          k = (e) => {
            if (1 === e.length) {
              const t = e[0];
              return j(t), void q();
            }
            P(e, "day"), A(e), q();
          },
          j = (e) => {
            (d.value = e.lng),
              (u.value = e.lat),
              v.value.push(
                ((e) => ({
                  id: 1,
                  latitude: e.lat,
                  longitude: e.lng,
                  zIndex: "1",
                  rotate: 0,
                  iconPath:
                    "https://songtsam-internal-static.oss-cn-chengdu.aliyuncs.com/mobile/assets/travel-assistant/map-markers.png",
                  width: 30,
                  height: 30,
                  anchor: { x: 0.5, y: 0.5 },
                }))(e),
              );
          },
          P = (e, t) => {
            let o = [];
            e.forEach((e, l) => {
              var a, n;
              "day" === t
                ? o.push(
                    ((n = l + 1),
                    {
                      id: l + 1,
                      latitude: (a = e).lat,
                      longitude: a.lng,
                      rotate: 0,
                      anchor: { x: 0.5, y: 0.5 },
                      width: 1,
                      height: 1,
                      iconPath:
                        "https://songtsam-internal-static.oss-cn-chengdu.aliyuncs.com/mobile/assets/travel-assistant/map-markers-num.png",
                      label: {
                        content: n.toString(),
                        color: "#fff",
                        fontSize: 16,
                        bgColor: "#262626",
                        width: 30,
                        height: 30,
                        anchorX: -15,
                        anchorY: -15,
                        borderWidth: 2,
                        borderColor: "#ffffff",
                        borderRadius: 30,
                      },
                    }),
                  )
                : o.push(
                    ((e, t, o) => ({
                      id: e,
                      latitude: t.lat,
                      longitude: t.lng,
                      zIndex: "1",
                      rotate: 0,
                      iconPath:
                        "https://songtsam-internal-static.oss-cn-chengdu.aliyuncs.com/mobile/assets/travel-assistant/markers-spot.png",
                      width: 16,
                      height: 16,
                      anchor: { x: 0.5, y: 0.5 },
                      callout: {
                        content: o,
                        display: "ALWAYS",
                        color: "#ffffff",
                        fontSize: 12,
                        bgColor: "#262626",
                        borderWidth: 2,
                        borderColor: "#ffffff",
                        borderRadius: 30,
                        padding: 10,
                        anchorY: 0,
                        anchorX: 0,
                      },
                    }))(l + 1, e, e.rsvDay),
                  );
            }),
              (v.value = o);
          },
          A = (e) => {
            const t = e[0],
              o = e[e.length - 1];
            let l = "";
            e.length > 2 &&
              (l = e
                .slice(1, e.length - 1)
                .map((e) => e.lat + "," + e.lng)
                .join(";"));
            const a = w.value;
            E({
              from: t.lat + "," + t.lng,
              to: o.lat + "," + o.lng,
              waypoints: l,
            }).then((e) => {
              b[a] &&
                (p.value = [
                  {
                    points: e,
                    color: "#A43127",
                    borderColor: "#A43127",
                    dottedLine: !1,
                    width: 5,
                    borderWidth: 2,
                  },
                ]);
            });
          },
          q = (e) => {
            const t = v.value.map((e) => ({
                lat: e.latitude,
                lng: e.longitude,
              })),
              o = z(t);
            var l, a;
            (d.value = o.lng),
              (u.value = o.lat),
              (l = o.lat),
              (a = o.lng),
              n.value &&
                n.value.moveToLocation({
                  latitude: l,
                  longitude: a,
                  success: (e) => {},
                  fail: (e) => {
                    console.log("第四步", e);
                  },
                });
            const s = (function (e) {
              const t = e.maxLat - e.minLat,
                o = e.maxLng - e.minLng;
              let l = 1 / (0.5 * Math.max(t, o) + 0.1) + 5.2;
              return Math.min(Math.max(l, 3), 16);
            })(I(t));
            _.value = s;
          },
          z = (e) => {
            const t = e.length,
              o = e.reduce(
                (e, t) => ((e.lat += +t.lat), (e.lng += +t.lng), e),
                { lat: 0, lng: 0 },
              );
            return { lat: o.lat / t, lng: o.lng / t };
          },
          I = (e) => {
            let t = 1 / 0,
              o = -1 / 0,
              l = 1 / 0,
              a = -1 / 0;
            return (
              e.forEach((e) => {
                e.lat < t && (t = e.lat),
                  e.lat > o && (o = e.lat),
                  e.lng < l && (l = e.lng),
                  e.lng > a && (a = e.lng);
              }),
              { minLat: t, maxLat: o, minLng: l, maxLng: a }
            );
          },
          E = (e) =>
            new Promise((t, o) => {
              H(e)
                .then((e) => {
                  const o = e.routes[0].polyline;
                  for (let e = 2; e < o.length; e++)
                    o[e] = o[e - 2] + o[e] / 1e6;
                  const l = [];
                  for (let e = 0; e < o.length; e += 2)
                    l.push({ latitude: o[e], longitude: o[e + 1] });
                  t(l);
                })
                .catch((e) => {
                  console.log("路线规划失败", e), o([]);
                });
            }),
          H = (t) =>
            new Promise((l, a) => {
              console.log("微信小程序/XHS端"),
                e.index.request({
                  url: "https://apis.map.qq.com/ws/direction/v1/driving/",
                  data: {
                    key: o.key,
                    output: "json",
                    from: t.from,
                    to: t.to,
                    waypoints: t.waypoints,
                    callback: "cb",
                  },
                  success(e) {
                    0 === e.data.status
                      ? l(e.data.result)
                      : l(Object.assign({}, e.data, { rows: [] }));
                  },
                  fail(e) {
                    console.log(e), a({ rows: [] });
                  },
                });
            }),
          O = async () => {
            e.index.getSetting({
              success(t) {
                t.authSetting["scope.userLocation"]
                  ? e.index.getLocation({
                      type: "wgs84",
                      success: function (e) {
                        (u.value = e.latitude), (d.value = e.longitude);
                      },
                      fail(t) {
                        e.index.showModal({
                          title: "提示",
                          content: "若点击不授权，将无法使用位置功能",
                          cancelText: "不授权",
                          cancelColor: "#999",
                          confirmText: "授权",
                          confirmColor: "#f94218",
                          success(t) {
                            t.confirm
                              ? e.index.openSetting({
                                  success(e) {
                                    (u.value = e.latitude),
                                      (d.value = e.longitude);
                                  },
                                })
                              : t.cancel && console.log("用户点击不授权");
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
                            (u.value = e.latitude), (d.value = e.longitude);
                          },
                          fail(e) {
                            console.log("失败", e);
                          },
                        });
                      },
                      fail(t) {
                        console.log("拒绝授权", t),
                          e.index.showModal({
                            title: "提示",
                            content: "若点击不授权，将无法使用位置功能",
                            cancelText: "不授权",
                            cancelColor: "#999",
                            confirmText: "授权",
                            confirmColor: "#f94218",
                            success(t) {
                              t.confirm
                                ? e.index.openSetting({
                                    success(e) {
                                      (u.value = e.latitude),
                                        (d.value = e.longitude);
                                    },
                                  })
                                : t.cancel && console.log("用户点击不授权");
                            },
                          });
                      },
                    });
              },
            });
          };
        return (
          i((e) => {
            s.value = e.scrollTop;
          }),
          (t, o) =>
            e.e(
              {
                a: e.p({ title: "", bgColor: "transparent" }),
                b: e.o(L),
                c: e.o((e) => (h.value = e)),
                d: e.p({ canCancel: !1, data: y.value, modelValue: h.value }),
                e: r.value,
              },
              r.value
                ? {
                    f: c.value,
                    g: _.value,
                    h: p.value,
                    i: d.value,
                    j: u.value,
                    k: v.value,
                    l: f.value,
                  }
                : {},
              { m: 0 !== w.value },
              0 !== w.value
                ? {
                    n: e.f(x.value, (t, o, l) =>
                      e.e(
                        { a: "activity" === t.resourceType },
                        "activity" === t.resourceType
                          ? {
                              b:
                                t.activityDto.activityPicUrl +
                                "?imageView2/1/w/48/h/48&x-oss-process=image/resize,m_fill,w_48,h_48",
                              c: e.t(o + 1),
                              d: e.t(
                                null == t ? void 0 : t.activityDto.activityDesc,
                              ),
                              e: e.t(t.activityDto._st_activityDuration),
                              f: e.t(t.descript),
                              g: e.n(
                                1 === x.value.length
                                  ? "list_text_wrap_single"
                                  : "list_text_wrap",
                              ),
                            }
                          : {},
                        { h: "hotel" === t.resourceType },
                        "hotel" === t.resourceType
                          ? e.e(
                              {
                                i:
                                  t.picture +
                                  "?imageView2/1/w/48/h/48&x-oss-process=image/resize,m_fill,w_48,h_48",
                                j: o > 0,
                              },
                              o > 0 ? { k: e.t(o + 1) } : {},
                              {
                                l: e.t(
                                  null == t ? void 0 : t.hotelDto.hotelDesc,
                                ),
                                m: e.t(t.hotelDto._roomTypes),
                                n: e.t(t.descript),
                                o: e.n(
                                  1 === x.value.length
                                    ? "list_text_wrap_single"
                                    : "list_text_wrap",
                                ),
                                p: e.n(
                                  1 === x.value.length
                                    ? "list_item_single"
                                    : "list_item",
                                ),
                              },
                            )
                          : {},
                        { q: o },
                      ),
                    ),
                    o: e.n(
                      1 === x.value.length ? "list_item_single" : "list_item",
                    ),
                  }
                : {},
            )
        );
      },
    });
  n.__runtimeHooks = 1;
  const s = e._export_sfc(n, [["__scopeId", "data-v-3a1fa5cc"]]);
  wx.createPage(s);
})();
