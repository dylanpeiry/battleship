<template>
    <div class="grid">
        <div v-for="(rows, r_idx) in player.grid_size.rows" class="r">
            <div :id="`og${r_idx}${c_idx}`"
                 v-for="(cols, c_idx) in player.grid_size.cols"
                 class="cell"
                 v-on:click="setupClick($event,player)">
                <v-icon v-if="player.grid[r_idx][c_idx]" color="primary">
                    mdi-ferry
                </v-icon>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GridSetup",
        props: {
            player: Object,
            setupClick: Function
        }
    }
</script>
