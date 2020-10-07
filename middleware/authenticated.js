// 校验登录信息
export default function ({ store, redirect }) {
    if (!store.state.user) {
        return redirect('/login')
    }
}