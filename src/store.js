import Vue from 'vue'
import Vuex from 'vuex'
import axios from './plugins/axios';
import { Snackbar } from 'buefy/dist/components/snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies:[],
    user:null,
    isLoading:false
  },
  mutations: {
    setMovies(state, {movies}){
      state.movies = movies
    },
    setUser(state, {user}){
      state.user = user
    },
    setLoading(state, {isLoading}){
      state.isLoading = isLoading
    }
  },
  actions: {
    async loadUser({commit}){
      let {data} = await axios({baseURL:'https://randomuser.me/api/',url:'?inc=name,picture'}) 
      commit('setUser',{user:data.results[0]})
    },
    async loadMovies({commit},{page=1} = {}){
      commit('setLoading',{isLoading:true})
      try {
        let {data} = await axios.get('/movie/now_playing',{params:{
          page
        }})
        commit('setMovies', {movies:data})

      } catch (error) {
        let {response} = error
        if (response)
        Snackbar.open(response.status_message)
        
      }
      commit('setLoading',{isLoading:false})

    }
  }
})
