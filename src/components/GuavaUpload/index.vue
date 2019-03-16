<template>
  <div>
    <el-upload
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      action="http://guava-admin.com/v1/upload/save"
      name="imageFiles[]"
      class="avatar-uploader">
      <img v-if="imageUrlData" :src="imageUrlData" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"/>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'GuavaUpload',
  props: {
    image_url: {
      type: String,
      default: function() { return '' }
    }
  },
  data() {
    return {
      imageUrlData: ''
    }
  },
  watch: {
    image_url() {
      this.imageUrlData = this.image_url
    }
  },
  mounted() {
    this.imageUrlData = this.image_url
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.imageUrlData = res[0]
      this.$emit('update:image_url', res[0])
    },
    beforeAvatarUpload(file) {
      const isJPG = true
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

