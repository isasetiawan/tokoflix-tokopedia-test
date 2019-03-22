import Vue from 'vue'
import Vuex from 'vuex'
import axios from './plugins/axios';
import { Snackbar } from 'buefy/dist/components/snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    movies:[],
    movie:null,
    cart:[],
    casts:[],
    similarMovies:[],
    recommendationMovies:[],
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
    setCasts(state,{casts}){
      state.casts = casts
    },
    setLoading(state, {isLoading}){
      state.isLoading = isLoading
    },
    addToCart(state){
      let {movie, cart} = state
      cart.push(movie.id)
    },
    changeBalance(state,amount){
      state.balance = amount
    },
    setSimilarMovies(state, {movies}){
      state.similarMovies = movies
    },
    setRecommendationMovies(state, {movies}){
      state.recommendationMovies = movies
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
    },

    async loadCasts({commit, state}){
      if (!state.movie) return
      try {
        commit('setLoading',{isLoading:true})
        let {data} = await axios.get(`/movie/${state.movie.id}/credits`)
        commit('setCasts', {casts:data.cast})
      } catch (error) {
        if (error.response)
          Snackbar.open(error.response.status_message)
        else
          Snackbar.open('Something bad happened')
      }
      commit('setLoading',{isLoading:false})
    },

    // eslint-disable-next-line
    purchaseMovie({getters, state, commit}){
      let {balance, cart, movie} = {...state}
      balance -= getters.moviePrice
      if (balance < 0) {
        Snackbar.open("Not enough balance")
        return
      }
      if (cart.includes(movie.id)){
        Snackbar.open(`Movie "${movie.title}" already purchased`)
        return
      }
      commit('addToCart')
      commit('changeBalance',balance)
      Snackbar.open('Movie Purchased')
    },

    async loadSimilarMovie({state, commit}){
      if (!state.movie) return
      try {
        commit('setLoading',{isLoading:true})
        let {data} = await axios.get(`/movie/${state.movie.id}/similar`)
        commit('setSimilarMovies', {movies:data.results})
      } catch (error) {
        if (error.response)
          Snackbar.open(error.response.status_message)
        else
          Snackbar.open('Something bad happened')
      }
      commit('setLoading',{isLoading:false})
    },

    async loadRecommendationMovies({state, commit}){
      if (!state.movie) return
      try {
        commit('setLoading',{isLoading:true})
        let {data} = await axios.get(`/movie/${state.movie.id}/recommendations`)
        commit('setRecommendationMovies', {movies:data.results})
      } catch (error) {
        if (error.response)
          Snackbar.open(error.response.status_message)
        else
          Snackbar.open('Something bad happened')
      }
      commit('setLoading',{isLoading:false})
    }

  },
  getters:{
    moviePrice: state => {
      if (!state.movie) return
      let {vote_average} = state.movie
      if (vote_average >= 1 && vote_average <= 3) return 3500
      if (vote_average > 3 && vote_average <= 6) return 8250
      if (vote_average > 6 && vote_average <= 8) return 16350
      if (vote_average > 8 && vote_average <= 10) return 21250

      return 0
    },

    movieInCart: state => {
      return state.movie ? state.cart.includes(state.movie.id) : false
    }
  }
})
