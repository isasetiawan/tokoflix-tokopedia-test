<template>
    <div class="columns is-multiline">
        <div class="column is-one-fifth" v-for="movie in movieList" :key="movie.id">
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
    </div>
</template>

<script>

export default {
    name:"Movies",
    props:{
        movieList:Array
    }
}
</script>

<style>

</style>
