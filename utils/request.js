// 基于axios封装的请求模块
import axios from 'axios'
const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})
// 请求拦截器
// 任何请求都要经过请求拦截器
// 可以在请求拦截器中做一些公共的业务处理
// 例如统一设置Token
// request.interceptors.request.use(function (config) {
//     // 请求经过这里，请求正确的情况（请求还未发出）
//     // 在请求中修改Token
//     config.headers.Aythorization = `Token `
//     // 返回config请求对象，如果不返回请求就发不出去了
//     return config
// }, function (error) {
//     // 如果请求失败，此时请求还没有发出去
//     return Promise.reject(error)
// })
// 响应拦截器
export default request