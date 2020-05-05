<template>
    <div class="warehousing">
        <tabbar-header></tabbar-header>
        <div class="warehousing-top">
            <div class="fl-left tongji">
                <div class="fs-40 tongji-top">{{waitOrderCount}}</div>
                <div class="c-999">今日入库</div>
            </div>
            <div class="fl-left tongji">
                <div class="fs-40 tongji-top">{{todaySignOrderCount}}</div>
                <div class="c-999">调拨</div>
            </div>
            <div class="fl-left tongji">
                <div class="fs-40 tongji-top">{{todaySignOrderCount}}</div>
                <div class="c-999">今日出库</div>
            </div>
        </div>
        <div class="warehousing-con">
            <div class="con-item" v-for="(icon,index) in iconList" :key="index" @click="iconItem(icon.routerName)">
                <img :src="icon.icon">
                <div class="c-666">{{icon.name}}</div>
            </div>
        </div>
    
        <div class="saomiao-btn" @click="saomiaoBtn">
            <img src="@/assets/img/saomiao.svg">
            <span>扫描条码</span>
        </div>
    </div>
</template>

<script>
import tabbarHeader from '@/multiplexing/tabbarHeader.vue'
import ghrk from '@/assets/img/ghrk.png'
import cgthck from '@/assets/img/cgthck.png'
import shouhou from '@/assets/img/shouhou.png'
import xsck from '@/assets/img/xsck.png'
import diaobo from '@/assets/img/diaobo.png'
import shangjia from '@/assets/img/shangjia.png'
import xiajia from '@/assets/img/xiajia.png'
export default {
    props: {

    },
    data() {
        return {
            iconList:[
                {
                    icon:ghrk,
                    name:'供货入库',
                    routerName:'suppliedList'
                },
                {
                    icon:cgthck,
                    name:'采购退货出库',
                    routerName:'cancellationList'
                },
                {
                    icon:xsck,
                    name:'销售出库',
                    routerName:'soldList'
                },
                {
                    icon:diaobo,
                    name:'调拨',
                    routerName:'allocationList'
                },
                {
                    icon:shouhou,
                    name:'售后',
                    routerName:'warehouSalesList'
                },
                {
                    icon:shangjia,
                    name:'上架',
                    routerName:'shelveList'
                },
                {
                    icon:xiajia,
                    name:'下架',
                    routerName:'removeList'
                },
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
            this.$router.push({name:routerName})
            try{
                sessionStorage.removeItem('activeIndex')
                sessionStorage.removeItem('activeOne')
            }
            catch(error){
                console.log(err.message);
            }
        },
        //扫码
        toSweepCode(value){
            this.$router.push({name:'sweepCode',query:{code:value}})
        },
        saomiaoBtn(){
            this.zhezhaoStatus = true;
        },
    },
    components: {
        tabbarHeader,
    },
};
</script>

<style scoped lang="less">
.warehousing{
    font-size: 24px;
    .warehousing-top{
        // padding: 0 30px;
        height: 230px;
        background-color: #fff;
        box-shadow:0px 10px 10px 0px rgba(59,59,59,0.12);
        border-radius:20px;
        margin:50px 30px 60px;
        .tongji{
            width: 33%;
            height: 100%;
            text-align: center;
            .tongji-top{
                padding: 74px 0 50px;
            }
        }
    }
    .warehousing-con{
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
