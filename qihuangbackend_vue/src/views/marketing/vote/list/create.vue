<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑活动' : '创建活动' }}</span>
        <el-button style="float: right" type="text" @click="goBack">返回列表</el-button>
      </div>

      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small" style="max-width: 800px">
        <el-form-item label="活动名称" prop="activity_name">
          <el-input v-model="form.activity_name" placeholder="请输入活动名称" maxlength="128" show-word-limit class="selWidth" />
        </el-form-item>

        <el-form-item label="封面图" prop="cover">
          <div class="acea-row row-middle">
            <div class="upLoadPicBox mr15" @click="modalPicTap('cover')">
              <div v-if="form.cover" class="pictrue">
                <img :src="form.cover">
              </div>
              <div v-else class="upLoad">
                <i class="iconfont iconjiahao" />
              </div>
            </div>
            <div class="tip">建议尺寸750*350px</div>
          </div>
        </el-form-item>

        <el-form-item label="轮播图">
          <div class="acea-row">
            <div v-for="(item, index) in form.banner" :key="index" class="pictrue">
              <img :src="item">
              <i class="el-icon-error btndel" @click="removeBanner(index)" />
            </div>
            <div v-if="form.banner.length < 5" class="upLoadPicBox mr15" @click="modalPicTap('banner')">
              <div class="upLoad">
                <i class="iconfont iconjiahao" />
              </div>
            </div>
          </div>
          <div class="tip">最多5张，建议尺寸750*350px</div>
        </el-form-item>

        <el-form-item label="活动描述">
          <el-input v-model="form.description" type="textarea" :rows="4" placeholder="请输入活动描述" class="selWidth" />
        </el-form-item>

        <el-form-item label="活动规则">
          <el-input v-model="form.rule" type="textarea" :rows="4" placeholder="请输入活动规则" class="selWidth" />
        </el-form-item>

        <el-form-item label="投票时间" prop="date_range">
          <el-date-picker
            v-model="form.date_range"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="selWidth"
          />
        </el-form-item>

        <el-form-item label="报名时间">
          <el-date-picker
            v-model="form.apply_date_range"
            type="datetimerange"
            range-separator="至"
            start-placeholder="报名开始"
            end-placeholder="报名结束"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="selWidth"
          />
        </el-form-item>

        <el-form-item label="报名需审核">
          <el-switch v-model="form.apply_check" :active-value="1" :inactive-value="0" />
        </el-form-item>

        <el-form-item label="报名字段">
          <div class="field-list">
            <div v-for="(field, idx) in form.apply_fields" :key="idx" class="field-item">
              <el-input v-model="field.name" placeholder="字段名" style="width: 150px" />
              <el-select v-model="field.type" style="width: 120px">
                <el-option label="文本" value="text" />
                <el-option label="数字" value="number" />
                <el-option label="手机号" value="phone" />
              </el-select>
              <el-checkbox v-model="field.required">必填</el-checkbox>
              <el-button type="text" class="danger" @click="removeField(idx)">删除</el-button>
            </div>
            <el-button type="primary" size="small" @click="addField">添加字段</el-button>
          </div>
        </el-form-item>

        <el-divider>投票设置</el-divider>

        <el-form-item label="每人每日限投">
          <el-input-number v-model="form.per_day_count" :min="1" :max="999" />
          <span class="ml10">次</span>
        </el-form-item>

        <el-form-item label="每人总限投">
          <el-input-number v-model="form.per_all_count" :min="0" :max="9999" />
          <span class="ml10">次（0表示不限）</span>
        </el-form-item>

        <el-form-item label="同IP每日限投">
          <el-input-number v-model="form.ip_day_count" :min="0" :max="999" />
          <span class="ml10">次（0表示不限）</span>
        </el-form-item>

        <el-form-item label="付费投票">
          <el-switch v-model="form.is_pay" :active-value="1" :inactive-value="0" @change="handlePayChange" />
        </el-form-item>

        <template v-if="form.is_pay">
          <el-form-item label="支付方式" prop="pay_type">
            <el-radio-group v-model="form.pay_type">
              <el-radio label="integral">积分</el-radio>
              <el-radio label="balance">余额</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="单次投票费用" prop="pay_amount">
            <el-input-number v-model="form.pay_amount" :min="0.01" :precision="2" />
            <span class="ml10">{{ form.pay_type === 'integral' ? '积分' : '元' }}</span>
          </el-form-item>
        </template>

        <el-form-item label="验证码">
          <el-checkbox v-model="form.need_captcha">图形验证码</el-checkbox>
          <el-checkbox v-model="form.need_sms" class="ml20">短信验证码</el-checkbox>
        </el-form-item>

        <el-divider>显示设置</el-divider>

        <el-form-item label="是否显示">
          <el-switch v-model="form.is_show" :active-value="1" :inactive-value="0" />
        </el-form-item>

        <el-form-item label="排序">
          <el-input-number v-model="form.sort" :min="0" :max="9999" />
          <span class="ml10">数字越大越靠前</span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="submitting" @click="handleSubmit">保存</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { voteCreateApi, voteUpdateApi, voteDetailApi } from '@/api/marketing'
import { roterPre } from '@/settings'

