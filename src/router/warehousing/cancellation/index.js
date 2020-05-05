//仓储-采购退货出库
import cancellationList from '@/components/tabbar/warehousing/cancellation/cancellationList'
import cancellationDetail from '@/components/tabbar/warehousing/cancellation/cancellationDetail'
import cancellationRemove from '@/components/tabbar/warehousing/cancellation/cancellationRemove'
import cancellationOutstock from '@/components/tabbar/warehousing/cancellation/cancellationOutstock'
import cancellationSearch from '@/components/tabbar/warehousing/cancellation/cancellationSearch'
let routes = [
    {
        path:'cancellationList',
        name:'cancellationList',
        component:cancellationList
    },
    {
        path:'cancellationList/cancellationDetail',
        name:'cancellationDetail',
        component:cancellationDetail
    },
    {
        path:'cancellationList/cancellationRemove',
        name:'cancellationRemove',
        component:cancellationRemove
    },
    {
        path:'cancellationList/cancellationOutstock',
        name:'cancellationOutstock',
        component:cancellationOutstock
    },
    {
        path:'cancellationList/cancellationSearch',
        name:'cancellationSearch',
        component:cancellationSearch
    }
];

export default routes;