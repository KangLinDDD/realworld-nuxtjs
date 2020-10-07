<template>
    <div class="article-comments">
        <form class="card comment-form" @submit.prevent="addArticleComment">
            <div class="card-block">
                <textarea class="form-control"
                          v-model="commentText"
                          placeholder="Write a comment..."
                          rows="3"></textarea>
            </div>
            <div class="card-footer">
                <img src="/img/header1.jpg"
                     class="comment-author-img" />
                <button class="btn btn-sm btn-primary" :disabled="commitComments">
                    Post Comment
                </button>
            </div>
        </form>
        <div class="card"
             v-for="comment in comments"
             :key="comment.id">
            <div class="card-block">
                <p class="card-text">{{comment.body}}</p>
            </div>
            <div class="card-footer">
                <nuxt-link :to="{name: 'profile', params: {username: comment.author.username}}"
                           class="comment-author">
                    <img src="/img/header1.jpg"
                         class="comment-author-img" />
                </nuxt-link>
                &nbsp;
                <nuxt-link :to="{name: 'profile', params: {username: comment.author.username}}"
                           class="comment-author">{{comment.author.username}}</nuxt-link>
                <span class="date-posted">{{comment.createdAt | date('MM DD, YYYY')}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getComments, addComments } from '@/api/article'
import axios from 'axios'
export default {
    name: 'ArticleComments',
    data () {
        return {
            comments: [], // 文章列表
            commentText: '',
            commitComments: false
        }
    },
    props: {
        article: {
            type: Object,
            required: true,
            default: () => { }
        }
    },
    created () {
        this.getArticleComment()
    },
    methods: {
        async getArticleComment () {
            const {data} = await getComments(this.article.slug)
            this.comments = data && data.comments
        },
        async addArticleComment () {
            if (!this.commentText) {
                return
            }
            this.commitComments = true
            const result = await addComments(this.article.slug, {
                comment: {
                    body: this.commentText
                }
            })
            if (result.status === 200) {
                this.comments.push(result.data.comment)
                this.commentText = ''
            }
            this.commitComments = false
        }
    }
}
</script>

<style>
</style>