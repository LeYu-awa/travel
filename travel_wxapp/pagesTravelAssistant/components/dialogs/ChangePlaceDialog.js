!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    o = require("../../../utils/api.js"),
    t = require("../../../utils/wxuser.js");
  Math || (c + i + a + l)();
  const l = () => "./BottomDialog.js",
    a = () => "../../../components/new/FixedBottomView.js",
    i = () => "../../../components/new/StButton.js",
    c = () => "../../../components/new/StRadio.js",
    n = e.defineComponent({
      __name: "ChangePlaceDialog",
      props: {
        modelValue: { type: Boolean, default: !1 },
        title: null,
        hotelCode: null,
        cityCode: null,
      },
      emits: ["update:modelValue", "confirm"],
      setup(l, { emit: a }) {
        const i = a,
          c = l,
          n = e.ref(),
          d = t.getStorage("config"),
          r = e.ref(!1),
          u = e.ref([]),
          s = e.ref({}),
          p = () => {
            m(), i("update:modelValue", !1), i("confirm", s.value);
          },
          h = (e) => {
            0 === e && i("update:modelValue", !1);
          },
          m = () => {
            r.value = !1;
          };
        return (
          e.watch(
            () => c.modelValue,
            (t) => {
              (r.value = t),
                t &&
                  e.nextTick$1(() => {
                    e.index.showLoading({ title: "加载中" }),
                      o.api
                        .interfaceTransfer({
                          config: {
                            interfaceType: "GET",
                            interfaceModule: "GC_INFOMATION_CENTER",
                            interfaceMethod: "/api/hotel/hotelInfoWithPlace",
                            interfaceFrom: "GC",
                            hotelGroupCode: d.hotelGroupCode,
                          },
                          query: {
                            unitCode: d.hotelGroupCode,
                            hotelCode: c.hotelCode,
                          },
                        })
                        .then((o) => {
                          e.index.hideLoading(),
                            console.log("抵离地列表", o),
                            console.log("props.cityCode", c.cityCode),
                            (u.value = o.retVal.retVal.placeList.map(
                              (e) => (
                                e.cityCode === c.cityCode && (s.value = e),
                                { ...e, _checked: e.cityCode === c.cityCode }
                              ),
                            ));
                        })
                        .catch((o) => {
                          e.index.hideLoading();
                        });
                  });
            },
            { immediate: !0 },
          ),
          (o, t) => ({
            a: e.f(u.value, (o, t, l) => ({
              a: e.t(o.cityName),
              b: "59163416-1-" + l + ",59163416-0",
              c: e.p({ "model-value": o._checked }),
              d: e.o(
                (e) =>
                  ((e) => {
                    u.value.forEach((e) => {
                      e._checked = !1;
                    }),
                      (e._checked = !0),
                      (s.value = e);
                  })(o),
                t,
              ),
              e: t,
            })),
            b: e.o(p),
            c: e.p({
              theme: "black",
              customStyle: {
                height: "48px",
                color: "#fff",
                borderRadius: "4px",
              },
              block: !0,
            }),
            d: e.p({
              theme: "white",
              "custom-style": { backgroundColor: "#fff", zIndex: 10 },
            }),
            e: e.sr(n, "59163416-0", { k: "hookChangePlaceDialog" }),
            f: e.o(h),
            g: e.p({ visible: r.value, title: c.title }),
          })
        );
      },
    }),
    d = e._export_sfc(n, [["__scopeId", "data-v-59163416"]]);
  wx.createComponent(d);
})();
