import request from '@/utils/request'

export function list(data) {
  return request({
    url: 'doctor',
    method: 'get',
    params: data
  })
}
export function add(data) {
  return request({
    url: 'doctor',
    method: 'post',
    data
  })
}
export function deleteElement(data) {
  return request({
    url: 'doctor/' + data,
    method: 'delete',
  })

}
// 获取医院列表
export function hospitalList(data) {
  return request({
    url: 'hospital',
    method: 'get',
    params: data
  })
}
