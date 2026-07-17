<template>
	<view class="">
		<!-- <Header :title="type == 'doctor' ? '常见医家' : '常见术语'">
		</Header> -->
		<liu-indexed-list :isShowImg="type == 'doctor' ? true : false" :dataList="dataList" @click="goDetails"
			imgKey="avatar" :phoneKey="type == 'doctor' ? 'profile' : 'description'"></liu-indexed-list>
	</view>
</template>

<script>
import liuIndexedList from "@/uni_modules/liu-indexed-list/components/liu-indexed-list/liu-indexed-list.vue"
import {
	doctorList, termList
} from "@/api/encyclopedia.js";
import Header from "@/components/header.vue"
export default {
	components: {
		liuIndexedList,
		Header
	},
	data() {
		return {
			type: '',
			dataList: []
		}
	},
	onLoad(e) {
		this.type = e.type
		this.init()
		uni.setNavigationBarTitle({
			title: this.type == 'doctor' ? '常见医家' : '常见术语'
		})
	},
	methods: {
		goDetails(e) {
			uni.navigateTo({
				url: './commonDetails?type=' + this.type + '&id=' + e.id
			})
		},
		async init() {
			switch (this.type) {
				case 'doctor':
					let { data: { list } } = await doctorList()
					this.dataList = list || []
					break;
				case 'term':
					let { data } = await termList()
					this.dataList = data.list || []
					break;
			}
		}
	},
}
</script>

<style></style>