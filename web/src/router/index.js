import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
// 导出路由模块
export default new Router({
    routes:[{
        path: '/',
        name: 'home',
        component: ()=> import('@/pages/home/index.vue'),
        children:[{
            path:'/sdk',
            name:'sdk',
            component: ()=> import('@/pages/sdk/index.vue')
        }]
    }]
})