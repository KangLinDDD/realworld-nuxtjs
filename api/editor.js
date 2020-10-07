import { request } from '@/plugins/request'
export const createArticle = params => {
    return request({
        method: 'POST',
        data: params,
        url: '/api/articles'
    })
}