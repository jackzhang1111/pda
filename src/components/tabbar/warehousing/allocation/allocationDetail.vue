<template>
<!-- 调拨详情 -->
    <div class="supplied-detail">
        <nosaomiao-header :title="detailStatus"></nosaomiao-header>
        <div class="spqd">
            <div class="spqd-header">基础信息</div>
            <div class="order-time" v-if="$route.query.status == 0">
                <div class="time-item">
                    <span class="c-333">调拨类型</span>
                    <div class="fl-right fs-22 c-666">{{detailData.orderType}}</div>
                </div>
                <div class="time-item">
                    <span class="c-333">调出仓库</span>
                    <div class="fl-right fs-22 c-666">{{detailData.outWarehouseName}}</div>
                </div>
                <div class="time-item">
                    <span class="c-333">调入仓库</span>
                    <div class="fl-right fs-22 c-666">{{detailData.inWarehouseName}}</div>
                </div>
                <div class="time-item">
                    <span class="c-333">调拨来源</span>
                    <div class="fl-right fs-22 c-666">{{detailData.transferSourceTypeTxt}}</div>
                </div>
                <div class="time-item" v-if="detailData.transferSourceType != 5">
                    <span class="c-333">来源单号</span>
                    <div class="fl-right fs-22 c-666">{{detailData.rlaOrderSn}}</div>
                </div>
                <div class="time-item">
                    <span class="c-333">调拨出库总数量</span>
                    <div class="fl-right fs-22 c-666">{{detailData.totalNum}}</div>
                </div>
                <div class="time-item" v-if="typeSatus != 0">
                    <span class="c-333">下架货位</span>
                    <div class="fl-right fs-22 c-666">
                        <div v-for="(detail,index) in detailData.regionList" :key="index">{{detail.regionName}}&nbsp;&nbsp;&nbsp;{{detail.totalNum}}</div>
                    </div>
                    
                </div>
            </div>
            <div class="order-time" v-else>
                <div class="time-item">
                    <span class="c-333">调拨类型</span>
                    <div class="fl-right fs-22 c-666">{{detailData.orderType}}</div>
                </div>
                <div class="time-item">
                    <span class="c-333">调入仓库</span>
                    <div class="fl-right fs-22 c-666">{{detailData.inWarehouseName}}</div>
                </div>
                <div class="time-item">
                    <span class="c-333">关联调拨出库单</span>
                    <div class="fl-right fs-22 c-666">{{detailData.rlaOrderSn}}</div>
                </div>
                <div class="time-item">
                    <span class="c-333">调拨出库数量</span>
                    <div class="fl-right fs-22 c-666">{{detailData.outTotal}}</div>
                </div>
                <div class="time-item">
                    <span class="c-333">调拨入库数量</span>
                    <div class="fl-right fs-22 c-666">{{detailData.totalNum}}</div>
                </div>
            </div>
        </div>
        <div class="spqd">
            <div class="spqd-header">调拨商品</div>
            <div class="spqd-list" v-for="(product,index) in detailData.productList" :key="index">
                <img :src="$webUrl+product.skuImg" class="shangpin-img fl-left">
                <div class="fl-left good-name">
                    <p class="p1 clamp-2 c-333">{{product.skuName}}</p>
                    <p class="p2 c-666">TSIN:{{product.tsinCode}}</p>
                    <p class="p3 c-666">
                        <span>{{product.skuValuesTitle}}</span>
                        <span class="fl-right">x{{product.detailNum}}</span>
                    </p>
                   <p class="p2 c-666">入库批次号:{{product.batchNo}}</p>
                </div>
            </div>
            <div class="spqd-footer">
                <span>总计:</span>
                <span>{{detailData.totalProNum}}</span>
            </div>
        </div>
        <div class="order-time">
            <div class="time-item" >
                <span class="c-333">创建人</span>
                <div class="fl-right fs-22 c-666">{{detailData.addUserNo}}</div>
            </div>
            <div class="time-item">
                <span class="c-333">创建日期</span>
                <div class="fl-right fs-22 c-666">{{detailData.addTime}}</div>
            </div>
            <div v-if="$route.query.status == 0">
                <div class="time-item" v-if='typeSatus >= 1'>
                    <span class="c-333">下架时间</span>
                    <div class="fl-right fs-22 c-666">{{detailData.finishTime}}</div>
                </div>
                <div class="time-item" v-if='typeSatus == 2'>
                    <span class="c-333">出库完成时间</span>
                    <div class="fl-right fs-22 c-666">{{detailData.stockOutTime}}</div>
                </div>
            </div>
            <div v-else>
                <div class="time-item" v-if='typeSatus >= 1'>
                    <span class="c-333">入库时间</span>
                    <div class="fl-right fs-22 c-666">{{detailData.stockOutTime}}</div>
                </div>
                <div class="time-item" v-if='typeSatus == 2'>
                    <span class="c-333">上架完成时间</span>
                    <div class="fl-right fs-22 c-666">{{detailData.finishTime}}</div>
                </div>
            </div>
        </div>
        <div class="place"></div>
    </div>
</template>

<script>
import nosaomiaoHeader from '@/multiplexing/nosaomiaoHeader.vue'
import {transferouttockdowmprodetailApi,transferinstockdowmprodetailApi} from '@/api/warehousing/allocation/index.js'
export default {
    props: {

    },
    data() {
        return {
            statusList:[
                {name:'待下架',type:0},
                {name:'待出库',type:1},
                {name:'已出库',type:2},
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
        if(this.$route.query.status == 0){
            this.transferouttockdowmprodetail(this.$route.query.orderid)
            this.statusList = [{name:'待下架',type:0},{name:'待出库',type:1},{name:'已出库',type:2}]
        }else{
            this.transferinstockdowmprodetail(this.$route.query.orderid)
            this.statusList = [{name:'待入库',type:0},{name:'待上架',type:1},{name:'已入库',type:2}]
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
        //出库详情
        transferouttockdowmprodetail(orderId){
            transferouttockdowmprodetailApi({orderId}).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
                }
            })
        },
        //入库详情
        transferinstockdowmprodetail(orderId){
            transferinstockdowmprodetailApi({orderId}).then(res => {
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
        }
    }
}
</style>
