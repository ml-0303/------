import request from '@/axios'

// 统一的基础路径
const BASE_URL = 'https://hyjg.hyjgpublic.cn/jgboot/api'

// 获取会议统计卡片数据 (年度会议累计、参会人数等)
export function getMeetingStats() {
  return request({
    url: '', // 接口地址待填
    method: 'get'
  })
}

// 获取年度会议数量
export function getYearMeetCount() {
  return request({
    url: `${BASE_URL}/getyearMeetCount`,
    method: 'get'
  })
}

// 获取年度参会人数
export function getYearMeetUserCount() {
  return request({
    url: `${BASE_URL}/getyearMeetUserCount`,
    method: 'get'
  })
}

// 获取当月会议数量
export function getMonthMeetCount() {
  return request({
    url: `${BASE_URL}/getMonthMeetCount`,
    method: 'get'
  })
}

// 获取当月参会人数
export function getMonthMeetUserCount() {
  return request({
    url: `${BASE_URL}/getMonthMeetUserCount`,
    method: 'get'
  })
}

// 获取本周会议数量
export function getWeekMeetCount() {
  return request({
    url: `${BASE_URL}/getWeekMeetCount`,
    method: 'get'
  })
}

// 获取本周参会人数
export function getWeekMeetUserCount() {
  return request({
    url: `${BASE_URL}/getWeekMeetUserCount`,
    method: 'get'
  })
}

// 获取当日会议数量
export function getDayMeetCount() {
  return request({
    url: `${BASE_URL}/getDayMeetCount`,
    method: 'get'
  })
}

// 获取当日参会人数
export function getDayMeetUserCount() {
  return request({
    url: `${BASE_URL}/getDayMeetUserCount`,
    method: 'get'
  })
}

// 获取每月会议数量
export function getMonthlyMeetingCount() {
  return request({
    url: `${BASE_URL}/monthMeetCountInfo`,
    method: 'get'
  })
}

// 获取每月会议人数
export function getMonthlyMeetingPeople() {
  return request({
    url: `${BASE_URL}/monthMeetPeopleCountInfo`,
    method: 'get'
  })
}

// 获取会务组/设备人员数据
export function getStaffData() {
  return request({
    url: `${BASE_URL}/getWaiterNum`,
    method: 'get'
  })
}

// 获取当天会议列表
export function getTodayMeetings() {
  return request({
    url: `${BASE_URL}/dayMeetOrderList`,
    method: 'get'
  })
}

// 获取待开会议列表
export function getUpcomingMeetings() {
  return request({
    url: `${BASE_URL}/wkDayMeetOrderList`,
    method: 'get'
  })
}

// 获取正在进行的会议列表
export function getOngoingMeetings() {
  return request({
    url: `${BASE_URL}/ykDayMeetOrderList`,
    method: 'get'
  })
}

// 获取会议评价统计 (满意度)
export function getMeetingSatisfaction() {
  return request({
    url: `${BASE_URL}/getOrderEvaluate`,
    method: 'get'
  })
}
