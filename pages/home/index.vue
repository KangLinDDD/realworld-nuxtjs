<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>
        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item"
                                v-if="user">
                                <nuxt-link class="nav-link"
                                           exact
                                           :class="{'active': tab === 'your_feed'}"
                                           :to="{name: 'home', query: {tab:'your_feed'}}">Your Feed</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link"
                                           exact
                                           :class="{'active': tab === 'global_feed'}"
                                           :to="{name: 'home', query: {tab:'global_feed'}}">Global Feed</nuxt-link>
                            </li>
                            <li class="nav-item"
                                v-show="tag">
                                <nuxt-link class="nav-link"
                                           exact
                                           :class="{'active': tab === 'tag'}"
                                           :to="{name: 'home', query: {tab: 'tag', tag: tag}}"># {{tag}}</nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <div class="article-preview"
                         v-for="article in articles"
                         :key="article.slug">
                        <div class="article-meta">
                            <nuxt-link :to="{
                                name: 'profile',
                                params: {
                                    username: article.author.username
                                }
                            }">
                                <!-- 换成数据中的图片则加载速度慢 -->
                                <!-- <img :src="article.author.image" /> -->
                                <img :src="article.author.image">
                            </nuxt-link>
                            <div class="info">
                                <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}"
                                           class="author">{{article.author.username}}</nuxt-link>
                                <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
                            </div>
                            <button class="btn btn-outline-primary btn-sm pull-xs-right"
                                    :class="{'active': article.favorited}"
                                    :disabled="article.favoriteDisabled"
                                    @click="favorite(article)">
                                <i class="ion-heart"></i> {{article.favoritesCount}}
                            </button>
                        </div>
                        <nuxt-link :to="{
                            name: `article`,
                            params: {
                                slug: article.slug
                            }
                        }"
                                   class="preview-link">
                            <h1>{{article.title}}</h1>
                            <p>{{article.description}}</p>
                            <span>Read more...</span>
                        </nuxt-link>
                    </div>
                    <div class="article-preview" v-show="articles.length === 0">No articles are here... yet.</div>
                    <nav>
                        <ul class="pagination">
                            <li class="page-item"
                                :class="{'active': item === page}"
                                v-for="item in totalPage"
                                :key="item">
                                <nuxt-link class="page-link"
                                           :to="{name: 'home', query: {page: item, tab: tab, tag: $route.query.tag}}">
                                    {{item}}
                                </nuxt-link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>
                        <div class="tag-list">
                            <nuxt-link :to="{name: 'home', query: {tag: tag, tab: 'tag'}}"
                                       v-for="tag in tags"
                                       :key="tag"
                                       v-if="tag"
                                       class="tag-pill tag-default">{{tag}}</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getArticles, getYourFeedArticles, addFavorite, delFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
export default {
    name: 'HomeIndex',
    // 放在axync中利于seo
    async asyncData ({ query }) {
        let page = Number.parseInt(query.page || 1)
        let limit = 20
        const tag = query.tag || ''
        const tab = query.tab || 'global_feed'
        const loadArticles = tab === 'your_feed' ? getYourFeedArticles : getArticles
        const [res1, res2] = await Promise.all([loadArticles({
            limit,
            offset: (page - 1) * limit,
            tag
        }), getTags()])
        res1.data.articles.forEach(article => article.favoriteDisabled = false)
        return {
            ...res1.data,
            limit, // 每页带下
            page, // 页码
            tags: res2.data.tags,
            tab, // 选项卡
            tag // 数据标签
        }
    },
    watchQuery: ['page', 'tag', 'tab'],
    computed: {
        ...mapState(['user']),
        totalPage () {
            return Math.ceil(this.articlesCount / this.limit)
        }
    },
    methods: {
        async favorite (article) {
            article.favoriteDisabled = true
            if (article.favorited) {
                // 取消点赞
                await delFavorite(article.slug)
                article.favorited = false
                article.favoritesCount += -1
            } else {
                // 添加点赞
                await addFavorite(article.slug)
                article.favorited = true
                article.favoritesCount++
            }
            article.favoriteDisabled = false
        }
    }
}
</script>