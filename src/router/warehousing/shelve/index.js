//仓储-上架
import shelveList from '@/components/tabbar/warehousing/shelve/shelveList'
import shelveShelves from '@/components/tabbar/warehousing/shelve/shelveShelves'
let routes = [
    {
        path:'shelveList',
        name:'shelveList',
        component:shelveList
    },
    {
        path:'shelveList/shelveShelves',
        name:'shelveShelves',
        component:shelveShelves
    }
];

export default routes;