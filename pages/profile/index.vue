<template>
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="this.image"
                             class="user-img">
                        <h4>{{username}}</h4>
                        <p>
                            {{bio}}
                        </p>
                        <button class="btn btn-sm btn-outline-secondary action-btn">
                            <i class="ion-plus-round"></i>
                            &nbsp;
                            Follow {{username}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="articles-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <nuxt-link class="nav-link"
                                           exact
                                           :class="{'active': tab === 'my'}"
                                           :to="{
                                                name: 'profile',
                                                query: {
                                                    username: username,
                                                    tab: 'my'
                                                }
                                            }">My Articles</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link"
                                           exact
                                           :class="{'active': tab === 'favorited'}"
                                           :to="{
                                                name: 'profile',
                                                query: {
                                                    username: username,
                                                    tab: 'favorited'
                                                }
                                            }">Favorited Articles</nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <div class="article-preview"
                         v-for="(article, index) in articles"
                         :key="index">
                        <div class="article-meta">
                            <nuxt-link :to="{name: 'profile', query: {username: article.author.username}}">
                                <img :src="article.author.image" />
                            </nuxt-link>
                            <div class="info">
                                <nuxt-link :to="{name: 'profile', query: {username: article.author.username}}"
                                           class="author">{{article.author.username}}</nuxt-link>
                                <span class="date">{{article.createdAt | date('MMM DD,YYYY')}}</span>
                            </div>
                            <button class="btn btn-outline-primary btn-sm pull-xs-right">
                                <i class="ion-heart"></i> {{article.favoritesCount}}
                            </button>
                        </div>
                        <a href=""
                           class="preview-link">
                            <h1>{{article.title}}</h1>
                            <p>{{article.description}}</p>
                            <span>Read more...</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getProfile } from '@/api/user'
import { getArticles } from '@/api/article'
export default {
    name: 'UserProfile',
    middleware: 'authenticated',
    async asyncData ({ query }) {
        const tab = query.tab || 'my'
        const params = {
            limit: 5,
            offset: 0
        }
        if (tab === 'my') {
            params.author = query.username
        } else {
            params.favorited = query.username
        }
        const [res1, res2] = await Promise.all([getProfile(query.username), getArticles(params)])
        return {
            ...res1.data.profile,
            articles: res2.data.articles,
            tab,
            username: query.username
        }
    },
    watchQuery: ['tab'],
}
</script>

<style>
</style>