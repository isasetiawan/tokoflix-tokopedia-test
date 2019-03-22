<template>
  <div>

    <div class="section">
      <Movies :movieList="$store.state.movies.results"/>      
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
import Movies from '@/components/Movies'

// import {Icon} from 'buefy/dist/components/icon'
export default {
  name: 'home',
  components:{Pagination, Movies},
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
