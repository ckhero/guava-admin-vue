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
      <el-table-column :label="$t('table.id')" prop="id" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.lesson_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程名字" >
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.lesson_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程类型" align="center">
        <template slot-scope="scope">
          <span><el-tag :type="scope.row.lesson_type | statusFilter">{{ scope.row.lesson_type | typeFilter }}</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="课程排序" align="center">
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
      <el-tabs v-model="activeName" style="margin-left:50px;">
        <el-tab-pane label="课程信息" name="lessonInfo" >
          <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px">
            <el-form-item label="课程名字" prop="lesson_name" style="width: 400px;">
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
            <datum :datum="temp.datum" :type="datumType" style="width: 400px;"/>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="课程题目" name="questionList">
          <el-row v-for="(item, questionKey) in temp.questions" :key="item.lesson_question_id" :gutter="20" style="line-height: 40px;border-bottom:1px solid #C0C4CC; padding: 10px 0px">
            <el-col :span="4" :offset="1">
              <label>{{ item.lesson_question_sort }} . 题目类型选择</label>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <el-radio-group v-model="item.lesson_question_type" @change="handleRadioChanges">
                  <el-radio v-for="(opt) in options" :key="opt.label" :label="String(opt.label)">
                    {{ opt.value }}
                  </el-radio>
                </el-radio-group>
              </div>
            </el-col>
            <el-col v-if="( item.lesson_question_type !== 'img')" :offset="5" >
              <el-col :span="16">
                <el-input v-model="item.lesson_question_detail" type="textarea" />
              </el-col>
            </el-col>
            <el-col v-if="( item.lesson_question_type === 'img')" :offset="5" >
              <el-col :span="16">
                <guavaUpload :image_url.sync="item.lesson_question_detail"/>
              </el-col>
            </el-col>
            <el-col :span="4" :offset="1" style="padding-top: 10px;">
              <label>题目解析</label>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <el-radio-group v-model="item.lesson_question_explanation_type" @change="handleRadioChanges">
                  <el-radio v-for="(opt) in options" :key="opt.label" :label="String(opt.label)">
                    {{ opt.value }}
                  </el-radio>
                </el-radio-group>
              </div>
            </el-col>
            <el-col v-if="( item.lesson_question_explanation_type !== 'img')" :offset="5" >
              <el-col :span="16">
                <el-input v-model="item.lesson_question_explanation" type="textarea" />
              </el-col>
            </el-col>
            <el-col v-if="( item.lesson_question_explanation_type === 'img')" :offset="5" >
              <el-col :span="16">
                <guavaUpload :image_url.sync="item.lesson_question_explanation"/>
              </el-col>
            </el-col>
            <el-col :span="4" :offset="1" style="padding-top: 10px;">
              <label>选项</label>
            </el-col>
            <el-col :span="16" style="padding-left: 0px;">
              <el-radio-group v-model="item.lesson_question_right_option" @change="handleRadioChanges">
                <el-col v-for="(option) in item.lesson_question_items" :key="option.lesson_question_item_id" style="padding-left: 0px; margin-top: 20px">
                  <el-col :span="3" style="line-height: 30px"><el-radio :label="option.lesson_question_item_option">{{ option.lesson_question_item_option }}</el-radio></el-col>
                  <el-col :span="12">
                    <el-input v-model="option.lesson_question_item_detail" type="textarea" />
                  </el-col>
                </el-col>
              </el-radio-group>
            </el-col>
            <el-col :span="24" :offset="8" style="padding: 2px 0px">
              <i class="el-icon-plus" style="cursor:pointer;" @click="addOption(questionKey)">添加题目选项</i>
            </el-col>
          </el-row>
          <el-col :offset="8">
            <el-button icon="el-icon-plus" type="primary" style="margin-top: 10px" @click="addQuestion">添加题目</el-button>
          </el-col>
        </el-tab-pane>
      </el-tabs>
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
import Datum from '@/components/GuavaDatum'
import GuavaUpload from '@/components/GuavaUpload'

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
  components: {
    Pagination,
    Datum,
    GuavaUpload
  },
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
      const changeNum = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'] // changeNum[0] = "零"
      const unit = ['', '十', '百', '千', '万']
      num = parseInt(num)
      const getWan = (temp) => {
        const strArr = temp.toString().split('').reverse()
        let newNum = ''
        for (var i = 0; i < strArr.length; i++) {
          newNum = (i === 0 && strArr[i] === 0 ? '' : (i > 0 && strArr[i] === 0 && strArr[i - 1] === 0 ? '' : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i]))) + newNum
        }
        if (temp >= 10 && temp < 20) {
          newNum = newNum.substring(1)
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
      lessonQuestions: {},
      datumType: 'lesson',
      activeNames: ['1'],
      activeName: 'lessonInfo',
      importanceOptions: [1, 2, 3],
      radio: 'text',
      options: [{ label: 'text', value: '文字' }, { label: 'img', value: '图片' }],
      showReviewer: false,
      temp: {
        lesson_id: null,
        lesson_type: null,
        lesson_name: null,
        datum: {},
        lesson_sort: 0,
        questions: [],
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
      })
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.activeName = 'lessonInfo'
      this.temp = {
        lesson_id: null,
        lesson_type: null,
        lesson_name: null,
        lesson_sort: 0,
        datum: {
          datum_detail_type: 'img',
          datum_detail: ''
        },
        questions: []
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
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      console.log(this.temp.questions)
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
    },
    handleRadioChanges(type) {
      console.log(type)
    },
    addOption(questionKey) {
      const words = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      const optionsNum = this.temp.questions[questionKey].lesson_question_items.length
      if (optionsNum > 6) {
        this.$notify({
          title: '失败',
          message: '最多添加7个选项',
          type: 'error',
          duration: 2000
        })
      } else {
        const newOption = Object.assign({}, { lesson_question_item_option: words[optionsNum], lesson_question_item_detail: '' })
        this.temp.questions[questionKey].lesson_question_items.push(newOption)
      }
    },
    addQuestion() {
      const questionNum = this.temp.questions.length + 1
      const defaultQuestion = {
        lesson_question_items: [
          {
            lesson_question_item_option: 'A',
            lesson_question_item_detail: ''
          },
          {
            lesson_question_item_option: 'B',
            lesson_question_item_detail: ''
          }
        ],
        lesson_question_detail: '',
        lesson_question_explanation: '',
        lesson_question_explanation_type: 'text',
        lesson_question_sort: questionNum,
        lesson_question_type: 'text',
        lesson_question_right_option: 'A'
      }
      const question = Object.assign({}, defaultQuestion)
      this.temp.questions.push(question)
    }
  }
}
</script>
