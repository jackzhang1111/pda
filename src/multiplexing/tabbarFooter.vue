<template>
    <!-- 底部导航 -->
    <div class="tabbar">
        <van-tabbar class="icons" v-model="active" active-color="#000" inactive-color="#010101" route>
            <!-- <span>自定义</span> -->
            <!-- <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive"> -->
            <van-tabbar-item route to="/control/warehousing" replace v-if="!userinfoPda.personnelId">
                <span>仓储</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.cangchu1 : icon.cangchu" class="icon-style">
            </van-tabbar-item>
             <van-tabbar-item route to="/control/logistics" replace v-if="userinfoPda.personnelId">
                <span>物流</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.wuliu1 : icon.wuliu" class="icon-style">
            </van-tabbar-item>
            <!-- <van-tabbar-item route to="/control/statistical">
                <span>统计</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.tongji1 : icon.tongji" class="icon-style">
            </van-tabbar-item> -->
            <van-tabbar-item route to="/control/account"> 
                <span>我的</span>
                <img slot="icon" slot-scope="props" :src="props.active ? icon.wode1 : icon.wode" class="icon-style">
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import cangchu from '@/assets/img/warehousing-01@2x.png'
import cangchu1 from '@/assets/img/warehousing@2x.png'
import wuliu from '@/assets/img/logistics-01@2x.png'
import wuliu1 from '@/assets/img/logistics@2x.png'
import tongji from '@/assets/img/statistical-01@2x.png'
import tongji1 from '@/assets/img/statistical@2x.png'
import wode from '@/assets/img/account-01@2x.png'
import wode1 from '@/assets/img/account@2x.png'
export default {
    props: {

    },
    data() {
        return {
            icon:{
                cangchu,
                cangchu1,
                wuliu,
                wuliu1,
                tongji,
                tongji1,
                wode,
                wode1
            },
            active:0,
            userinfoPda:{}
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.userinfoPda = JSON.parse(localStorage.userinfoPda)
    },
    watch: {

    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="less">
.tabbar{
    width: 100%;
    height: 98px;
}
</style>
