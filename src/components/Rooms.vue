<template>
    <v-data-table
            :headers="headers"
            :items="rooms"
            class="elevation-1"
            :hide-default-footer="true"
    >
        <template v-slot:item.action="{item}">
            <v-btn v-if="!clientCheckRoom(item) && item.clients_count < item.max_clients" class="ma-2" color="indigo"
                   small :dark="!inRoom" :light="inRoom" v-on:click="joinRoom(item.name)" :disabled="inRoom">Join
            </v-btn>
            <v-btn v-if="clientCheckRoom(item)" class="ma-2" color="red"
                   small dark v-on:click="leaveRoom(item.name)">Leave
            </v-btn>
            <v-btn v-if="!clientCheckRoom(item) && item.clients_count >= item.max_clients" class="ma-2" disabled color="grey" small light>FULL
            </v-btn>
        </template>

    </v-data-table>
</template>

<script>
    export default {
        name: "Rooms",
        data() {
            return {
                headers: [
                    {
                        text: 'Room',
                        align: 'center',
                        sortable: false,
                        value: 'name',
                    },
                    {text: 'Clients', value: 'clients_count', sortable: false, align: 'center'},
                    {text: 'Max clients', value: 'max_clients', sortable: false, align: 'center'},
                    {text: 'Action', value: 'action', sortable: false, align: 'center'},
                ],
                rooms: [],
                clientId: null,
                inRoom: false
            }
        },
        sockets: {
            loadRooms(data) {
                this.rooms = data.rooms;
                if (this.clientId === null)
                    this.clientId = data.clientId;
            }
        },
        methods: {
            joinRoom(roomId) {
                this.$socket.emit('roomJoined', roomId);
                this.inRoom = true;
            },
            leaveRoom(roomId) {
                this.$socket.emit('roomLeft', {roomId, clientId: this.clientId});
                this.inRoom = false;
            },
            clientCheckRoom(room) {
                let found = room.clients_list.find(c => c === this.clientId);
                return found;
            }
        }
    }
</script>

<style scoped>

</style>