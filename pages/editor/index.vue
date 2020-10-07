<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <form @submit.prevent="addArticle">
                        <fieldset>
                            <fieldset class="form-group">
                                <input type="text"
                                       v-model="title"
                                       class="form-control form-control-lg"
                                       placeholder="Article Title">
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text"
                                       v-model="description"
                                       class="form-control"
                                       placeholder="What's this article about?">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control"
                                          v-model="body"
                                          rows="8"
                                          placeholder="Write your article (in markdown)"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text"
                                       v-model="tag"
                                       @keydown.enter.prevent="addTag"
                                       class="form-control"
                                       placeholder="Enter tags">
                                <div class="tag-list"></div>
                            </fieldset>
                            <button class="btn btn-lg pull-xs-right btn-primary"
                                    :disabled="!title">
                                Publish Article
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createArticle } from '@/api/editor.js'
export default {
    // 在路由匹配组件渲染之前先执行中间件处理
    middleware: 'authenticated',
    name: 'Editor',
    data () {
        return {
            title: '',
            description: '',
            body: '',
            tagList: [],
            tag: ''
        }
    },
    methods: {
        addTag () {
            if (!this.tagList.includes(this.tag)) {
                this.tagList.push(this.tag)
            }
            console.log(this.tagList)
        },
        async addArticle () {
            const { data } = await createArticle({
                article: {
                    "title": this.title,
                    "description": this.description,
                    "body": this.body,
                    "tagList": this.tagList
                }
            })
            if (data) {
                alert('添加成功!')
                this.title = ''
                this.description = ''
                this.body = ''
                this.tagList.splice()
                this.tag = ''
            }
        }
    }
}
</script>

<style>
</style>