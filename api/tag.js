import { request } from '@/plugins/request'
// 获取文章标签内容
export const getTags = params => {
    return request({
        method: 'GET',
        url: '/api/tags'
    })
}