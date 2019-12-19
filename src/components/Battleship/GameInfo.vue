<template>
    <div>
        <v-row>
            <v-col cols="12" class="text-center"><h3>Au tour de {{b.round === 1 ?
                b.player1.name :
                b.player2.name}}</h3></v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-center">
                {{showGameTime()}}
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-center">
            <span>{{b.player1.name}} (<span class="green--text">{{b.player1.boats_found}}</span>;<span
                    class="red--text">{{b.player1.failed_attempts}}</span>) - (<span
                    class="red--text">{{b.player2.failed_attempts}}</span>;<span class="green--text">{{b.player2.boats_found}}</span>) {{b.player2.name}}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-center" v-if="b.round === 2"><u>{{b.player1.name}}'s
                grid</u></v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-center" v-if="b.round === 1"><u>{{b.player2.name}}'s
                grid</u></v-col>
        </v-row>

    </div>
</template>

<script>
    export default {
        name: "GameInfo",
        props: {
            b: Object,
            showGameTime: Function
        }
    }
</script>

<style scoped>

</style>