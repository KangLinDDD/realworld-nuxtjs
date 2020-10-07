<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">{{isLogin ? 'Sign in' : 'Sign up'}}</h1>
                    <p class="text-xs-center">
                        <nuxt-link to="/login"
                                   v-if="!isLogin">Have an account?</nuxt-link>
                        <nuxt-link to="/register"
                                   v-else>Need an account?</nuxt-link>
                    </p>
                    <ul class="error-messages">
                        <template v-for="(msgs, field) in errMsg">
                            <li v-for="(msg, index) in msgs"
                                :key="index">{{field}} {{msg}}</li>
                        </template>
                    </ul>
                    <form @submit.prevent="onSubmit">
                        <fieldset class="form-group"
                                  v-if="!isLogin">
                            <input class="form-control form-control-lg"
                                   type="text"
                                   v-model="user.username"
                                   placeholder="Your Name">
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg"
                                   type="email"
                                   v-model="user.email"
                                   placeholder="Email"
                                   required>
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg"
                                   type="password"
                                   minlength="8"
                                   v-model="user.password"
                                   placeholder="Password"
                                   required>
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            {{ isLogin ? 'Sign in' : 'Sign up'}}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { login, register } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    name: 'Login',
    middleware: 'noauthenticated',
    computed: {
        isLogin () {
            return this.$route.name === 'login'
        }
    },
    data () {
        return {
            user: {
                username: '',
                email: '',
                password: ''
            },
            errMsg: {}
        }
    },
    methods: {
        async onSubmit () {
            try {
                const { data } = this.isLogin ? await login({
                    user: this.user
                }) : await register({
                    user: this.user
                })
                // 此时将user数据放在state中，如果页面刷新则数据会丢失，所以要将其持久化
                this.$store.commit('setUser', data.user)
                // 将user存储到cookie中
                Cookie.set('user', data.user)
                this.$router.push('/')
            } catch (e) {
                this.errMsg = e.response.data.errors
            }
        }
    }
}
</script>

<style>
</style>