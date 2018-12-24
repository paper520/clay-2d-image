import Vue from 'vue';
import App from './App.vue';
import clay from './clay.js';
import '../node_modules/easycss-core/build/easycss.min.css';
import routerObj from './router';

var vm = new Vue({
    el: clay('#root')[0],
    router: routerObj,
    render: createElement => createElement(App)
});
