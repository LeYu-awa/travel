!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../base/jAlert/jAlert.js"),
    r = require("../../utils/api.js"),
    l = require("../../utils/wxuser.js"),
    t = require("../../utils/qqmap-wx-jssdk.min.js"),
    a = require("../../store/index.js");
  require("../../utils/config.js"),
    require("../../utils/log.js"),
    require("../../utils/qdTracker.js"),
    require("../../utils/umengAdaptor.js"),
    Math || s();
  const s = () => "../../components/coustomHead.js",
    n = e.defineComponent({
      __name: "addAddress",
      setup(s) {
        const n = a.mainStore();
        let i = e.ref({}),
          d = e.ref(!1),
          c = 0,
          u = l.getStorage("config"),
          f = l.getStorage("user"),
          g = l.getStorage("wxuser"),
          m = e.ref(""),
          p = e.ref(null),
          v = e.ref(!0),
          A = e.reactive({
            name: "",
            phone: "",
            loc: "",
            address: "",
            addressName: "",
            lat: "",
            lng: "",
            id: "",
            province: "",
            city: "",
            area: "",
            isDefault: "",
            quickAddress: "",
            mapAddress: "",
          }),
          j = e.ref(!1),
          h = e.ref(!0),
          q = e.ref([{ latitude: 0, longitude: 0 }]);
        e.reactive({});
        const y = () => {
            (A.isDefault = "T" == A.isDefault ? "F" : "T"),
              console.log(A.isDefault);
          },
          _ = () => {
            "" == A.name || "" == A.phone || "" == A.loc || "" == A.address
              ? (h.value = !1)
              : (h.value = !0);
          },
          x = ({ timeStamp: e }) => {
            c = e;
          },
          k = ({ timeStamp: e }) => {
            e - c > 120 &&
              p.value.getCenterLocation({
                success: (e) => {
                  console.log(e),
                    (A.lat = e.latitude),
                    (A.lng = e.longitude),
                    e.latitude,
                    e.longitude;
                },
              });
          },
          b = () => {
            console.log(123),
              console.log(d.value),
              e.index.chooseLocation({
                success: (e) => {
                  console.log(
                    "==========================================》data",
                  ),
                    console.log(e),
                    console.log("微信小程序端"),
                    i.value.reverseGeocoder({
                      location: {
                        latitude: e.latitude,
                        longitude: e.longitude,
                      },
                      get_poi: 1,
                      success: (e) => {
                        console.log("================================>"),
                          console.log(e);
                        var o = !1;
                        e.result.ad_info.province.indexOf("市") > -1 &&
                          ((o = !0),
                          (e.result.ad_info.province =
                            e.result.ad_info.province.replace(/市/, ""))),
                          (A.loc = o
                            ? e.result.ad_info.city + e.result.ad_info.district
                            : e.result.ad_info.province +
                              e.result.ad_info.city +
                              e.result.ad_info.district),
                          (A.province = e.result.ad_info.province),
                          (A.city = e.result.ad_info.city),
                          (A.area = e.result.ad_info.district),
                          (A.address = e.result.address.split(A.loc)[1]),
                          (A.addressName =
                            e.result.formatted_addresses.recommend),
                          A.addressName && (A.address = A.addressName),
                          (A.mapAddress = e.result.pois),
                          (A.lat = e.result.location.lat),
                          (A.lng = e.result.location.lng),
                          _();
                      },
                      fail: (e) => {
                        console.log("==========================>fail"),
                          console.log(e);
                      },
                      complete: (e) => {
                        console.log("============================>error"),
                          console.log(e);
                      },
                    });
                },
                fail: (e) => {
                  console.log(e);
                },
              });
          },
          I = () => {
            if ((console.log(A), j.value)) return;
            if (!A.name) return o.jAlert3("请输入姓名"), !1;
            if (!A.phone) return o.jAlert3("请输入手机号码"), !1;
            if (
              !/^1[3456789]\d{9}$/.test(A.phone) &&
              (o.jAlert3("手机号码格式不正确!"), 1)
            )
              return !1;
            if (!A.loc) return o.jAlert3("请输入地址"), !1;
            if (!A.address) return o.jAlert3("请输入门牌号"), !1;
            console.log(A.province),
              console.log(A.city),
              console.log(A.area),
              (A.province && A.city && A.area) || (console.log(123456), T());
            let l = {
              address: A.address,
              alias: A.address,
              province: A.province,
              city: A.city,
              area: A.area,
              openid: g.openid,
              mobile: A.phone,
              receiver: A.name,
              isDefault: A.isDefault,
              id: A.id,
              latitude: A.lat,
              longitude: A.lng,
              hotelGroupCode: u.hotelGroupCode,
              hotelCode: u.hotelCode,
              memberId: "",
            };
            f && f.memberId && (l.memberId = f.memberId),
              (j.value = !0),
              r.api.addAddress(l).then((r) => {
                console.log(r),
                  1 == r.result
                    ? (o.jAlert3("保存成功"),
                      e.index.disableAlertBeforeUnload(),
                      setTimeout(function () {
                        e.index.navigateBack({ delta: 1 }), (j.value = !1);
                      }, 2e3))
                    : ((j.value = !1), o.jAlert3(r.msg));
              });
          },
          B = () => {
            j.value ||
              ((j.value = !0),
              o.jAlert5(
                "是否删除此常用地址",
                () => {
                  let l = { memberId: "", id: m.value || "" };
                  f && f.memberId && (l.memberId = f.memberId),
                    console.log(A),
                    r.api.deleteAddress(l).then((r) => {
                      1 == r.result
                        ? (o.jAlert3("删除成功"),
                          setTimeout(function () {
                            e.index.navigateBack({ delta: 1 }), (j.value = !1);
                          }, 2e3))
                        : ((j.value = !1), o.jAlert3(r.msg));
                    });
                },
                () => {
                  j.value = !1;
                },
              ));
          },
          D = () => {
            A.quickAddress = "";
          },
          T = () => {
            let o = A.loc,
              r = e.AddressParse(o, 0);
            r.city &&
              r.province &&
              r.area &&
              ((A.city = r.city),
              (A.province = r.province),
              (A.area = r.area),
              r.name && (A.name = r.name),
              r.phone && (A.phone = r.phone));
          };
        return (
          e.onMounted(() => {}),
          e.onReady(() => {
            (p.value = e.index.createMapContext("mymap")), console.log(p);
          }),
          e.onLoad((o) => {
            if (
              (console.log(t.QQMapWX),
              (i.value = new t.QQMapWX({
                key: "H6YBZ-7M467-IIWXA-PYY3O-4Q4RT-B3B53",
              })),
              console.log(o, 11111111111),
              (m.value = o.id || ""),
              m.value)
            ) {
              var r = n.addressInfo;
              console.log(r);
              let o = 0;
              for (let e in r) "" != r[e] && o++;
              0 != o
                ? ((A.province = r.province),
                  (A.city = r.city),
                  (A.area = r.area),
                  (A.name = r.receiver),
                  (A.phone = r.mobile),
                  (A.loc = r.province + r.city + r.area),
                  (A.address = r.address),
                  (A.isDefault = r.isDefault),
                  (A.id = r.id),
                  e.index.setNavigationBarTitle({ title: "编辑常用地址" }))
                : e.index.setNavigationBarTitle({ title: "新增常用地址" });
            } else
              console.log("测试是否进入"),
                e.index.enableAlertBeforeUnload({
                  message: "是否放弃本次编辑",
                  success: function () {
                    console.log(123);
                  },
                  fail: function () {
                    console.log(321);
                  },
                  complete: function () {
                    console.log(789);
                  },
                });
          }),
          (r, t) =>
            e.e(
              {
                a: e.p({ title: "新增收货地址", nativeMode: "true" }),
                b: e.o([(o) => (e.unref(A).name = o.detail.value), _]),
                c: e.unref(A).name,
                d: e.o([(o) => (e.unref(A).phone = o.detail.value), _]),
                e: e.unref(A).phone,
                f: e.t(e.unref(A).loc || "请选择省、市、区"),
                g: e.unref(A).loc ? "" : 1,
                h: e.o(b),
                i: e.o([(o) => (e.unref(A).address = o.detail.value), _]),
                j: e.unref(A).address,
                k: e.unref(A).quickAddress,
                l: e.o((o) => (e.unref(A).quickAddress = o.detail.value)),
                m: "" != e.unref(A).quickAddress,
              },
              "" != e.unref(A).quickAddress
                ? {
                    n: e.o(D),
                    o: e.o((r) =>
                      ((r) => {
                        console.log(A.quickAddress), console.log(r);
                        let t = r || A.quickAddress;
                        if (t == l.getStorage("address") && r)
                          return void console.log(789456);
                        console.log(t), l.setStorage("address", t);
                        let a = e.AddressParse(t, 0);
                        console.log(a),
                          a.city && a.province && a.area
                            ? ((A.city = a.city),
                              (A.province = a.province),
                              (A.area = a.area),
                              (A.loc = A.province + A.city + A.area),
                              (A.address = a.detail),
                              a.detail && !A.loc && (A.loc = a.detail),
                              a.name && (A.name = a.name),
                              a.phone && (A.phone = a.phone))
                            : r || o.jAlert3("识别失败，请手动选择");
                      })(e.unref(A).quickAddress),
                    ),
                  }
                : {},
              {
                p: "T" == e.unref(A).isDefault ? 1 : "",
                q: e.o(y),
                r: e.o(I),
                s: e.unref(m),
              },
              e.unref(m) ? { t: e.o(B) } : {},
              {
                v: e.unref(A).lng,
                w: e.unref(A).lat,
                x: e.unref(q),
                y: e.o((...e) => r.functionName && r.functionName(...e)),
                z: e.o(k),
                A: e.o(x),
                B: !e.unref(v),
              },
            )
        );
      },
    }),
    i = e._export_sfc(n, [["__scopeId", "data-v-5a91e964"]]);
  wx.createPage(i);
})();
