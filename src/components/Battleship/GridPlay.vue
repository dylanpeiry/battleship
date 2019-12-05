<template>
    <div class="grid" disabled>
        <div v-for="(rows, r_idx) in player.grid_size.rows" class="r">
            <div :id="`og${r_idx}${c_idx}`" v-for="(cols, c_idx) in player.grid_size.cols" class="cell"
                 v-on:click="playClick">
                <span v-if="playerGuessing.guess_grid[r_idx][c_idx]">
                    <v-icon color="success"
                            v-if="playerGuessing.guess_grid[r_idx][c_idx] === 'f'">mdi-ferry</v-icon>
                    <v-icon color="red" v-else>mdi-close</v-icon>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GridPlay",
        props: {
            player: Object,
            playerGuessing: Object,
            playClick: Function
        }
    }
</script>

<style scoped>

</style>