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
                    <div class="card is-success" style="top:-150px; border-radius:10px">
                        <div class="card-image">
                            <figure class="image is-2by3 is-overlay">
                                <img :src="`http://image.tmdb.org/t/p/w500/${movie.poster_path}`" style="border-radius:10px">
                            </figure>
                        </div>
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
                        <!-- {{movie}} -->
                    </div>
                </div>
            </div>
        </div>

        <!-- {{movie}} -->
        <Loading
            :is-full-page="true"
            :active="$store.state.isLoading"
        />
    </div>
</template>

<script>
import {Loading} from 'buefy/dist/components/loading'
import {Icon} from 'buefy/dist/components/icon'

import {mapState, mapActions} from 'vuex'
export default {
    components:{Loading, Icon},
    name:'movie',
    created(){
        let {movie_id_slug} = this.$route.params
        let movieId = movie_id_slug.split('-')[0]
        this.loadMovie({id:movieId})
    },
    methods:{
        ...mapActions(['loadMovie'])
    },
    data(){return{
        y:0
    }},
    computed:{
        ...mapState({
            movie: state => state.movie
        })
    },
    
}
</script>

<style>

</style>