import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import menu_page from '../menu.vue';

import pie_one from '../components/pie/one.vue';
import tree_one from '../components/tree/one.vue';
import other_one from '../components/other/one.vue';
import other_two from '../components/other/two.vue';

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: 'menu'
    }, {
        path: '/menu',
        component: menu_page
    },

    { path: '/pie_one', component: pie_one },
    { path: '/tree_one', component: tree_one },
    { path: '/other_one', component: other_one },
    { path: '/other_two', component: other_two },

    ]
});

export default router;
