import request from '@/utils/request'

// 查询任务调度列表
export function listTask(query) {
  return request({
    url: '/bok/task/list',
    method: 'get',
    params: query
  })
}

// 查询任务调度详细
export function getTask(taskId) {
  return request({
    url: '/bok/task/' + taskId,
    method: 'get'
  })
}

// 新增任务调度
export function addTask(data) {
  return request({
    url: '/bok/task',
    method: 'post',
    data: data
  })
}

// 修改任务调度
export function updateTask(data) {
  return request({
    url: '/bok/task',
    method: 'put',
    data: data
  })
}

// 删除任务调度
export function delTask(taskId) {
  return request({
    url: '/bok/task/' + taskId,
    method: 'delete'
  })
}
