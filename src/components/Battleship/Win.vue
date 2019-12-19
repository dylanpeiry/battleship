<template>
    <div>
        <p>The player <b>{{b.player1.boats_found === 8 ? b.player1.name : b.player2.name}}</b> won the game in <b>{{showGameTime()}}.</b></p>
        The stats of the game are the following.
        <table>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Boats found</th>
                    <th>Failed attempts</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{b.player1.name}}</td>
                    <td>{{b.player1.boats_found}}</td>
                    <td>{{b.player1.failed_attempts}}</td>
                </tr>
                <tr>
                    <td>{{b.player2.name}}</td>
                    <td>{{b.player2.boats_found}}</td>
                    <td>{{b.player2.failed_attempts}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Win",
        props: {
            b: Object,
            showGameTime: Function
        }
    }
</script>

<style scoped>

</style>