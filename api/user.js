import { request } from '@/plugins/request'
export const login = (data) => {
    return request({
        method: 'POST',
        data,
        url: '/api/users/login'
    })
}
export const register = (data) => {
    return request({
        method: 'POST',
        data,
        url: '/api/users'
    })
}
export const getProfile = (username) => {
    return request({
        method: 'GET',
        url: `/api/profiles/${username}`
    })
}
export const getUser = (username) => {
    return request({
        method: 'GET',
        url: '/api/user'
    })
}
export const updateUser = (user) => {
    return request({
        method:  'PUT',
        url: '/api/user',
        data: {
            user: user
        }
    })
}