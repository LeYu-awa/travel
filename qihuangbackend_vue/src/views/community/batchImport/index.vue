<template>
  <el-upload
    :action="fileUrl"
    :on-success="handleSuccess"
    :headers="myHeaders"
    :show-file-list="false"
  >
    <el-button type="primary">批量导入</el-button>
  </el-upload>
</template>

<script>
import SettingMer from "@/libs/settingMer";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      myHeaders: { "X-Token": getToken() }
    }
  },
  computed: {
    fileUrl() {
      return (
        SettingMer.https +
        `/community/topic/videoImport`
      );
    }
  },
  methods: {
    // 上传成功
    handleSuccess(response) {
      console.log(response,'response');
      if (response.status === 200) {
        this.$message.success("批量导入成功");
      } else {
        this.$message.error(response.message);
      }
    },
  }
}
</script>
