<template>
    <div class="article-page">
        <div class="banner">
            <div class="container">
                <h1>{{article.title}}</h1>
                <article-meta :article="article"></article-meta>
            </div>
        </div>
        <div class="container page">
            <div class="row article-content">
                <div class="col-md-12"
                     v-html="article.body"></div>
            </div>
            <hr />
            <div class="article-actions">
                <article-meta :favoriteNum="favoriteNum"
                              :article="article"></article-meta>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-8 offset-md-2">
                    <article-comments :article="article"></article-comments>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkDownIt from 'markdown-it'
import ArticleComments from './components/article-comments'
import ArticleMeta from './components/article-meta'
export default {
    name: 'Article',
    middleware: 'authenticated',
    data () {
        return {
            favoriteNum: 0
        }
    },
    components: {
        ArticleMeta,
        ArticleComments
    },
    async asyncData ({ params }) {
        const { data } = await getArticle(params.slug)
        const { article } = data
        article.body = new MarkDownIt().render(article.body)
        return {
            article
        }
    },
    head () {
        return {
            title: `${this.article.title} - RealWorld`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.article.description
                }
            ]
        }
    }
}
</script>

<style>
</style>