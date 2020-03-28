//我的-个人信息
import information from '@/components/tabbar/account/information/information.vue'
import informationList from '@/components/tabbar/account/information/informationList.vue'
import replacementPhone from '@/components/tabbar/account/information/replacementPhone.vue'
import currentPhone from '@/components/tabbar/account/information/currentPhone.vue'
import eMail from '@/components/tabbar/account/information/eMail.vue'
import where from '@/components/tabbar/account/information/where.vue'

let routes = [
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
];

export default routes;