<template>
  <div class="monthly-meeting-chart">
    <div class="echarts-wrapper" :style="{ height: chartHeight + 'px' }">
      <div ref="chart" class="chart" :style="{ height: chartHeight + 'px' }"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'MonthlyMeetingChart',
  props: {
    height: {
      type: Number,
      default: 300
    },
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartInstance: null,
      chartHeight: this.height
    };
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        if (this.chartInstance) {
          this.updateChart();
        } else {
            this.initChart();
        }
      }
    }
  },
  methods: {
    initChart() {
      if (this.chartInstance) {
        this.chartInstance.dispose();
      }
      
      const chartDom = this.$refs.chart;
      if (!chartDom) return;
      
      this.chartInstance = echarts.init(chartDom);
      this.updateChart();
    },
    
    updateChart() {
      if (!this.chartInstance) return;

      const data = this.chartData || [];
      const months = data.map(item => item.month);
      const values = data.map(item => item.value);
      
      const option = {
        backgroundColor: 'transparent',
        grid: {
          left: '60px',
          right: '40px',
          top: '40px',
          bottom: '40px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: months,
          axisLine: {
            lineStyle: {
              color: '#1890ff',
              width: 2
            }
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              color: '#333',
              width: 1
            }
          },
          axisLabel: {
            color: '#1890ff',
            fontSize: 14,
            fontWeight: 'bold',
            margin: 12
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1890ff',
              width: 2
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#333',
              width: 1
            }
          },
          splitLine: {
            show: false, // 移除虚线
            lineStyle: {
              type: 'dashed',
              color: '#e8e8e8'
            }
          },
          axisLabel: {
            color: '#1890ff',
            fontSize: 14,
            fontWeight: 'bold',
            margin: 8
          }
        },
        series: [
          {
            name: '会议数量',
            type: 'bar',
            data: values,
            barWidth: '50%',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#1890ff' },
                { offset: 1, color: '#40a9ff' }
              ]),
              borderRadius: [4, 4, 0, 0],
              borderWidth: 1,
              borderColor: '#096dd9'
            },
            
            emphasis: {
              itemStyle: {
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0
              }
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          borderColor: '#1890ff',
          borderWidth: 2,
          textStyle: {
            color: '#333',
            fontSize: 14,
            fontWeight: 'bold'
          },
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          formatter: (params) => {
            const data = params[0];
            return `
              <div style="margin-bottom:8px;font-size:16px;font-weight:bold;color:#1890ff">${data.name}</div>
              <div style="font-size:14px;color:#666">会议数量: <span style="font-weight:bold;color:#333">${data.value}次</span></div>
            `;
          }
        }
      };
      
      this.chartInstance.setOption(option);
      this.handleResize();
    },
    
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize();
      }
    }
  }
};
</script>

<style scoped>
.monthly-meeting-chart {
  width: 100%;
  height: 100%;

  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.echarts-wrapper {
  width: 100%;
}
.chart {
  width: 100%;
}
</style>
