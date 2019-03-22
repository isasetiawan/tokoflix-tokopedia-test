<template>
  <div class="section">
    <div class="columns is-multiline">
      <div class="column is-one-fifth" v-for="movie in $store.state.movies.results" :key="movie.id">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <img :src="`http://image.tmdb.org/t/p/w342/${movie.poster_path}`" alt="">
            </figure>
          </div>
          <div class="card-header">
            <div class="card-header-title">{{movie.title}}</div>
          </div>
          <div class="card-content">
            {{movie.overview.slice(0,100)}}...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
    // HelloWorld
  }
}
</script>
