<template>
  <div>
    <el-form
      ref="formRef"
      :class="[{ 'd-common-grid': display === 'grid' }, { 'd-common-flex-row d-common-flex-waper': display === 'flex' }]"
      :label-position="labelPosition"
      :label-width="labelWidth"
      :model="formData"
      :rules="rules"
      :style="getStyle(formLineNum, rowGap, colGap)"
      @submit.prevent
    >
      <template>
        <div v-for="(formitem) in formItemsNew " :key="formitem.name" class="from-box" :style="formitem.formitemStyle">
          <el-form-item
            v-if="!formitem.hideItem"
            :class="formitem.class"
            :label="formitem.label"
            :prop="formitem.prop"
          >
            <el-input
              v-if="formitem.type === 'input' && !formitem.hideItem && !formitem.showType"
              v-model="formData[formitem.prop]"
              focus="formitem.autofocus"
              :autofocus="formitem.autofocus"
              :class="formitem.class"
              :clearable="!formitem.notClearable"
              :disabled="formitem.disabled"
              :placeholder="formitem.placeholder"
              :show-password="formitem.showPassword"
              :title="formData[formitem.prop]"
              @blur="onBlur"
              @keyup.enter="formitem.enterSubmit ? onSubmit() : null"
            />
            <el-input
              v-if="formitem.type === 'textarea' && !formitem.hideItem && !formitem.showType"
              v-model="formData[formitem.prop]"
              type="textarea"
              focus="formitem.autofocus"
              :autofocus="formitem.autofocus"
              :class="formitem.class"
              :clearable="!formitem.notClearable"
              :disabled="formitem.disabled"
              :placeholder="formitem.placeholder"
              :show-password="formitem.showPassword"
              :title="formData[formitem.prop]"
              @blur="onBlur"
              @keyup.enter="formitem.enterSubmit ? onSubmit() : null"
            />
            <el-input-number
              v-else-if="formitem.type === 'inputNumber' && !formitem.hideItem"
              v-model="formData[formitem.prop]"
              focus="formitem.autofocus"
              :autofocus="formitem.autofocus"
              class="d-input-text-left"
              :clearable="!formitem.notClearable"
              controls-position="right"
              :disabled="formitem.disabled"
              :max="formitem.max"
              :min="formitem.min"
              :placeholder="formitem.placeholder"
              :step="formitem.step"
              :step-strictly="!formitem.notStrictly"
              @keyup.enter="formitem.enterSubmit ? onSubmit() : null"
            />
            <el-select
              v-else-if="formitem.type === 'selete' && !formitem.hideItem"
              v-model="formData[formitem.prop]"
              :clearable="!formitem.notClearable"
              :collapse-tags="formitem.multiple"
              :disabled="formitem.disabled"
              :filterable="formitem.filterable"
              :loading="formitem.remoteConfig && formitem.remoteConfig.loading"
              :multiple="formitem.multiple"
              :multiple-limit="formitem.multipleLimit"
              :placeholder="formitem.placeholder"
              :remote="formitem.remoteConfig && formitem.remoteConfig.remote"
              :remote-method="formitem.remoteConfig && formitem.remoteConfig.remoteMethod ? formitem.remoteConfig.remoteMethod : undefined"
              :title="getSelectTitle(formData[formitem.prop], formitem.seleteData)"
              @change="formitem.changeSubmit ? onSubmit() :formitem.onchange ? onchange(): null"
            >
              <el-option v-for="item in formitem.seleteData" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select
              v-else-if="formitem.type === 'seleteIcon'"
              v-model="formData[formitem.prop]"
              :clearable="!formitem.notClearable"
              :collapse-tags="formitem.multiple"
              :disabled="formitem.disabled"
              :filterable="formitem.filterable"
              :multiple="formitem.multiple"
              :multiple-limit="formitem.multipleLimit"
              :placeholder="formitem.placeholder"
              @change="formitem.changeSubmit ? onSubmit() : null"
            >
              <el-option v-for="item in formitem.seleteData" :key="item" :label="item" :value="item">
                <!-- :icon-config="{ icon: item, type: 'custom', color: ColorTheme }" -->
                <d-icon class="d-common-icon-theme" :icon-config="operbutton.iconConfig" />
              </el-option>
            </el-select>
            <el-select-v2
              v-else-if="formitem.type === 'seleteV2' && !formitem.hideItem"
              v-model="formData[formitem.prop]"
              :clearable="!formitem.notClearable"
              :collapse-tags="formitem.multiple"
              :disabled="formitem.disabled"
              :filterable="formitem.filterable"
              :loading="formitem.remoteConfig && formitem.remoteConfig.loading"
              :multiple="formitem.multiple"
              :options="formitem.seleteData"
              :placeholder="formitem.placeholder"
              :remote="formitem.remoteConfig && formitem.remoteConfig.remote"
              :remote-method="formitem.remoteConfig && formitem.remoteConfig.remoteMethod ? formitem.remoteConfig.remoteMethod : undefined"
              :title="getSelectTitle(formData[formitem.prop], formitem.seleteData)"
              @change="formitem.changeSubmit ? onSubmit() : null"
            />
            <el-tree-select
              v-else-if="formitem.type === 'seleteTree' && !formitem.hideItem"
              v-model="formData[formitem.prop]"
              :check-strictly="formitem.checkStrictly"
              :clearable="!formitem.notClearable"
              :collapse-tags="formitem.multiple"
              :data="formitem.seleteData"
              :disabled="formitem.disabled"
              :multiple="formitem.multiple"
              :placeholder="formitem.placeholder"
              :show-checkbox="formitem.showCheckbox"
              @change="formitem.changeSubmit ? onSubmit() : null"
            />
            <el-radio-group
              v-else-if="formitem.type === 'radio' && !formitem.hideItem"
              v-model="formData[formitem.prop]"
              :disabled="formitem.disabled"
            >
              <el-radio v-for="data in formitem.seleteData" :key="data.value" :label="data.value">
                {{ data.label }}
              </el-radio>
            </el-radio-group>
            <a-tree-select
              v-else-if="formitem.type === 'treeSelect' && !formitem.hideItem"
              v-model="formData[formitem.prop]"
              style="width: 100%"
              :multiple="formitem.multiple"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto', zIndex: '999999' }"
              :tree-data="formitem.seleteData"
              placeholder="Please select"
              tree-default-expand-all
              :replace-fields="{ children: 'childrenList', title: 'insName', key: 'id', value: 'id' }"
            />
            <div v-else-if="formitem.type === 'text' && !formitem.hideItem">
              {{ formData[formitem.prop] }}
            </div>
            <div class="" v-else-if="formitem.type === 'image' && !formitem.hideItem">
              <div class="upLoadPicBox" @click="modalPicTap(formitem.prop)">
                <div v-if="formData[formitem.prop]" class="pictrue"><img :src="formData[formitem.prop]"></div>
                <div v-else class="upLoad">
                  <i class="el-icon-camera cameraIconfont" />
                </div>
              </div>
            </div>
            <slot
              v-else-if="formitem.type === 'slot' && !formitem.hideItem"
              :form-data="formData"
              :formitem="formitem"
              :name="formitem.slotName"
            ></slot>
            <div v-else-if="formitem.type === 'editor'">
              123
            </div>
            <div v-else-if="formitem.type === 'editor' && !formitem.hideItem" style="width: 100%;	display: flex;flex-flow:row wrap;justify-content: space-between;">
              <!-- <quill-editor
                ref="myQuillEditor"
                v-model="formData[formitem.prop]"
                :options="editorOption"
                class="my-quill-editor"
                style="width: 100%;height: 100px;"
              /> -->
              <!-- <editor-quill
              ref="myQuillEditor"
              v-model="formData[formitem.prop]"
              class="my-quill-editor"
              style="width: 100%;height: 100px;"
              @contentData="onContentData($event,formitem.prop)"
              /> -->
              <WangEditor
              :content="formData[formitem.prop]"
              @editorContent="getEditorContent"
              style="width: 100%; height: 60%"
            ></WangEditor>
            </div>
          </el-form-item>
        </div>
      </template>
    </el-form>
  </div>
