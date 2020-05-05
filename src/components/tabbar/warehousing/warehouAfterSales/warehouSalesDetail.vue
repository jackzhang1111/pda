<template>
    <div class="distribution-detail">
        <nosaomiao-header :title="orderStatus($route.query.type,'statusList')"></nosaomiao-header>
        <div class="detail-con">
            <div class="shxx" v-if="$route.query.type != 4">
                <div class="shxx-header">
                    <p class="p1">取件信息</p> 
                    <p>退货单号:{{detailData.backSn}}</p>
                </div>
                <div class="shxx-con">
                    <img :src="$webUrl+detailData.headImg" class="touxiang fl-left">
                    <div class="fl-left xinxi">
                        <div class="p1">
                            <span>{{detailData.userName}}</span>
                            <span>{{detailData.mobile}}</span>
                        </div>
                        <div class="p2">
                            <span>{{detailData.addressDetail}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="spqd" v-else>
                <div class="spqd-header">基础信息</div>
                <div class="order-time">
                    <div class="time-item">
                        <span class="c-333">入库单号</span>
                        <div class="fl-right fs-22 c-666">{{detailData.backInSn}}</div>
                    </div>
                    <div class="time-item">
                        <span class="c-333">上架单号</span>
                        <div class="fl-right fs-22 c-666">{{detailData.shelfSn}}</div>
                    </div>
                    <div class="time-item">
                        <span class="c-333">入库仓库</span>
                        <div class="fl-right fs-22 c-666">{{detailData.warehouseName}}</div>
                    </div>
                    <div class="time-item">
                        <span class="c-333">入库数量</span>
                        <div class="fl-right fs-22 c-666">{{detailData.intotalNum}}</div>
                    </div>
                    <div class="time-item">
                        <span class="c-333">上架货位</span>
                        <div class="fl-right fs-22 c-666">
                            <div v-for="(warehouse,index) in detailData.warehouseregionlist" :key="index">
                                <span>{{warehouse.regionName}}</span>&nbsp;&nbsp;&nbsp;
                                <span>{{warehouse.upItemNum}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="spqd">
                <div class="spqd-header">商品清单</div>
                <div class="spqd-list" v-for="(detail,index) in detailData.produclist" :key="index">
                    <img :src="$webUrl+detail.skuImg" class="shangpin-img fl-left">
                    <div class="fl-left good-name">
                        <p class="p1 clamp-2 c-333">{{detail.skuName}}</p>
                        <p class="p2 c-666">TSIN：{{detail.tisnCode}}</p>
                        <p class="p3 c-666">
                            <span>{{detail.titleValues}}</span>
                            <span class="fl-right">x{{detail.totalNum}}</span>
                        </p>
                    </div>
                </div>
                <div class="spqd-footer">
                    <span>总计:</span>
                    <span>{{detailData.proTotalNum}}</span>
                </div>
            </div>
            <div class="order-time">
                <div class="time-item">
                    <span class="c-333">接单时间</span>
                    <div class="fl-right fs-22 c-666">{{detailData.acceptTime}}</div>
                </div>
                <div class="time-item" v-if="$route.query.type != 1">
                    <span class="c-333">取件时间</span>
                    <div class="fl-right fs-22 c-666">{{detailData.pickupTime}}</div>
                </div>
                <div class="time-item" v-if="$route.query.type == 4">
                    <span class="c-333">上架时间</span>
                    <div class="fl-right fs-22 c-666">{{detailData.stockinTime}}</div>
                </div> 
                <div class="time-item" v-if="$route.query.type == 4">
                    <span class="c-333">入库完成时间</span>
                    <div class="fl-right fs-22 c-666">{{detailData.stockinTime}}</div>
                </div>  
            </div>
            <div class="place"></div>
        </div>
    </div>
</template>

<script>
import nosaomiaoHeader from '@/multiplexing/nosaomiaoHeader.vue'
import {customerservicebackorderdetailApi} from '@/api/warehousing/warehouAfterSales/index.js'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            statusList:[
                {name:'待取件',type:1},
                {name:'待入库',type:2},
                {name:'待入库',type:3},
                {name:'已完成',type:4},
            ],
            detailData:{}
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.customerservicebackorderdetail(this.$route.query.orderid)
    },
    watch: {

    },
    methods: {
        //售后详情
        customerservicebackorderdetail(backOrderId){
            customerservicebackorderdetailApi({backOrderId}).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
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
    },
    components: {
        nosaomiaoHeader,
    },
};
</script>

<style scoped lang="less">
.distribution-detail{
    .detail-con{
        padding: 0 30px;
    }
    .shxx{
        font-size: 24px;
        color: #333;
        background-color: #fff;
        margin:20px 0;
        .shxx-header{
            padding: 30px;
            border-bottom: 1px solid #F2F3F5;
            .p1{
                font-size: 32px;
                margin-bottom: 56px;
            }
        }
        .shxx-con{
            padding: 30px 30px 59px;
            overflow: hidden;
            .touxiang{
                width: 100px;
                height: 97px;
                margin-right:21px;
            }
            .xinxi{
                width: 464px;
            }
            .p1{
                font-size: 26px;
                margin-bottom: 27px;
                span{
                    &:nth-child(1){
                        margin-right:72px;
                    }
                }
            }
            .p2{
                line-height:36px;
                font-size: 24px;
                color: #999;
            }
            
        }
        .order-footer{
            display: flex;
            justify-content:space-between;
            height: 88px;
            line-height: 88px;
            .footer-item{
                width: 50%;
                text-align: center;
                img{
                    width: 32px;
                    height: 32px;
                    vertical-align: middle;
                    margin-right:22px;
                }
            }
        }
    }
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
        padding: 0 30px;
        .time-item{
            line-height: 88px;
            font-size: 26px;
            border-bottom: 1px solid #F2F3F5;
            overflow: hidden;
        }
    }
 
}

.fs-22{
    font-size: 22px;
}
</style>
