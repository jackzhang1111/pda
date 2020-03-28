//仓储-调拨列表
import logistics from '@/multiplexing/router.vue'
import delivery from './delivery/index'
import afterSales from './afterSales/index'
let routes = [
    {
        path: '/logistics',
        name: 'logistics',
        component: logistics,
        children:[
            ...delivery,
            ...afterSales
        ]
    }
];

export default routes;