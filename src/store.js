import Vue from 'vue'
import Vuex from 'vuex'
import axios from './plugins/axios';
import { Snackbar } from 'buefy/dist/components/snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies:[],
    movie:null,
    user:null,
    balance:100000,
    isLoading:false
  },
  mutations: {
    setMovies(state, {movies}){
      state.movies = movies
    },
    setMovie(state,{movie}){
      state.movie = movie
    },
    setUser(state, {user}){
      state.user = user
    },
    setLoading(state, {isLoading}){
      state.isLoading = isLoading
    }
  },
  actions: {
    async loadUser({commit, state}){
      if(state.user) return
      let {data} = await axios({baseURL:'https://randomuser.me/api/',url:'?inc=name,picture'}) 
      commit('setUser',{user:data.results[0]})
    },
    async loadMovies({commit},{page=1} = {}){
      commit('setLoading',{isLoading:true})
      try {
        let {data} = await axios.get('/movie/now_playing',{params:{
          page,
        }})
        commit('setMovies', {movies:data})

      } catch (error) {
        let {response} = error
        if (response)
        Snackbar.open(response.status_message)
        
      }
      commit('setLoading',{isLoading:false})
    },

    async loadMovie({commit},{id}){
      try {
        commit('setLoading',{isLoading:true})
        let {data} = await axios.get('/movie/'+id)
        commit('setMovie',{movie:data})
      } catch (error) {
        if (error.response)
          Snackbar.open(error.response.status_message)
        else
          Snackbar.open('Something bad happened')
      }
      commit('setLoading',{isLoading:false})
    }
  }
})
