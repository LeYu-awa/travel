<!-- 编辑直播的基本设置 -->
<template>
  <div>
    <el-form
        ref="formValidate"
        v-loading="Loading"
        class="formValidate mt20"
        :rules="ruleValidate"
        :model="formValidate"
        label-width="120px"
        size="small"
        @submit.native.prevent
      >
          <el-form-item label="直播名称" prop="title">
            <el-input v-model="formValidate.title" size="small"  placeholder="请输入直播名称" style="width: 100%;"/>
          </el-form-item>
          <el-form-item label="直播分类：" required prop="type_id">
            <el-select
              v-model="formValidate.type_id"
              placeholder="请选择"
              clearable
              style="width: 100%;"
            >
              <el-option v-for="(item,index) in LiveTypeList" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="直播间类型：" required prop="live_date_type">
            <el-select
              v-model="formValidate.live_date_type"
              placeholder="请选择"
              clearable
              style="width: 100%;"
            >
              <el-option v-for="(item,index) in liveDateTypeList" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="直播说明：" prop="assistant_title">
            <el-input v-model="formValidate.assistant_title" size="small" type="textarea" placeholder="请输入直播说明" />
          </el-form-item>
          <el-form-item label="自动回复：" prop="reply_content">
            <el-input v-model="formValidate.reply_content" size="small" type="textarea" placeholder="用户首次进入直播间的欢迎语" />
          </el-form-item>
          <el-form-item label="直播标签：" prop="label">
            <div class="label-div">
              <el-input v-model="value" size="small" class="label-div-input" placeholder="最多6个字" :maxlength="6"/>
              <el-button type="primary" icon="el-icon-plus" @click="onlabel"></el-button>
              <span>输入标签名称后点击”+“号按钮添加；最多写入6个字；点击标签即可删除</span>
            </div>
            <div class="label-item">
              <el-button
              type="primary"
              v-for="(item,index) in formValidate.label"
              :key="index"
              @click="onlabelDel(index)"
              >{{ item }}</el-button>
            </div>
          </el-form-item>
          <el-form-item label="直播封面：（710*400）" prop="room_image">
            <div class="upLoadPicBox" @click="modalPicTap(1)">
              <div v-if="formValidate.room_image" class="pictrue"><img :src="formValidate.room_image"></div>
              <div v-else class="upLoad">
                <i class="el-icon-camera cameraIconfont" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="直播Banner：（750*400）" prop="banner">
            <div class="upLoadPicBox" @click="modalPicTap(2)">
              <div v-if="formValidate.banner" class="pictrue"><img :src="formValidate.banner"></div>
              <div v-else class="upLoad">
                <i class="el-icon-camera cameraIconfont" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="回放Banner图片：">
            <div class="banner-list">
              <div v-for="(img, idx) in playbackBannersList" :key="idx" class="banner-item">
                <img :src="img" class="banner-img" />
                <i class="el-icon-circle-close banner-del" @click="removeBanner(idx)"></i>
              </div>
              <div class="upLoadPicBox banner-add" @click="addBanner">
                <div class="upLoad"><i class="el-icon-camera cameraIconfont" /></div>
              </div>
            </div>
            <div class="banner-tip">可上传多张图片作为回放封面，按顺序分配给回放条目，不足时循环使用</div>
          </el-form-item>
          <el-form-item label="推广海报：（600*740）" prop="promotion_img">
            <div class="upLoadPicBox" @click="modalPicTap(3)">
              <div v-if="formValidate.promotion_img" class="pictrue"><img :src="formValidate.promotion_img"></div>
              <div v-else class="upLoad">
                <i class="el-icon-camera cameraIconfont" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="客服二维码：（200*200）：">
            <div class="upLoadPicBox" @click="modalPicTap(4)">
              <div v-if="formValidate.service_img" class="pictrue"><img :src="formValidate.service_img"></div>
              <div v-else class="upLoad">
                <i class="el-icon-camera cameraIconfont" />
              </div>
            </div>
          </el-form-item>
          <!-- <el-form-item label="插入视频:">
            插入视频
          </el-form-item> -->
          <el-form-item label="直播简介:">
            <ueditor-from v-model="formValidate.introduction" :content="formValidate.introduction" style="width: 100%"/>
          </el-form-item>
      </el-form>
  </div>
