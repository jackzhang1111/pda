//仓储-调拨列表
import allocationList from '@/components/tabbar/warehousing/allocation/allocationList'
import allocationDetail from '@/components/tabbar/warehousing/allocation/allocationDetail'
import allocationOutstock from '@/components/tabbar/warehousing/allocation/allocationOutstock'
import allocationRemove from '@/components/tabbar/warehousing/allocation/allocationRemove'
import allocationInstorage from '@/components/tabbar/warehousing/allocation/allocationInstorage'
import allocationUppershelf from '@/components/tabbar/warehousing/allocation/allocationUppershelf'
import allocationSearch from '@/components/tabbar/warehousing/allocation/allocationSearch'
import allInstorage from '@/components/tabbar/warehousing/allocation/allInstorage'
import allUppershelf from '@/components/tabbar/warehousing/allocation/allUppershelf'
import noOrder from '@/components/tabbar/warehousing/allocation/itemComponents/noOrder'
import orderList from '@/components/tabbar/warehousing/allocation/itemComponents/orderList'
let routes = [
    {
        path: 'allocationList',
        name: 'allocationList',
        component: allocationList,
    },
    {
        path: 'allocationList/allocationDetail',
        name: 'allocationDetail',
        component: allocationDetail,
    },
    {
        path: 'allocationList/allocationOutstock',
        name: 'allocationOutstock',
        component: allocationOutstock,
    },
    {
        path: 'allocationList/allocationRemove',
        name: 'allocationRemove',
        component: allocationRemove,
    },
    {
        path: 'allocationList/allocationInstorage',
        name: 'allocationInstorage',
        component: allocationInstorage,
    },
    {
        path: 'allocationList/allocationUppershelf',
        name: 'allocationUppershelf',
        component: allocationUppershelf,
    },
    {
        path: 'allocationList/allocationSearch',
        name: 'allocationSearch',
        component: allocationSearch,
    },
    {
        path: 'allocationList/allInstorage',
        name: 'allInstorage',
        component: allInstorage,
    },
    {
        path: 'allocationList/allUppershelf',
        name: 'allUppershelf',
        component: allUppershelf,
    },
    {
        path: 'allocationList/noOrder',
        name: 'noOrder',
        component: noOrder,
    },
    {
        path: 'allocationList/orderList',
        name: 'orderList',
        component: orderList,
    }
];

export default routes;