export default {
  name: 'VoteCreate',
  data() {
    return {
      roterPre,
      isEdit: false,
      submitting: false,
      form: {
        activity_name: '',
        cover: '',
        banner: [],
        description: '',
        rule: '',
        date_range: [],
        apply_date_range: [],
        apply_check: 1,
        apply_fields: [],
        per_day_count: 1,
        per_all_count: 0,
        ip_day_count: 0,
        device_day_count: 0,
        is_pay: 0,
        pay_type: 'integral',
        pay_amount: 1,
        need_captcha: false,
        need_sms: false,
        is_show: 1,
        sort: 0
      },
      rules: {
        activity_name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        cover: [{ required: true, message: '请上传封面图', trigger: 'change' }],
        date_range: [{ required: true, message: '请选择投票时间', trigger: 'change' }]
      }
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      this.isEdit = true
      this.loadDetail(id)
    }
  },
  methods: {
    modalPicTap(type) {
      this.$modalUpload((img) => {
        if (type === 'cover') {
          this.form.cover = img[0]
        } else if (type === 'banner') {
          img.map((item) => {
            if (this.form.banner.length < 5) {
              this.form.banner.push(item)
            }
          })
        }
      }, type)
    },
    removeBanner(index) {
      this.form.banner.splice(index, 1)
    },
    async loadDetail(id) {
      try {
        const { data } = await voteDetailApi(id)
        const detail = data.info || data

        const banner = Array.isArray(detail.banner)
          ? detail.banner
          : (detail.banner ? String(detail.banner).split(',').filter(Boolean) : [])

        let applyFields = []
        if (Array.isArray(detail.apply_fields)) {
          applyFields = detail.apply_fields
        } else if (typeof detail.apply_fields === 'string' && detail.apply_fields) {
          try {
            applyFields = JSON.parse(detail.apply_fields)
          } catch (err) {
            applyFields = []
          }
        }

        this.form = {
          ...this.form,
          ...detail,
          date_range: detail.start_time && detail.end_time ? [detail.start_time, detail.end_time] : [],
          apply_date_range: detail.apply_start_time && detail.apply_end_time ? [detail.apply_start_time, detail.apply_end_time] : [],
          banner,
          apply_fields: applyFields,
          need_captcha: Number(detail.need_captcha) === 1,
          need_sms: Number(detail.need_sms) === 1
        }
      } catch (e) {
        this.$message.error('加载详情失败')
      }
    },
    addField() {
      this.form.apply_fields.push({
        name: '',
        type: 'text',
        required: false
      })
    },
    removeField(idx) {
      this.form.apply_fields.splice(idx, 1)
    },
    handlePayChange(val) {
      if (!val) {
        this.form.pay_type = 'integral'
        this.form.pay_amount = 1
      }
    },
    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return

        this.submitting = true
        try {
          const data = {
            activity_name: this.form.activity_name,
            cover: this.form.cover,
            description: this.form.description,
            rule: this.form.rule,
            start_time: this.form.date_range[0],
            end_time: this.form.date_range[1],
            apply_start_time: this.form.apply_date_range[0] || '',
            apply_end_time: this.form.apply_date_range[1] || '',
            banner: Array.isArray(this.form.banner) ? this.form.banner.join(',') : this.form.banner,
            apply_fields: JSON.stringify(this.form.apply_fields),
            apply_check: this.form.apply_check,
            per_day_count: this.form.per_day_count,
            per_all_count: this.form.per_all_count,
            ip_day_count: this.form.ip_day_count,
            device_day_count: this.form.device_day_count,
            is_pay: this.form.is_pay,
            pay_type: this.form.pay_type,
            pay_amount: this.form.is_pay ? this.form.pay_amount : 0,
            need_captcha: this.form.need_captcha ? 1 : 0,
            need_sms: this.form.need_sms ? 1 : 0,
            is_show: this.form.is_show,
            sort: this.form.sort
          }

          if (this.isEdit) {
            await voteUpdateApi(this.$route.params.id, data)
            this.$message.success('编辑成功')
          } else {
            await voteCreateApi(data)
            this.$message.success('创建成功')
          }
          this.goBack()
        } catch (e) {
          this.$message.error(e.message || '操作失败')
        } finally {
          this.submitting = false
        }
      })
    },
    goBack() {
      this.$router.push({ path: this.roterPre + '/marketing/vote/list' })
    }
  }
}
</script>

<style lang="scss" scoped>
.divBox {
  padding: 20px;
}
.selWidth {
  width: 500px;
}
.tip {
  color: #ccc;
  font-size: 12px;
}
.field-list {
  .field-item {
    margin-bottom: 10px;
  }
}
.ml10 {
  margin-left: 10px;
}
.ml20 {
  margin-left: 20px;
}
.danger {
  color: #f56c6c;
}
.upLoadPicBox {
  width: 58px;
  height: 58px;
  border: 1px dashed #dcdee2;
  border-radius: 4px;
  cursor: pointer;
  .pictrue {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
  }
  .upLoad {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 20px;
      color: #ccc;
    }
  }
}
.pictrue {
  width: 58px;
  height: 58px;
  position: relative;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  .btndel {
    position: absolute;
    top: -8px;
    right: -8px;
    font-size: 18px;
    color: #f56c6c;
    cursor: pointer;
  }
}
</style>
