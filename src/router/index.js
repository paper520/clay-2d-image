import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import menu_page from '../menu.vue';

import pieLayout from '../components/pieLayout/index.vue';

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: 'menu'
    }, {
        path: '/menu',
        component: menu_page
    }, {
        path: '/pieLayout',
        component: pieLayout
    }]
});

export default router;
