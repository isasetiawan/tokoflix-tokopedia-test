import Vue from 'vue'
import Vuex from 'vuex'
import axios from './plugins/axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies:[],
    user:null
  },
  mutations: {
    setMovies(state, {movies}){
      state.movies = movies
    },
    setUser(state, {user}){
      state.user = user
    }
  },
  actions: {
    async loadUser({commit}){
      let {data} = await axios({baseURL:'https://randomuser.me/api/',url:'?inc=name,picture'}) 
      commit('setUser',{user:data.results[0]})
    },
    async loadMovies({commit}){
      let {data} = await axios.get('/movie/now_playing')
      commit('setMovies', {movies:data})
    }
  }
})
