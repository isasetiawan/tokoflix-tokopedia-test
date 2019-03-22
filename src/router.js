import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      async beforeEnter(to, from, next){
        await store.dispatch('loadUser')
        await store.dispatch('loadMovies')
        next()
      },
      children:[]
    }
  ]
})
