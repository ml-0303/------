<template>
	<div>
		<v-scale-screen width="1920" height="1080">
			<div class="home">
				<div class="screenBg">
					<dv-loading v-if="loading">平台加载中...</dv-loading>
					<div v-else>
						<div class="headBox">
							<div class="dateBox">
								<p>{{ dateYear }} {{ dateWeek }}{{ dateDay }}</p>
							</div>
						</div>
						<div class="mainBox">
							
							<div class="leftBox">
								<div class="leftTopBox">
									<div class="titleBox">
										<p class="titleText">会议中心详情</p>
										<p class="titleIcon"></p>
									</div>


							
									<div class="topMinBox">

										<div class="nineBox">
											<div class="helpBoxSj">
												<p class="helpBoxSjTit" style="font-size: 25px;letter-spacing:3px">会务组<span class="blue-number">{{ staffData.serviceGroup.total }}</span>人，工作<span class="blue-number">{{ staffData.serviceGroup.working }}</span>人</p>
											</div>
											<div class="helpBoxSj">
												<p class="helpBoxSjTit"style="font-size: 25px;letter-spacing:3px">设备人员<span class="blue-number">{{ staffData.equipmentStaff.total }}</span>人，工作<span class="blue-number">{{ staffData.equipmentStaff.working }}</span>人</p>
											</div>
										
										</div>
										
    										<RingChart :chart-data="satisfactionData" />
										
										
										
									</div>
								</div>
								
								<div class="leftCenterBox">
									<div class="titleBox">
										<p class="titleText">每月会议数量</p>
										<p class="titleIcon"></p>
									</div>
									<div class="charts-container">
      								
      									 <monthly-meeting-chart 
      									   :height="330"
      									   :chart-data="meetingData"
      									 />

      							
      								</div>


								</div>
								
								<div class="leftBtmBox">
									<div class="titleBox">
										<p class="titleText">每月会议人数</p>
								
									</div>
								 <div class="chart-wrapper">
      								<MonthlyPeople :chart-data="meetingPeopleData" />
    							</div>
						
								</div>
							</div>





							<div class="midBox">
								<div class="todaytitleBox">
									<p class="today">当天会议一览</p>
								</div>
								<div class="large-table-container">
									<table class="large-table">
										<thead>
											<tr>
												<th>会议名称</th>
												<th>会议室</th>
												<th>会议时间</th>
												<th>参会人数</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="meeting in todayMeetings" :key="meeting.id">
												<td>{{ meeting.title }}</td>
												<td>{{ meeting.meetRoomName }}</td>
												<td>{{ meeting.meetTime }}</td>
												<td>{{ meeting.number }}人</td>
											</tr>
										</tbody>
									</table>
								</div>
								
							
								<div class="simple-stats-section">
									<div class="simple-stats-grid">
										<!-- 第一行 -->
										<div class="simple-stat-row">
											<div class="simple-stat-card">
												<div class="simple-stat-content">
													<div class="simple-stat-line1">年度会议累计</div>
													<div class="simple-stat-line2"><span class="blue-number">{{ statsCards[0].meetings }}</span><span class="unit">次</span></div>
													<div class="simple-stat-line3"><span class="unit">参会人数</span><span class="blue-number">{{ statsCards[0].attendees }}</span><span class="unit">人</span></div>
												</div>
											</div>
											<div class="simple-stat-card">
												<div class="simple-stat-content">
													<div class="simple-stat-line1">当月会议累计</div>
													<div class="simple-stat-line2"><span class="blue-number">{{ statsCards[1].meetings }}</span><span class="unit">次</span></div>
													<div class="simple-stat-line3"><span class="unit">参会人数</span><span class="blue-number">{{ statsCards[1].attendees }}</span><span class="unit">人</span></div>
												</div>
											</div>
										</div>
										
										<!-- 第二行 -->
										<div class="simple-stat-row">
											<div class="simple-stat-card">
												<div class="simple-stat-content">
													<div class="simple-stat-line1">本周会议累计</div>
													<div class="simple-stat-line2"><span class="blue-number">{{ statsCards[2].meetings }}</span><span class="unit">次</span></div>
													<div class="simple-stat-line3"><span class="unit">参会人数</span><span class="blue-number">{{ statsCards[2].attendees }}</span><span class="unit">人</span></div>
												</div>
											</div>
											<div class="simple-stat-card">
												<div class="simple-stat-content">
													<div class="simple-stat-line1">当日会议累计</div>
													<div class="simple-stat-line2"><span class="blue-number">{{ statsCards[3].meetings }}</span><span class="unit">次</span></div>
													<div class="simple-stat-line3"><span class="unit">参会人数</span><span class="blue-number">{{ statsCards[3].attendees }}</span><span class="unit">人</span></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>




							<div class="rightBox">
								<div class="rightTopBox">
									<div class="titleBox">
										<p class="titleText">待开会议一览</p>
										<p class="titleIcon"></p>
									</div>
									<div class="meeting-table-container">
										<table class="meeting-table">
											<thead>
												<tr>
													<th>会议名称</th>
													<th>会议室</th>
													<th>会议时间</th>
													<th>参会人数</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="meeting in upcomingMeetings" :key="meeting.id">
													<td>{{ meeting.title }}</td>
													<td>{{ meeting.meetRoomName }}</td>
													<td>{{ meeting.meetTime }}</td>
													<td>{{ meeting.number }}人</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
	
								<div class="rightBtmBox">
									<div class="titleBox">
										<p class="titleText">正在会议中</p>
										<p class="titleIcon"></p>
									</div>
									<div class="meeting-table-container">
										<table class="meeting-table">
											<thead>
												<tr>
													<th>会议名称</th>
													<th>会议室</th>
													<th>会议时间</th>
													<th>参会人数</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="meeting in ongoingMeetings" :key="meeting.id">
													<td>{{ meeting.title }}</td>
													<td>{{ meeting.meetRoomName }}</td>
													<td>{{ meeting.meetTime }}</td>
													<td>{{ meeting.number }}人</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</v-scale-screen>
	</div>
