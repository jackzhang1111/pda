<template>
<!-- 入库 -->
    <div class="pick-up">
        <saomiao-header @search="search"></saomiao-header>
        <div class="pick-up-order">调拨入库单号：{{detailData.orderSn}}</div>
        <div class="order-detail">
            <div class="detail-header">
                <van-icon name="play" class="play-left" :color="playLeft ? '#DCDCDC':'#333'" @click="cliPlayLeft"/>
                <div class="num-input">
                    <input type="number" v-model="current" @change="changeInput">
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
                    <p class="c-666">FNSKU：{{currentProduct.fnskuCode}}</p>
                    <p class="c-666">卖家SKU：{{currentProduct.skuCode}}</p>
                </div>
            </div>
            <div class="detailed">
                <div class="detailed-item" v-for="(detailedGuige,index) in detailedGuigeList" :key="index">
                    <span class="c-999">{{detailedGuige.name}}</span>&nbsp;&nbsp;&nbsp;
                    <span class="c-666">{{detailedGuige.value}}</span>
                </div>
                <div class="tiji">
                    <div class="clearfix">
                        <span class="pl-30">单位体积 长×宽×高(cm)</span>
                        <div class="fl-right">
                            <span class="kuang">{{currentProduct.unitLength}}</span>
                            <span>X</span>
                            <span class="kuang">{{currentProduct.unitWidth}}</span>
                            <span>X</span>
                            <span class="kuang">{{currentProduct.unitHeight}}</span>
                        </div>
                    </div>
                    <div class="total">
                        <span>体积:</span>
                        <span class="tijitotal">{{currentProduct.unitSize}}</span>
                        <span>m³</span>
                    </div>
                </div>
                <div class="tiji">
                    <div class="clearfix">
                        <span class="pl-30">装箱体积 长×宽×高(cm)</span>
                        <div class="fl-right">
                            <span class="kuang">{{currentProduct.boxLength}}</span>
                            <span>X</span>
                            <span class="kuang">{{currentProduct.boxWidth}}</span>
                            <span>X</span>
                            <span class="kuang">{{currentProduct.boxHeight}}</span>
                        </div>
                    </div>
                    <div class="total">
                        <span>体积:</span>
                        <span class="tijitotal">{{currentProduct.boxSize}}</span>
                        <span>m³</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="btns">
            <div class="btn-qbrk" @click="allStock">确认全部入库</div>
        </div>
        <div class="shelves-place"></div>
    </div>
</template>

