<template>
  <div>

    <div class="section">
      <div class="columns is-multiline">
        <div class="column is-one-fifth" v-for="movie in $store.state.movies.results" :key="movie.id">
          <div class="card">
            <div class="card-image">
              <figure v-if="movie.poster_path" class="image is-2by3 is-success">
                <img :src="`http://image.tmdb.org/t/p/w342/${movie.poster_path}`" alt="">
              </figure>
            </div>
            <div class="card-header">
              <div class="card-header-title">{{movie.title}}</div>
            </div>
            <div class="card-content">
              {{movie.overview.slice(0,100)}}...
            </div>
            <div class="card-footer">
              <router-link :to="`/${movie.id}-${movie.title.split(' ').join('-')}`" class="card-footer-item">More info</router-link>
            </div>
          </div>
        </div>
        <Loading
          :is-full-page="true"
          :active="$store.state.isLoading"
        />
      </div>
    </div>

    <div class="section">
      <Pagination
            :total="$store.state.movies.total_results-1"
            :current="this.$route.query ? parseInt(this.$route.query.page) : 0"
            order="default"
            :per-page="Math.round($store.state.movies.total_results/$store.state.movies.total_pages)"
            @change="onPageChange"
            >
        </Pagination>
    </div>
  </div>
</template>

<script>
import {Pagination} from 'buefy/dist/components/pagination'
import {Loading} from 'buefy/dist/components/loading'
// import {Icon} from 'buefy/dist/components/icon'
export default {
  name: 'home',
  components:{Pagination, Loading, },
  async beforeRouteUpdate(to, _, next){
    await this.$store.dispatch('loadMovies',{page:to.query.page})
    next()
  },
  methods:{
    onPageChange(page){
      this.$router.push({ path: '/', query: { page }})
    }
  }
}
</script>
