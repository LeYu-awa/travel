!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/api.js"),
    t = require("../../utils/wxuser.js"),
    l = require("../../base/jAlert/jAlert.js"),
    r = require("../../utils/utils.js");
  Math || (i + o)();
  const o = () => "../../components/kfDialog.js",
    i = () => "../../components/coustomHead.js",
    u = e.defineComponent({
      __name: "receivePrize",
      setup(o) {
        let i = t.getStorage("config"),
          u = t.getStorage("user"),
          d = t.getStorage("wxuser"),
          v = e.ref();
        const p = e.ref(
            "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/game/kuaidi.png",
          ),
          s = e.ref(!0),
          n = e.ref(""),
          c = e.ref(""),
          g = e.ref(""),
          m = e.ref({}),
          h = e.ref([]),
          z = e.ref(""),
          y = e.ref({
            prize: { name: "", descript: "" },
            zjTime: "",
            deliveryCode: "",
            prizeState: null,
            uuid: "",
            deliveryNo: "",
            contact: "",
          }),
          f = () => {
            var a = getCurrentPages(),
              t = a[a.length - 1],
              l = "/" + t.route,
              o = t.options,
              i = { redirect_url: `${l}?${r.createUrl(o)}` };
            e.index.redirectTo({
              url: "/pagesF/address/addressList?" + r.createUrl(i),
            });
          },
          b = () => {
            if (!s.value) return;
            if (!m.value.id) return l.jAlert3("请选择收货人"), !1;
            s.value = !1;
            let r = e.reactive({
              code: c.value,
              openid: d.openid,
              memberId: u.memberId,
              username: u.name,
              appid: z.value || t.getStorage("appid") || i.appid,
              componentAppid:
                z.value || t.getStorage("appid") || i.componentAppid || i.appid,
              hotelGroupCode: i.hotelGroupCode,
              hotelCode: i.hotelCode,
              hotelGroupId: i.hotelGroupId,
            });
            m.value.province, m.value.city, m.value.area, m.value.address;
            let o = {
              address: m.value.address,
              name: m.value.receiver,
              mobile: m.value.mobile,
              recordUuid: y.value.uuid,
              province: m.value.province,
              city: m.value.city,
              area: m.value.area,
            };
            (r = Object.assign(o, r)),
              console.log(r),
              a.api.savePrizeAddress(r).then((a) => {
                1 == a.result
                  ? (l.jAlert3("提交成功"),
                    e.index.redirectTo({ url: "/pagesF/prize/receiveSuccess" }))
                  : l.jAlert3(a.msg),
                  (s.value = !0);
              });
          },
          S = () => {
            let t = e.reactive({
              deliverNo: y.value.deliveryNo,
              deliveryCode: y.value.deliveryCode,
              phone: y.value.contact,
              hotelGroupCode: i.hotelGroupCode,
            });
            a.api.deliveryMessageItemAjax(t).then((a) => {
              console.log(a),
                1 == a.result &&
                  a.retVal.deliveryMessage &&
                  a.retVal.deliveryMessage.data.length &&
                  (console.log(a.retVal.deliveryMessage),
                  a.retVal.deliveryMessage.data.forEach((a) => {
                    console.log(a),
                      (a.time = e.dayjs(a.time).format("MM.DD hh:mm"));
                    var t = a.context.indexOf("【"),
                      l = a.context.indexOf("】");
                    console.log("========================>first"),
                      console.log("========================>second"),
                      console.log(t, l),
                      (a.city =
                        -1 != t && -1 != l ? a.context.slice(t + 1, l) : "");
                  }),
                  (h.value = a.retVal.deliveryMessage.data.reverse()));
            });
          },
          C = (e) => {
            v.value.showDialog();
          };
        return (
          e.onMounted(() => {
            s.value &&
              ((s.value = !1),
              a.api
                .prizewinner({
                  code: c.value,
                  uuid: n.value,
                  memberId: u.memberId,
                  appid: z.value || t.getStorage("appid") || i.appid,
                  componentAppid:
                    z.value ||
                    t.getStorage("appid") ||
                    i.componentAppid ||
                    i.appid,
                  hotelGroupCode: i.hotelGroupCode,
                  hotelGroupId: i.hotelGroupId,
                  hotelCode: i.hotelCode,
                })
                .then((e) => {
                  1 == e.result &&
                    e.retVal &&
                    e.retVal.datas.length > 0 &&
                    ((y.value = e.retVal.datas[0]),
                    "shunfeng" == y.value.deliveryCode
                      ? (p.value =
                          "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/game/shunfeng.png")
                      : "youzhengguonei" == y.value.deliveryCode &&
                        (p.value =
                          "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/game/youzheng.png"),
                    3 == y.value.prizeState && S()),
                    (s.value = !0);
                }));
          }),
          e.onLoad((e) => {
            console.log(e),
              (n.value = e.uuid),
              (c.value = e.code),
              e.addressId && (g.value = e.addressId),
              e.appid && ((z.value = e.appid), t.setStorage("appid", e.appid)),
              console.log(
                "=====================》appid+++++++++++++++++++++++1",
              ),
              console.log(z.value),
              (() => {
                let e = {
                  hotelGroupId: i.hotelGroupId,
                  openid: d.openid,
                  hotelGroupCode: i.hotelGroupCode,
                  hotelCode: i.hotelCode,
                  memberId: "",
                };
                u && u.memberId && (e.memberId = u.memberId),
                  a.api.getMemberAddress(e).then((e) => {
                    console.log(e),
                      1 == e.result &&
                        e.retVal.forEach((e, a) => {
                          g.value
                            ? e.id == g.value && (m.value = e)
                            : "T" == e.isDefault && (m.value = e);
                        }),
                      console.log(m);
                  });
              })();
          }),
          (a, t) =>
            e.e(
              {
                a: e.p({ title: "领取奖品", nativeMode: "true" }),
                b: y.value.prize.picUrl,
                c: e.t(y.value.prize.name),
                d: e.t(y.value.prize.subName),
                e: e.t(y.value.zjTime),
                f: 1 == y.value.prize.prizeType && 0 == y.value.prizeState,
              },
              1 == y.value.prize.prizeType && 0 == y.value.prizeState
                ? e.e(
                    {
                      g: e.t(
                        m.value.id
                          ? m.value.province +
                              m.value.city +
                              m.value.area +
                              m.value.address
                          : "请选择收货地址",
                      ),
                      h: m.value.id,
                    },
                    m.value.id
                      ? {
                          i: e.t(m.value.receiver),
                          j: e.t(m.value.mobile.substring(0, 3)),
                          k: e.t(m.value.mobile.substring(7, 11)),
                        }
                      : {},
                    { l: e.o(f) },
                  )
                : {},
              { m: 1 == y.value.prize.prizeType && 1 == y.value.prizeState },
              1 == y.value.prize.prizeType && 1 == y.value.prizeState
                ? {
                    n: e.t(y.value.deliveryAddress),
                    o: e.t(y.value.deliveryReceiver),
                    p: e.t(y.value.contact.substring(0, 3)),
                    q: e.t(y.value.contact.substring(7, 11)),
                    r: e.t(y.value.province),
                    s: e.t(y.value.city),
                    t: e.t(y.value.area),
                    v: e.t(y.value.deliveryAddress),
                  }
                : {},
              { w: h.value.length },
              h.value.length
                ? {
                    x: p.value,
                    y: e.t(y.value.deliveryCompanyName),
                    z: e.t(y.value.deliveryNo),
                    A: e.f(h.value, (a, t, l) => ({
                      a: e.t(a.city),
                      b: e.t(a.time),
                      c: e.t(a.context),
                      d: t,
                    })),
                    B: e.t(y.value.deliveryAddress),
                    C: e.t(y.value.deliveryReceiver),
                    D: e.t(y.value.contact.substring(0, 3)),
                    E: e.t(y.value.contact.substring(7, 11)),
                    F: e.t(y.value.province),
                    G: e.t(y.value.city),
                    H: e.t(y.value.area),
                    I: e.t(y.value.deliveryAddress),
                  }
                : {},
              { J: 1 == y.value.prizeState || 3 == y.value.prizeState },
              1 == y.value.prizeState || 3 == y.value.prizeState
                ? { K: e.o((e) => C(a.item)) }
                : {},
              { L: 2 == y.value.prizeState },
              2 == y.value.prizeState ? { M: e.o((e) => C(a.item)) } : {},
              {
                N:
                  (1 == y.value.prizeState || 3 == y.value.prizeState) &&
                  1 == y.value.prize.prizeType,
              },
              ((1 != y.value.prizeState && 3 != y.value.prizeState) ||
                y.value.prize.prizeType,
              {}),
              { O: 0 == y.value.prizeState && 1 == y.value.prize.prizeType },
              0 == y.value.prizeState && 1 == y.value.prize.prizeType
                ? { P: e.o(b) }
                : {},
              {
                Q: e.sr(v, "26fa2152-1", { k: "kf" }),
                R: e.p({ title: "一键咨询" }),
              },
            )
        );
      },
    }),
    d = e._export_sfc(u, [["__scopeId", "data-v-26fa2152"]]);
  wx.createPage(d);
})();
