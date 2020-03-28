//物流-售后
import afterSalesList from '@/components/tabbar/logistics/afterSales/afterSalesList.vue'
import afterSalesDetail from '@/components/tabbar/logistics/afterSales/afterSalesDetail.vue'
import afterSalesPickUp from '@/components/tabbar/logistics/afterSales/pickUp.vue'
import searchAfter from '@/components/tabbar/logistics/afterSales/searchAfter.vue'

let routes = [
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
];

export default routes;