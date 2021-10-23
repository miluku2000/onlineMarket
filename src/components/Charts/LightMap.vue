<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { getData } from '@/api/chart'
import geoJson from '@/utils/geoJson.json'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      data: [
        { name: '红色村', value: 2 },
        { name: '盐仓村', value: 3 },
        { name: '鹿耳村', value: 3 },
        { name: '褚石村', value: 2 },
        { name: '东陈村', value: 2 },
        { name: '天明村', value: 1 },
        { name: '虹金村', value: 1 },
        { name: '老庄村', value: 1 },
        { name: '肖王村', value: 1 },
        { name: '城东村', value: 3 },
        { name: '新民村', value: 3 },
        { name: '金港村', value: 3 },
        { name: '兴福村', value: 1 },
        { name: '东升村', value: 1 },
        { name: '德丰村', value: 1 },
        { name: '兴城村', value: 1 },
        { name: '辛江村', value: 1 },
        { name: '陆泽村', value: 1 },
        { name: '泰山村', value: 1 },
        { name: '大型村', value: 1 },
        { name: '长郊社区', value: 1 },
        { name: '虹桥社区', value: 1 },
        { name: '修川社区', value: 1 },
        { name: '怡院社区', value: 1 },
        { name: '港湾社区', value: 1 },
        { name: '聆涛社区', value: 1 },
        { name: '仰山社区', value: 1 },
        { name: '创智社区', value: 1 },
        { name: '春澜社区', value: 1 }
      ]
    }
  },
  mounted() {
    // this.initChart()
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    getData(this.searchTreeForm2).then(response => {
      this.initChart(response)
      loading.close()
    }).catch(() => {
      loading.close()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getNowFormatDate() {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      const currentdate = year + seperator1 + month + seperator1 + strDate
      return '更新时间：' + currentdate
    },
    initChart(res) {
      this.chart = echarts.init(document.getElementById(this.id))
      res.map((item) => {
        item.value = item.level
      })
      echarts.registerMap('YX', geoJson)
      this.chart.setOption({
        backgroundColor:
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0, color: '#056ee1' // 0% 处的颜色
        }, {
          offset: 1, color: '#0c418c' // 100% 处的颜色
        }], false),
        title: {
          text: '长治久安微治理三色预警图',
          subtext: this.getNowFormatDate(),
          left: 'center',
          top: 10,
          textStyle: {
            fontSize: 20,
            color: '#fff'
          },
          subtextStyle: {
            fontSize: 12,
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //         // dataView: {readOnly: false},
        //         // restore: {},
        //         // saveAsImage: {}
        //     }
        // },
        // legend: {
        //   right: '36%'
        // },
        visualMap: {
          type: 'piecewise',
          splitNumber: 3,
          min: 1,
          max: 3,
          realtime: false,
          calculable: false,
          right: '20',
          bottom: '30',
          textStyle: {
            color: '#fff'
          },
          pieces: [
            { value: 1, label: '前70%', color: '#23bb9a' },
            { value: 2, label: '70%-90%', color: '#ff9f5a' },
            { value: 3, label: '后10%', color: '#fe687b' }
          ]
        },
        series: [
          {
            name: '',
            type: 'map',
            mapType: 'YX', // 自定义扩展图表类型
            roam: true, // 是否开启平游或缩放
            label: {
              show: true
            },
            silent: true,
            itemStyle: {
              normal: {
                areaColor: '#fff',
                borderColor: '#ededed',
                lineStyle: {
                  width: 3// 设置线条粗细
                }
              }
            },
            data: res
          }
        ]
      })
    }
  }
}
</script>
