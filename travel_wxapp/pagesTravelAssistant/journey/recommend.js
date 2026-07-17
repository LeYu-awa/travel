!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../hooks/useScroll.js"),
    a = require("../../utils/api.js"),
    o = require("../../base/product.js"),
    r = require("../../utils/wxuser.js"),
    l = require("../../utils/helper.js"),
    s = require("../../utils/qdTracker.js");
  Math || i();
  const i = () => "../../components/coustomHead.js",
    u = e.defineComponent({
      __name: "recommend",
      props: { product: null },
      setup(i) {
        const u = r.getStorage("config"),
          { scrollTop: n, onPageScroll: c } = t.useScroll(),
          p = e.ref([]),
          d = e.ref([]),
          g = e.ref([]),
          v = e.ref(0),
          f = i;
        e.computed(() =>
          o.productTypeMetaList.find((e) => e.name === f.product.type),
        ),
          c((e) => {
            n.value = e.scrollTop;
          });
        const m = () => {
            var t;
            s.qdTracker.track("create_travel_click", {
              button_name: "跳过推荐，继续创建",
              line: d.value[0].seriesName,
              destination: (
                (null == (t = d.value) ? void 0 : t.map((e) => e.destName)) ||
                []
              ).join(","),
            }),
              e.index.navigateTo({
                url: `/pagesTravelAssistant/journey/edit?destCodes=${g.value.join(
                  ",",
                )}&seriesName=${d.value[0].seriesName}`,
              });
          },
          h = (t) => {
            e.index.navigateTo({
              url: `/pagesB/travel/travelDetail?travelType=${t.travelType}&pageType=recommend`,
            });
          };
        return (
          e.onLoad((e) => {
            (d.value = JSON.parse(decodeURIComponent(e.selectedlist))),
              console.log(d.value, "传参传参传参");
            for (let e = 0; e < d.value.length; e++)
              g.value.push(d.value[e].destCode);
            a.api
              .interfaceTransfer({
                config: {
                  interfaceType: "POST",
                  interfaceModule: "GC_PRODUCT_JOURNEY",
                  interfaceMethod:
                    "api/travelAssistant/listTravelProductForWechat",
                  interfaceFrom: "GC",
                  hotelGroupCode: u.hotelGroupCode,
                },
                query: {
                  unitCode: u.hotelGroupCode,
                  destList: d.value,
                  otaChannel: "WECHAT",
                },
              })
              .then((e) => {
                if (1 == e.result && 0 == e.retVal.result) {
                  if (e.retVal.retVal.length <= 0)
                    return console.log(e.retVal.retVal, "1111111111"), void m();
                  (p.value = o
                    .formatFeedProductList({ list: e.retVal.retVal })
                    .map(
                      (e) => (
                        "DestPackage" === e.categorySub
                          ? (e.type = "DestPackage")
                          : (e.type = "Travel"),
                        {
                          ...e,
                          productTypeData: o.productTypeMetaList.find(
                            (t) => t.name === e.type,
                          ),
                        }
                      ),
                    )),
                    console.log(p.value);
                }
              });
          }),
          e.onMounted(() => {
            e.index.getSystemInfo({
              success: (e) => {
                console.log(e),
                  0 !== e.statusBarHeight
                    ? (v.value = e.statusBarHeight + 53)
                    : (v.value = 16);
              },
              fail(e) {
                console.log(e);
              },
            });
          }),
          (t, a) => ({
            a: e.p({ color: "#000", bgColor: e.unref(n) > 40 ? "#fff" : "" }),
            b: v.value + "px",
            c: e.f(p.value, (t, a, o) =>
              e.e(
                { a: 1 === t.matchRate },
                (t.matchRate, {}),
                {
                  b: t.productTypeData.icon,
                  c: e.t(t.productTypeData.title),
                  d: t.themes.length,
                },
                t.themes.length
                  ? { e: e.f(t.themes, (t, a, o) => ({ a: e.t(t), b: a })) }
                  : {},
                {
                  f: e.unref(l.imageView2)({
                    url: t.urls[0].url,
                    mode: 1,
                    width: 686,
                    height: 516,
                  }),
                  g: e.t(t.title),
                  h: e.t(t.productItineraryDesc),
                  i: e.t(t.subtitle),
                  j: t.tagApiDtos && t.tagApiDtos.length,
                },
                t.tagApiDtos && t.tagApiDtos.length
                  ? {
                      k: e.f(t.tagApiDtos, (t, a, o) => ({
                        a: e.t(t.tageDesc),
                        b: "product-tag-" + a,
                      })),
                    }
                  : {},
                {
                  l: e.t(t.startingPrice),
                  m: e.t(t.priceModelDesc),
                  n: e.o((e) => h(t), t.id),
                  o: e.o((e) => h(t), t.id),
                  p: t.id,
                },
              ),
            ),
            d: v.value + 38 + "px",
            e: e.o(m),
          })
        );
      },
    });
  u.__runtimeHooks = 1;
  const n = e._export_sfc(u, [["__scopeId", "data-v-f459a678"]]);
  wx.createPage(n);
})();
