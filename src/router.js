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
        let {query, page} = to.query
        if (!query)
          await store.dispatch('loadMovies',{page})
        else 
          await store.dispatch('searchMovie',{query, page})
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
