<template>
  <el-dialog :title="productId ? '编辑产品' : '添加产品'" :visible.sync="dialogVisible" width="900px" :close-on-click-modal="false" @close="handleClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="small">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入产品名称" maxlength="100" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="产品分类" prop="category_id">
            <el-select v-model="form.category_id" placeholder="请选择分类" style="width: 100%;">
              <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="行程天数" prop="days">
            <el-input-number v-model="form.days" :min="1" :max="99" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出发城市">
            <el-input v-model="form.departure_city" placeholder="如：北京" maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="目的地">
            <el-input v-model="form.destination" placeholder="如：云南" maxlength="100" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="产品主图" prop="image">
        <div class="upLoadPicBox" @click="openImageUpload">
          <div v-if="form.image" class="pictrue">
            <img :src="form.image" />
            <i class="el-icon-error delete-btn" @click.stop="form.image = ''" />
          </div>
          <div v-else class="upLoad">
            <i class="el-icon-camera" />
            <span>上传图片</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="产品轮播图">
        <div class="pic-list">
          <div v-for="(img, index) in form.slider_image" :key="index" class="pic-item">
            <img :src="img" />
            <i class="el-icon-error delete-btn" @click="form.slider_image.splice(index, 1)" />
          </div>
          <div class="upLoadPicBox" @click="openSliderUpload">
            <div class="upLoad">
              <i class="el-icon-camera" />
              <span>上传图片</span>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="产品简介">
        <el-input v-model="form.info" type="textarea" :rows="2" placeholder="请输入产品简介" maxlength="500" show-word-limit />
      </el-form-item>
      <el-form-item label="产品亮点">
        <el-input v-model="form.highlight" type="textarea" :rows="3" placeholder="请输入产品亮点，每行一条" />
      </el-form-item>
      <el-form-item label="行程介绍">
        <el-input v-model="form.itinerary" type="textarea" :rows="4" placeholder="请输入行程介绍" />
      </el-form-item>
      <el-form-item label="费用说明">
        <el-input v-model="form.cost_include" type="textarea" :rows="3" placeholder="费用包含项目" />
      </el-form-item>
      <el-form-item label="费用不含">
        <el-input v-model="form.cost_exclude" type="textarea" :rows="3" placeholder="费用不包含项目" />
      </el-form-item>
      <el-form-item label="预订须知">
        <el-input v-model="form.booking_note" type="textarea" :rows="3" placeholder="预订注意事项" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="单房差">
            <el-input-number v-model="form.single_room_price" :min="0" :precision="2" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="排序">
            <el-input-number v-model="form.sort" :min="0" :max="999" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请选择状态" style="width: 100%;">
              <el-option label="上架" value="active" />
              <el-option label="下架" value="inactive" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { productDetail, productCreate, productUpdate } from '@/api/travel'

export default {
  name: 'ProductEdit',
  props: {
    visible: { type: Boolean, default: false },
    productId: { type: Number, default: null },
    categoryOptions: { type: Array, default: () => [] }
  },
  data() {
    return {
      dialogVisible: false,
      submitLoading: false,
      form: {
        name: '',
        category_id: '',
        days: 1,
        departure_city: '',
        destination: '',
        image: '',
        slider_image: [],
        info: '',
        highlight: '',
        itinerary: '',
        cost_include: '',
        cost_exclude: '',
        booking_note: '',
        single_room_price: 0,
        sort: 0,
        status: 'active'
      },
      rules: {
        name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        category_id: [{ required: true, message: '请选择分类', trigger: 'change' }],
        days: [{ required: true, message: '请输入行程天数', trigger: 'blur' }],
        image: [{ required: true, message: '请上传产品主图', trigger: 'change' }]
      }
    }
  },
  watch: {
    visible(val) {
      console.log('ProductEdit visible changed:', val)
      this.dialogVisible = val
      if (val) {
        if (this.productId) {
          this.getDetail()
        } else {
          this.resetForm()
        }
      }
    },
    dialogVisible(val) {
      console.log('ProductEdit dialogVisible changed:', val)
      this.$emit('update:visible', val)
    }
  },
  mounted() {
    console.log('ProductEdit mounted, visible:', this.visible, 'dialogVisible:', this.dialogVisible)
    // 当 v-if 创建组件时，visible 可能已经是 true，需要手动同步
    if (this.visible) {
      this.dialogVisible = true
      if (this.productId) {
        this.getDetail()
      } else {
        this.resetForm()
      }
    }
  },
  methods: {
    resetForm() {
      this.form = {
        name: '',
        category_id: '',
        days: 1,
        departure_city: '',
        destination: '',
        image: '',
        slider_image: [],
        info: '',
        highlight: '',
        itinerary: '',
        cost_include: '',
        cost_exclude: '',
        booking_note: '',
        single_room_price: 0,
        sort: 0,
        status: 'active'
      }
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
    },
    getDetail() {
      productDetail(this.productId).then(res => {
        const data = res.data || {}
        this.form = {
          name: data.name || '',
          category_id: data.category_id || '',
          days: data.days || 1,
          departure_city: data.departure_city || '',
          destination: data.destination || '',
          image: data.image || '',
          slider_image: data.slider_image || [],
          info: data.info || '',
          highlight: data.highlight || '',
          itinerary: data.itinerary || '',
          cost_include: data.cost_include || '',
          cost_exclude: data.cost_exclude || '',
          booking_note: data.booking_note || '',
          single_room_price: data.single_room_price || 0,
          sort: data.sort || 0,
          status: data.status || 'active'
        }
      })
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        this.submitLoading = true
        const api = this.productId ? productUpdate(this.productId, this.form) : productCreate(this.form)
        api.then(() => {
          this.$message.success(this.productId ? '编辑成功' : '添加成功')
          this.dialogVisible = false
          this.$emit('success')
        }).finally(() => {
          this.submitLoading = false
        })
      })
    },
    handleClose() {
      this.resetForm()
    },
    openImageUpload() {
      this.$modalUpload(function(img) {
        this.form.image = img[0]
      }.bind(this))
    },
    openSliderUpload() {
      const maxCount = 9 - this.form.slider_image.length
      this.$modalUpload(function(img) {
        this.form.slider_image = this.form.slider_image.concat(img)
      }.bind(this), String(maxCount))
    }
  }
}
</script>

<style scoped lang="scss">
.upLoadPicBox {
  display: inline-block;
  cursor: pointer;
  .pictrue {
    position: relative;
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
    border-radius: 4px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    .delete-btn {
      position: absolute;
      top: -8px;
      right: -8px;
      font-size: 18px;
      color: #f56c6c;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .upLoad {
    width: 80px;
    height: 80px;
    border: 1px dashed #ddd;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #ccc;
    background: #f8f8f8;
    span {
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
.pic-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .pic-item {
    position: relative;
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
    border-radius: 4px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    .delete-btn {
      position: absolute;
      top: -8px;
      right: -8px;
      font-size: 18px;
      color: #f56c6c;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>
