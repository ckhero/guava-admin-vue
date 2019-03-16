<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.user_id" placeholder="用户id" style="width: 200px;" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.user_name" placeholder="用户名字" style="width: 200px;" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.user_phone" placeholder="用户手机号" style="width: 200px;" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.user_pay_status" placeholder="支付状态" clearable style="width: 180px">
        <el-option v-for="item in payStatusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column :label="$t('table.id')" prop="user_id" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名字" prop="user_name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户手机号码" prop="user_phone" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户积分" prop="user_point" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_point }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" prop="user_pay_status" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.user_pay_status | payStatusClassFilter">{{ scope.row.user_pay_status | payStatusTextFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="user_create_at" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_create_at }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const payStatusOptions = [
  { key: 'yes', display_name: '已支付', class: 'success' },
  { key: 'no', display_name: '未支付', class: 'danger' }
]

const payStatusClass = payStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.class
  return acc
}, {})

const payStatusText = payStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    payStatusClassFilter(status) {
      return payStatusClass[status]
    },
    payStatusTextFilter(status) {
      return payStatusText[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        user_id: null,
        user_name: null,
        user_phone: null,
        user_pay_status: null
      },
      payStatusOptions
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.api.v1.ptUser.list(this.listQuery).then((res) => {
        this.total = res.data.total
        this.list = res.data.list
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
