<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">BATTLESHIP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <router-link to="/rooms" tag="button">Rooms</router-link>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view class="mt-10 ml-auto mr-auto" style="width: 450px"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Battleship from './components/Battleship';

export default {
  name: 'App',
  components: {
    Battleship
  },
};
</script>
