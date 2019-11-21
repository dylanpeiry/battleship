<template>
    <b-container>
        <div id="battleship" v-if="battleship.started">
            <b-row>
                <b-col cols="6" class="text-center"><h3>Grille de {{battleship.player1.name}}</h3></b-col>
                <b-col cols="6" class="text-center"><h3>Grille de {{battleship.player2.name}}</h3></b-col>
            </b-row>
            <b-row>
                <b-col cols="6">
                    <div id="my-grid" class="grid">
                        <div v-for="(rows, r_idx) in battleship.player1.grid_size.rows" class="r">
                            <div :id="`og${r_idx}${c_idx}`" v-for="(cols, c_idx) in battleship.player1.grid_size.cols"
                                 class="cell" v-on:click="click">
                                <span v-if="battleship.player1.grid[r_idx][c_idx]">X</span>
                            </div>
                        </div>
                    </div>
                </b-col>
                <b-col cols="6">
                    <div id="enemy-grid" class="grid">
                        <div v-for="(rows, r_idx) in battleship.player2.grid_size.rows" class="r">
                            <div :id="`eg${r_idx}${c_idx}`" v-for="(cols, c_idx) in battleship.player2.grid_size.cols"
                                 class="cell" v-on:click="click">
                                <span v-if="battleship.player2.grid[r_idx][c_idx]">X</span>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </div>
        <div id="settings" v-if="!battleship.started" style="max-width: 250px;" class="mx-auto">
            <v-alert
                    border="top"
                    color="red lighten-2"
                    dark
                    v-if="battleship.message !== null"
            >
                {{battleship.message}}
            </v-alert>
            <b-row>
                <b-col>
                    <v-text-field v-model="battleship.player1.name"
                                  label="Player 1 name"
                                  prepend-inner-icon="mdi-account"
                                  filled
                    ></v-text-field>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <v-text-field v-model="battleship.player2.name"
                                  label="Player 2 name"
                                  prepend-inner-icon="mdi-account"
                                  filled
                    ></v-text-field>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <v-btn class="w-100" color="primary" @click="start">Start a game</v-btn>
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>
git    /* eslint-disable no-console */
    const DEFAULT_COLS = 8;
    const DEFAULT_ROWS = 8;

    export default {
        name: "Battleship",
        data: () => {
            return {
                battleship: {
                    started: false,
                    message: null,
                    player1: {
                        name: null,
                        grid: [
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                        ],
                        grid_size: {cols: DEFAULT_COLS, rows: DEFAULT_ROWS}
                    },
                    player2: {
                        name: null,
                        grid: [
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null, null],
                        ],
                        grid_size: {cols: DEFAULT_COLS, rows: DEFAULT_ROWS}
                    }
                }
            }
        },
        watch: {
            'battleship.player1.name':
                function (newVal, oldVal) {
                    console.log(newVal, oldVal);
                }
        },
        methods: {
            //Called after player entered name to start the game
            start() {
                if (this.battleship.player1.name && this.battleship.player2.name) {
                    this.battleship.started = true;
                    this.battleship.message = null;
                } else {
                    this.battleship.message = 'Please fill in the players names';
                }
            },
            //Called when the player click on a cell
            click(e) {
                let id = e.currentTarget.id;
                let g = id.slice(0, 2);
                let row = parseInt(id.slice(2, 3));
                let col = parseInt(id.slice(3, 4));
                if (g === 'eg') {
                    this.setArray(this.battleship.player2.grid, row, col);
                } else if (g === 'og') {
                    this.setArray(this.battleship.player1.grid, row, col);
                }
            },

            setArray(g, r, c) {
                let newR = g[r];
                newR[c] = 'x';
                this.$set(g, r, newR);
            }
        }
    }
</script>

<style scoped>

    .grid {
        display: table;
        margin: 0 auto 0 auto;
    }

    .r {
        display: table-row;
        clear: both;
        overflow: hidden;
    }

    .cell {
        display: table-cell;
        width: 40px;
        height: 40px;
        border: 1px solid black;
        text-align: center;
        line-height: 38px;
        font-weight: bold;
    }

</style>