<script>
import saomiaoHeader from '@/multiplexing/saomiaoHeader.vue'
import { Dialog ,Toast } from 'vant';
import {transferinstockdowmprobtnApi,transferinstockdowmprobtnstockApi} from '@/api/warehousing/allocation/index.js'
export default {
    props: {

    },
    data() {
        return {
            listLength:0,
            current:1,
            detailData:{},
            currentProduct:{},
            detailedGuigeList:[
                {name:'规格属性',value:''},
                {name:'供应商',value:''},
                {name:'批次号',value:''},
                {name:'调拨入库数量',value:''},
                {name:'FNSKU',value:''},
                {name:'装箱数量',value:''},
                {name:'国际码',value:''},
                {name:'上架数量',value:''},
                {name:'入库类型',value:''},
                {name:'单位重量(kg)',value:''},
                {name:'入库仓库',value:''},
                {name:'装箱重量(kg)',value:''},
            ],
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
        this.transferinstockdowmprobtn(this.$route.query.orderid)
    },
    watch: {
        currentProduct:{
            handler:function(newVal){
                this.setCurrentProduct()
            }
        }
    },
    methods: {
        //搜索框 
        search(val){
            this.productArray.forEach((item,index) => {
                if(item.fnskuCode == val){
                    this.current = index+1
                    this.currentProduct = this.detailData.productList[index]
                }
            });
        },
        //上一个
        cliPlayLeft(){
            if(this.current <=1) return
            this.current--
            this.currentProduct = this.detailData.productlist[this.current-1]
        },
        //下一个
        cliPlayRight(){
            if(this.current >= this.listLength) return
            this.current++
            this.currentProduct = this.detailData.productlist[this.current-1]
        },
        //入库详情
        transferinstockdowmprobtn(orderId){
            transferinstockdowmprobtnApi({orderId}).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
                    this.productArray = res.Data.productlist
                    this.currentProduct = res.Data.productlist[this.current-1]
                    this.listLength = res.Data.productlist.length
                    this.setCurrentProduct()
                }
            })
        },
        transferinstockdowmprobtnstock(orderId){
            transferinstockdowmprobtnstockApi({orderId}).then(res => {
                if(res.code == 0){
                    Toast('入库成功')
                    if(this.$route.query.code == 'sweepCode'){
                        this.$router.replace({name:'allocationUppershelf',query:{orderid:this.$route.query.orderid}})
                    }else{
                        setTimeout(()=>{
                            this.$router.go(-1)
                        },1500)
                    }
                }else if(res.code == 1){
                    Toast('该入库单状态不是待入库，不能进行入库操作')
                }else if(res.code == 2){
                    Toast('该入库单已入库，无需重复操作')
                }
            })
        },
        //当前商品基本属性
        setCurrentProduct(){
            this.detailedGuigeList[0].value = this.currentProduct.skuValuesTitle
            this.detailedGuigeList[1].value = this.currentProduct.businessName
            this.detailedGuigeList[2].value = this.currentProduct.batchNo
            this.detailedGuigeList[3].value = this.currentProduct.inDetailNum
            this.detailedGuigeList[4].value = this.currentProduct.fnskuCode
            this.detailedGuigeList[5].value = this.currentProduct.goodnumPerBox
            this.detailedGuigeList[6].value = this.currentProduct.intCode
            this.detailedGuigeList[7].value = this.currentProduct.detailNum
            this.detailedGuigeList[8].value = this.currentProduct.stockIntype
            this.detailedGuigeList[9].value = this.currentProduct.unitWeight
            this.detailedGuigeList[10].value = this.currentProduct.stockInWarehouse
            this.detailedGuigeList[11].value = this.currentProduct.boxWeight
        },
        //全部出库
        allStock(){
            Dialog.confirm({
                title: '温馨提示',
                message: '您确定要“确认全部入库”操作吗?'
            }).then(() => {
                this.transferinstockdowmprobtnstock(this.detailData.stockInOrderId)
            }).catch(() => {});
        },
        //更改页数
        changeInput(){
            this.current = Math.ceil(this.current)
            if(this.current > this.listLength){
                this.current = this.listLength
            }else if(this.current < 1){
                this.current = 1
            }
            this.currentProduct = this.detailData.productList[this.current-1]
        }
    },
    components: {
        saomiaoHeader
    },
};
</script>

<style scoped lang="less">
.pick-up{
    .pick-up-order{
        line-height: 40px;
        padding: 20px 30px;
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
            display: flex;
            flex-wrap: wrap;
            .detailed-item{
                width: 46%;
                padding: 20px 0px 20px 30px;
                border-bottom: 1px solid #999;
            }
            .tiji{
                width: 100%;
                padding: 20px 30px 20px 0;
                overflow: hidden;
                color: #999;
                border-bottom: 1px solid #999;
                &:nth-last-child(1){
                    border: 0;
                }
                .kuang{
                    display: inline-block;
                    width: 80px;
                    height: 40px;
                    line-height: 40px;
                    // border: 2px solid #dcdcdc;
                    border-radius:6px;
                    vertical-align: middle;
                    text-align: center;
                }
                .total{
                    width: 100%;
                    text-align: right;
                    margin-top: 25px;
                    .tijitotal{
                        font-size: 22px;
                        color: #333;
                    }
                }
            }
        }
        
    }
    .btns{
        width: 100vw;
        height:110px;
        line-height: 110px;
        text-align: center;
        font-size: 40px;
        position: absolute;
        bottom: 0;
        color: #fff;
        display: flex;
    }
    .shelves-place{
        height: 110px;
    }
    .btn-qbrk{
        width: 100vw;
        background-color: #333;
    }
}
.fs-18{
    font-size: 18px
}
.pl-30{
    padding-left:30px;
}
</style>
