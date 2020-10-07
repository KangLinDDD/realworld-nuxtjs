import { request } from '@/plugins/request'
export const getArticles = params => {
    return request({
        method: 'GET',
        params,
        url: '/api/articles'
    })
}
// 获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}
export const getYourFeedArticles = params => {
    return request({
        method: 'GET',
        params,
        url: '/api/articles/feed'
    })
}
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}
export const delFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}
// 获取文章评论
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}
// 添加文章评论
export const addComments = (slug, params) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data: params
    })
}