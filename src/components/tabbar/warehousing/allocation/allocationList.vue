<template>
<!-- 调拨列表 -->
    <div class="supplied-list">
        <saomiao-header @search="search"></saomiao-header>
        <div class="commodity-tab">
            <van-tabs type="card" color="#666666" title-active-color="#333333" v-model="activeOne" @change="changeOneTab">
                <van-tab :title="tab.name" v-for='(tab,index) in oneList' :key="index">
                    <van-tabs type="card" color="#666666" title-active-color="#333333" @click="onClick" v-model="active" class="padding0">
                        <van-tab :title="tab.name" v-for='(tab,index) in tabList' :key="index">
                            <scroll class="bscroll-wrapper" ref="wrapper" :data="recordGroup" :pulldown="pulldown" :pullup="pullup" @pulldown="_pulldown" @pullup="_pullup">
                                <div class="bscroll-con">
                                    <div class="order" v-for="(data,index) in dataList" :key="index" >
                                        <div class="order-header">
                                            <span>{{data.orderSn}}</span>
                                            <div class="fl-right">
                                                <span>{{orderStatus(data.orderStatus,'statusList')}}</span>
                                            </div>
                                        </div>
                                        <div class="order-con" @click="toDetail(data.orderId,data.orderStatus,0)" v-if="activeOne == 0">
                                            <p>类型:&nbsp;&nbsp;{{data.orderType}}</p>
                                            <p>调出仓库:&nbsp;&nbsp;{{data.outWarehouseName}}</p>
                                            <p>调入仓库:&nbsp;&nbsp;{{data.inWarehouseName}}</p>
                                            <p>调拨出库数量:&nbsp;&nbsp;{{data.totalNum}}</p>
                                        </div>
                                        <div class="order-con" @click="toDetail(data.orderId,data.orderStatus,1)" v-else>
                                            <p>类型:&nbsp;&nbsp;{{data.orderType}}</p>
                                            <p>调入仓库:&nbsp;&nbsp;{{data.inWarehouseName}}</p>
                                            <p>关联调拨出库单:&nbsp;&nbsp;{{data.outorderSn}}</p>
                                            <p>调拨入库数量:&nbsp;&nbsp;{{data.totalNum}}</p>
                                        </div>
                                        <div class="order-footer" v-if="data.orderStatus != 2">
                                            <div v-if="activeOne == 0">
                                                <div class="btn fl-right" v-if="data.orderStatus == 0 || data.orderStatus == 1">打印出库单</div>
                                                <div class="btn fl-right" v-if="data.orderStatus == 0" @click="toRemove(data.orderId)">下架</div>
                                                <div class="btn fl-right" v-if="data.orderStatus == 1" @click="toOutstock(data.orderId)">出库</div>
                                            </div>
                                            <div v-else>
                                                <div class="btn fl-right" v-if="data.orderStatus == 0 || data.orderStatus == 1">打印出库单</div>
                                                <div class="btn fl-right" v-if="data.orderStatus == 0" @click="toInstorage(data.orderId)">入库</div>
                                                <div class="btn fl-right" v-if="data.orderStatus == 1" @click="toUppershelf(data.orderId)">上架</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </scroll>
                        </van-tab>
                    </van-tabs>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import saomiaoHeader from '@/multiplexing/saomiaoHeader.vue'
import { Dialog ,Toast} from 'vant';
import {transferinstockorderlistApi,transferoutstockorderlistApi} from '@/api/warehousing/allocation/index.js'
export default {
    props: {

    },
    data() {
        return {
            oneList:[
                {name:'调拨出库',value:-1},
                {name:'调拨入库',value:0},
            ],
            tabList:[
                {name:'全部',value:-1},
                {name:'待下架',value:0},
                {name:'待出库',value:1},
                {name:'出库完成',value:2},
            ],
            statusList:[
                {name:'待下架',type:0},
                {name:'待出库',type:1},
                {name:'出库完成',type:2},
            ],
            activeOne:0,
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
        if(sessionStorage.getItem("activeIndex")){
            this.active = Number(sessionStorage.getItem("activeIndex"))+1
            this.activeOne = Number(sessionStorage.getItem("activeOne"))
            this.formData.pdaorderStatus = Number(sessionStorage.getItem("activeIndex"))
        }
        this.refreshOrder()
    },
    watch: {
        activeOne:{
            handler:function(newVal){
                if(newVal == 0){
                    this.tabList[1].name = '待下架'
                    this.tabList[2].name = '待出库'
                    this.tabList[3].name = '出库完成'

                    this.statusList[0].name = "待下架"
                    this.statusList[1].name = "待出库"
                    this.statusList[2].name = "出库完成"
                }else{
                    this.tabList[1].name = '待入库'
                    this.tabList[2].name = '待上架'
                    this.tabList[3].name = '入库完成'

                    this.statusList[0].name = "待入库"
                    this.statusList[1].name = "待上架"
                    this.statusList[2].name = "入库完成"
                }
            }
        }
    },
    methods: { 
        //搜索框 
        search(){

        },
        //切换第一层tab
        changeOneTab(index){
            this.active = 0
            this.formData.pdaorderStatus = -1
            sessionStorage.setItem("activeOne", index);
            this.pulldown = true
            this.refreshOrder()
        },
        //切换tab
        onClick(index) {
            this.formData.pdaorderStatus = index-1
            sessionStorage.setItem("activeIndex", index-1);
            this.pulldown = true
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
                if(this.activeOne == 0){
                    this.transferoutstockorderlist(this.formData,false)
                }else{
                    this.transferinstockorderlist(this.formData,false)
                }
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
            this.pullup = true
            if(this.activeOne == 0){
                this.transferoutstockorderlist(this.formData,true)
            }else{
                this.transferinstockorderlist(this.formData,true)
            }
        },
        //调拨入库列表信息接口
        transferinstockorderlist(data,flag){
            transferinstockorderlistApi(data).then(res => {
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
        //调拨出库列表信息接口
        transferoutstockorderlist(data,flag){
            transferoutstockorderlistApi(data).then(res => {
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
        toDetail(orderid,orderStatus,status){
            this.$router.push({name:'allocationDetail',query:{orderid,type:orderStatus,status}})
        },
        //去到下架
        toRemove(orderid){
            this.$router.push({name:'allocationRemove',query:{orderid}})
        },
        //去出库
        toOutstock(orderid){
            this.$router.push({name:'allocationOutstock',query:{orderid}})
        },
        //去入库
        toInstorage(orderid){
            this.$router.push({name:'allocationInstorage',query:{orderid}})
        },
        //去上架
        toUppershelf(orderid){
            this.$router.push({name:'allocationUppershelf',query:{orderid}})
        }
    },
    components: {
        saomiaoHeader
    },
};
</script>

<style scoped lang="less">
.bscroll-wrapper{
    height: calc(100vh - 300px);
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
            margin:17px 0 20px;
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
    .padding0{
        padding: 0;
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
