import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueSocketIO from 'vue-socket.io';
import router from "./router";

Vue.use(new VueSocketIO({
    connection: 'localhost:4200'
}));
Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app');
