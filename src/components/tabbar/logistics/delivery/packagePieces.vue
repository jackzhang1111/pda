<template>
<!-- 揽件详情 -->
    <div class="package-pieces">
        <nosaomiao-header title="揽件"></nosaomiao-header>
        <div class="order-con">
            <div class="order-no">
                <p>物流单号: &nbsp;{{detailData.expressNo}}</p>
            </div>
            <div class="spqd">
                <div class="spqd-header">商品清单</div>
                <div class="spqd-list" v-for="(detail,index) in detailData.detailList" :key="index">
                    <img :src="$webUrl+detail.skuImg" class="shangpin-img fl-left">
                    <div class="fl-left good-name">
                        <p class="p1 clamp-2 c-333">{{detail.supplyName}}</p>
                        <p class="p2 c-666">TSIN：{{detail.tsinCode}}</p>
                        <p class="p3 c-666">
                            <span>{{detail.skuValuesTitle}}</span>
                            <span class="fl-right">x{{detail.detailNum}}</span>
                        </p>
                    </div>
                </div>
                <div class="spqd-footer">
                    <span>总计:</span> 
                    <span>{{detailData.totalNum}}</span> 
                </div>
            </div>
        </div>
        
        <div class="qrlj-btn" @click="pieces" v-if="detailData.canPickup != 0">确认揽件</div>
        <div class="btn-place"></div>
    </div>
</template>

<script>
import nosaomiaoHeader from '@/multiplexing/nosaomiaoHeader.vue'
import { Dialog,Toast} from 'vant'
import {pickuplogisticsorderApi,logisticsorderinfoApi} from '@/api/logistics/delivery/index.js'
export default {
    props: {

    },
    data() {
        return {
            detailData:{}
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.logisticsorderinfo(this.$route.query.orderid)
    },
    watch: {

    },
    methods: {
        //揽件按钮
        pieces(){
            Dialog.confirm({
                title: '温馨提示',
                message: '您确认揽件并配送吗？'
                }).then(() => {
                    this.pickuplogisticsorder(this.$route.query.orderid)
                }).catch(() => {});
        },
        //配送单详情
        logisticsorderinfo(id){
            logisticsorderinfoApi({order_id:id}).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
                }
            })
        },
        //揽件接口
        pickuplogisticsorder(orderId){
            pickuplogisticsorderApi({orderId}).then(res => {
                if(res.code == 0){
                    Toast('成功揽件')
                    this.logisticsorderinfo(this.$route.query.orderid)
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
.package-pieces{
    position: relative;
    min-height: 100vh;
    .order-con{
        padding: 20px 30px 0;
        .order-no{
            height: 88px;
            line-height: 88px;
            font-size: 30px;
            background-color: #fff;
            margin-bottom: 20px;
            p{
                padding-left: 30px;
            }
        }
        .spqd{
            background-color: #fff;
            overflow: hidden;
            margin-bottom: 50px;
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
        
    }
    .qrlj-btn{
        position: absolute;
        width: 100%;
        height: 110px;
        background-color: #333;
        line-height: 110px;
        font-size:40px;
        text-align: center;
        color: #fff;
        bottom: 0;
    }
    .btn-place{
        height: 110px;;
    }
}
</style>
