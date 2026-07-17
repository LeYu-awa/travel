!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/api.js"),
    l = require("../../utils/wxuser.js"),
    u = require("../../base/jAlert/jAlert.js"),
    r = require("../../utils/utils.js");
  Math || (v + o + t)();
  const t = () => "../../components/imgCode.js",
    o = () => "../../components/Alert.js",
    v = () => "../../components/coustomHead.js",
    i = e.defineComponent({
      __name: "memberAuth",
      setup(t) {
        let o = l.getStorage("config"),
          v = l.getStorage("user"),
          i = e.ref(!1),
          s = e.ref(""),
          n = e.ref(""),
          f = e.ref(""),
          d = e.ref(!1),
          c = e.ref(!0),
          m = e.ref(!1),
          p = e.ref(!1),
          g = e.ref(""),
          h = e.ref(""),
          C = e.ref(""),
          I = e.ref("F"),
          b = e.ref(60),
          j = 0;
        const y = e.ref();
        let A = e.ref(""),
          x = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
        e.onLoad((e) => {
          e &&
            e.ruleCode &&
            ((C.value = e.ruleCode), (I.value = e.isNeedPoint)),
            e && (p.value = "colletion" === e.from);
        }),
          v && v.mobile && (f.value = v.mobile);
        const N = () =>
            !d.value &&
            ((d.value = !1),
            f.value
              ? /^1[23456789]\d{9}$/.test(f.value)
                ? (console.log(),
                  void (c.value
                    ? (y.value.getImgVerify(), y.value.showDialog())
                    : (d.value = !1)))
                : ((A.value = "请输入正确的手机号"), !1)
              : ((A.value = "请输入手机号"), !1)),
          T = (e) => {
            (m.value = e.isGetVerify ? e.isGetVerify : m.value),
              (d.value = e.isTap ? e.isTap : d.value),
              (c.value = e.ysmState ? e.ysmState : c.value),
              (g.value = e.verifyId),
              clearInterval(j),
              (j = setInterval(function () {
                b.value = b.value - 1;
              }, 1e3));
          };
        e.watch(b, (e, a) => {
          e <= 0 &&
            (clearInterval(j), (m.value = !1), (b.value = 60), (d.value = !1));
        });
        const q = () => {
            i.value ? (i.value = !1) : (i.value = !0);
          },
          S = () => {
            var a = { title: decodeURIComponent("用户协议"), code: "rule" };
            e.index.navigateTo({
              url: "/pagesA/other/codeText?" + r.createUrl(a),
            });
          },
          _ = () =>
            s.value
              ? n.value
                ? x.test(n.value)
                  ? f.value
                    ? g.value
                      ? h.value
                        ? i.value
                          ? void G()
                          : ((A.value = "请先同意协议"), !1)
                        : ((A.value = "请输入验证码"), !1)
                      : ((A.value = "请先获取验证码"), !1)
                    : ((A.value = "请输入手机号码"), !1)
                  : ((A.value = "请输入有效的证件号码"), !1)
                : ((A.value = "请输入证件号码"), !1)
              : ((A.value = "请输入姓名"), !1),
          G = () => {
            (A.value = ""),
              a.api
                .threeMetaCheck({
                  hotelGroupCode: o.hotelGroupCode,
                  hotelCode: o.hotelCode,
                  certName: s.value,
                  certNo: n.value,
                  mobile: f.value,
                  verifyId: g.value,
                  memberId: v.memberId,
                  memberNo: v.memberId,
                  verifyCode: h.value,
                  isNeedPoint: I.value,
                  ruleCode: C.value,
                  cardId: v.cardId,
                  cardNo: v.cardNo,
                })
                .then((a) => {
                  if (1 == a.result) {
                    if (p.value)
                      return (
                        u.jAlert3("认证成功"),
                        void r.refreshMemberInfo(() => {
                          e.index.redirectTo({
                            url: "/pagesA/member/collectionCenter",
                          });
                        })
                      );
                    r.refreshMemberInfo(() => {
                      e.index.redirectTo({
                        url: "/pagesA/member/authSucceed?type=success",
                      });
                    });
                  } else A.value = a.msg;
                });
          };
        return (a, l) =>
          e.e(
            {
              a: e.p({ title: "实名认证", nativeMode: "true" }),
              b: e.p({ tips: e.unref(A) }),
              c: e.unref(s),
              d: e.o((a) =>
                e.isRef(s) ? (s.value = a.detail.value) : (s = a.detail.value),
              ),
              e: e.unref(n),
              f: e.o((a) =>
                e.isRef(n) ? (n.value = a.detail.value) : (n = a.detail.value),
              ),
              g: e.unref(f),
              h: e.o((a) =>
                e.isRef(f) ? (f.value = a.detail.value) : (f = a.detail.value),
              ),
              i: e.t(e.unref(m) ? "重新获取" + e.unref(b) + "s" : "获取验证码"),
              j: e.o(N),
              k: e.unref(m) ? 1 : "",
              l: e.unref(h),
              m: e.o((a) =>
                e.isRef(h) ? (h.value = a.detail.value) : (h = a.detail.value),
              ),
              n: e.unref(i),
            },
            (e.unref(i), {}),
            {
              o: e.o(S),
              p: e.o(q),
              q: e.o(_),
              r: e.sr(y, "302a5ef9-2", { k: "imgCodeComponent" }),
              s: e.o(T),
              t: e.p({
                ysmState: e.unref(c),
                phone: e.unref(f),
                isTap: e.unref(d),
                isGetVerify: e.unref(m),
                timeOut: e.unref(b),
              }),
            },
          );
      },
    }),
    s = e._export_sfc(i, [["__scopeId", "data-v-302a5ef9"]]);
  wx.createPage(s);
})();
