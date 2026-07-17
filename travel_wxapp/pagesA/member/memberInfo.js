!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/api.js"),
    u = require("../../utils/wxuser.js"),
    r = require("../../utils/utils.js"),
    l = require("../../utils/filter.js"),
    t = require("../../base/jAlert/jAlert.js"),
    n = require("../../utils/uploadFile.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || o();
  const o = () => "../../components/coustomHead.js",
    i = e.defineComponent({
      __name: "memberInfo",
      setup(o) {
        e.onShow(() => {
          r.refreshMemberInfo(() => {
            (s.value = u.getStorage("user")), M();
          });
        });
        let i = u.getStorage("config"),
          s = e.ref(u.getStorage("user")),
          v = e.ref(u.getStorage("wxuser")),
          f = e.ref(""),
          d = e.ref(""),
          m = e.ref(""),
          p = e.ref(!0),
          c = e.ref(!0),
          h = e.ref(!0),
          g = e.ref(!0),
          b = e.dayjs().format("YYYY-MM-DD"),
          j = e.ref(""),
          A = e.ref(""),
          C = e.ref(!1),
          R = [
            { value: "1", name: "男" },
            { value: "2", name: "女" },
          ];
        const M = () => {
          s.value && s.value.nickname
            ? (j.value = s.value.nickname)
            : (j.value = "松赞家人"),
            s.value &&
              s.value.sex &&
              "?" !== s.value.sex &&
              ((f.value = s.value.sex),
              "T" == s.value.isRealName && (p.value = !1)),
            s.value &&
              s.value.birth &&
              ((d.value = s.value.birth),
              "T" == s.value.isRealName && (c.value = !1)),
            s.value &&
              s.value.email &&
              ((m.value = s.value.email), (h.value = !0));
        };
        let T = e.computed(() => {
          let e = "";
          return (
            R.forEach((a) => {
              a.value == f.value && (e = a.name);
            }),
            e
          );
        });
        const E = () => {
            if (!j.value) return t.jAlert3("请输入昵称"), !1;
            P(
              {
                sex: f.value,
                birth: d.value,
                email: m.value,
                nickname: j.value,
              },
              () => {
                t.jAlert3("保存成功");
              },
            );
          },
          N = (e) => {
            if (!p.value) return !1;
            const a = e.detail.value,
              u = R[a].value;
            f.value = u;
          },
          x = (e) => {
            if (!c.value) return !1;
            let a = e.detail.value;
            d.value = a;
          },
          I = (e) => {
            let a = e.detail.value;
            if (!a) return t.jAlert3("请输入昵称"), !1;
            j.value = a;
          },
          w = (e) => {
            let a = e.detail.value;
            if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(a))
              return t.jAlert3("请输入有效的邮箱！"), !1;
            m.value = a;
          },
          P = (e, l) => {
            let n = {
              birth: s.value.birth || "",
              hotelGroupCode: i.hotelGroupCode || "",
              hotelGroupId: i.hotelGroupId || "",
              memberId: s.value.memberId || "",
              email: s.value.email || "",
              mobile: s.value.mobile || "",
              name: s.value.name || "",
              nation: s.value.nation || "",
              idNo: s.value.idNo || "",
              idCode: s.value.idCode || "",
              sex: s.value.sex || "",
              openid: v.value.openid,
              nickname: s.value.nickname || "",
              headPortraitUrl: s.value.headPortraitUrl || "",
            };
            n.idNo && !n.idCode && (n.idCode = "01"),
              (n = Object.assign(n, e)),
              a.api.update(n).then((e) => {
                1 == e.result
                  ? (l && l(),
                    r.refreshMemberInfo(() => {
                      s.value = u.getStorage("user");
                    }))
                  : t.jAlert3(e.msg);
              });
          },
          _ = () => {
            if ("T" == s.value.isRealName) {
              if (!C.value) return !1;
              r.goPageWithUser("/pagesA/member/authSucceed?type=edit");
            } else r.goPageWithUser("/pagesA/member/memberAuth");
          },
          y = (a) => {
            console.log("e:", a);
            let { avatarUrl: u } = a.detail;
            e.index.showLoading({ title: "上传头像中..." }),
              n
                .uploadFile({
                  file: { path: u },
                  unitCode: i.hotelGroupCode,
                  fileType: "IMAGE",
                  point: {
                    system: "DSPLAT",
                    page: "MEMBER_CENTER",
                    position: "MEMBER_CENTER_AVATAR",
                    bizRelObject: "MEMBER",
                    bizRelObjectId: s.value.memberId,
                  },
                })
                .then((a) => {
                  if ((e.index.hideLoading(), 1 != a.success))
                    return t.jAlert3("上传失败~"), !1;
                  P({ headPortraitUrl: a.url }, () => {});
                });
          };
        return (
          e.onMounted(() => {
            var e;
            (e = {
              appid: i.appid,
              codes: ["ruleNameTips"].join(","),
              componentAppid: i.componentAppid,
              hotelCode: i.hotelCode ? i.hotelCode : 0,
              hotelGroupCode: i.hotelGroupCode,
              clientType: "wechat_mini",
            }),
              a.api.getMultiSysOptionCommon(e).then((e) => {
                1 == e.result &&
                  e.retVal.forEach(function (e) {
                    "ruleNameTips" == e.code && e.value && (A.value = e.value);
                  });
              }),
              M();
          }),
          (a, u) =>
            e.e(
              {
                a: e.p({ title: "个人资料", nativeMode: "true" }),
                b: e.unref(s).headPortraitUrl
                  ? e.unref(s).headPortraitUrl
                  : "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/avatar.png",
                c: e.o(y),
                d: e.unref(g),
              },
              e.unref(g)
                ? {
                    e: e.o(I),
                    f: e.unref(j),
                    g: e.o((a) =>
                      e.isRef(j)
                        ? (j.value = a.detail.value)
                        : (j = a.detail.value),
                    ),
                  }
                : { h: e.t(e.unref(j)) },
              { i: e.unref(p) },
              e.unref(p)
                ? {
                    j: e.t(e.unref(T) ? e.unref(T) : "请选择性别"),
                    k: e.o(N),
                    l: e.unref(f),
                    m: e.unref(R),
                  }
                : { n: e.t(e.unref(T)) },
              { o: e.unref(p) ? 1 : "", p: e.unref(T) ? "" : 1, q: e.unref(c) },
              e.unref(c)
                ? {
                    r: e.t(e.unref(d) ? e.unref(d) : "请选择生日"),
                    s: e.unref(d),
                    t: e.unref("1900-01-01"),
                    v: e.unref(b),
                    w: e.o(x),
                  }
                : { x: e.t(e.unref(d)) },
              {
                y: e.unref(c) ? 1 : "",
                z: e.unref(d) ? "" : 1,
                A: e.t(e.unref(l.sensitivePhone)(e.unref(s).mobile)),
                B: e.unref(h),
              },
              e.unref(h)
                ? {
                    C: e.o(w),
                    D: e.unref(m),
                    E: e.o((a) =>
                      e.isRef(m)
                        ? (m.value = a.detail.value)
                        : (m = a.detail.value),
                    ),
                  }
                : { F: e.t(e.unref(m)) },
              {
                G: e.t("T" == e.unref(s).isRealName ? "已认证" : "未认证"),
                H: "T" !== e.unref(s).isRealName ? 1 : "",
                I:
                  "T" !== e.unref(s).isRealName ||
                  ("T" == e.unref(s).isRealName && e.unref(C))
                    ? 1
                    : "",
                J: e.o(_),
                K: e.t(e.unref(A)),
                L: e.o(E),
              },
            )
        );
      },
    }),
    s = e._export_sfc(i, [["__scopeId", "data-v-a123631d"]]);
  wx.createPage(s);
})();
