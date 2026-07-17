!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    t = require("../../../utils/api.js"),
    a = require("../../../utils/wxuser.js"),
    i = require("../../types/enum.js"),
    o = require("../../../utils/platform.js");
  Math || (r + s + l)();
  const l = () => "./BottomDialog.js",
    r = () => "../buttons/CloseButton.js",
    s = () => "../../../components/swiperBox.js",
    n = e.defineComponent({
      __name: "DetailDialog",
      props: {
        modelValue: { type: Boolean, default: !1 },
        data: null,
        type: { default: i.DetailType.DESTINATION },
        code: null,
      },
      emits: ["update:modelValue"],
      setup(l, { emit: r }) {
        const s = r,
          n = l,
          u = a.getStorage("config"),
          d = e.ref(),
          c = e.ref("90vh"),
          p = e.ref(!1),
          h = e.ref({
            descriptShort: "",
            altitude: 0,
            phone: "",
            htmlInfo: "",
            address1: "",
            pictures: "",
            _pictures: [],
          }),
          v = e.ref({
            name: "",
            activityDuration: 0,
            activityClass: "",
            classDescript: "",
            activityType: "",
            typeDescript: "",
            powerLevel: "",
            introduce: "",
            roundPictures: "",
            _roundPictures: [],
            _activityDuration: "0",
          }),
          g = e.reactive({
            indicatorDots: !1,
            circular: !0,
            autoplay: !0,
            dotPosStyle: "left: 50%; transform: translateX(-50%); bottom:8px;",
            slot: !0,
          }),
          m = e.reactive({ LOWER: "低", MIDDLE: "中", HIGH: "高" }),
          f = e.computed(() =>
            v.value.powerLevel ? m[v.value.powerLevel] : "",
          );
        e.onMounted(() => {
          console.log("dialogHeightdialogHeightdialogHeight"),
            e.index.getSystemInfo({
              success: (t) => {
                const a = o.getMenuButtonBoundingClientRect(),
                  i = e.index.getEnterOptionsSync();
                i.scene && 1154 === i.scene
                  ? (c.value = "80vh")
                  : (c.value = t.screenHeight - a.top - a.height - 6 + "px");
              },
              fail(e) {
                console.log(e);
              },
            });
        });
        const y = (e) => {
            0 === e && s("update:modelValue", !1);
          },
          T = () => {
            p.value = !1;
          };
        return (
          e.watch(
            () => n.modelValue,
            (a) => {
              (p.value = a),
                a &&
                  (n.type === i.DetailType.HOTEL
                    ? (e.index.showLoading({ title: "加载中" }),
                      t.api
                        .interfaceTransfer({
                          config: {
                            interfaceType: "GET",
                            interfaceModule: "GC_INFOMATION_CENTER",
                            interfaceMethod: "/api/hotel/hotelIntroduction",
                            interfaceFrom: "GC",
                            hotelGroupCode: u.hotelGroupCode,
                          },
                          query: {
                            unitCode: u.hotelGroupCode,
                            hotelCode: n.code,
                          },
                        })
                        .then((t) => {
                          e.index.hideLoading(),
                            console.log("酒店详情", t),
                            (h.value = t.retVal.retVal),
                            (h.value._pictures =
                              t.retVal.retVal.pictures.split(","));
                        })
                        .catch((t) => {
                          e.index.hideLoading();
                        }))
                    : n.type === i.DetailType.ACTIVITY &&
                      (e.index.showLoading({ title: "加载中" }),
                      t.api
                        .interfaceTransfer({
                          config: {
                            interfaceType: "GET",
                            interfaceModule: "GC_ACTIVITIES_CENTER",
                            interfaceMethod: "/api/activity/introduction",
                            interfaceFrom: "GC",
                            hotelGroupCode: u.hotelGroupCode,
                          },
                          query: {
                            unitCode: u.hotelGroupCode,
                            activityCode: n.code,
                          },
                        })
                        .then((t) => {
                          e.index.hideLoading(), console.log("活动详情", t);
                          const { retVal: a } = t.retVal;
                          a &&
                            ((v.value = a),
                            (v.value._activityDuration = (
                              a.activityDuration || 0
                            ).toFixed(1)),
                            (v.value._roundPictures =
                              a.roundPictures.split(";")));
                        })
                        .catch((t) => {
                          e.index.hideLoading();
                        })));
            },
            { immediate: !0 },
          ),
          (t, a) =>
            e.e(
              { a: e.o(T), b: l.type === e.unref(i.DetailType).DESTINATION },
              l.type === e.unref(i.DetailType).DESTINATION
                ? e.e(
                    {
                      c:
                        l.data && l.data.picUrl
                          ? l.data.picUrl +
                            "?imageView2/1/w/375/h/282&x-oss-process=image/resize,m_fill,w_375,h_282"
                          : "",
                      d: e.t(l.data && l.data.destName ? l.data.destName : ""),
                      e: l.data && l.data.tagNames && l.data.tagNames.length,
                    },
                    l.data && l.data.tagNames && l.data.tagNames.length
                      ? {
                          f: e.f(l.data.tagNames, (t, a, i) => ({
                            a: e.t(t),
                            b: a,
                          })),
                        }
                      : {},
                    {
                      g: e.t(
                        l.data && l.data.description ? l.data.description : "",
                      ),
                      h: e.s("height: " + c.value),
                    },
                  )
                : {},
              { i: l.type === e.unref(i.DetailType).HOTEL },
              l.type === e.unref(i.DetailType).HOTEL
                ? {
                    j: e.w(
                      ({ item: e }, t, a) => ({
                        a:
                          e +
                          "?imageView2/1/w/375/h/282&x-oss-process=image/resize,m_fill,w_375,h_282",
                        b: a,
                        c: t,
                      }),
                      {
                        name: "item",
                        path: "j",
                        vueId: "9e522052-2,9e522052-0",
                      },
                    ),
                    k: e.p({ slides: h.value._pictures, swiperConfig: g }),
                    l: e.t(h.value.descriptShort),
                    m: e.t(h.value.altitude),
                    n: e.t(h.value.phone),
                    o: e.t(h.value.address1),
                    p: h.value.htmlInfo,
                    q: e.s("height: " + c.value),
                  }
                : {},
              { r: l.type === e.unref(i.DetailType).ACTIVITY },
              l.type === e.unref(i.DetailType).ACTIVITY
                ? e.e(
                    {
                      s: e.w(
                        ({ item: e }, t, a) => ({
                          a:
                            e +
                            "?imageView2/1/w/375/h/282&x-oss-process=image/resize,m_fill,w_375,h_282",
                          b: a,
                          c: t,
                        }),
                        {
                          name: "item",
                          path: "s",
                          vueId: "9e522052-3,9e522052-0",
                        },
                      ),
                      t: e.p({
                        slides: v.value._roundPictures,
                        swiperConfig: g,
                      }),
                      v: e.t(v.value.name),
                      w: e.t(v.value._activityDuration),
                      x: e.t(v.value.classDescript),
                      y: e.t(v.value.typeDescript),
                      z: f.value,
                    },
                    f.value ? { A: e.t(f.value) } : {},
                    { B: v.value.introduce, C: e.s("height: " + c.value) },
                  )
                : {},
              {
                D: e.sr(d, "9e522052-0", { k: "hookDetailDialog" }),
                E: e.o(y),
                F: e.p({
                  visible: p.value,
                  customWrapStyle:
                    "border-top-left-radius: 16px; border-top-right-radius: 16px; background-color: #fff;",
                  closeOnClickMask: !1,
                }),
              },
            )
        );
      },
    }),
    u = e._export_sfc(n, [["__scopeId", "data-v-9e522052"]]);
  wx.createComponent(u);
})();
