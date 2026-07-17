<template>
  <div>
    <el-card>
      <div class="mb20">
        <el-button size="small" type="primary" @click="onAdd">添加</el-button>
      </div>
      <el-table v-loading="listLoading" :data="tableData" size="small">
        <el-table-column label="名称" prop="name" min-width="180">
        </el-table-column>
        <el-table-column label="标题" prop="title" min-width="180" />
        <el-table-column label="图片" prop="image" min-width="180">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.image"
              :preview-src-list="[scope.row.image]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="跳转链接" prop="url" min-width="180" />
        <el-table-column prop="sort" label="排序" min-width="150" />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="handleDelete(scope.row, scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="modalTitle" :visible.sync="visible" width="600px">
      <el-form
        ref="formRef"
        :model="form"
        label-width="90px"
        @submit.native.prevent
      >
        <el-form-item label="名称：" prop="name" required>
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="标题：" prop="title" required>
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="图片：" prop="image" required>
          <el-upload
            class="upload-demo mr10"
            :action="fileUrl"
            :on-success="handleSuccess"
            :headers="myHeaders"
            :show-file-list="false"
          >
            <template v-if="form.image">
              <el-image
                style="width: 100px; height: 100px"
                :src="form.image"
              ></el-image>
              <div>
                <el-button  size="small" type="danger" @click.stop="form.image = undefined">移除图片</el-button>
              </div>
            </template>
            <el-button v-else size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转链接：" prop="url" required>
          <el-input v-model="form.url" placeholder="请输入跳转链接" />
        </el-form-item>
        <el-form-item label="排序：" prop="sort" required>
          <el-input-number v-model="form.sort" placeholder="请输入排序" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button :loading="confirmLoading" type="primary" @click="submitForm">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getHeadConfig,
  deleteHeadConfig,
  addHeadConfig,
  editHeadConfig,
} from "@/api/setting";
import { getToken } from "@/utils/auth";
import SettingMer from "@/libs/settingMer";

export default {
  data() {
    return {
      listLoading: true,
      tableData: [],
      modalTitle: "添加",
      visible: false,
      form: {},
      confirmLoading: false,
      myHeaders: { "X-Token": getToken() }
    };
  },
  computed: {
    fileUrl() {
      return (
        SettingMer.https +
        `/community/topic/upLoadImg`
      );
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true;
      return getHeadConfig()
        .then((res) => {
          this.tableData = res.data;
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
          this.$message.error(res.message);
        });
    },
    onAdd() {
      this.modalTitle = "添加";
      this.form = {};
      this.visible = true;
    },
    onEdit(row) {
      this.modalTitle = "编辑";
      this.form = { ...row };
      this.visible = true;
    },
    handleDelete(row) {
      this.$modalSure("确认删除吗").then(() => {
        deleteHeadConfig(row.id)
          .then(({ message }) => {
            this.$message.success(message);
            this.getList();
          })
          .catch(({ message }) => {
            this.$message.error(message);
          });
      });
    },
    // 上传成功
    handleSuccess(response) {
      console.log(response,'response');
      if (response.status === 200) {
        this.form.image = response.data.src;
        this.$message.success("上传成功");
      } else {
        this.$message.error(response.message);
      }
    },
    submitForm() {
      this.$refs.formRef.validate().then((v) => {
        if (!v) return;
        this.confirmLoading = true;
        if (this.modalTitle === "添加") {
          addHeadConfig(this.form).then(() => {
            this.$message.success("添加成功");
            this.confirmLoading = false;
            this.visible = false;
            this.getList();
          });
        } else {
          editHeadConfig(this.form).then(() => {
            this.$message.success("编辑成功");
            this.confirmLoading = false;
            this.visible = false;
            this.getList();
          });
        }
      });
    },
  },
};
</script>
