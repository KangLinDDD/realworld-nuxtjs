<template>
    <div class="article-meta">
        <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}">
            <img src="/img/header1.jpg" />
        </nuxt-link>
        <div class="info">
            <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}"
                       class="author">{{article.author.username}}</nuxt-link>
            <span class="date">{{article.updatedAt | date('MMM DD,YYYY')}}</span>
        </div>
        <button class="btn btn-sm btn-outline-secondary"
                :class="{'active': article.author.following}">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{article.author.username}} <span class="counter">(10)</span>
        </button>
        &nbsp;&nbsp;
        <button class="btn btn-sm btn-outline-primary"
                :class="{'active': article.author.favorited}">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">({{favoriteNum}})</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'ArticleMeta',
    props: {
        article: {
            type: Object,
            required: true,
            default: () => { }
        },
        favoriteNum: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style>
</style>