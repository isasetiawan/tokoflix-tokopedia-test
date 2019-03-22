import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Movie from './views/Movie'
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
        await store.dispatch('loadMovies',{page:to.query.page})
        next()
      },
    },
    {
      path: '/:movie_id_slug',
      name:'movie',
      component: Movie
    }
  ]
})
