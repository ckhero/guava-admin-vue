<template>
  <div>
    <el-form-item label="资料名字">
      <el-input v-model="datumData.datum_name" placeholder="请输入资料名字"/>
    </el-form-item>
    <el-form-item v-if="(datumData.datum_detail_type === 'img' && datumType === 'lesson')" label="资料图片" >
      <guavaUpload :image_url.sync="datumData.datum_detail"/>
    </el-form-item>
    <el-form-item v-if="!(datumData.datum_detail_type === 'img' && datumType === 'lesson')" label="资料内容" >
      <el-input v-model="datumData.datum_detail" placeholder="请输输入资料内容"/>
    </el-form-item>
  </div>
</template>

<script>
import GuavaUpload from '@/components/GuavaUpload'
export default {
  name: 'Datum',
  components: {
    GuavaUpload
  },
  props: {
    datum: {
      type: Object,
      default: function() { return [] }
    },
    type: {
      type: String,
      default: function() { return 'default' }
    }
  },
  data() {
    return {
      show: false,
      datumData: {},
      datumType: 'default'
    }
  },
  watch: {
    datum() {
      console.log(222)
      this.datumData = this.datum
      this.datumType = this.type
    },
    datumData() {
      console.log(this.datumData)
    }
  },
  mounted() {
    this.datumData = this.datum
    this.datumType = this.type
  }
}
</script>

<style scoped>

</style>
