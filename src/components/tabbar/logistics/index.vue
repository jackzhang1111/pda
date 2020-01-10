<template>
    <div class="logistics">
        <tabbar-header></tabbar-header>
        <div class="logistics-top">
            <div class="fl-left tongji">
                <div class="fs-40 tongji-top">0</div>
                <div class="c-999">待接单</div>
            </div>
            <div class="fl-left tongji">
                <div class="fs-40 tongji-top">1266</div>
                <div class="c-999">今日签收</div>
            </div>
        </div>
        <div class="logistics-con">
            <div class="con-item" v-for="(icon,index) in iconList" :key="index" @click="iconItem(icon.routerName)">
                <img :src="icon.icon">
                <div class="c-666">{{icon.name}}</div>
            </div>
        </div>
        <div class="saomiao-btn">
            <img src="@/assets/img/saomiao.svg">
            <span>扫描条码</span>
        </div>
    </div>
</template>

<script>
import tabbarHeader from '@/multiplexing/tabbarHeader.vue'
import peisong from '@/assets/img/peisong.png'
import cheliang from '@/assets/img/cheliang.png'
import shouhou from '@/assets/img/shouhou.png'
import yichangchuli from '@/assets/img/yichangchuli.png'
import wodezichan from '@/assets/img/wodezichan.png'
export default {
    props: {

    },
    data() {
        return {
            iconList:[
                {
                    icon:peisong,
                    name:'配送',
                    routerName:'distributionList'
                },
                {
                    icon:cheliang,
                    name:'车辆',
                    routerName:''
                },
                {
                    icon:shouhou,
                    name:'售后',
                    routerName:'afterSalesList'
                },
                {
                    icon:yichangchuli,
                    name:'异常处理',
                    routerName:''
                },
                {
                    icon:wodezichan,
                    name:'我的资产',
                    routerName:''
                },
            ]
            
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        
    },
    watch: {

    },
    methods: {
        iconItem(routerName){
            if(routerName == '') return
            this.$router.push({name:routerName})
        }
    },
    components: {
        tabbarHeader
    },
};
</script>

<style scoped lang="less">
.logistics{
    padding: 0 30px;
    font-size: 24px;
    .logistics-top{
        height: 230px;
        background-color: #fff;
        box-shadow:0px 10px 10px 0px rgba(59,59,59,0.12);
        border-radius:20px;
        margin:50px 0 60px;
        .tongji{
            width: 50%;
            height: 100%;
            text-align: center;
            .tongji-top{
                padding: 74px 0 50px;
            }
        }
    }
    .logistics-con{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 344px;
        .con-item{
            width: 230px;
            height: 158px;
            text-align: center;
            img{
                transform: scale(0.5);
            }
        }
    }
    .saomiao-btn{
        height: 88px;
        line-height: 88px;
        font-size: 36px;
        color: #fff;
        text-align: center;
        background-color: #333;
        border-radius:44px;
        img{
            vertical-align: middle;
        }
    }
}
.fs-40{
    font-size: 40px;
}

</style>
