<template>
    <div class="supplied-detail">
        <nosaomiao-header :title="detailStatus"></nosaomiao-header>
        <div class="spqd">
            <div class="spqd-header">基础信息</div>
            <div class="order-time">
                <div class="time-item">
                    <span class="c-333">供货单号</span>
                    <div class="fl-right fs-22 c-666">{{detailData.orderSn}}</div>
                </div>

                <div class="time-item" v-if="typeSatus == 3 || typeSatus == 4">
                    <span class="c-333">入库单号</span>
                    <div class="fl-right fs-22 c-666">{{detailData.stockInOrderSn}}</div>
                </div>
                <div class="time-item" v-if="typeSatus == 4">
                    <span class="c-333">上架单号</span>
                    <div class="fl-right fs-22 c-666">{{detailData.shelveOrderSn}}</div>
                </div>


                <div class="time-item">
                    <span class="c-333">供应商</span>
                    <div class="fl-right fs-22 c-666">{{detailData.businessName}}</div>
                </div>
                <div class="time-item">
                    <span class="c-333">供货数量</span>
                    <div class="fl-right fs-22 c-666">{{detailData.totalNum}}</div>
                </div>
                <div class="time-item">
                    <span class="c-333">供货箱数</span>
                    <div class="fl-right fs-22 c-666">{{detailData.totalBoxNum}}</div>
                </div>
                <div class="time-item">
                    <span class="c-333">入库仓库</span>
                    <div class="fl-right fs-22 c-666">{{detailData.warehouseName}}</div>
                </div>


                <div class="time-item" v-if="typeSatus == 3 || typeSatus == 4">
                    <span class="c-333">入库数量</span>
                    <div class="fl-right fs-22 c-666">{{detailData.stockInNum}}</div>
                </div>
                <div class="time-item" v-if="typeSatus == 4">
                    <span class="c-333">上架货位</span>
                    <div class="fl-right fs-22 c-666">
                        <div v-for="(warehouse,index) in detailData.warehouseList" :key="index">
                            <span>{{warehouse.regionName}}</span>&nbsp;&nbsp;&nbsp;
                            <span>{{warehouse.upItemNum}}</span>
                        </div>
                    </div>
                    
                    
                </div>
            </div>

        </div>
        <div class="spqd">
            <div class="spqd-header">供货商品</div>
            <div class="spqd-list" v-for="(product,index) in detailData.productList" :key="index">
                <img :src="$webUrl+product.skuImg" class="shangpin-img fl-left">
                <div class="fl-left good-name">
                    <p class="p1 clamp-2 c-333">{{product.skuName}}</p>
                    <p class="p2 c-666">入库批次号：{{product.batchNo}}</p>
                    <p class="p2 c-666">TSIN：{{product.tsinCode}}</p>
                    <p class="p3 c-666">
                        <span>{{product.skuValuesTitle}}</span>
                        <span class="fl-right">x{{product.detailNum}}</span>
                    </p>
                </div>
            </div>
            <div class="spqd-footer">
                <span>总计:</span>
                <span>{{detailData.totalProNum?detailData.totalProNum:0}}</span>
            </div>
        </div>
        <div class="order-time" v-if="typeSatus != 1">
            <div class="time-item" >
                <span class="c-333">发货时间</span>
                <div class="fl-right fs-22 c-666">{{detailData.deliverTime}}</div>
            </div>
            <div class="time-item" v-if="typeSatus != 2">
                
                <span class="c-333">入库完成时间</span>
                <div class="fl-right fs-22 c-666">{{detailData.stockInTime}}</div>
            </div>
            <div class="time-item" v-if='typeSatus != 2 && typeSatus != 3'>
                <span class="c-333">上架完成时间</span>
                <div class="fl-right fs-22 c-666">{{detailData.shelveDate}}</div>
            </div>  
        </div>
        <div class="place"></div>
    </div>
</template>

<script>
import nosaomiaoHeader from '@/multiplexing/nosaomiaoHeader.vue'
import {orderinfoApi,watingtheShelvesApi} from '@/api/warehousing/warehousSupplied/index.js'
export default {
    props: {

    },
    data() {
        return {
            statusList:[
                {name:'全部',type:0},
                {name:'待发货',type:1},
                {name:'待入库',type:2},
                {name:'待上架',type:3},
                {name:'已入库',type:4},
            ],
            detailData:{},
            typeSatus:0
        };
    },
    computed: {
        detailStatus(){
            return this.orderStatus(this.$route.query.type,'statusList') + '详情'
        }
    },
    created() {

    },
    mounted() {
        this.typeSatus = this.$route.query.type

        if(this.typeSatus == 3 || this.typeSatus == 4){
            this.watingtheShelves(this.$route.query.orderid)
        }else{
            this.orderinfo(this.$route.query.orderid)
        }

        
    },
    watch: {

    },
    methods: {
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
        //供货详情接口
        orderinfo(orderId){
            orderinfoApi({orderId}).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
                }
            })
        },
        //待上架详情接口
        watingtheShelves(orderId){
            watingtheShelvesApi({orderId}).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
                }
            })
        }
    },
    components: {
        nosaomiaoHeader
    },
};
</script>

<style scoped lang="less">
.supplied-detail{
    .spqd{
        background-color: #fff;
        overflow: hidden;
        margin-bottom: 20px;
        .spqd-header{
            padding: 0 30px;
            height: 88px;
            line-height: 88px;
            font-size: 32px;
        }
        .spqd-list{
            overflow: hidden;
            padding: 0 30px 27px ;
            border-bottom: 1px solid #F2F3F5;
            margin-bottom: 30px;
            &:nth-last-child(2){
                margin:0;
            }
            .shangpin-img{
                width: 140px;
                height:140px;
                margin-right:20px;
            }
            .good-name{
                width: 464px;
                .p1{
                    font-size:24px;
                    line-height:36px;
                }
                .p2{
                    margin:18px 0 15px;
                    font-size:22px;
                }
                .p3{
                    margin:18px 0 15px;
                    font-size:24px;
                }
            }
        }
        .spqd-footer{
            padding: 0 30px;
            height: 88px;
            line-height: 88px;
            text-align: right;
            span:nth-child(2){
                font-size: 30px;
                margin-left:21px;
            }
        }
    }
    .order-time{
        background-color: #fff;
        .time-item{
            line-height: 88px;
            font-size: 26px;
            border-bottom: 1px solid #F2F3F5;
            padding: 0 30px;
            overflow: hidden;
            .aaa{
                display: inline-block;
                word-wrap:break-word;
                vertical-align: middle;
            }
        }
    }
}
</style>
