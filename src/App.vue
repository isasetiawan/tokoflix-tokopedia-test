<template>
  <div>
    <nav class="navbar is-success" role="navigation" >
      
      <div class="navbar-start " >
        <div class="navbar-item title has-text-white">
          Tokoflix
        </div>
      </div>
    
      <div class="navbar-end" v-if="$store.state.user">
        <div class="navbar-item">
          <div>
            <p class="is-size-4 is-capitalized">{{$store.state.user.name.first}} {{$store.state.user.name.last}}</p>
            <p class="is-size-7">{{balance | currency}}</p>
          </div>
          <div class="navbar-item" >
            <figure class="image is-24x24">
              <img class="is-rounded" :src="$store.state.user.picture.thumbnail">
            </figure>
          </div>
        </div>
      </div>

    </nav>

    <router-view></router-view>

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed:{
    ...mapState({
      balance:state=>state.balance
    })
  }
}
</script>


<style>
  /* .navbar-item img{
    width: 48px;
    height: 48px;
  } */
</style>
