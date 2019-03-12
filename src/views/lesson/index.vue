<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.lesson_name" placeholder="课程名字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.lesson_type" placeholder="课程类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in lessonTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.lesson_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名字">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.lesson_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程类型">
        <template slot-scope="scope">
          <span><el-tag :type="scope.row.lesson_type | statusFilter">{{ scope.row.lesson_type | typeFilter }}</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="课程排序">
        <template slot-scope="scope">
          <span><el-tag>{{ scope.row.lesson_sort | sortFilter }}</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="课程名字" prop="lesson_name">
          <el-input v-model="temp.lesson_name" placeholder="请输入课程名字"/>
        </el-form-item>
        <el-form-item label="课程类型" prop="lesson_type">
          <el-select v-model="temp.lesson_type" class="filter-item" placeholder="请选择课程类型">
            <el-option v-for="item in lessonTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="课程排序" prop="lesson_sort">
          <el-input-number v-model="temp.lesson_sort" :min="0" :max="100" :disabled="(dialogStatus!=='create')" label="第几天的课程"/>
        </el-form-item>
        <!--<el-form-item :label="$t('table.date')" prop="timestamp">-->
        <!--<el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.title')" prop="title">-->
        <!--<el-input v-model="temp.title"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.status')">-->
        <!--<el-select v-model="temp.status" class="filter-item" placeholder="Please select">-->
        <!--<el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.importance')">-->
        <!--<el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;"/>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.remark')">-->
        <!--<el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea" placeholder="Please input"/>-->
        <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData()">确认提交</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { createArticle } from '@/api/article'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const lessonTypeOptions = [
  { key: 'english', display_name: '英语' },
  { key: 'math', display_name: '数学' },
  { key: 'logic', display_name: '逻辑' }
]
// arr to obj ,such as { CN : "China", US : "USA" }
const lessonTypeKeyValue = lessonTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        english: 'success',
        math: 'info',
        logic: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return lessonTypeKeyValue[type]
    },
    sortFilter(num) {
      const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'] // changeNum[0] = "零"
      const unit = ['', '十', '百', '千', '万']
      num = parseInt(num)
      const getWan = (temp) => {
        const strArr = temp.toString().split('').reverse()
        let newNum = ''
        for (var i = 0; i < strArr.length; i++) {
          newNum = (i === 0 && strArr[i] === 0 ? '' : (i > 0 && strArr[i] === 0 && strArr[i - 1] === 0 ? '' : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i]))) + newNum
        }
        return newNum
      }
      const overWan = Math.floor(num / 10000)
      let noWan = num % 10000
      if (noWan.toString().length < 4) noWan = '0' + noWan
      return overWan ? '第' + getWan(overWan) + '万' + getWan(noWan) + '天' : '第' + getWan(num) + '天'
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        lesson_type: null,
        lesson_name: null
      },
      lessonTypeOptions,
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        lesson_id: null,
        lesson_type: null,
        lesson_name: null,
        lesson_sort: 0,
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑课程',
        create: '新增课程'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.api.v1.lesson.list(this.listQuery).then((res) => {
        this.total = res.data.total
        this.list = res.data.list
        console.log(this.list)
      })
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.temp = {
        lesson_id: null,
        lesson_type: null,
        lesson_name: null,
        lesson_sort: 0,
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      console.log(this.temp)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      const tempData = Object.assign({}, this.temp)
      this.api.v1.lesson.create(tempData).then((res) => {
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
        this.dialogFormVisible = false
        this.getList()
      })
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
      //     const tempData = Object.assign({}, this.temp)
      //     tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
      //     updateArticle(tempData).then(() => {
      //       for (const v of this.list) {
      //         if (v.id === this.temp.id) {
      //           const index = this.list.indexOf(v)
      //           this.list.splice(index, 1, this.temp)
      //           break
      //         }
      //       }
      //       this.dialogFormVisible = false
      //       this.$notify({
      //         title: '成功',
      //         message: '更新成功',
      //         type: 'success',
      //         duration: 2000
      //       })
      //     })
      //   }
      // })
    }
  }
}
</script>
