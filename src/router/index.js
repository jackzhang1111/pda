import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/index'
//首页母页
import person from '@/components/tabbar/person.vue'
import warehousing from '@/components/tabbar/warehousing/index.vue'
import logistics from '@/components/tabbar/logistics/index.vue'
import statistical from '@/components/tabbar/statistical/index.vue'
import account from '@/components/tabbar/account/index.vue'
//物流-配送
import logisticsMain from '@/components/tabbar/logistics/delivery/logistics.vue'
import distributionList from '@/components/tabbar/logistics/delivery/distributionList.vue'
import distributionDetail from '@/components/tabbar/logistics/delivery/distributionDetail.vue'
import packagePieces from '@/components/tabbar/logistics/delivery/packagePieces.vue'
import logisticsSearchOrder from '@/components/tabbar/logistics/itemComponents/searchOrder.vue'
import searchDist from '@/components/tabbar/logistics/delivery/searchDist.vue'

//物流-售后
import afterSales from '@/components/tabbar/logistics/afterSales/afterSales.vue'
import afterSalesList from '@/components/tabbar/logistics/afterSales/afterSalesList.vue'
import afterSalesDetail from '@/components/tabbar/logistics/afterSales/afterSalesDetail.vue'
import afterSalesPickUp from '@/components/tabbar/logistics/afterSales/pickUp.vue'
import searchAfter from '@/components/tabbar/logistics/afterSales/searchAfter.vue'
//我的-个人信息
import information from '@/components/tabbar/account/information/information.vue'
import informationList from '@/components/tabbar/account/information/informationList.vue'
import replacementPhone from '@/components/tabbar/account/information/replacementPhone.vue'
import currentPhone from '@/components/tabbar/account/information/currentPhone.vue'
import eMail from '@/components/tabbar/account/information/eMail.vue'
import where from '@/components/tabbar/account/information/where.vue'

//扫码
import sweepCode from '@/multiplexing/sweepCode'
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:{name:"logistics"}},  // 重定向到主页
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
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
    //物流-配送
    {
      path:'/logistics/delivery',
      name:'logisticsMain',
      component:logisticsMain,
      children:[
        {
          path:'distributionList',
          name:'distributionList',
          component:distributionList
        },
        {
          path:'distributionList/distributionDetail',
          name:'distributionDetail',
          component:distributionDetail,
        },
        {
          path:'distributionList/packagePieces',
          name:'packagePieces',
          component:packagePieces,
        },
        {
          path:'distributionList/logisticsSearchOrder',
          name:'logisticsSearchOrder',
          component:logisticsSearchOrder,
        },
        {
          path:'distributionList/searchDist',
          name:'searchDist',
          component:searchDist,
        }
      ]
    },
    //物流-售后
    {
      path:'/logistics/afterSales',
      name:'afterSales',
      component:afterSales,
      children:[
        {
          path:'afterSalesList',
          name:'afterSalesList',
          component:afterSalesList,
        },
        {
          path:'afterSalesList/afterSalesDetail',
          name:'afterSalesDetail',
          component:afterSalesDetail,
        },
        {
          path:'afterSalesList/afterSalesPickUp',
          name:'afterSalesPickUp',
          component:afterSalesPickUp,
        },
        {
          path:'afterSalesList/searchAfter',
          name:'searchAfter',
          component:searchAfter,
        }
      ]
    },

    //我的-个人信息
    {
      path:'/account/information',
      name:'information',
      component:information,
      children:[
        {
          path:'informationList',
          name:'informationList',
          component:informationList,
        },
        {
          path:'informationList/currentPhone',
          name:'currentPhone',
          component:currentPhone,
        },
        {
          path:'informationList/currentPhone/replacementPhone',
          name:'replacementPhone',
          component:replacementPhone,
        },
        {
          path:'informationList/eMail',
          name:'eMail',
          component:eMail,
        },
        {
          path:'informationList/where',
          name:'where',
          component:where,
        },
      ]
    },
    {
      path: '/sweepCode',
      name: 'sweepCode',
      component: sweepCode
    },
  ]
})
