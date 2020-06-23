<template>
<!-- 供货入库列表 -->
    <div class="supplied-list">
        <saomiao-header @search="search" :value="$route.query.expressNo"></saomiao-header>
        <div class="commodity-tab">
            <scroll class="bscroll-wrapper" ref="wrapper" :data="recordGroup" :pulldown="pulldown" :pullup="pullup" @pulldown="_pulldown" @pullup="_pullup">
                    <div class="bscroll-con">
                        <div class="order" v-for="(data,index) in dataList" :key="index" >
                            <div class="order-header">
                                <span>单号:{{data.orderSn}}</span>
                                <div class="fl-right">
                                    <span>{{orderStatus(data.wmsOrderStatus,'statusList')}}</span>
                                </div>
                            </div>
                            <div class="order-con" @click="toDetail(data.orderId,data.wmsOrderStatus)">
                                <p>供应商：{{data.businessName}}</p>
                                <p>入库仓库：{{data.warehouseName}}</p>
                                <p>供货数量：{{data.totalNum}}</p>
                            </div>
                            <div class="order-footer" v-show="data.wmsOrderStatus != 1">
                                <!-- <div class="btn fl-right" v-if="data.wmsOrderStatus == 2">打印供货单</div> -->
                                <div class="btn fl-right" v-if="data.wmsOrderStatus == 2" @click="toPickUp(data.orderId,data.wmsOrderStatus)">入库</div>
                                <!-- <div class="btn fl-right" v-if="data.wmsOrderStatus == 3">打印入库单</div> -->
                                <div class="btn fl-right" v-if="data.wmsOrderStatus == 3" @click="toshelves(data.orderId)">上架</div>
                                <!-- <div class="btn fl-right" v-if="data.wmsOrderStatus == 4">打印上架单</div> -->
                            </div>
                        </div>
                    </div>
            </scroll>
        </div>
    </div>
</template>

<script>
import saomiaoHeader from '@/multiplexing/saomiaoHeader.vue'
import { Dialog ,Toast} from 'vant';
import {supplyorderlistApi} from '@/api/warehousing/warehousSupplied/index.js'
export default {
    props: {

    },
    data() {
        return {
            statusList:[
                {name:'待审核',type:0},
                {name:'待发货',type:1},
                {name:'待入库',type:2},
                {name:'待上架',type:3},
                {name:'已上架',type:4},
            ],
            recordGroup:[],
            pulldown:true,
            pullup:true,
            guanmengou:true,
            totalCount:0,
            dataList:[],
            formData:{
                orderSn:'',
                wmsOrderStatus:0,
                page:1,
                limit:10
            },
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.formData.orderSn = this.$route.query.expressNo
        this.refreshOrder()
    },
    watch: {

    },
    methods: { 
        //搜索框 
        search(value){
            this.formData.orderSn = value
            this.refreshOrder()
        },
        //下拉刷新
        _pulldown(){
            setTimeout(()=>{
                this.refreshOrder()
            },500)
        },
        //上拉加载
        _pullup() {
            if(!this.pullup) return
            //不知道为什么触发两次,使用关门狗拦截
            if(this.guanmengou){
                this.formData.page++
                this.supplyorderlist(this.formData,false)
                this.guanmengou = false
            }
            setTimeout(()=>{
                this.guanmengou = true
            },500)
        },
        //刷新页面
        refreshOrder(){
            this.formData.page = 1
            this.formData.limit = 10
            this.supplyorderlist(this.formData,true)
            this.pullup = true
        },
        //供货入库列表
        supplyorderlist(data,flag){
            supplyorderlistApi(data).then(res => {
                if(res.code == 0){
                    if(flag){
                        this.dataList = res.Data.list
                    }else{
                        this.dataList = this.dataList.concat(res.Data.list);
                    }
                    this.totalCount = res.Data.totalCount
                    if(this.dataList.length > 0){
                        if(this.dataList.length >= this.totalCount){
                            this.pullup = false
                        }
                    }else{
                        this.pulldown = false
                        this.pullup = false
                    }
                }
            })
        },
        //编译状态
        orderStatus(type,list){
            let name = ''
            this[list].forEach(statu => {
                if(statu.type == type){
                    name = statu.name
                }
            })
            return name
        },
        //去到详情
        toDetail(orderid,wmsOrderStatus){
            this.$router.push({name:'suppliedDetail',query:{orderid,type:wmsOrderStatus}})
        },
        //去入库页面
        toPickUp(orderid){
            this.$router.push({name:'suppliedPickUp',query:{orderid}})
        },
        //去上架页面
        toshelves(paramId){
            this.$router.push({name:'suppliedShelves',query:{paramId,typeId:1}})
        }
    },
    components: {
        saomiaoHeader
    },
};
</script>

<style scoped lang="less">
.bscroll-wrapper{
    height: calc(100vh - 230px);
}
.supplied-list{
    .commodity-tab{
        /deep/ .van-tabs__content{
            position: relative;
            overflow: hidden;
        }
    }
    /deep/ .van-tabs--card{
        padding: 0 30px;

        .van-tabs__wrap{
            margin:35px 0 20px;
        }
        .van-tabs__nav--card{
            margin:0;
        }
        .van-tabs__nav{
            .van-tab {
                flex-basis:20% !important; 
            }
        }
    }
    .order{
        background-color: #fff;
        font-size: 24px;
        overflow: hidden;
        border-bottom: 1px solid #F2F3F5;
        margin:0 30px 20px;

        .order-header{
            line-height: 40px;
            border-bottom: 1px solid #F2F3F5;
            padding:20px 30px;
            overflow: hidden;
        }
        .order-con{
            padding: 30px 30px 19px;
            border-bottom: 1px solid #F2F3F5;
            overflow: hidden;
            p{
                font-size: 22px;
                color: #333;
                height: 40px;
                line-height: 40px;
            }
        }
        .order-footer{
            overflow: hidden;
            padding: 30px 30px 19px;
            .btn{
                height:48px;
                border:2px solid #666666;
                border-radius:6px;
                line-height: 48px;
                text-align: center;
                margin-left:20px;
                padding: 0 20px;
            }
        }
    }
}
</style>
