import warehousing from '@/multiplexing/router.vue'
import warehousSupplied from './warehousSupplied/index'
import allocation from './allocation/index'
import cancellation from './cancellation/index'
import remove from './remove/index'
import shelve from './shelve/index'
import sold from './sold/index'
import warehouAfterSales from './warehouAfterSales/index'
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
    }
];

export default routes;