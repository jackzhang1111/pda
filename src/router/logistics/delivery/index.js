// 物流-配送
import distributionList from '@/components/tabbar/logistics/delivery/distributionList.vue'
import distributionDetail from '@/components/tabbar/logistics/delivery/distributionDetail.vue'
import packagePieces from '@/components/tabbar/logistics/delivery/packagePieces.vue'
import logisticsSearchOrder from '@/components/tabbar/logistics/itemComponents/searchOrder.vue'
import searchDist from '@/components/tabbar/logistics/delivery/searchDist.vue'

let routes = [
    {
        path:'distributionList',
        name:'distributionList',
        component:distributionList
    },
    {
        path:'distributionList/distributionDetail',
        name:'distributionDetail',
        component:distributionDetail,
    },
    {
        path:'distributionList/packagePieces',
        name:'packagePieces',
        component:packagePieces,
    },
    {
        path:'distributionList/logisticsSearchOrder',
        name:'logisticsSearchOrder',
        component:logisticsSearchOrder,
    },
    {
        path:'distributionList/searchDist',
        name:'searchDist',
        component:searchDist,
    }
];

export default routes;