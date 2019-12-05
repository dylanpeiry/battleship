<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">BATTLESHIP</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
     <Battleship/>
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
