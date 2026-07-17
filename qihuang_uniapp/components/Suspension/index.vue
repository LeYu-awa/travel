<template>
	<!-- 悬浮效果，可以拖动 -->
	<div id="suspension" :class="['suspension', {transition: isDock}]" :style="{left: left + 'px', top: top + 'px'}"
		@touchstart="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop="touchend">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		props: {
			isDock: {
				type: Boolean,
				default: false
			}, // 是否需要自动吸附到左右两边
			edge: {
				type: Object,
				default: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}
			} // 是否需要留边, 默认不留边
		},
		data() {
			// 屏幕长宽
			const sys = uni.getSystemInfoSync();
			const windowWidth = (sys.windowWidth);
			const windowHeight = (sys.windowHeight);

			return {
				top: (0),
				left: (0),
				width: (0),
				height: (0),
				offsetWidth: (0),
				offsetHeight: (0),
				windowWidth,
				windowHeight
			};
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query
				.select("#suspension")
				.boundingClientRect((data) => {
					// 悬浮样式的宽高
					this.width = data.width;
					this.height = data.height;

					// 需要居中拖拽
					this.offsetWidth = data.width / 2;
					this.offsetHeight = data.height / 2;

					// 默认位置在右下角
					this.left = this.windowWidth - this.width - this.edge.right;
					this.top =
						((this.windowHeight - this.height - this.edge.bottom) * 3) / 4;
				})
				.exec();
		},
		methods: {
			// 开始拖动
			touchstart(e) {},
			// 拖动ing
			touchmove(e) {
				// 单指触摸
				if (e.touches.length !== 1) return false;

				// 滑动的位置
				let left = e.touches[0].clientX - this.offsetWidth;
				let clientY = e.touches[0].clientY - this.offsetHeight;

				// 悬浮球距离底部的位置 = 屏幕高度 - 样式高度 - 距离底部的高度
				let edgeBottom = this.windowHeight - this.height - this.edge.bottom;
				// 同上
				let edgeRight = this.windowWidth - this.width - this.edge.right
				// 上下拖动
				if (clientY < this.edge.top) {
					// 移动到顶部
					this.top = this.edge.top;
				} else if (clientY > edgeBottom) {
					// 移动到底部
					this.top = edgeBottom;
				} else {
					// 当前移动的位置
					this.top = clientY;
				}
				if (left < this.edge.left) {
					// 移动到左边
					this.left = this.edge.left
				} else if (left > edgeRight) {
					// 移动到右边
					this.left = edgeRight
				} else {
					// 当前位置
					this.left = left
				}
			},
			// 结束拖动
			touchend(e) {
				if (this.isDock) {
					// 靠右对齐 = 整体宽度 - 样式宽度 - 靠右的边距
					let edgeRight = this.windowWidth - this.width - this.edge.right
					// 当前的位置 < 整体宽度 / 2 - 当前样式的一半 = 偏左边
					if (this.left < this.windowWidth / 2 - this.offsetWidth) {
						// 左边限制的位置
						this.left = this.edge.left
					} else {
						// 右边限制的位置
						this.left = edgeRight
					}
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	.suspension {
		position: fixed;
		z-index: 10;

		&.transition {
			transition: left 0.03s ease, top 0.03s ease;
		}
	}
</style>