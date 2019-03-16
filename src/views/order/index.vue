<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.order_no" placeholder="订单编号" style="width: 200px;" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.status" placeholder="订单状态" clearable style="width: 180px">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-date-picker
        v-model="timeRange"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"/>
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
      <el-table-column :label="$t('table.id')" prop="id" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.order_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" prop="user_id" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名字" prop="user_name" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" prop="order_no" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.order_no }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" prop="order_status" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.order_status | statusFilter">{{ scope.row.order_status | statusTextFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="order_create_at" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.order_create_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="order_update_at" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.order_update_at }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const statusOptions = [
  { key: 'init', display_name: '未支付' },
  { key: 'paying', display_name: '支付中' },
  { key: 'success', display_name: '支付成功' },
  { key: 'fail', display_name: '支付失败' }
]

const statusKeyValue = statusOptions.reduce((acc, cur) => {
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
        init: 'info',
        paying: 'default',
        success: 'success',
        fail: 'danger'
      }
      return statusMap[status]
    },
    statusTextFilter(status) {
      return statusKeyValue[status]
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
        order_no: null,
        status: null,
        start_time: null,
        end_time: null
      },
      timeRange: [],
      statusOptions
    }
  },
  watch: {
    timeRange() {
      this.listQuery.start_time = this.timeRange[0]
      this.listQuery.end_time = this.timeRange[1]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.api.v1.order.list(this.listQuery).then((res) => {
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
