!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/api.js"),
    r = require("../../utils/wxuser.js"),
    t = require("../../base/jAlert/jAlert.js");
  Math || n();
  const n = () => "../../components/coustomHead.js",
    o = e.defineComponent({
      __name: "invoiceInfo",
      setup(n) {
        let o = r.getStorage("config"),
          u = r.getStorage("user");
        const l = e.ref("add");
        e.ref("");
        let i = e.ref(2),
          d = e.ref(""),
          c = e.ref(!1);
        const f = (e) => {
          "add" == l.value && (i.value = e);
        };
        e.reactive({});
        let v = e.ref(""),
          s = e.reactive({
            invoiceTitle: "",
            taxPayerId: "",
            uniformSocialCode: "",
            email: "",
            regAddress: "",
            companyTel: "",
            bankName: "",
            bankAccount: "",
          });
        e.watch(
          () => i,
          (e, a) => {},
          { deep: !0 },
        ),
          e.watch(
            () => s,
            (e, a) => {},
            { deep: !0 },
          );
        const m = () => {
            var r = {
              hotelCode: 0,
              hotelGroupCode: o.hotelGroupCode,
              memberId: u.memberId,
              uuid: v.value,
            };
            a.api
              .deleteMemberInvoice(r)
              .then((a) => {
                1 == a.result
                  ? (t.jAlert3("删除成功"), e.index.navigateBack({ delta: 1 }))
                  : t.jAlert3(a.msg);
              })
              .finally((e) => {});
          },
          p = () => {
            let r =
              /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            if (!s.invoiceTitle) return t.jAlert3("请输入发票抬头"), !1;
            if (2 == i.value && !s.taxPayerId)
              return t.jAlert3("请输入税号"), !1;
            if (1 == i.value) {
              if (!s.uniformSocialCode) return t.jAlert3("请输入证件号"), !1;
              if (!r.test(s.uniformSocialCode))
                return t.jAlert3("请输入正确的证件号"), !1;
            }
            if (!s.email) return t.jAlert3("请输入邮箱地址"), !1;
            if (
              !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
                s.email,
              )
            )
              return t.jAlert3("请输入正确的邮箱地址"), !1;
            let n = {
              memberId: u.memberId,
              hotelGroupCode: o.hotelGroupCode,
              hotelCode: 0,
              bankAccount: s.bankAccount,
              bankName: s.bankName,
              companyTel: s.companyTel,
              earlyPrepare: 0,
              invoiceTitle: s.invoiceTitle,
              invoice_type: 1,
              isDefault: "F",
              payer: 1,
              postType: 0,
              provider: 1,
              receiverAddress: "",
              regAddress: s.regAddress,
              taxPayerId: s.taxPayerId,
              titleType: 1 == i.value ? "person" : "company",
              uniformSocialCode: s.uniformSocialCode,
              email: s.email,
              uuid: "",
            };
            v.value && (n.uuid = v.value),
              a.api.saveOrUpdateMemberInvoice(n).then((a) => {
                1 == a.result
                  ? (t.jAlert3("保存成功"), e.index.navigateBack({ delta: 1 }))
                  : t.jAlert3(a.msg || a.retVal.msg);
              });
          };
        return (
          e.onLoad((e) => {
            if ("edit" == e.type) {
              let a = JSON.parse(decodeURIComponent(e.editItem));
              (s = Object.assign(s, a)),
                (v.value = a.uuid),
                (i.value = "person" == a.titleType ? 1 : 2),
                (l.value = e.type),
                (c.value = !0),
                (d.value = "编辑开票信息");
            } else (l.value = e.type), (d.value = "新增开票信息");
          }),
          e.onMounted(() => {}),
          (a, r) =>
            e.e(
              {
                a: e.p({ title: e.unref(d), nativeMode: !0 }),
                b: "add" == l.value,
              },
              "add" == l.value
                ? {
                    c: 2 == e.unref(i) ? 1 : "",
                    d: e.o((e) => f(2)),
                    e: 1 == e.unref(i) ? 1 : "",
                    f: e.o((e) => f(1)),
                  }
                : {},
              { g: "edit" == l.value },
              "edit" == l.value
                ? { h: e.t(1 == e.unref(i) ? "个人" : "公司") }
                : {},
              { i: "edit" == l.value },
              "edit" == l.value ? { j: e.t(e.unref(s).invoiceTitle) } : {},
              { k: "add" == l.value },
              "add" == l.value
                ? {
                    l: e.unref(s).invoiceTitle,
                    m: e.o((a) => (e.unref(s).invoiceTitle = a.detail.value)),
                  }
                : {},
              { n: 2 == e.unref(i) },
              2 == e.unref(i)
                ? {
                    o: e.unref(s).taxPayerId,
                    p: e.o((a) => (e.unref(s).taxPayerId = a.detail.value)),
                  }
                : {},
              { q: 1 == e.unref(i) },
              1 == e.unref(i)
                ? {
                    r: e.unref(s).uniformSocialCode,
                    s: e.o(
                      (a) => (e.unref(s).uniformSocialCode = a.detail.value),
                    ),
                  }
                : {},
              {
                t: e.unref(s).email,
                v: e.o((a) => (e.unref(s).email = a.detail.value)),
                w: 2 == e.unref(i) && e.unref(c),
              },
              2 == e.unref(i) && e.unref(c)
                ? {
                    x: e.unref(s).regAddress,
                    y: e.o((a) => (e.unref(s).regAddress = a.detail.value)),
                    z: e.unref(s).companyTel,
                    A: e.o((a) => (e.unref(s).companyTel = a.detail.value)),
                    B: e.unref(s).bankName,
                    C: e.o((a) => (e.unref(s).bankName = a.detail.value)),
                    D: e.unref(s).bankAccount,
                    E: e.o((a) => (e.unref(s).bankAccount = a.detail.value)),
                  }
                : {},
              { F: 2 == e.unref(i) && !e.unref(c) },
              2 != e.unref(i) || e.unref(c)
                ? {}
                : {
                    G: e.o((e) => {
                      c.value = !0;
                    }),
                  },
              { H: "edit" == l.value },
              "edit" == l.value
                ? {
                    I: e.o((e) => p()),
                    J: e.o((a) => {
                      e.index.showModal({
                        title: "",
                        content: "是否删除?",
                        cancelText: "否",
                        confirmText: "是",
                        confirmColor: "#000000",
                        success: (e) => {
                          e.confirm && m();
                        },
                      });
                    }),
                  }
                : { K: e.o((e) => p()) },
            )
        );
      },
    }),
    u = e._export_sfc(o, [["__scopeId", "data-v-972ca183"]]);
  wx.createPage(u);
})();
