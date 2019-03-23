<template>
  <div>

    <div class="section">
      <div class="columns">
          <b-field>
                <b-input placeholder="Search..."
                    v-model="search"
                    type="search"
                    icon="magnify">
                </b-input>
                <p class="control">
                    <button @click="initSearch" class="button is-primary">Search</button>
                </p>
            </b-field>
      </div>
    </div>

    <div class="section">
      <Movies :movieList="$store.state.movies.results"/>      
    </div>

    <div class="section">
      <Pagination
        :total="$store.state.movies.total_results-1"
        :current="this.$route.query.page ? parseInt(this.$route.query.page) : 1"
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
  data(){return{
    search:this.$route.query.query
  }},
  async beforeRouteUpdate(to, _, next){
    let {query, page} = to.query
    this.search = query
    if (!query)
      await this.$store.dispatch('loadMovies',{page})
    else 
      await this.$store.dispatch('searchMovie',{query, page})
    next()
  },
  methods:{
    onPageChange(page){
      this.$router.push({ path: '/', query: { page, query:this.search }})
    },
    initSearch(){
      this.$router.push({path:'/', query:{page:1, query:this.search}})
    }
  }
}
</script>