</template>

<script>
import dFrom from './dFrom'
// import quillConfig from '@/utils/quill-config.js'
// import { Quill } from 'vue-quill-editor'
// import editorQuill from '../editorQuill'
import WangEditor from "@/components/wangEditor/index.vue";
export default {
  name: 'DFrom',
  mixins: [dFrom],
  components: {
    // editorQuill,
    WangEditor
  },

  data() {
    return {
      formRef: '',
      // formData: {},
      seleteData:[],
      loading:false,
      // editorOption: quillConfig,
      // editorOption: {
      //   // 占位配置
      //   placeholder: '请输入...',
      //   height: '300px',
      //   modules: {
      //     // 配置工具栏
      //     toolbar: [
      //       ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
      //       ['blockquote', 'code-block'], // 引用  代码块
      //       [{ header: 1 }, { header: 2 }], // 1、2 级标题
      //       [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
      //       [{ script: 'sub' }, { script: 'super' }], // 上标/下标
      //       [{ indent: '-1' }, { indent: '+1' }], // 缩进
      //       [{ direction: 'rtl' }], // 文本方向
      //       ['link', 'image', 'video'], // 链接、图片、视频
      //       [{ align: [] }], // 添加居中按钮
      //       [{ color: [] }] // 文字颜色按钮
      //     ],
      //     // 更改插入的图片大小
      //     imageResize: {
      //       displayStyles: {
      //         backgroundColor: 'black',
      //         border: 'none',
      //         color: 'white'
      //       },
      //       modules: ['Resize', 'DisplaySize', 'Toolbar']
      //     }
      //   }
      // }
      configData:{}
    }
  },
  computed: {
    // percentage() {
    //   if (this.allImgNum === 0) return 0
    //   return this.$baseLodash.round(this.imgNum / this.allImgNum, 2) * 100
    // }
    formItemsNew() {
      return this.formItems
    },
    formData() {
      return this.formDatas
    }
  },
  watch: {
    resetFieldsFlag: {
      immediate: true, // 初始化时让handler调用一下
      // handler什么时候调用？当isHot发生改变时。
      handler(newValue, oldValue) {
        this.resetForm()
      }
    },
    validateFlag: {
      immediate: true, // 初始化时让handler调用一下
      // handler什么时候调用？当isHot发生改变时。
      handler(newValue, oldValue) {
        this.onSubmit()
      }
    },
    // formDatas: {
    //   immediate: true,
    //   handler(val) {
    //     this.formData = val
    //     console.log(this.formData,'--this.formData--')
    //   }
    // }
  },
  mounted() {
    // this.$nextTick( ()=> {
    //   setTimeout(() => {
    //     quillConfig.initButton();
    //     quillConfig.register(Quill);
    //   },500)
    // })

  },
  methods: {
    getEditorContent(data) {
        this.configData.val = data;
    },
    modalPicTap(key) {
      const _this = this
      _this.$modalUpload(function (img) {
        console.log(img,'--img--')
        _this.formData[key] = img[0]
      })
    },
    onContentData(data,key) {
      this.formData[key] = data
      console.log(data,'--onContentData--')
    },
    // ifgetMenusKeyByValue(query, key) {

    //   if (query !== '') {
    //     this.formItemsNew.map(item => {
    //       if (item.prop == key) {
    //         item.value = query
    //       }
    //     })
    //   }
    // },
    handleFocus() {
      this.$refs.selectRef[3].toggleMenu(true);
    },
    onsuer(query,key,datainfo) {
      // this.loading = true;
      // if (key=='发布部门') {
      //   this.$refs.selectRef.focus();
      // } else if (key=='类别') {
      //   this.$refs.selectRef1.focus();
      // } else if (key=='效力级别') {
      //   this.$refs.selectRef2.focus();
      // }
      // console.log(key, query,'----319---')
      // return
      // this.$refs.selectRef.focus();
      // this.loading = true;
      // let str = {
      //   value: query,
      //   templateId: 'd88f806e502848bf820eae76ed6d0cec',
      //   menuName:key
      // }
      // getMenusKeyByValue(str).then(res => {
      //   this.loading = false;
      //   let data = [ ]
      //   for (var i = 0; i < res.data.length; i++){
      //     let str = {
      //       label: res.data[i],
      //       value:res.data[i]
      //     }
      //     data.push(str)
      //   }
      //   this.$nextTick(() => {
      //     // this.formData[key] = ''
      //     // datainfo = data
      //     console.log(this.formData[key],'--this.formData--',key)
      //     this.formItemsNew.map(item => {
      //       if (item.prop == key) {
      //         item.seleteData = data
      //       }
      //     })

      //     this.$refs.selectRef[3].focus();

      //   })

        // console.log(this.$refs.selectRef,'----319---')
        // this.seleteData = data
        // this.options = data
        // this.formItemsNew.map(item => {
        //   if (item.prop == key) {
        //     console.log(item.prop,key,'----319---')
        //     // item.value = ''
        //     // item.seleteData = []
        //     item.seleteData = data
        //   }
        // })
        // this.$nextTick(() => {
        //   for (var i = 0; i < res.data.length; i++){
        //   let str = {
        //     label: res.data[i],
        //     value:res.data[i]
        //   }
        //   this.formItemsNew.map(item => {
        //   if (item.prop == key) {
        //     console.log(item.prop,key,'----319---')
        //     item.value = ''
        //     item.seleteData = []
        //     item.seleteData.push(str)
        //   }
        // })
        // }

        // })
      // }).catch(err => {
      //   this.loading = false;
      // })
    },
    getStyle(lineNum, rowGap, colGap) {
      const style = {}
      style['grid-template-columns'] = `repeat(${lineNum},1fr)`
      style.rowGap = `${rowGap}px`
      style.columnGap = `${colGap}px`
      style.paddingBottom = '16px'
      return style
    },
    IfclearEmpty() {
      const form = this.formData
      for (const key in form) {
        const data = form[key]
        if (data === '') form[key] = undefined
      }
    },
    onSubmit() {
      const elForm = this.$refs.formRef
      if (!elForm) return
      const that = this
      elForm.validate((valid) => {
        if (valid) {
          if (that.clearEmpty) {
            that.IfclearEmpty()
          }
          that.$emit('submit')
        } else {
          return false
        }
      })
    },
    onchange() {
      this.$emit('onchange')
    },
    resetForm() {
      const elForm = this.$refs.formRef
      if (!elForm) return
      elForm.resetFields()
    },
    getSelectTitle(value, seleteData) {
      if (value === null || value === undefined) {
        return ''
      } else {
        for (let i = 0, l = seleteData.length; i < l; i++) {
          if (seleteData[i].value === value) {
            return seleteData[i].label
          }
        }
        return ''
      }
    },
    onBlur() {
      this.$emit('inputBlur')
    }
  }
}
</script>
<style>
.el-form-item__content {
  /* display: flex !important; */
  min-height: 40px !important;
  /* align-items: center; */
}
.ql-container{
  min-height: 200px !important;
}
</style>
<style scoped>
.d-common-grid {
  display: grid;
  grid-template-columns: repeat(var(1), 1fr);
  column-gap: 13px;
}

.d-common-flex-row {
  display: flex;
  flex-direction: row;
}

.d-common-flex-waper {
  display: flex;
  flex-wrap: wrap;
}
.my-quill-editor{
  height: 200px;

}
.display-flex{
  width: 100%;
  display: flex;
  flex-flow:row wrap;
  justify-content: space-between;
  align-items: center ;

}
</style>
