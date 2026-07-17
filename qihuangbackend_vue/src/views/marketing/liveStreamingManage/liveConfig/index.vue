<template>
  <div class="divBox">
    <el-card>
      <div class="section" v-for="(section, index) in sections" :key="section.key">
        <div class="section-title">{{ section.label }}</div>
        <el-form label-width="140px" size="small">
          <el-form-item
            v-for="item in section.fields"
            :key="item.key"
            :label="item.label + '：'"
          >
            <el-switch
              v-if="item.type === 'switch'"
              v-model="form[item.key]"
              active-value="1"
              inactive-value="0"
              active-text="是"
              inactive-text="否"
            />
            <el-select
              v-else-if="item.type === 'select'"
              v-model="form[item.key]"
              style="width: 400px"
            >
              <el-option
                v-for="opt in item.options"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
            <el-input
              v-else
              v-model="form[item.key]"
              :type="item.secret ? 'password' : 'text'"
              :show-password="item.secret"
              style="width: 400px"
            />
            <span v-if="item.suffix" class="field-suffix">{{ item.suffix }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div style="padding: 20px 0 10px; text-align: center;">
        <el-button type="primary" size="small" :loading="saving" @click="handleSave">保存配置</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getLiveSettingList, saveLiveSetting } from '@/api/liveStreamingManage'

export default {
  name: 'liveConfig',
  data() {
    return {
      saving: false,
      form: {},
      sections: [
        {
          key: 'aliyun_api',
          label: '阿里云API凭证',
          fields: [
            { key: 'access_key_id', label: 'AccessKey ID', secret: true },
            { key: 'access_key_secret', label: 'AccessKey Secret', secret: true },
            {
              key: 'region_id', label: '区域', type: 'select',
              options: [
                { value: 'cn-beijing', label: '华北2(北京)' },
                { value: 'cn-shanghai', label: '华东2(上海)' },
                { value: 'cn-shenzhen', label: '华南1(深圳)' },
                { value: 'cn-qingdao', label: '华北1(青岛)' },
                { value: 'ap-southeast-1', label: '亚太东南1(新加坡)' }
              ]
            },
            { key: 'callback_url', label: '回调URL' }
          ]
        },
        {
          key: 'push_stream',
          label: '推流配置',
          fields: [
            { key: 'push_domain', label: '推流域名' },
            { key: 'push_key', label: '推流防盗链密钥', secret: true },
            { key: 'app_name', label: 'AppName' }
          ]
        },
        {
          key: 'pull_stream',
          label: '拉流配置',
          fields: [
            { key: 'pull_domain', label: '拉流域名' },
            { key: 'pull_key', label: '拉流防盗链密钥', secret: true },
            { key: 'auth_duration', label: '鉴权有效时长', suffix: '秒' }
          ]
        },
        {
          key: 'recording',
          label: '录制配置',
          fields: [
            { key: 'enabled', label: '启用自动录制', type: 'switch' },
            { key: 'oss_endpoint', label: 'OSS Endpoint' },
            { key: 'oss_bucket', label: 'OSS Bucket名称' },
            {
              key: 'format', label: '录制格式', type: 'select',
              options: [
                { value: 'm3u8', label: 'M3U8' },
                { value: 'mp4', label: 'MP4' },
                { value: 'flv', label: 'FLV' }
              ]
            },
            { key: 'slice_duration', label: '切片时长', suffix: '秒' },
            { key: 'delay_time', label: '延迟录制时间', suffix: '秒' }
          ]
        },
        {
          key: 'player_web',
          label: '播放器配置 - Web端',
          fields: [
            { key: 'license_domain', label: 'License域名' },
            { key: 'license_key', label: 'License密钥', secret: true },
            { key: 'player_app_name', label: '应用名称' },
            { key: 'player_app_id', label: '应用ID' }
          ]
        }
      ]
    }
  },
  mounted() {
    this.loadSettings()
  },
  methods: {
    async loadSettings() {
      try {
        const { data } = await getLiveSettingList()
        const form = {}
        if (data) {
          Object.keys(data).forEach(group => {
            (data[group] || []).forEach(item => {
              form[item.setting_key] = item.setting_value
            })
          })
        }
        this.form = form
      } catch (e) {
        this.$message.error('加载配置失败')
      }
    },
    async handleSave() {
      this.saving = true
      try {
        const settings = Object.keys(this.form).map(key => ({
          setting_key: key,
          setting_value: this.form[key]
        }))
        await saveLiveSetting({ settings })
        this.$message.success('保存成功')
      } catch (e) {
        this.$message.error('保存失败')
      } finally {
        this.saving = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.section {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
  &:last-of-type {
    border-bottom: none;
  }
}
.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  padding-left: 10px;
  border-left: 3px solid #409eff;
}
.field-suffix {
  margin-left: 8px;
  color: #999;
  font-size: 12px;
}
</style>
