const cookieparser = process.server ? require('cookieparser') : undefined
// 在服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突，无比要把state定义成一个函数，返回对应的数据对象
export const state = () => {
    return {
        // 当前登录用户的基本信息
        user: null
    }
}
export const mutations = {
    setUser (state, data) {
        state.user = data
    }
}
export const actions = {
    // nuxyServerInit 是一个特殊的action方法
    // 这个action会在服务端渲染期间自动调用
    // 主要作用是用来初始化容器数据，传递数据给客户端使用
    nuxtServerInit ({commit}, {req}) {
        let user = null
        // 如果请求头中有cookie
        if (req.headers.cookie) {
            // 使用cookieparser转成js对象
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (err) {

            }
        }
        // 提交mutation 修改state状态
        commit('setUser', user)
    }
}
