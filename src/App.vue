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
          <div class="is-size-5 is-capitalized">
            {{$store.state.user.name.first}} {{$store.state.user.name.last}}
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

<style>
  /* .navbar-item img{
    width: 48px;
    height: 48px;
  } */
</style>
