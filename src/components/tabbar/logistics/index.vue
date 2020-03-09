<template>
    <div class="logistics">
        <tabbar-header></tabbar-header>
        <div class="logistics-top">
            <div class="fl-left tongji">
                <div class="fs-40 tongji-top">{{waitOrderCount}}</div>
                <div class="c-999">待接单</div>
            </div>
            <div class="fl-left tongji">
                <div class="fs-40 tongji-top">{{todaySignOrderCount}}</div>
                <div class="c-999">今日签收</div>
            </div>
        </div>
        <div class="logistics-con">
            <div class="con-item" v-for="(icon,index) in iconList" :key="index" @click="iconItem(icon.routerName)">
                <img :src="icon.icon">
                <div class="c-666">{{icon.name}}</div>
            </div>
        </div>
    
        <div class="saomiao-btn" @click="saomiaoBtn">
            <img src="@/assets/img/saomiao.svg">
            <span>扫描条码</span>
        </div>

        <zhezhao v-if="zhezhaoStatus" @cancalZhezhao="cancalZhezhao">
            <div class="smxz">
                <div class="tiaoshu" v-for="saomiaoItme in saomiaoList" :key="saomiaoItme.value" @click.stop="toSweepCode(saomiaoItme.value)">{{saomiaoItme.name}}</div>
            </div>
        </zhezhao>
    </div>
</template>

<script>
import tabbarHeader from '@/multiplexing/tabbarHeader.vue'
import peisong from '@/assets/img/peisong.png'
import cheliang from '@/assets/img/cheliang.png'
import shouhou from '@/assets/img/shouhou.png'
import yichangchuli from '@/assets/img/yichangchuli.png'
import wodezichan from '@/assets/img/wodezichan.png'
import zhezhao from '@/multiplexing/zhezhao.vue'
import {getlogisticscenterdataApi} from '@/api/logistics/index'
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
                // {
                //     icon:cheliang,
                //     name:'车辆',
                //     routerName:''
                // },
                {
                    icon:shouhou,
                    name:'售后',
                    routerName:'afterSalesList'
                },
                // {
                //     icon:yichangchuli,
                //     name:'异常处理',
                //     routerName:''
                // },
                // {
                //     icon:wodezichan,
                //     name:'我的资产',
                //     routerName:''
                // },
            ],
            saomiaoList:[
                {name:'扫描揽件',value:1},
                {name:'扫描签收',value:2},
                {name:'扫描取件',value:3}
            ],
            zhezhaoStatus:false,
            waitOrderCount:0,
            todaySignOrderCount:0,
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getlogisticscenterdata({})
    },
    watch: {

    },
    methods: {
        cancalZhezhao(flag){
            this.zhezhaoStatus = flag
        },
        //点击物流类型
        iconItem(routerName){
            if(routerName == '') return
            sessionStorage.setItem("activeIndex", 0);
            this.$router.push({name:routerName})
        },
        //扫码
        toSweepCode(value){
            this.$router.push({name:'sweepCode',query:{code:value}})
        },
        saomiaoBtn(){
            this.zhezhaoStatus = true;
        },
        //获取物流模块主页数据
        getlogisticscenterdata(data){
            getlogisticscenterdataApi(data).then(res => {
                if(res.code == 0){
                    this.todaySignOrderCount = res.Data.todaySignOrderCount
                    this.waitOrderCount = res.Data.waitOrderCount
                }
            })
        }
    },
    components: {
        tabbarHeader,
        zhezhao
    },
};
</script>

<style scoped lang="less">
.logistics{
    font-size: 24px;
    .logistics-top{
        // padding: 0 30px;
        height: 230px;
        background-color: #fff;
        box-shadow:0px 10px 10px 0px rgba(59,59,59,0.12);
        border-radius:20px;
        margin:50px 30px 60px;
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
        margin-bottom: 100px;
        .con-item{
            width: 230px;
            height: 158px;
            text-align: center;
            img{
                // transform: scale(0.5);
                height: 50px;
                margin-bottom: 15px;
            }
        }
    }
    .saomiao-btn{
        margin:0 30px;
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
    .smxz{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        .tiaoshu{
            padding-left:30px;
            width: 470px;
            height: 100px;
            background-color: #fff;
            line-height: 100px;
            font-size: 30px;
            border-bottom: 1px solid #999;
        }
    }
}
.fs-40{
    font-size: 40px;
}

</style>