</template>

<script>
import RingChart from '@/components/RingChart.vue'
import MonthlyMeetingChart from '@/components/MonthlyMeetingChart.vue';
import MonthlyPeople from '@/components/MonthlyPeople.vue';
import * as echarts from 'echarts'
import 'echarts-gl';
import VueSeamlessScroll from 'vue-seamless-scroll'
import {
	formatTime
} from "./index.js"
import {
  getMeetingStats,
  getMonthlyMeetingCount,
  getMonthlyMeetingPeople,
  getStaffData,
  getTodayMeetings,
  getUpcomingMeetings,
  getOngoingMeetings,
  getMeetingSatisfaction,
  getYearMeetCount,
  getYearMeetUserCount,
  getMonthMeetCount,
  getMonthMeetUserCount,
  getWeekMeetCount,
  getWeekMeetUserCount,
  getDayMeetCount,
  getDayMeetUserCount
} from '@/api/index.js'

export default {
	components: {
		VueSeamlessScroll,
		RingChart,
		MonthlyMeetingChart,
		MonthlyPeople

	},
	data() {
    return {
        // 图表实例
        mapChart: null,
        
        // 每月会议数量数据
        meetingData: [],
        
        // 每月会议人数数据
        meetingPeopleData: [],

        // 会议满意度数据
        satisfactionData: [],

        // 统计卡片数据
        statsCards: [
            {
                meetings: 0,
                attendees: 0
            },
            {
                meetings: 0,
                attendees: 0
            },
            {
                meetings: 0,
                attendees: 0
            },
            {
                meetings: 0,
                attendees: 0
            }
        ],
        
        // 会务组/设备人员数据
        staffData: {
            serviceGroup: { total: 0,working: 0 },
            equipmentStaff: { total: 0, working: 0 }
        },
        
        // 当天会议列表数据
        todayMeetings: [],
        
        // 待开会议数据
        upcomingMeetings: [],
        
        // 正在进行的会议数据
        ongoingMeetings: [],
        
        // 日期相关数据
        loading: true,
        dateDay: null,
        dateYear: null,
        dateWeek: null,
        
        // 定时器
        timer: null
    };
},
	mounted() {
		console.log('ECharts版本:', echarts.version);
		this.cancelLoading();
		this.timeFn();
        this.fetchAllData();
	},
	destroyed() {
		clearInterval(this.timer);
	},
	methods: {
    async fetchAllData() {
        try {
            // 获取统计卡片数据
            try {
                const [
                    yearCount, yearUser,
                    monthCount, monthUser,
                    weekCount, weekUser,
                    dayCount, dayUser
                ] = await Promise.all([
                    getYearMeetCount(), getYearMeetUserCount(),
                    getMonthMeetCount(), getMonthMeetUserCount(),
                    getWeekMeetCount(), getWeekMeetUserCount(),
                    getDayMeetCount(), getDayMeetUserCount()
                ]);

                // 辅助函数：安全提取数据
                const getValue = (res) => {
                    if (res.data && res.data.success && res.data.result) {
                        const result = res.data.result;
                        // 如果result是对象且包含meetCount属性，则返回meetCount，否则返回result本身
                        if (typeof result === 'object' && result !== null && 'meetCount' in result) {
                            return result.meetCount || 0;
                        }
                        return result;
                    }
                    return 0;
                };

                this.statsCards = [
                    { meetings: getValue(yearCount), attendees: getValue(yearUser) },
                    { meetings: getValue(monthCount), attendees: getValue(monthUser) },
                    { meetings: getValue(weekCount), attendees: getValue(weekUser) },
                    { meetings: getValue(dayCount), attendees: getValue(dayUser) }
                ];
            } catch (e) {
                console.error("获取统计卡片数据失败:", e);
                // 出错时保持默认零值或之前的模拟值（如果需要的话）
            }

            // 获取每月会议数量
            const meetingCountRes = await getMonthlyMeetingCount();
            if (meetingCountRes.data && meetingCountRes.data.success) {
                this.meetingData = this.fillMonthlyData(meetingCountRes.data.result);
            } else if (meetingCountRes.data) {
                this.meetingData = this.fillMonthlyData(meetingCountRes.data);
            }

            // 获取每月会议人数
            const meetingPeopleRes = await getMonthlyMeetingPeople();
            if (meetingPeopleRes.data && meetingPeopleRes.data.success) {
                this.meetingPeopleData = this.fillMonthlyData(meetingPeopleRes.data.result);
            } else if (meetingPeopleRes.data) {
                this.meetingPeopleData = this.fillMonthlyData(meetingPeopleRes.data);
            }

            // 获取会务组/设备人员数据
            try {
                const staffRes = await getStaffData();
                // axios 返回的数据在 data 字段中
                const data = staffRes.data;
                if (data && data.success && data.result) {
                    const result = data.result;
                    this.staffData = {
                        serviceGroup: { 
                            total: result.waiterAllNum, 
                            working: result.waiterWorkNum 
                        },
                        equipmentStaff: { 
                            total: result.voiceAllNum, 
                            working: result.voiceWorkNum 
                        }
                    };
                }
            } catch (e) {
                console.error("获取会务组数据失败:", e);
                // 保持默认值或设置错误状态
            }

            // 获取当天会议
            const todayRes = await getTodayMeetings();
            if (todayRes.data && todayRes.data.success) {
                this.todayMeetings = todayRes.data.result;
            } else if (todayRes.data) {
                this.todayMeetings = todayRes.data;
            }

            // 获取待开会议
            const upcomingRes = await getUpcomingMeetings();
            if (upcomingRes.data && upcomingRes.data.success) {
                this.upcomingMeetings = upcomingRes.data.result;
            } else if (upcomingRes.data) {
                this.upcomingMeetings = upcomingRes.data;
            }

            // 获取正在进行的会议
            const ongoingRes = await getOngoingMeetings();
            if (ongoingRes.data && ongoingRes.data.success) {
                this.ongoingMeetings = ongoingRes.data.result;
            } else if (ongoingRes.data) {
                this.ongoingMeetings = ongoingRes.data;
            }
            
            // 获取满意度数据
            const satisfactionRes = await getMeetingSatisfaction();
            if (satisfactionRes.data && satisfactionRes.data.success) {
                this.satisfactionData = satisfactionRes.data.result;
            } else if (satisfactionRes.data) {
                this.satisfactionData = satisfactionRes.data;
            }

        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    },
		cancelLoading() {
			setTimeout(() => {
				this.loading = false
			}, 500)
		},
		timeFn() {
			this.timing = setInterval(() => {
				this.dateDay = formatTime(new Date(), 'HH: mm: ss')
				this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
			}, 1000)
		},
        fillMonthlyData(data) {
            const fullMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            // 确保data是数组
            const safeData = Array.isArray(data) ? data : [];
            
            return fullMonths.map(month => {
                // 查找对应月份的数据，兼容 name 或 month 字段
                const found = safeData.find(item => 
                    (item.name && item.name === month) || 
                    (item.month && item.month === month)
                );
                return {
                    month: month,
                    value: found ? Number(found.value) : 0
                };
            });
        }
	}
};
</script>

<style scoped>
@import "./home.css";

</style>
