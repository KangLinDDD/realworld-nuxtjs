<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>
                    <form @submit.prevent="updateUser">
                        <fieldset>
                            <fieldset class="form-group">
                                <input class="form-control"
                                       type="text"
                                       v-model="image"
                                       placeholder="URL of profile picture">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg"
                                       type="text"
                                       v-model="username"
                                       placeholder="Your Name">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control form-control-lg"
                                          rows="8"
                                          v-model="bio"
                                          placeholder="Short bio about you"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg"
                                       type="text"
                                       v-model="email"
                                       placeholder="Email">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg"
                                       type="password"
                                       v-model="pwd"
                                       placeholder="Password">
                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right">
                                Update Settings
                            </button>
                        </fieldset>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { updateUser, getUser } from '@/api/user'
export default {
    name: 'Settings',
    middleware: 'authenticated',
    data () {
        return {
            image: '',
            username: '',
            bio: '',
            email: '',
            pwd: ''
        }
    },
    async asyncData () {
        const { data } = await getUser()
        console.log(data)
        return data.user
    },
    methods: {
        async updateUser () {
            const { data } = await updateUser({
                email: this.email,
                username: this.username,
                password: this.pwd,
                image: this.image,
                bio: this.bio
            })
            if (data) {
                alert('更新成功!')
            }
            console.log(data)
        }
    }
}
</script>

<style>
</style>