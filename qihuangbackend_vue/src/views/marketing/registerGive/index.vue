<template>
  <div class="divBox">
    <el-card>
      <div slot="header" class="clearfix">
        <span>注册赠送配置</span>
      </div>
      <el-form ref="form" :model="form" label-width="180px" v-loading="loading">
        <el-form-item label="活动状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="赠送余额(元)">
          <el-input-number v-model="form.money" :min="0" :precision="2" :step="0.01" />
        </el-form-item>
        <el-form-item label="赠送积分">
          <el-input-number v-model="form.score" :min="0" />
        </el-form-item>
        <el-form-item label="完善资料送积分">
          <el-input-number v-model="form.complete_score" :min="0" />
        </el-form-item>
        <el-form-item v-if="form.complete_score > 0" label="完善资料需检查字段">
          <el-checkbox-group v-model="form.complete_check_fields">
            <el-checkbox label="avatar">头像</el-checkbox>
            <el-checkbox label="nickname">昵称</el-checkbox>
            <el-checkbox label="real_name">真实姓名</el-checkbox>
            <el-checkbox label="phone">手机号</el-checkbox>
            <el-checkbox label="sex">性别</el-checkbox>
            <el-checkbox label="birthday">生日</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="赠送优惠券">
          <el-switch v-model="form.give_coupon" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item v-if="form.give_coupon" label="选择优惠券">
          <el-select v-model="form.coupon_ids" multiple placeholder="请选择优惠券">
            <el-option
              v-for="item in couponList"
              :key="item.coupon_id"
              :label="item.title"
              :value="item.coupon_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="赠送上级积分">
          <el-input-number v-model="form.intro_score" :min="0" />
        </el-form-item>
        <el-form-item label="赠送上级优惠券">
          <el-switch v-model="form.give_parent_coupon_status" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item v-if="form.give_parent_coupon_status" label="上级优惠券配置">
          <div v-for="(item, index) in form.give_parent_coupons" :key="index" style="margin-bottom:10px;">
            <el-select v-model="item.coupon_id" placeholder="选择优惠券" style="width:200px;">
              <el-option v-for="c in couponList" :key="c.coupon_id" :label="c.title" :value="c.coupon_id" />
            </el-select>
            <el-input-number v-model="item.num" :min="1" :max="10" style="margin-left:10px;" />
            <el-button type="danger" icon="el-icon-delete" circle style="margin-left:10px;" @click="removeParentCoupon(index)" />
          </div>
          <el-button size="small" @click="addParentCoupon">添加优惠券</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="saving" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getRegisterGiveConfig, saveRegisterGiveConfig, couponListApi } from '@/api/marketing'

export default {
  name: 'RegisterGiveConfig',
  data() {
    return {
      loading: false,
      saving: false,
      form: {
        status: 0,
        money: 0,
        score: 0,
        complete_score: 0,
        complete_check_fields: [],
        give_coupon: 0,
        coupon_ids: [],
        intro_score: 0,
        give_parent_coupon_status: 0,
        give_parent_coupons: []
      },
      timeRange: null,
      couponList: []
    }
  },
  created() {
    this.loadConfig()
    this.loadCouponList()
  },
  methods: {
    loadConfig() {
      this.loading = true
      getRegisterGiveConfig().then(res => {
        if (res.data && res.data.id) {
          const data = res.data
          this.form.status = data.status || 0
          this.form.money = parseFloat(data.money) || 0
          this.form.score = data.score || 0
          this.form.complete_score = data.complete_score || 0
          this.form.complete_check_fields = data.complete_check_fields || []
          this.form.give_coupon = data.give_coupon || 0
          this.form.coupon_ids = data.coupon_ids || []
          this.form.intro_score = data.intro_score || 0
          this.form.give_parent_coupon_status = data.give_parent_coupon_status || 0
          this.form.give_parent_coupons = data.give_parent_coupons || []
          if (data.start_time && data.end_time) {
            this.timeRange = [data.start_time, data.end_time]
          }
        }
      }).finally(() => {
        this.loading = false
      })
    },
    loadCouponList() {
      couponListApi({ page: 1, limit: 100 }).then(res => {
        this.couponList = res.data && res.data.list ? res.data.list : []
      })
    },
    addParentCoupon() {
      this.form.give_parent_coupons.push({ coupon_id: '', num: 1 })
    },
    removeParentCoupon(index) {
      this.form.give_parent_coupons.splice(index, 1)
    },
    onSubmit() {
      this.saving = true
      const data = { ...this.form }
      if (this.timeRange && this.timeRange.length === 2) {
        data.start_time = this.timeRange[0]
        data.end_time = this.timeRange[1]
      } else {
        data.start_time = null
        data.end_time = null
      }
      saveRegisterGiveConfig(data).then(() => {
        this.$message.success('保存成功')
      }).catch(err => {
        this.$message.error(err.message || '保存失败')
      }).finally(() => {
        this.saving = false
      })
    }
  }
}
</script>

<style scoped>
.divBox {
  padding: 20px;
}
</style>
