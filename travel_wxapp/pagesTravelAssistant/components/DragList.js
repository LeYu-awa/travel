!(function () {
  "use strict";
  const t = require("../../common/vendor.js"),
    e = require("../utils.js"),
    i = {
      props: {
        list: { type: Array, default: () => [] },
        itemHeight: { type: [Number], default: 70 },
        wrapScrolling: { type: Boolean, default: !1 },
      },
      data: () => ({
        rowHeight: 0,
        wrapHeight: 0,
        activeItem: null,
        isDrag: !1,
        dragTargetY: 0,
        dataList: [],
        sortIndexList: [],
        showItemTransition: "none",
      }),
      watch: {
        list: {
          immediate: !0,
          deep: !0,
          handler(t) {
            this.setList(t);
          },
        },
      },
      methods: {
        onClickDeleteOneDay(t) {
          this.$emit("deleteOneDay", t);
        },
        touchstart(t) {
          this.dragTargetY = t.touches[0].pageY;
        },
        longtap(t) {
          this.wrapScrolling ||
            t.disabled ||
            ((this.activeItem = t),
            (this.isDrag = !0),
            (t.isActive = !0),
            this.$emit("drag", this.isDrag));
        },
        touchmove(t) {
          if (!this.isDrag) return;
          let e = t.touches[0].pageY,
            i = e - this.dragTargetY;
          this.activeItem.top += i;
          let s = this.sortIndexList[this.activeItem.index] - 1,
            a = this.sortIndexList[this.activeItem.index] + 1;
          if (s >= 0 && i < 0 && !this.dataList[s].disabled) {
            let t = this.getItemByIndex(s);
            this.activeItem.top < t.top && (this.swapArray(t), this.vibrate());
          } else if (
            a < this.list.length &&
            i > 0 &&
            !this.dataList[a].disabled
          ) {
            let t = this.getItemByIndex(a);
            this.activeItem.top > t.top && (this.swapArray(t), this.vibrate());
          }
          this.dragTargetY = e;
        },
        touchend(t) {
          if (!this.isDrag) return;
          (this.isDrag = !1),
            (t.isActive = !1),
            (this.activeItem.top =
              this.sortIndexList[this.activeItem.index] * this.rowHeight);
          let i = [];
          Array(this.dataList.length)
            .fill(0)
            .forEach((t, s) => {
              let a = e.deepClone(this.getItemByIndex(s));
              delete a.isActive, delete a.top, delete a.index, i.push(a);
            }),
            this.$emit("drag", this.isDrag),
            this.$emit("change", i);
        },
        getItemByIndex(t) {
          for (let e = 0; e < this.sortIndexList.length; e++)
            if (this.sortIndexList[e] === t) return this.dataList[e];
          return null;
        },
        swapArray(t) {
          let e = this.sortIndexList[this.activeItem.index];
          (this.sortIndexList[this.activeItem.index] =
            this.sortIndexList[t.index]),
            (this.sortIndexList[t.index] = e),
            (t.top = e * this.rowHeight),
            (this.count = 0);
        },
        setList(e) {
          (this.sortIndexList = []),
            (this.dataList = e.map(
              (t, e) => (
                this.sortIndexList.push(e),
                {
                  ...t,
                  key: "slot" + Math.random() + e,
                  isActive: !1,
                  top: e * this.rowHeight,
                  index: e,
                }
              ),
            )),
            console.log("this.sortIndexList", this.sortIndexList),
            console.log("this.dataList", this.dataList),
            this.$nextTick(() => {
              setTimeout(() => {
                let e = 0;
                t.index
                  .createSelectorQuery()
                  .in(this)
                  .selectAll(".drag-box .drag-item")
                  .boundingClientRect((t) => {
                    t.length && (this.rowHeight = t[0].height),
                      t.forEach((t, i) => {
                        (e += t.height),
                          (this.dataList[i].height = t.height),
                          (this.dataList[i].top = i * this.rowHeight);
                      }),
                      (this.wrapHeight = e);
                  })
                  .exec();
              }, 0);
            });
        },
        isClass: (t) =>
          null === t
            ? "Null"
            : void 0 === t
              ? "Undefined"
              : Object.prototype.toString.call(t).slice(8, -1),
        vibrate() {
          t.index.vibrateShort();
        },
      },
      mounted() {},
      computed: {},
    };
  Array ||
    (
      t.resolveComponent("uni-swipe-action-item") +
      t.resolveComponent("uni-swipe-action")
    )(),
    Math ||
      (
        (() =>
          "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js") +
        (() =>
          "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js")
      )();
  const s = t._export_sfc(i, [
    [
      "render",
      function (e, i, s, a, o, h) {
        return {
          a: t.f(o.dataList, (e, i, s) =>
            t.e(
              {
                a: t.o((t) => h.onClickDeleteOneDay(e), e.key),
                b: t.t(e._date.month || "DAY"),
                c: t.t(e._date.day || e.rsvDay),
                d: t.t(e._rsvDayTitle),
                e: e._hotel,
              },
              e._hotel ? { f: t.t(e._hotel) } : {},
              {
                g: "9cf6a14e-1-" + s + ",9cf6a14e-0",
                h: i != o.dataList.length - 1,
              },
              (o.dataList.length, {}),
              {
                i: e.top + "px",
                j: e.height ? e.height + "px" : "auto",
                k: e.isActive ? 1 : "",
                l: t.o((t) => h.longtap(e), e.key),
                m: t.o((...t) => h.touchstart && h.touchstart(...t), e.key),
                n: t.o((...t) => h.touchmove && h.touchmove(...t), e.key),
                o: t.o((t) => h.touchend(e), e.key),
                p: e.key,
              },
            ),
          ),
          b: t.p({ disabled: o.dataList.length <= 2 }),
          c: o.showItemTransition,
          d: t.sr("hookUniSwipeAction", "9cf6a14e-0"),
          e: t.s(`height: ${o.wrapHeight}px;`),
        };
      },
    ],
    ["__scopeId", "data-v-9cf6a14e"],
  ]);
  wx.createComponent(s);
})();
