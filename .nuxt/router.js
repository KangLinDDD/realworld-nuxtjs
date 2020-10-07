import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2d1bfdd0 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _6cfe6905 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _33070003 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _666ddbc3 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _0ee4a56e = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _214d2413 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _4d381f10 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _2d1bfdd0,
    children: [{
      path: "",
      component: _6cfe6905,
      name: "home"
    }, {
      path: "/login",
      component: _33070003,
      name: "login"
    }, {
      path: "/register",
      component: _33070003,
      name: "register"
    }, {
      path: "/profile",
      component: _666ddbc3,
      name: "profile"
    }, {
      path: "/settings",
      component: _0ee4a56e,
      name: "settings"
    }, {
      path: "/editor",
      component: _214d2413,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _4d381f10,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
