//仓储-售后
import warehouSalesList from '@/components/tabbar/warehousing/warehouAfterSales/warehouSalesList'
import warehouSalesDetail from '@/components/tabbar/warehousing/warehouAfterSales/warehouSalesDetail'
import warehouSalesPickUp from '@/components/tabbar/warehousing/warehouAfterSales/warehouSalesPickUp'
import warehouSalesUppershelf from '@/components/tabbar/warehousing/warehouAfterSales/warehouSalesUppershelf'
import warehouSalesSearch from '@/components/tabbar/warehousing/warehouAfterSales/warehouSalesSearch'
let routes = [
    {
        path:'warehouSalesList',
        name:'warehouSalesList',
        component:warehouSalesList
    },
    {
        path:'warehouSalesList/warehouSalesDetail',
        name:'warehouSalesDetail',
        component:warehouSalesDetail
    },
    {
        path:'warehouSalesList/warehouSalesPickUp',
        name:'warehouSalesPickUp',
        component:warehouSalesPickUp
    },
    {
        path:'warehouSalesList/warehouSalesUppershelf',
        name:'warehouSalesUppershelf',
        component:warehouSalesUppershelf
    },
    {
        path:'warehouSalesList/warehouSalesSearch',
        name:'warehouSalesSearch',
        component:warehouSalesSearch
    }
];

export default routes;