import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import menu_page from '../menu.vue';

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: 'menu'
    }, {
        path: '/menu',
        component: menu_page
    }]
});

export default router;
