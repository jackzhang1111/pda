//仓储-供货入库
import suppliedList from '@/components/tabbar/warehousing/warehousSupplied/suppliedList'
import suppliedDetail from '@/components/tabbar/warehousing/warehousSupplied/suppliedDetail'
import suppliedPickUp from '@/components/tabbar/warehousing/warehousSupplied/suppliedPickUp'
import suppliedShelves from '@/components/tabbar/warehousing/warehousSupplied/suppliedShelves'
import suppliedSearch from '@/components/tabbar/warehousing/warehousSupplied/suppliedSearch'
let routes = [
    {
        path: 'suppliedList',
        name: 'suppliedList',
        component: suppliedList,
    },
    {
        path: 'suppliedList/suppliedDetail',
        name: 'suppliedDetail',
        component: suppliedDetail,
    },
    {
        path: 'suppliedList/suppliedPickUp',
        name: 'suppliedPickUp',
        component: suppliedPickUp,
    },
    {
        path: 'suppliedList/suppliedShelves',
        name: 'suppliedShelves',
        component: suppliedShelves,
    },
    {
        path: 'suppliedList/suppliedSearch',
        name: 'suppliedSearch',
        component: suppliedSearch,
    }
];

export default routes;