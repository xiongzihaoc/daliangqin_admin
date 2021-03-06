import request from '@/utils/request'

/**
 * 健康教育处方
 */
export const httpAdminTemplate = {
  getTemplate(data) {
    return request({
      url: 'template',
      method: 'get',
      params: data,
    })
  },
  postTemplate(data) {
    return request({
      url: 'template',
      method: 'post',
      data,
    })
  },
  putTemplate(data) {
    return request({
      url: 'template/' + data.id,
      method: 'put',
      data,
    })
  },
  deleteTemplate(id) {
    return request({
      url: 'template/' + id,
      method: 'delete',
    })
  },
}
