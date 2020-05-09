import warehousing from '@/multiplexing/router.vue'
import warehousSupplied from './warehousSupplied/index'
import allocation from './allocation/index'
import cancellation from './cancellation/index'
import remove from './remove/index'
import shelve from './shelve/index'
import sold from './sold/index'
import warehouAfterSales from './warehouAfterSales/index'
import warehousweepCode from '@/components/tabbar/warehousing/sweepCode.vue'
import orderInput from '@/components/tabbar/warehousing/orderInput'
let routes = [
    {
        path: '/warehousing',
        name: 'warehousing',
        component: warehousing,
        children:[
            ...warehousSupplied,
            ...allocation,
            ...cancellation,
            ...remove,
            ...shelve,
            ...sold,
            ...warehouAfterSales,
            
        ]
    },
    {
        path: '/warehousing/sweepCode',
        name: 'warehousweepCode',
        component: warehousweepCode
    },
    {
        path: '/warehousing/sweepCode/orderInput',
        name: 'orderInput',
        component: orderInput
    },
];

export default routes;