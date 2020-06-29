<template>
<!-- 售后列表 -->
    <div class="distribution-list">
        <saomiao-header @search="search" :value="$route.query.expressNo"></saomiao-header>
        <div class="commodity-tab">
            <scroll class="bscroll-wrapper" ref="wrapper" :data="recordGroup" :pulldown="pulldown" :pullup="pullup" @pulldown="_pulldown" @pullup="_pullup">
                <div class="bscroll-con">
                    <div class="order" v-for="(data,index) in dataList" :key="index" >
                        <div class="order-header">
                            <span class="fl-left">退货单号:{{data.orderSn}}</span>
                            <div class="fl-right">
                                <span>{{orderStatus(data.orderState,'statusList')}}</span>
                            </div>
                            <div class="fl-left" v-if="data.logisticsOrderSn">物流单号:{{data.logisticsOrderSn}}</div>
                        </div>
                        <div class="order-con" @click="toDetail(data.backOrderId,data.orderState)">
                            <img :src="$webUrl+data.headImg" class="touxiang fl-left">
                            <div class="fl-left xinxi">
                                <div class="p1">
                                    <span>{{data.userName}}</span>
                                    <span>{{data.phoneNum}}</span>
                                </div>
                                <div class="p2">
                                    <span>{{data.userAddress}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="order-footer" v-show="data.orderState == 2 || data.orderState == 3">
                            <div class="btn fl-right"  v-if="data.orderState == 2" @click="toPickUp(data.backOrderId)">入库</div>
                            <!-- <div class="btn fl-right"  v-if="data.orderState == 2">打印退货单</div>
                            <div class="btn fl-right"  v-if="data.orderState == 3">打印上架单</div> -->
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
import {customerservicebackorderlistApi} from '@/api/warehousing/warehouAfterSales/index.js'
export default {
    props: {

    },
    data() {
        return {
            dataList:[],
            recordGroup:[],
            pulldown:true,
            pullup:true,
            guanmengou:true,
            totalCount:0,
            formData:{
                orderSn:'',
                pdaorderStatus:-1,
                page:1,
                limit:10
            },
            statusList:[
                {name:'待取件',type:1},
                {name:'待入库',type:2},
                {name:'待入库',type:3},
                {name:'已完成',type:4},
            ],
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
        search(value){
            this.formData.orderSn = value
            this.refreshOrder()
        },
        //售后列表
        customerservicebackorderlist(data,flag){
            customerservicebackorderlistApi(data).then(res => {
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
                this.customerservicebackorderlist(this.formData,false)
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
            this.customerservicebackorderlist(this.formData,true)
            this.pullup = true
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
        //去入库页面
        toPickUp(backOrderId){
            this.$router.push({name:'warehouSalesPickUp',query:{backOrderId}})
        },
        //去详情页面
        toDetail(orderid,type){
            this.$router.push({name:'warehouSalesDetail',query:{orderid,type}})
        },
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
.distribution-list{
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
        margin-bottom: 20px;
        .order-header{
            line-height: 40px;
            border-bottom: 1px solid #F2F3F5;
            padding: 20px 30px;
            overflow: hidden;
        }
        .order-con{
            padding: 30px 30px 19px;
            border-bottom: 1px solid #F2F3F5;
            overflow: hidden;
            .touxiang{
                width: 100px;
                height: 97px;
                margin-right:30px;
            }
            .xinxi{
                width: 487px;
                .p1{
                    font-size: 26px;
                    color: #666;
                }
                .p2{
                    color: #999;
                    margin:30px 0 60px;
                }
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
                padding: 0 30px;
                margin-left:20px;
            }
        }
    }
    .commodity-tab{
        /deep/ .van-tabs__content{
            position: relative;
            overflow: hidden;
        }
    }
}

</style>
