!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    l = require("../../utils/api.js"),
    a = require("../../hooks/useScroll.js"),
    t = require("../../utils/wxuser.js"),
    o = require("../../utils/helper.js"),
    u = require("../../utils/qdTracker.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (s + r + n)();
  const s = () => "../../components/coustomHead.js",
    r = () => "../components/LineTabs.js",
    n = () => "../components/dialogs/DetailDialog.js",
    i = e.defineComponent({
      __name: "destination",
      setup(s) {
        const r = t.getStorage("config"),
          { scrollTop: n, onPageScroll: i } = a.useScroll(),
          v = e.ref(!1);
        e.ref(!1);
        const d = e.ref(!1),
          c = e.ref([]),
          f = e.ref([]),
          h = e.ref(0),
          g = e.ref(0),
          p = e.ref(0),
          m = e.ref(0),
          C = e.ref(0),
          b = e.ref(!1);
        e.ref(!0);
        const x = e.ref({}),
          T = e.ref("");
        e.ref(!1), e.ref({});
        const y = e.ref([]);
        e.ref(0),
          e.ref([]),
          e.ref([
            { id: 1, name: "测试1" },
            { id: 2, name: "测试2" },
            { id: 3, name: "测试3" },
            { id: 4, name: "测试4" },
          ]),
          e.ref(!1);
        const D = e.ref(-1),
          k = e.ref({}),
          N = e.ref(!1),
          j = e.ref(0),
          _ = e.ref(!0),
          q = e.ref("");
        e.ref(0);
        const G = e.ref([]),
          A = e.ref([]),
          L = e.ref([]),
          S = e.ref(""),
          w = e.ref(!1),
          V = e.ref("");
        i((l) => {
          n.value = l.scrollTop;
          const a = e.index.createSelectorQuery();
          a.selectAll(".tabs").boundingClientRect(),
            a.exec((e) => {
              e[0].length > 0 &&
                e[0][0].top &&
                (e[0][0].top < g.value + 44 ? (v.value = !0) : (v.value = !1));
            });
        });
        const z = (e, l) => {
            e.dataCheckbox = !1;
            for (let l = 0; l < y.value.length; l++)
              y.value[l].id === e.id && y.value.splice(l, 1);
            console.log(e),
              0 === y.value.length && ((j.value = 0), (_.value = !0));
          },
          U = (e, l) => {
            console.log(e),
              (V.value = e.seriesName),
              (S.value = "a" + l),
              (C.value = l),
              (m.value = l),
              console.log(e.bizType),
              console.log(j.value),
              console.log(e.bizType !== j.value),
              0 !== j.value &&
                (e.bizType !== j.value
                  ? ((_.value = !1),
                    (w.value = !0),
                    setTimeout(() => {
                      w.value = !1;
                    }, 4e3))
                  : (_.value = !0)),
              (f.value = e.lineDestDtos);
          },
          M = () => {
            O();
          },
          O = () => {
            var a;
            e.index.showLoading({ title: "加载中", mask: !0 });
            let t = [];
            (A.value = []), (G.value = []), (t = y.value);
            for (let e = 0; e < t.length; e++) {
              let l = [];
              for (let a = 0; a < t[e].hotelList.length; a++)
                l.push(t[e].hotelList[a].hotelCode);
              A.value.push(t[e].destCode),
                G.value.push({
                  destCode: t[e].destCode,
                  destName: t[e].destName,
                  seriesName: c.value[C.value].seriesName,
                  hotelCodes: l,
                });
            }
            console.log(G.value, "推荐接口"),
              u.qdTracker.track("create_travel_click", {
                button_name: "创建行程",
                line: c.value[C.value].seriesName,
                destination: (
                  (null == (a = y.value) ? void 0 : a.map((e) => e.destName)) ||
                  []
                ).join(","),
              }),
              l.api
                .interfaceTransfer({
                  config: {
                    interfaceType: "POST",
                    interfaceModule: "GC_PRODUCT_JOURNEY",
                    interfaceMethod:
                      "api/travelAssistant/listTravelProductForWechat",
                    interfaceFrom: "GC",
                    hotelGroupCode: r.hotelGroupCode,
                  },
                  query: {
                    unitCode: r.hotelGroupCode,
                    destList: G.value,
                    otaChannel: "WECHAT",
                  },
                })
                .then((l) => {
                  if (
                    (e.index.hideLoading(),
                    1 == l.result && 0 == l.retVal.result)
                  )
                    if (((L.value = l.retVal.retVal), L.value.length <= 0))
                      console.log(A.value, "没有推荐跳编辑"),
                        e.index.navigateTo({
                          url:
                            "/pagesTravelAssistant/journey/edit?destCodes=" +
                            A.value.join(","),
                        });
                    else {
                      console.log("selectedlist.value", y.value);
                      for (let e = 0; e < y.value.length; e++)
                        for (let l = 0; l < y.value[e].hotelList.length; l++)
                          delete y.value[e].hotelList[l].htmlInfo;
                      e.index.navigateTo({
                        url:
                          "/pagesTravelAssistant/journey/recommend?selectedlist=" +
                          encodeURIComponent(JSON.stringify(G.value)),
                      }),
                        console.log(G.value, "destination数据数据");
                    }
                })
                .catch(() => {
                  e.index.hideLoading();
                });
          };
        e.onMounted(() => {
          e.index.getSystemInfo({
            success: (e) => {
              (g.value = e.statusBarHeight + 20),
                (p.value = e.statusBarHeight + 53),
                (h.value = g.value + 20),
                l.api
                  .interfaceTransfer({
                    config: {
                      interfaceType: "GET",
                      interfaceModule: "GC_PRODUCT_JOURNEY",
                      interfaceMethod: "api/planDict/seriesDestList",
                      interfaceFrom: "GC",
                      hotelGroupCode: r.hotelGroupCode,
                    },
                    query: { unitCode: r.hotelGroupCode },
                  })
                  .then((e) => {
                    if (1 == e.result && 0 == e.retVal.result) {
                      c.value = e.retVal.retVal;
                      for (let e = 0; e < c.value.length; e++) {
                        (c.value[e].name = c.value[e].seriesName),
                          (c.value[e].id = e);
                        for (let l = 0; l < c.value[e].lineDestDtos.length; l++)
                          (c.value[e].lineDestDtos[l].id =
                            c.value[e].seriesCode +
                            c.value[e].lineDestDtos[l].destCode),
                            (c.value[e].lineDestDtos[l].dataCheckbox = !1),
                            (c.value[e].lineDestDtos[l].bizType =
                              c.value[e].bizType);
                      }
                      (f.value = c.value[0].lineDestDtos), console.log(f.value);
                    }
                  });
            },
            fail(e) {
              console.log(e);
            },
          });
        }),
          e.ref({});
        const P = e.ref([]);
        return (
          e.ref(0),
          e.ref([]),
          (l, a) =>
            e.e(
              {
                a: e.p({
                  title: e.unref(n) > 20 ? "您想去哪里？" : "",
                  color: "#000",
                  bgColor: e.unref(n) > 20 ? "#fff" : "",
                }),
                b: p.value + "px",
                c: e.f(c.value, (l, a, t) =>
                  e.e(
                    { a: C.value === a },
                    (C.value, {}),
                    { b: C.value === a },
                    C.value === a
                      ? {}
                      : {
                          c: e.unref(o.imageView2)({
                            url: l.picUrl,
                            mode: 1,
                            width: 326,
                            height: 156,
                          }),
                        },
                    {
                      d: e.t(l.name),
                      e: e.t(l.description),
                      f: "a" + a,
                      g: a,
                      h: e.o((e) => U(l, a), a),
                    },
                  ),
                ),
                d: S.value,
                e: e.unref(n) > 140,
              },
              e.unref(n) > 140
                ? e.e(
                    { f: v.value },
                    v.value
                      ? e.e({ g: c.value.length > 0 }, (c.value.length, {}))
                      : {},
                    { h: c.value.length > 0 },
                    c.value.length > 0
                      ? {
                          i: e.o(U),
                          j: e.p({
                            datas: c.value,
                            type: "line",
                            color: "#A43127",
                            titleInactiveColor: "#808080",
                            titleActiveColor: "#000000",
                            flexNum: "F",
                            isAjax: b.value,
                            activeType: m.value,
                            customWrapStyle: "padding-top:20px",
                          }),
                        }
                      : {},
                    { k: v.value ? 1 : "", l: h.value + "px" },
                  )
                : {},
              {
                m: e.f(f.value, (l, a, t) =>
                  e.e(
                    {
                      a: e.unref(o.imageView2)({
                        url: l.picUrl,
                        mode: 1,
                        width: 188,
                        height: 188,
                      }),
                      b: e.t(l.destName),
                      c: e.f(l.tagNames, (l, a, t) => ({ a: e.t(l), b: a })),
                      d: e.t(l.description),
                      e:
                        !1 === l.dataCheckbox &&
                        y.value.length < 3 &&
                        !0 === _.value,
                    },
                    !1 === l.dataCheckbox &&
                      y.value.length < 3 &&
                      !0 === _.value
                      ? {
                          f: e.o(
                            (e) =>
                              ((e, l) => {
                                y.value.push(e),
                                  (f.value[l].dataCheckbox = !0),
                                  (j.value = e.bizType),
                                  console.log(y.value);
                              })(l, a),
                            a,
                          ),
                        }
                      : {},
                    { g: !0 === l.dataCheckbox && !0 === _.value },
                    !0 === l.dataCheckbox && !0 === _.value
                      ? {
                          h: e.o(
                            (e) =>
                              ((e, l) => {
                                f.value[l].dataCheckbox = !1;
                                for (let l = 0; l < y.value.length; l++)
                                  y.value[l].destCode === e.destCode &&
                                    y.value.splice(l, 1);
                                0 === y.value.length &&
                                  ((j.value = 0), (_.value = !0)),
                                  console.log(y.value);
                              })(l, a),
                            a,
                          ),
                        }
                      : {},
                    {
                      i:
                        (!1 === l.dataCheckbox && y.value.length >= 3) ||
                        !1 === _.value,
                    },
                    ((!1 === l.dataCheckbox && y.value.length >= 3) || _.value,
                    {}),
                    {
                      j: a,
                      k: e.o((e) => {
                        return (
                          (a = l),
                          (x.value = a),
                          (T.value = "travel"),
                          void (d.value = !0)
                        );
                        var a;
                      }, a),
                    },
                  ),
                ),
                n: e.n(0 === y.value.length ? "data-list" : "data-list-active"),
                o: y.value.length > 0,
              },
              y.value.length > 0
                ? e.e(
                    { p: N.value },
                    N.value
                      ? {
                          q: e.f(P.value, (l, a, t) => ({
                            a: e.t(a + 1),
                            b: e.t(l.destName),
                            c: e.o((e) => z(l), a),
                            d: e.s(l.shadowStyle),
                            e: D.value === a ? 1 : "",
                            f: a,
                            g: a,
                          })),
                          r: e.t(k.value.index + 1),
                          s: e.t(k.value.destName),
                          t: N.value ? 1 : "",
                          v: e.s(q.value),
                        }
                      : {},
                    {
                      w: e.f(y.value, (l, a, t) => ({
                        a: e.t(a + 1),
                        b: e.t(l.destName),
                        c: e.o((e) => z(l), a),
                        d: D.value === a ? 1 : "",
                        e: a,
                        f: a,
                      })),
                      x: N.value ? 0 : 1,
                      y: N.value ? 1 : "",
                      z: e.o(M),
                    },
                  )
                : {},
              { A: w.value },
              (w.value, {}),
              {
                B: e.o((e) => (d.value = e)),
                C: e.p({ data: x.value, modelValue: d.value }),
              },
            )
        );
      },
    });
  i.__runtimeHooks = 1;
  const v = e._export_sfc(i, [["__scopeId", "data-v-089b1a6e"]]);
  wx.createPage(v);
})();
