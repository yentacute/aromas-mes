import request from '@/utils/request'

// 查询任务调度列表
export function agvTask(data) {
    return request({
        url: '/agv/hai/task/call',
        method: 'post',
        data,
        baseURL: import.meta.env.VITE_APP_BASE_API2,
    })
}
