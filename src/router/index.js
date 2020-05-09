import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/index'
//首页母页
import person from '@/components/tabbar/person.vue'
import warehousing from '@/components/tabbar/warehousing/index.vue'
import logistics from '@/components/tabbar/logistics/index.vue'
import statistical from '@/components/tabbar/statistical/index.vue'
import account from '@/components/tabbar/account/index.vue'
//物流
import logisticsMain from './logistics/index'
//仓储
import warehou from './warehousing/index.js'
//我的-个人信息
import information from './information/index'
//扫码
import sweepCode from '@/multiplexing/sweepCode'
Vue.use(Router)

let routes = [
  {path:'/',redirect:{name:"login"}},  // 重定向到主页
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    //首页控制器
    path: '/control',
    name: 'control',
    component: person,
    children:[
      {
        path: 'warehousing',
        name: 'warehousing',
        component: warehousing
      },
      {
        path: 'logistics',
        name: 'logistics',
        component: logistics,
        
      },
      {
        path: 'statistical',
        name: 'statistical',
        component: statistical
      },
      {
        path: 'account',
        name: 'account',
        component: account
      },
    ]
  },
  {
    path: '/sweepCode',
    name: 'sweepCode',
    component: sweepCode
  },
]

routes = routes.concat(warehou).concat(logisticsMain).concat(information)

export default new Router({
  routes
})
