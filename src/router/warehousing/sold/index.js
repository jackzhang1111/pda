//仓储-销售出库
import soldList from '@/components/tabbar/warehousing/sold/soldList'
import soldDetail from '@/components/tabbar/warehousing/sold/soldDetail'
import soldRemove from '@/components/tabbar/warehousing/sold/soldRemove'
import soldOutstock from '@/components/tabbar/warehousing/sold/soldOutstock'
import soldSearch from '@/components/tabbar/warehousing/sold/soldSearch'
let routes = [
    {
        path:'soldList',
        name:'soldList',
        component:soldList
    },
    {
        path:'soldList/soldDetail',
        name:'soldDetail',
        component:soldDetail
    },
    {
        path:'soldList/soldRemove',
        name:'soldRemove',
        component:soldRemove
    },
    {
        path:'soldList/soldOutstock',
        name:'soldOutstock',
        component:soldOutstock
    },
    {
        path:'soldList/soldSearch',
        name:'soldSearch',
        component:soldSearch
    }
];

export default routes;