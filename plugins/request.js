// 基于axios封装的请求模块
import axios from 'axios'
// 创建请求对象
export const request = axios.create({
    // baseURL: 'https://conduit.productionready.io'
    baseURL: 'http://realworld.api.fed.lagounews.com'
})
// 通过插件机制获取上下文对象
// 插件导出函数只能作为default成员
export default ({store}) => {
    // 请求拦截器
    // 任何请求都要经过请求拦截器
    // 可以在请求拦截器中做一些公共的业务处理
    // 例如统一设置Token
    request.interceptors.request.use(function (config) {
        // 请求经过这里，请求正确的情况（请求还未发出）
        // 在请求中修改Token
        const user = store.state.user
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        // 返回config请求对象，如果不返回请求就发不出去了
        return config
    }, function (error) {
        // 如果请求失败，此时请求还没有发出去
        return Promise.reject(error)
    })
}