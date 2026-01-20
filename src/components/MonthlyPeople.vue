<template>
  <div class="monthly-people-chart">
    <!-- 图表标题 -->

    
    <!-- 图表容器 -->
    <div ref="chartContainer" class="chart-container"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'MonthlyPeopleChart',
  props: {
    chartData: {
      type: Array,
      default: () => []
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
  },
  watch: {
    chartData: {
      handler() {
        if (this.chartInstance) {
          this.updateChart();
        } else {
          this.initChart();
        }
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      // 初始化ECharts实例
      const chartDom = this.$refs.chartContainer;
      if (!chartDom) return;
      
      this.chartInstance = echarts.init(chartDom);
      this.updateChart();
      
      // 响应窗口大小变化
      window.addEventListener('resize', this.handleResize);
      
      // 组件销毁时清理
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', this.handleResize);
        if (this.chartInstance) {
            this.chartInstance.dispose();
        }
      });
    },
    
    updateChart() {
      if (!this.chartInstance) return;
      
      // 使用传入的数据，如果为空则使用空数组防止报错
      const data = this.chartData || [];
      
      // 提取月份和数据
      const months = data.map(item => item.month);
      const values = data.map(item => item.value);
      
      // 图表配置
      const option = {
        // 网格布局，控制图表绘制区域
        grid: {
          left: '2%',      // 左侧留空
          right: '5%',     // 右侧留空
          bottom: '3%',    // 底部留空
          top: '-1%',       // 顶部留空
          containLabel: true // 包含坐标轴标签
        },
        
  
        xAxis: {
          type: 'value',
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed',
              color: '#1890ff'
            }
          },
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
          axisLabel: {
            color: '#1890ff',
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        
     
        yAxis: {
          type: 'category',
          data: months,
          axisLine: {
            show: true,
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
            fontWeight: 'bold'
          },
          // 让数据从上到下排列（1月在最上面）
          inverse: true
        },
        
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
              <div style="font-size:14px;color:#666">会议人数: <span style="font-weight:bold;color:#333">${data.value}人</span></div>
            `;
          }
        },

        // 数据系列
        series: [{
          name: '会议人数',
          type: 'bar',
          barWidth: '35%', // 柱子宽度
          data: values,
          itemStyle: {
            // 使用渐变色，实现黄色系效果
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#FFD700' },    // 亮黄色
              { offset: 0.5, color: '#FFC107' },  // 黄色
              { offset: 1, color: '#FFA000' }     // 深黄色
            ]),
            // 圆角效果
            borderRadius: [0, 8, 8, 0]
          },
          // 柱子上的标签
          label: {
            show: false
          },
          // 鼠标悬停效果
          emphasis: {
            itemStyle: {
              shadowColor: 'rgba(255, 193, 7, 0.8)',
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          }
        }],
        
        // 动画配置
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicOut'
      };
      
      // 应用配置
      this.chartInstance.setOption(option);
    },
    
    handleResize() {
        if(this.chartInstance) {
            this.chartInstance.resize();
        }
    }
  }
};
</script>

<style scoped>
.monthly-people-chart {
  width: 100%;
  height: 100%;

  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.chart-title {
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: baseline;
}

.title-text {
  margin-right: 8px;
}

.title-unit {
  font-size: 12px;
  color: #999;
  font-weight: normal;
}

.chart-container {
  width: 100%;
  height: 400px; 
}
</style>
