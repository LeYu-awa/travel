!(function () {
  "use strict";
  const t = require("../../common/vendor.js"),
    e = require("../../utils/utils.js"),
    i = {
      data: () => ({
        scrollable: !1,
        scrollLeft: 0,
        currentIndex: 0,
        lineWidth: 32,
        lineHeight: 2,
        duration: 0.3,
        lineOffsetLeft: 0,
        active: "",
        flex: !1,
        canShow: !1,
      }),
      props: {
        canCancel: { type: Boolean, default: () => !1 },
        isAjax: { type: Boolean, default: () => !1 },
        flexNum: { type: String, default: () => "5" },
        titleStyle: String,
        activeType: { type: String, default: () => "" },
        datas: Array,
        childColor: { type: String, default: () => "" },
        noPadding: { type: String, default: () => "" },
        titleActiveColor: { type: String, default: () => "" },
        type: String,
        color: { type: String, default: () => "" },
        titleInactiveColor: { type: String, default: () => "" },
        activeColor: { type: String, default: () => "" },
        border: { type: String, default: () => "" },
        background: { type: String, default: () => "" },
        canTab: { type: Boolean, default: () => !0 },
        borderActiveColor: { type: String, default: () => "" },
        borderColor: { type: String, default: () => "" },
        init: { type: Boolean, default: () => !0 },
        fullWidth: { type: Boolean, default: () => !1 },
        itemHeight: { type: String, default: () => "30px" },
        isFlex: { type: Boolean, default: () => !0 },
        fkDefaultFontSize: { type: Number, default: () => 12 },
        lineDefaultFontSize: { type: Number, default: () => 14 },
        customWrapStyle: String,
        isDelayed: { type: Boolean, default: () => !1 },
        isFirstCall: { type: Boolean, default: () => !0 },
      },
      watch: {
        datas(t, e) {},
        activeType(t, e) {
          this.active = t;
        },
        active(t, e) {
          this.datas &&
            this.datas.forEach((e, i) => {
              e.id == t && (this.currentIndex = i);
            }),
            this.isDelayed && !this.isFirstCall
              ? setTimeout(() => {
                  this.scrollIntoView();
                }, 250)
              : this.scrollIntoView();
        },
      },
      computed: {
        lineStyle() {
          return `width: ${this.lineWidth}px; transform: translateX(${this.lineOffsetLeft}px);background-color:${this.color};height:${this.lineHeight}px;transition-duration:${this.duration}s;`;
        },
        tabViewStyle() {
          var t = "";
          return (
            "scroll" == this.type &&
              ((t += this.titleStyle), (t += "height:25px;")),
            ("line" != this.type && "pic" != this.type) ||
              (t += `color:${this.titleInactiveColor};font-size:${this.lineDefaultFontSize}px;`),
            "fk" == this.type &&
              (t += `color:${this.color};border:1px solid ${this.borderColor};border-radius: 4px;font-size:${this.fkDefaultFontSize}px;font-weight: 400;`),
            "card" == this.type && (t += this.titleStyle),
            t
          );
        },
        tabViewActStyle() {
          var t = "";
          return (
            "scroll" == this.type &&
              ((t += this.titleStyle),
              (t += `border: 1px solid ${this.titleActiveColor};background:${this.titleActiveColor}15;color:${this.titleActiveColor};height:25px;`)),
            ("line" != this.type && "pic" != this.type) ||
              (t += `color:${this.titleActiveColor};`),
            "card" == this.type &&
              ((t += `color:${this.titleActiveColor};background:${this.color};`),
              1 == this.border && (t += "border-radius:15px;"),
              console.log(this.color)),
            "fk" == this.type &&
              (t += `color:${this.titleInactiveColor};border:1px solid ${this.borderActiveColor};border-radius: 4px;font-size:14px;font-weight: 500;`),
            "pic" == this.type && (t += this.titleStyle),
            t
          );
        },
      },
      mounted() {
        this.activeType && (this.active = this.activeType),
          !this.activeType &&
            this.init &&
            this.datas &&
            this.datas.length > 0 &&
            (this.active = this.datas[0].id);
      },
      methods: {
        resize() {
          "line" === this.type &&
            Promise.all([
              e.getAllRect(this, ".tab"),
              e.getRect(this, ".tabs_line"),
            ]).then(([t = [], e]) => {
              const i = t[this.currentIndex];
              if (null == i) return;
              let l = t
                .slice(0, this.currentIndex)
                .reduce((t, e) => t + e.width, 0);
              (l += (i.width - e.width) / 2 + 8), (this.lineOffsetLeft = l);
            });
        },
        scrollIntoView() {
          Promise.all([
            e.getAllRect(this, ".tab"),
            e.getRect(this, ".tabs"),
          ]).then(([e, i]) => {
            if (this.canShow) {
              const t = e[this.currentIndex],
                l = e
                  .slice(0, this.currentIndex)
                  .reduce((t, e) => t + e.width, 0);
              console.log(i.width),
                (this.scrollLeft = l - (i.width - t.width) / 2),
                this.resize();
            } else
              (this.canShow = !0),
                i.width < t.index.getSystemInfoSync().windowWidth &&
                  (this.flex = !0),
                this.$nextTick(() => {
                  console.log("nextTick", "scrollIntoView"),
                    this.scrollIntoView();
                });
          });
        },
        clickTab(t, e) {
          if (!this.isAjax) {
            if (this.active == t.id) {
              if (!this.canCancel) return;
              t = {};
            }
            this.canTab && (this.active = t.id), this.$emit("clickTab", t, e);
          }
        },
      },
    },
    l = t._export_sfc(i, [
      [
        "render",
        function (e, i, l, o, s, r) {
          return t.e(
            { a: "line" === l.type },
            "line" === l.type ? { b: t.s(r.lineStyle) } : {},
            {
              c: t.f(l.datas, (e, i, o) =>
                t.e(
                  "img" != l.type ? { a: t.t(e.name) } : {},
                  "2" == l.border ? { b: l.color } : {},
                  {
                    c: i,
                    d: t.s(
                      s.active == e.id ? r.tabViewActStyle : r.tabViewStyle,
                    ),
                    e: s.active == e.id ? 1 : "",
                    f: t.o((t) => r.clickTab(e, i), i),
                  },
                ),
              ),
              d: "img" != l.type,
              e: "2" == l.border,
              f: t.s({ height: l.itemHeight }),
              g: l.fullWidth ? 1 : "",
              h: t.n(s.flex || l.isFlex ? "flex " + l.type : l.type),
              i: s.scrollLeft,
              j: "T" == l.noPadding ? 1 : "",
              k: t.s(l.customWrapStyle),
              l: l.background,
              m: s.canShow ? 1 : "",
            },
          );
        },
      ],
      ["__scopeId", "data-v-0b898d8b"],
    ]);
  wx.createComponent(l);
})();
