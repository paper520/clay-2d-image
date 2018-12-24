import Vue from 'vue';
import '../node_modules/easycss-core/build/easycss.min.css';

import clay from './clay.js';
import router from './router';

var vm = new Vue({
    el: clay('#root')[0],
    router: router,
    render: createElement => createElement('router-view')
});
