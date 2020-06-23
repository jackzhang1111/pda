<template>
<!-- 采购出库列表 -->
    <div class="supplied-list">
        <saomiao-header @search="search" :value="$route.query.expressNo"></saomiao-header>
        <div class="commodity-tab">
            <scroll class="bscroll-wrapper" ref="wrapper" :data="recordGroup" :pulldown="pulldown" :pullup="pullup" @pulldown="_pulldown" @pullup="_pullup">
                    <div class="bscroll-con">
                        <div class="order" v-for="(data,index) in dataList" :key="index" >
                            <div class="order-header">
                                <span>{{data.orderSn}}</span>
                                <div class="fl-right">
                                    <span>{{orderStatus(data.orderStatus,'statusList')}}</span>
                                </div>
                            </div>
                            <div class="order-con" @click="toDetail(data.orderId,data.orderStatus)">
                                <p>关联供货单:{{data.supplyOrderSn}}</p>
                                <p>供应商：{{data.businessName}}</p>
                                <p>出库仓库：{{data.warehouseName}}</p>
                                <p>退货出库数量：{{data.totalNum}}</p>
                            </div>
                            <div class="order-footer">
                                <!-- <div class="btn fl-right" v-if="data.orderStatus == 0">打印出库单</div> -->
                                <div class="btn fl-right" v-if="data.orderStatus == 0" @click="toRemove(data.orderId)">下架</div>
                                <div class="btn fl-right" v-if="data.orderStatus == 1" @click="toOutstock(data.orderId)">出库</div>
                                <!-- <div class="btn fl-right" v-if="data.orderStatus == 2">打印下架单</div> -->
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
import {returngoodsstockorderlistApi} from '@/api/warehousing/cancellation/index.js'
export default {
    props: {

    },
    data() {
        return {
            statusList:[
                {name:'全部',type:-1},
                {name:'待下架',type:0},
                {name:'待出库',type:1},
                {name:'已出库',type:2},
            ],
            active:0,
            recordGroup:[],
            pulldown:true,
            pullup:true,
            guanmengou:true,
            totalCount:0,
            dataList:[],
            formData:{
                orderSn:'',
                pdaorderStatus:-1,
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
                this.returngoodsstockorderlist(this.formData,false)
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
            this.returngoodsstockorderlist(this.formData,true)
            this.pullup = true
        },
        //供货入库列表
        returngoodsstockorderlist(data,flag){
            returngoodsstockorderlistApi(data).then(res => {
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
        toDetail(orderid,orderStatus){
            this.$router.push({name:'cancellationDetail',query:{orderid,type:orderStatus}})
        },
        //去到下架
        toRemove(orderid){
            this.$router.push({name:'cancellationRemove',query:{orderid}})
        },
        //去出库
        toOutstock(orderid){
            this.$router.push({name:'cancellationOutstock',query:{orderid}})
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
