!(function () {
  "use strict";
  const t = require("../../common/vendor.js"),
    e = require("../utils.js"),
    i = {
      props: {
        list: { type: Array, default: () => [] },
        itemHeight: { type: [Number], default: 70 },
        wrapScrolling: { type: Boolean, default: !1 },
        dayXData: { type: Object, required: !0 },
        daysList: { type: Array, required: !0 },
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
          deep: !0,
          handler(t) {
            this.setList(t);
          },
        },
      },
      methods: {
        tapDayXItem(t) {
          this.$emit("tapDayXItem", t);
        },
        tapDayXImage(t) {
          this.$emit("tapDayXImage", t);
        },
        onClickDeleteActivity(t, e) {
          this.$emit("deleteActivity", { item: t, index: e });
        },
        showSingleLine(t) {
          if ("placeStart" === t.item.resourceType) return !0;
          if ("placeEnd" === t.item.resourceType)
            try {
              return !(1 === this.dataList.length);
            } catch (t) {
              return !1;
            }
        },
        showMileageAndDuration(t) {
          return (
            t.index != this.dataList.length - 1 &&
            "placeStart" !== t.item.resourceType &&
            "placeEnd" !== t.item.resourceType
          );
        },
        displayCover(t) {
          switch (t.resourceType) {
            case "hotel":
            case "activity":
              return (
                t.picture +
                  "?imageView2/1/w/48/h/48&x-oss-process=image/resize,m_fill,w_48,h_48" ||
                ""
              );
            default:
              return "";
          }
        },
        touchstart(t) {
          this.dragTargetY = t.touches[0].pageY;
        },
        longtap(t) {
          this.wrapScrolling ||
            t.disabled ||
            ("none" === this.showItemTransition &&
              (this.showItemTransition = "all 0.5s"),
            (this.activeItem = t),
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
            (this.showItemTransition = "none"),
            (this.dataList = e
              .filter(
                (t) =>
                  ("placeStart" !== t.resourceType &&
                    "placeEnd" !== t.resourceType) ||
                  (t.cityDto && t.cityDto.cityCode),
              )
              .map(
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
                  .selectAll(".drag-box_dayx .drag-item")
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
      function (e, i, s, a, o, r) {
        return {
          a: t.f(o.dataList, (e, i, a) =>
            t.e(
              {
                a:
                  s.dayXData.rsvDay !== s.daysList.length ||
                  "hotel" !== e.resourceType,
              },
              s.dayXData.rsvDay !== s.daysList.length ||
                "hotel" !== e.resourceType
                ? t.e(
                    {
                      b: t.o((t) => r.onClickDeleteActivity(e, i), e.key),
                      c:
                        "placeStart" == e.resourceType ||
                        "placeEnd" == e.resourceType,
                    },
                    "placeStart" == e.resourceType ||
                      "placeEnd" == e.resourceType
                      ? {}
                      : { d: r.displayCover(e) },
                    {
                      e: t.o((t) => r.tapDayXImage(e), e.key),
                      f:
                        "placeStart" == e.resourceType ||
                        "placeEnd" == e.resourceType,
                    },
                    "placeStart" == e.resourceType ||
                      "placeEnd" == e.resourceType
                      ? t.e(
                          {
                            g:
                              "placeStart" == e.resourceType &&
                              e.cityDto &&
                              e.cityDto.cityName,
                          },
                          "placeStart" == e.resourceType &&
                            e.cityDto &&
                            e.cityDto.cityName
                            ? { h: t.t(e.cityDto.cityName) }
                            : {},
                          {
                            i:
                              "placeEnd" == e.resourceType &&
                              e.cityDto &&
                              e.cityDto.cityName,
                          },
                          "placeEnd" == e.resourceType &&
                            e.cityDto &&
                            e.cityDto.cityName
                            ? { j: t.t(e.cityDto.cityName) }
                            : {},
                          { k: t.o((t) => r.tapDayXImage(e), e.key) },
                        )
                      : {},
                    { l: "activity" == e.resourceType },
                    "activity" == e.resourceType
                      ? {
                          m: t.t(e.activityDto.activityDesc),
                          n: t.t(e.activityDto._st_activityDuration),
                          o: t.o((t) => r.tapDayXImage(e), e.key),
                        }
                      : "hotel" == e.resourceType
                        ? {
                            q: t.t(e.hotelDto.hotelDesc),
                            r: t.t(e.hotelDto._roomTypes),
                            s: t.o((t) => r.tapDayXImage(e), e.key),
                          }
                        : {},
                    {
                      p: "hotel" == e.resourceType,
                      t: t.o((t) => r.tapDayXItem(e), e.key),
                      v: "b17be694-1-" + a + ",b17be694-0",
                      w: t.p({
                        disabled:
                          "hotel" === e.resourceType ||
                          "placeStart" === e.resourceType ||
                          "placeEnd" === e.resourceType,
                      }),
                      x: r.showMileageAndDuration({ item: e, index: i }),
                    },
                    r.showMileageAndDuration({ item: e, index: i })
                      ? {
                          y: t.t(e._st_mileageByLast),
                          z: t.t(e._st_durationByLast),
                        }
                      : {},
                    { A: r.showSingleLine({ item: e, index: i }) },
                    (r.showSingleLine({ item: e, index: i }), {}),
                  )
                : {},
              {
                B: e.top + "px",
                C: e.height ? e.height + "px" : "auto",
                D: e.isActive ? 1 : "",
                E: t.o((t) => r.longtap(e), e.key),
                F: t.o((...t) => r.touchstart && r.touchstart(...t), e.key),
                G: t.o((...t) => r.touchmove && r.touchmove(...t), e.key),
                H: t.o((t) => r.touchend(e), e.key),
                I: e.key,
              },
            ),
          ),
          b: o.showItemTransition,
          c: t.sr("hookUniSwipeActionDayX", "b17be694-0"),
          d: t.s(`height: ${o.wrapHeight}px;`),
        };
      },
    ],
    ["__scopeId", "data-v-b17be694"],
  ]);
  wx.createComponent(s);
})();
