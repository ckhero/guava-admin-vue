<template>
  <div class="dashboard-editor-container">
    <panel-group :new_visitis.sync="newVisitisData" :purchases.sync="purchasesData" @handleSetLineChartData="handleSetLineChartData"/>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: null,
      lineData: {
        newVisitis: null,
        purchases: null
      },
      newVisitisData: null,
      purchasesData: null
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.api.v1.dashboard.index().then((res) => {
        this.lineData.newVisitis = res.data.user
        this.lineData.purchases = res.data.order
        this.lineChartData = this.lineData.newVisitis
        this.newVisitisData = res.data.user.total
        this.purchasesData = res.data.order.total
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = this.lineData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
