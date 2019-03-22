<template>
    <div v-if="movie">
        <div 
            class="hero is-medium is-success" :style="movie.backdrop_path ? {
                background:`url(http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}) no-repeat center center`,
                backgroundCover: 'cover',
                filter:'blur(2px)',
                width: '100%',
            } : {}"
            v-on:scroll="(event)=>{y = event}"
            >
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">{{movie.title}}</h1>
                </div>
            </div>
        </div>
        
        <div class="section">
            <div class="columns">
                <div class="column is-one-fifth">
                   <div class="box is-paddingless">
                       <figure class="image is-2by3 ">
                            <img :src="`http://image.tmdb.org/t/p/w500/${movie.poster_path}`" style="border-radius:6px">
                        </figure>
                   </div>
                </div>

                <div class="column">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-header-title title">{{movie.title}}</div>
                        </div>
                        
                        <div class="card-content">

                            <p class="subtitle ">
                                Duration: <b>{{movie.runtime}} minutes </b>
                            </p>

                            <div class="block">
                                <Icon
                                    v-for="i in 10"
                                    :key="i"
                                    :icon='i < movie.vote_average ? "star" : "star-outline"'
                                    type='is-warning'    
                                />
                                <span class="is-size-6">{{movie.vote_average}}</span>
                            </div>
                            
                            <div class="tags are-medium">
                                <span class="tag is-primary" v-for="genre in movie.genres" :key="genre.id">{{genre.name}}</span>
                            </div>
                            
                            <b class="is-size-5">Overview</b>
                            <p class="subtitle">
                                {{movie.overview}}
                            </p>

                        </div>

                        <div class="card-footer">
                            <a v-if="!movieInCart" class="card-footer-item" @click="purchaseMovie"> Buy for {{moviePrice | currency}}</a>
                            <p v-else class="card-footer-item">Movie Purchased</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <b-collapse class="card" aria-id="bgsd" :open="false">
                <div
                    slot="trigger"
                    slot-scope="props"
                    class="card-header"
                    role="button"
                    aria-controls="bgsd"
                >
                    <p class="card-header-title title">Casts</p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>
                <div class="card-content">
                    <div class="content">
                        <div class="columns is-multiline">
                            <div v-for="cast in casts" :key="cast.id" class="column is-2">
                                <div class="box" style="padding:10px">
                                    <figure class="image" style="width:100px">
                                        <img v-if="cast.profile_path" :src="`http://image.tmdb.org/t/p/w185/${cast.profile_path}`" style="border-radius:6px">
                                    </figure>
                                    <b class="is-size-5">{{cast.name}}</b>
                                    <p>{{cast.character}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </b-collapse>
        </div>


        <section class="hero is-primary is-bold" v-if="similarMovies.length > 0">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Similar Movies
                </h1>
                <h2 class="subtitle">
                     List of movie that similar to {{movie.title}}
                </h2>
                </div>
            </div>
        </section>

        <div class="section">
            <Movies :movieList="similarMovies"/>
        </div>

        <section class="hero is-primary is-bold" v-if="recommendationMovies.length > 0">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Recommended Movies
                </h1>
                <h2 class="subtitle">
                     Some recomendation movie from {{movie.title}}
                </h2>
                </div>
            </div>
        </section>


        <div class="section">
            <Movies :movieList="recommendationMovies"/>
        </div>

        
    </div>
</template>

<script>
import {Icon} from 'buefy/dist/components/icon'
import Movies from '@/components/Movies'
import {mapState, mapActions, mapGetters} from 'vuex'
export default {
    components:{Icon, Movies,},
    name:'movie',
    async beforeRouteUpdate(to, _, next){
        let {movie_id_slug} = to.params
        let movieId = movie_id_slug.split('-')[0]
        await this.loadMovie({id:movieId})
        await this.loadCasts()
        await this.loadSimilarMovie()
        await this.loadRecommendationMovies()
        next()
    },
    async created(){
        let {movie_id_slug} = this.$route.params
        let movieId = movie_id_slug.split('-')[0]
        await this.loadMovie({id:movieId})
        await this.loadCasts()
        await this.loadSimilarMovie()
        await this.loadRecommendationMovies()
    },
    methods:{
        ...mapActions([
            'loadMovie',
            'loadCasts',
            'purchaseMovie',
            'loadSimilarMovie',
            'loadRecommendationMovies'
        ]),
    },
    computed:{
        ...mapState({
            movie: state => state.movie,
            casts: state => state.casts,
            similarMovies: state => state.similarMovies,
            recommendationMovies: state => state.recommendationMovies
        }),
        ...mapGetters(['moviePrice','movieInCart'])
    },
    
}
</script>

<style>

</style>
