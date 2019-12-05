<template>
    <v-container>
        <transition name="slide-fade" mode="out-in">
            <div id="setup_grid"
                 v-if="battleship.state < states.GAME && battleship.state > states.SETUP && battleship.player_setup !== null">
                <v-row>
                    <v-col cols="12" class="text-center">
                        <h3>{{battleship.player_setup.name}}'s grid</h3>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="text-center">
                        <span>Please setup your grid by placing your boats.</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="text-center">
                        <span><b>{{battleship.player_setup.boats}}</b> remaining {{battleship.player_setup.boats > 1 ? 'boats' : 'boat'}} to place.</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <GridSetup :player="battleship.player1" :setup-click="s_click"
                                   v-if="battleship.state === states.SETUP_P1"/>
                        <transition name="slide-fade" mode="out-in">
                            <GridSetup :player="battleship.player2" :setup-click="s_click"
                                       v-if="battleship.state === states.SETUP_P2"/>
                        </transition>
                    </v-col>
                    <v-col class="text-center">
                        <v-btn color="primary" @click="nextState" :disabled="battleship.player_setup.boats > 0">
                            Lock your grid
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </transition>
        <div id="end" v-if="this.battleship.state === states.END">
            Fin du jeu
            {{this.battleship.round}}
            {{this.battleship.player1.boats_found}}
            {{this.battleship.player2.boats_found}}
        </div>
        <transition name="slide-fade">
            <div id="battleship" v-if="battleship.state === states.GAME">
                <v-row>
                    <v-col cols="12" class="text-center"><h3>Au tour de {{battleship.round === 1 ?
                        battleship.player1.name :
                        battleship.player2.name}}</h3></v-col>
                    <v-col cols="12" class="text-center" v-if="battleship.round === 2"><u>{{battleship.player1.name}}'s
                        grid</u></v-col>
                    <v-col cols="12" class="text-center" v-if="battleship.round === 1"><u>{{battleship.player2.name}}'s
                        grid</u></v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" v-if="battleship.round === 2">
                        <GridPlay :player="battleship.player1" :player-guessing="battleship.player2"
                                  :play-click="click"/>
                    </v-col>
                    <v-col cols="12" v-if="battleship.round === 1">
                        <GridPlay :player="battleship.player2" :player-guessing="battleship.player1"
                                  :play-click="click"/>
                    </v-col>
                </v-row>
            </div>
        </transition>
        <transition name="slide-fade">
            <div id="settings" v-if="battleship.state === states.SETUP" style="max-width: 250px;" class="mx-auto">
                <v-alert
                        border="top"
                        color="red lighten-2"
                        dark
                        v-if="battleship.message !== null"
                >
                    {{battleship.message}}
                </v-alert>
                <v-row>
                    <v-col>
                        <v-text-field v-model="battleship.player1.name"
                                      label="Player 1 name"
                                      prepend-inner-icon="mdi-account"
                                      filled
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field v-model="battleship.player2.name"
                                      label="Player 2 name"
                                      prepend-inner-icon="mdi-account"
                                      filled
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn width="100%" color="primary" @click="start">Start a game</v-btn>
                    </v-col>
                </v-row>
            </div>
        </transition>
    </v-container>
</template>

<script>
    import GridSetup from "@/components/Battleship/GridSetup";
    import GridPlay from "@/components/Battleship/GridPlay";

    const DEFAULT_COLS = 8;
    const DEFAULT_ROWS = 8;
    const STATES = {
        SETUP: 1,
        SETUP_P1: 2,
        SETUP_P2: 3,
        GAME: 4,
        END: 5
    };

    export default {
        name: "Battleship",
        components: {
            GridSetup,
            GridPlay
        },
        data: () => {
            return {
                states: STATES,
                battleship: {
                    timeout: false,
                    //Who has to play 1: player1, 2: ...
                    round: 1,
                    state: STATES.SETUP,
                    message: null,
                    player_setup: null,
                    player1: {
                        boats: 8,
                        boats_found: 0,
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
                        guess_grid: [
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
                        boats: 8,
                        boats_found: 0,
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
                        guess_grid: [
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
            'battleship.state':
                function (val) {
                    switch (val) {
                        case 2:
                            this.battleship.player_setup = this.battleship.player1;
                            break;
                        case 3:
                            this.battleship.player_setup = this.battleship.player2;
                            break;
                        case 4:
                            break;
                        case 5:
                            break;
                    }
                }
        },
        methods: {
            //Called after player entered name to start the game
            start() {
                if (this.battleship.player1.name && this.battleship.player2.name) {
                    this.battleship.state = STATES.SETUP_P1;
                    this.battleship.message = null;
                } else {
                    this.battleship.message = 'Please fill in the players names';
                }
            },
            nextState() {
                this.battleship.state += 1;
            },
            //Setup the boats where the player clicks (only 1 by 1 placement right now)
            s_click(e, player) {
                let id = e.currentTarget.id;
                let r = parseInt(id.slice(2, 3));
                let c = parseInt(id.slice(3, 4));
                if (player.grid[r][c] === null && player.boats > 0) {
                    this.setArray(player.grid, r, c);
                    player.boats--;
                } else if (player.grid[r][c] !== null) {
                    this.setArray(player.grid, r, c, false, true);
                    player.boats++;
                } else if (player.boats === 0) {
                    alert('You have to remove another boat to add one.');
                }

            },
            //Called when the player click on a cell during the state GAME
            click(e) {
                let id = e.currentTarget.id;
                let row = parseInt(id.slice(2, 3));
                let col = parseInt(id.slice(3, 4));

                if (!this.timeout) {
                    if (this.battleship.round === 1) {
                        this.check(this.battleship.player2, row, col);
                    } else {
                        this.check(this.battleship.player1, row, col);
                    }
                }
            },
            //G1 is the guess_grid of the player trying to guess and g2 is the grid of the opponent
            check(player, row, col) {
                let found = player.grid[row][col] !== null;
                if (found)
                    player.boats_found++;
                if (this.battleship.round === 1) {
                    this.setArray(this.battleship.player1.guess_grid, row, col, found);
                    if (!found) {
                        this.timeout = true;
                        setTimeout(() => {
                            this.battleship.round = 2;
                            this.timeout = false;
                        }, 1000);
                    }
                } else {
                    this.setArray(this.battleship.player2.guess_grid, row, col, found);
                    if (!found) {
                        this.timeout = true;
                        setTimeout(() => {
                            this.battleship.round = 1;
                            this.timeout = false;
                        }, 1000);
                    }
                }
                if (this.win(player))
                    this.nextState();
            },
            win(player) {
                return player.boats_found === 8;
            },
            //g-grid / r-row / c-col / f-found / n-null
            setArray(g, r, c, f = false, n = false) {
                let newR = g[r];
                newR[c] = !n ? (!f ? 'x' : 'f') : null;
                this.$set(g, r, newR);
            }
        }
    }
</script>

<style>
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
        cursor: pointer;
    }

    /* Transitions animations*/
    .slide-fade-enter-active {
        transition: all 0.3s ease;
    }

    .slide-fade-enter {
        transform: translateX(100px);
        opacity: 0;
    }

</style>