</template>
<script>
import ueditorFrom from '@/components/ueditorFrom'
import { getLiveType } from '@/api/liveStreamingManage'
export default {
  props: {
    fromData: {
      type: Object,
      required: true
    }
  },

  name: 'basicSet',
  data() {
    return {
      Loading: false,
      ruleValidate: {
        title: [{ required: true, message: '请输入直播名称', trigger: 'blur' }],
        type_id: [{ required: true, message: '请选择课程分类', trigger: 'blur' }],
        assistant_title: [{ required: true, message: '请输入直播说明', trigger: 'blur' }],
        label: [{ required: false, message: '请添加标签', trigger: 'blur' }],
        room_image: [{ required: true, message: '请添加直播封面', trigger: 'blur' }],
        banner: [{ required: true, message: '请添加直播Banner', trigger: 'blur' }],
        promotion_img: [{ required: true, message: '请添加推广海报', trigger: 'blur' }],
      },
      LiveTypeList:[],
      liveDateTypeList: [
        {
          name: '单场',
          id: 1
        },
        {
          name: '多场',
          id: 2
        }
      ],
      formValidate: {
        title: '', // 直播名称
        type_id: '',// 课程分类
        assistant_title: '', //直播说明
        reply_content: '', //自动回复
        label:[],
        room_image: '', //直播封面
        banner: '',//直播Banner
        playback_banners: '',//回放Banner图片JSON
        promotion_img: '',//推广海报
        service_img:'',//客服二维码
        introduction:'' //直播简介
      },
      playbackBannersList: [],
      value:''
    }
  },
  components: { ueditorFrom },
  watch: {
    fromData(newValue) {
      this.formValidate = { ...newValue }; // 浅拷贝fromData的值到formValidate
      try {
        this.playbackBannersList = newValue.playback_banners ? JSON.parse(newValue.playback_banners) : [];
      } catch (e) {
        this.playbackBannersList = [];
      }
    }
  },
  mounted() {
    this.getLiveType()
  },
  methods:{
    modalPicTap(key) {
      const _this = this
      _this.$modalUpload(function (img) {
        switch (key) {
          case 1:
            _this.formValidate.room_image = img[0]
            break
          case 2:
            _this.formValidate.banner = img[0]
            break
          case 3:
            _this.formValidate.promotion_img = img[0]
            break
          case 4:
            _this.formValidate.service_img = img[0]
            break
        }
      })
    },
    addBanner() {
      const _this = this
      _this.$modalUpload(function (img) {
        _this.playbackBannersList = _this.playbackBannersList.concat(img)
        _this.formValidate.playback_banners = JSON.stringify(_this.playbackBannersList)
      }, '0')
    },
    removeBanner(idx) {
      this.playbackBannersList.splice(idx, 1)
      this.formValidate.playback_banners = this.playbackBannersList.length ? JSON.stringify(this.playbackBannersList) : ''
    },
    onlabel() {
      if(this.formValidate.label.length >= 2) return this.$message.error('最多添加2个标签')
      if (this.value) {
        this.formValidate.label.push(this.value)
        this.value = ''
      }
    },
    onlabelDel(index) {
      this.formValidate.label.splice(index, 1)
    },
    // 获取直播间分类
    getLiveType() {
      getLiveType().then(res => {
        console.log(res)
        this.LiveTypeList = res.data.data || []
      })
    },
    onvalidate() {

      let that = this
      return new Promise((resolve, reject) => {
        that.$refs.formValidate.validate((valid) => {
          if (valid) {
            that.formValidate.playback_banners = that.playbackBannersList.length ? JSON.stringify(that.playbackBannersList) : ''
            resolve(that.formValidate);
          } else {
            console.log('error submit!!');
            reject('表单验证失败'); // 拒绝 Promise，并返回失败信息
          }
        });
      });
    }
  }
}
</script>
<style scoped lang="scss">
.label-div{
  display: flex;
  align-items: center;
  .label-div-input{
    width: 30%;
    margin-right: 5px;
  }
  span{
    color: #999999;
    margin-left: 10px;
  }
}
.label-item{
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.banner-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.banner-item {
  position: relative;
  width: 100px;
  height: 100px;
  .banner-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  .banner-del {
    position: absolute;
    top: -8px;
    right: -8px;
    font-size: 20px;
    color: #f56c6c;
    cursor: pointer;
  }
}
.banner-add {
  width: 100px;
  height: 100px;
}
.banner-tip {
  color: #999;
  font-size: 12px;
  margin-top: 5px;
}
</style>
