<template>
  <div class="ring-chart-container">
    <div ref="chartRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script>

import * as echarts from 'echarts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必要的组件
echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

export default {
  name: 'RingChart',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
  
    chartData: {
      type: Array,
      default: () => [
        { value: 83.69, name: '非常满意' },
        { value: 15.09, name: '满意' },
        { value: 1.22, name: '一般满意' },
        { value: 0, name: '不满意' }
      ]
    }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });

    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
  methods: {
    initChart() {
      if (!this.$refs.chartRef) return;
      this.chartInstance = echarts.init(this.$refs.chartRef);
      
      // 根据参考页面的“会议评价统计”数据配置
      const option = {
        // 图表主标题
        title: {
          text: '会议评价统计',
          left: 'center',
          textStyle: {
            color: '#1e90ff', // 大屏常用文字颜色
            fontSize: 22,
            fontWeight: 'bold'
          }
        },
        // 提示框配置
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // 半透黑色背景
          textStyle: { color: '#fff' }
        },
        
        // 环形图系列配置
        series: [
          {
            name: '会议评价',
            type: 'pie',
            radius: ['30%', '45%'], // 内径40%，外径65%，形成环形。可调整此数组改变环的粗细 ['30%', '70%']
            center: ['50%', '40%'], // 图表中心位置，可微调以适应标题和图例
            avoidLabelOverlap: true, // 防止标签重叠
            itemStyle: {
              // 颜色配置，可根据大屏主题调整
              color: function(params) {
                const colorList = ['#5470c6', '#91cc75', '#fac858', '#ee6666'];
                return colorList[params.dataIndex] || '#73c0de';
              },
              borderWidth: 2,
              borderColor: '#0a1d37' // 边框颜色，通常与大屏背景色接近
            },
            label: {
              show: true,
              // 标签显示在环形外部，并带有引导线
              position: 'outside',
              formatter: '{b}\n{d}%', // {b}名称 {d}百分比
              color: '#fff', // 标签文字颜色
              fontSize: 14
            },
            labelLine: {
              length: 10, // 引导线第一段长度
              length2: 50, // 引导线第二段长度
              smooth: 0.2 // 引导线平滑度
            },
            emphasis: { // 高亮样式（鼠标悬停）
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 'bold'
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            // 使用传入的数据
            data: this.chartData
          }
        ],
        // 网格区域，用于控制绘图区域的位置和大小
        grid: {
          top: '15%',
          bottom: '25%' // 为底部图例留出空间
        }
      };
      
      this.chartInstance.setOption(option);
    },
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    }
  },
  // 监听数据变化，实现动态更新
  watch: {
    chartData: {
      deep: true,
      handler() {
        if (this.chartInstance) {
          this.chartInstance.setOption({
            series: [{ data: this.chartData }]
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.ring-chart-container {
  width: 100%;
  height: 100%;
  /* 为大屏图表添加一个浅色背景容器，实际使用时可能不需要 */
  /* background: rgba(26, 46, 79, 0.5); */
  /* border-radius: 4px; */
}
</style>