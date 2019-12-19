import Vue from 'vue';
import Router from 'vue-router';
import Rooms from '@/components/Rooms';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/rooms',
            name: 'rooms',
            component: Rooms
        }
    ]
})