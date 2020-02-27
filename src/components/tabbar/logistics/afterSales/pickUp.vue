<template>
<!-- 取件 -->
    <div class="pick-up">
        <nosaomiao-header title="取件"></nosaomiao-header>
        <div class="pick-up-order">物流单号：{{detailData.expressNo}}</div>
        <div class="order-detail">
            <div class="detail-header">
                <van-icon name="play" class="play-left" :color="playLeft ? '#DCDCDC':'#333'" @click="cliPlayLeft"/>
                <div class="num-input">
                    <input type="number" v-model="current">
                </div>
                <span class="ma-35 header-font">/</span>
                <span class="header-font">{{listLength}}</span>
                <van-icon name="play" class="play-right" :color="playRight ? '#DCDCDC':'#333'" @click="cliPlayRight"/>
            </div>
            <div class="order-product">
                <img :src="$webUrl+currentProduct.skuImg">
                <div class="product">
                    <p>{{currentProduct.skuName}}</p>
                    <p class="guige">TSIN：{{currentProduct.tsinCode}}</p>
                </div>
            </div>
            <div class="detailed">
                <div class="detailed-item" v-for="(detailedGuige,index) in detailedGuigeList" :key="index">
                    <span class="guige-name">{{detailedGuige.name}}</span>
                    <span class="guige-value">{{detailedGuige.value}}</span>
                </div>
            </div>
        </div>
        <div class="btn-wcqj" @click="finishPicking" v-if="detailData.orderCourierStatusBack == 1">完成取件</div>
    </div>
</template>

<script>
import nosaomiaoHeader from '@/multiplexing/nosaomiaoHeader.vue'
import { Dialog ,Toast } from 'vant';
import {backlogisticsorderinfoApi,pickupbacklogisticsorderApi} from '@/api/logistics/afterSales/index.js'
export default {
    props: {

    },
    data() {
        return {
            listLength:0,
            current:1,
            detailedGuigeList:[
                {name:'规格属性',value:this.aaa},
                {name:'销售退货数量',value:'100'},
                {name:'FNSKU',value:'6461654'},
                {name:'本次取件数量',value:'100'},
                {name:'国际码',value:'FSN46166'},
            ],
            detailData:{},
            currentProduct:{},
        };
    },
    computed: {
        playLeft() {
            return  this.current == 1
        },
        playRight() {
            
            return  this.current == this.listLength
        }
    },
    created() {

    },
    mounted() {
        this.backlogisticsorderinfo(this.$route.query.orderid)
    },
    watch: {
        currentProduct:{
            handler:function(newVal){
                this.setCurrentProduct()
            }
        }
    },
    methods: {
        //完成取件
        finishPicking(){
            Dialog.confirm({
                title: '温馨提示',
                message: '您确认商品完成取件了吗？'
            }).then(() => {
               this.pickupbacklogisticsorder(this.$route.query.orderid)
            }).catch(() => {});
        },
        //售后详情
        backlogisticsorderinfo(id){
            backlogisticsorderinfoApi({order_id:id}).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
                    this.currentProduct = res.Data.detailList[this.current-1]
                    this.listLength = res.Data.detailList.length
                    this.setCurrentProduct()
                }else if(res.code == 1){
                    Toast(res.orderSn+'不属于您的配送单，请联系客服')
                    setTimeout(()=>{this.$router.go(-1)},1000)
                }else if(res.code == 2){
                    Toast('不存在此单号，请重新扫描')
                    setTimeout(()=>{this.$router.go(-1)},1000)
                }else if(res.code == 3){
                    Toast(res.orderSn+'未接单，请先接单')
                    setTimeout(()=>{this.$router.go(-1)},1000)
                }
            })
        },
        //当前商品基本属性
        setCurrentProduct(){
            this.detailedGuigeList[0].value = this.currentProduct.skuValuesTitle
            this.detailedGuigeList[1].value = this.currentProduct.detailNum
            this.detailedGuigeList[2].value = this.currentProduct.fnskuCode
            this.detailedGuigeList[3].value = this.currentProduct.detailNum
            this.detailedGuigeList[4].value = this.currentProduct.intCode
        },
        //上一个
        cliPlayLeft(){
            if(this.current <=1) return
            this.current--
            this.currentProduct = this.detailData.detailList[this.current-1]
        },
        //下一个
        cliPlayRight(){
            if(this.current >= this.listLength) return
            this.current++
            this.currentProduct = this.detailData.detailList[this.current-1]
        },
        //取件
        pickupbacklogisticsorder(id){
            pickupbacklogisticsorderApi({orderId:id}).then(res => {
                if(res.code == 0){
                    Toast('成功取件')
                    setTimeout(()=>{this.backlogisticsorderinfo(this.$route.query.orderid)},1000)
                }else if(res.code == 1){
                    Toast('参数requestModel不能为空')
                }else if(res.code == 2){
                    Toast('物流单Id必须大于0')
                }else if(res.code == 21){
                    Toast('该物流单不存在')
                }else if(res.code == 22){
                    Toast('该物流单不是待取件状态，不能取件')
                }else if(res.code == 31){
                    Toast('该物流单不属于当前配送人员，不能进行此操作')
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
.pick-up{
    .pick-up-order{
        height: 68px;
        line-height: 68px;
        padding: 0 30px;
        font-size: 26px;
        color: #333;
        background-color: #fff;
        margin-bottom: 20px;
    }
    .order-detail{
        background-color: #fff;
        .detail-header{
            height: 88px;
            line-height: 88px;
            text-align: center;
            border-bottom: 1px solid #F2F3F5;
            .play-left{
                transform:rotate(180deg);
                margin-right:30px;
            }
            .play-right{
                margin-left:30px;
            }
            .num-input{
                width: 120px;
                height: 60px;
                display: inline-block;
                border: 1px solid #DCDCDC;
                text-align: center;
                line-height: 60px;
                input{
                    width: 85%;
                    height: 70%;
                    border:0;
                    text-align: center;
                    font-size: 34px;
                }
            }
            .ma-35{
                margin: 0 35px;
            }
            .header-font{
                font-size: 34px;
                color: #999;
            }
        }
        .order-product{
            padding: 30px 40px 50px 30px;
            img{
                width: 140px;
                height: 140px;
                vertical-align: top;
                margin-right:21px;
            }
            .product{
                display: inline-block;
                width: 500px;
                font-size:26px;
                line-height:39px;
                color: #333333;
                .guige{
                    margin-top:29px;
                    font-size: 22px;
                    color: #666;
                }
            }
        }
        .detailed{
            font-size: 18px;
            .detailed-item{
                height: 60px;
                line-height: 60px;
                display: flex;
                padding-left: 30px;
                border-bottom: 1px solid #F2F3F5;
                .guige-name{
                    display: inline-block;
                    width: 200px;
                    color: #999;
                }
            }
        }
    }
    .btn-wcqj{
        width: 100vw;
        height:110px;
        line-height: 110px;
        background-color: #333;
        text-align: center;
        color: #fff;
        font-size: 40px;
        position: absolute;
        bottom: 0;
    }
}
.fs-22{
    font-size: 22px
}
</style>
