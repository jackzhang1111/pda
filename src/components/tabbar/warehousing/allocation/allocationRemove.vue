<template>
<!-- 下架 -->
    <div class="pick-up">
        <saomiao-header @search="search"></saomiao-header>
        <div class="pick-up-order" v-if="!$route.query.type">调拨出库单号：{{detailData.shelfDownorderSn}}</div>

        <van-collapse v-model="activeNames" class="collapse" v-if="$route.query.type == 'xiajia'">
            <van-collapse-item>
                <template #title>
                    <div>
                        <span>调拨出库单号：</span>
                        <span class="fl-right fs-20">{{detailData.shelfDownorderSn}}</span>
                    </div>
                </template>
                <div v-for="(data,index) in dataList" :key="index" class="order-list" @click="toPickUp(data)">
                    <span>{{data.orderSn}}</span> 
                    <div class="fl-right">
                        <van-checkbox v-model="data.checked"></van-checkbox>
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>

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
        <div class="goods-shelves">
            <div class="set-shelves">
                <span>下架货位</span>
            </div>
            <div class="shelves-item" v-for="(warehouse,index) in currentProduct.warehouselist" :key="index">
                <div class="item-title">
                    <span>{{warehouse.regionName}}</span>
                    <span class="fs-18">(库存:{{warehouse.canUseNum ? warehouse.canUseNum : 0}})</span>
                    
                </div>
                <div class="item-number">
                    <div>{{warehouse.volume}}m³</div>
                    <div>{{warehouse.takeVolume}}m³</div>
                    <div class="item-input">
                        <input type="number" v-model="warehouse.downItemNum" @change="changNum(warehouse)">
                    </div>
                </div>
            </div>
        </div>
        <div class="btns">
            <div class="btn-qbrk" @click="allShelves">确认全部下架</div>
        </div>
        <div class="shelves-place"></div>
    </div>
</template>

<script>
import saomiaoHeader from '@/multiplexing/saomiaoHeader.vue'
import { Dialog ,Toast } from 'vant';
import {returngoodsstockdowmAllApi} from '@/api/warehousing/cancellation/index.js'
import {transferouttockdowmprolistApi} from '@/api/warehousing/allocation/index.js'
import {waitingfordismountingorderlistApi} from '@/api/warehousing/shelve/index.js'
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
                {name:'调拨出库数量',value:''},
                {name:'FNSKU',value:''},
                {name:'装箱数量',value:''},
                {name:'国际码',value:''},
                {name:'下架数量',value:''},
                {name:'出库类型',value:''},
                {name:'单位重量(kg)',value:''},
                {name:'出库仓库',value:''},
                {name:'装箱重量(kg)',value:''},
            ],
            removeData:{
                productlist:[],
                shelfDownOrderId:'',
                sourceType:2
            },
            productArray:[],

            activeNames:[],
            dataList:[]
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
        this.transferouttockdowmprolist(this.$route.query.orderid)
        if(this.$route.query.type == 'xiajia'){
            this.waitingfordismountingorderlist()
        }
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
            this.currentProduct = this.detailData.productList[this.current-1]
        },
        //下一个
        cliPlayRight(){
            if(this.current >= this.listLength) return
            this.current++
            this.currentProduct = this.detailData.productList[this.current-1]
        },
        //下架详情
        transferouttockdowmprolist(orderId){
            transferouttockdowmprolistApi({orderId}).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
                    this.currentProduct = res.Data.productList[this.current-1]
                    this.listLength = res.Data.productList.length
                    this.productArray = res.Data.productList
                    
                    this.removeData.shelfDownOrderId = this.detailData.shelfDownOrderId
                    this.setCurrentProduct()
                }
            })
        },
        //当前商品基本属性
        setCurrentProduct(){
            this.detailedGuigeList[0].value = this.currentProduct.skuValuesTitle
            this.detailedGuigeList[1].value = this.currentProduct.businessName
            this.detailedGuigeList[2].value = this.currentProduct.batchNo
            this.detailedGuigeList[3].value = this.currentProduct.downDetailNum
            this.detailedGuigeList[4].value = this.currentProduct.fnskuCode
            this.detailedGuigeList[5].value = this.currentProduct.goodnumPerBox
            this.detailedGuigeList[6].value = this.currentProduct.intCode
            this.detailedGuigeList[7].value = this.currentProduct.detailNum
            this.detailedGuigeList[8].value = this.currentProduct.stockOuttype
            this.detailedGuigeList[9].value = this.currentProduct.unitWeight
            this.detailedGuigeList[10].value = this.currentProduct.warehouseName
            this.detailedGuigeList[11].value = this.currentProduct.boxWeight
        },
        //全部下架
        allShelves(){
            let arr = []
            this.productArray.forEach(ele => {
                let obj = {
                    batchNo:ele.batchNo,
                    skuId:ele.skuId,
                    stockOutOrderDetailId:ele.orderDetailId,
                    stockOutOrderType:2,
                    proRegion:[]
                }
                ele.warehouselist.forEach(item => {
                    if(Number(item.downItemNum)>0){
                        let proRegionObj = {
                            downItemNum:Number(item.downItemNum),
                            regionId:item.regionId,
                            stockOutOrderDetailId:ele.orderDetailId,
                            stockOutOrderType:2
                        }
                        obj.proRegion.push(proRegionObj)
                    }
                })
                if(obj.proRegion.length > 0){
                    arr.push(obj)
                }
                this.removeData.productlist = arr
            });
            Dialog.confirm({
                title: '温馨提示',
                message: '您确定要“确认全部下架”操作吗?'
            }).then(() => {
                let productIndex, proRegionIndex,flag = true
                // if(this.productArray.length != this.removeData.productlist.length){
                //     flag = false
                // }
                if(flag){
                    for (productIndex = 0; productIndex < this.removeData.productlist.length; productIndex++) { 
                        let num = 0,num2 = 0,allNum=0
                        for(proRegionIndex = 0; proRegionIndex < this.removeData.productlist[productIndex].proRegion.length; proRegionIndex++){
                            num += this.removeData.productlist[productIndex].proRegion[proRegionIndex].downItemNum
                        }
                        this.productArray.forEach(ele => {
                            allNum += ele.downDetailNum
                        })
                        this.removeData.productlist.forEach(ele => {
                            ele.proRegion.forEach(item => {
                                num2 += item.downItemNum
                            })
                        })
                        if(this.productArray[productIndex].detailNum != num){
                            flag = false
                        }
                        if(allNum != num2){
                            flag = false
                        }
                    }
                }
                if(!flag){
                    Toast('全部下架数量不正确')
                    return
                }
                if(this.removeData.productlist.length == 0){
                    Toast('请选择商品下架')
                    return
                }
                this.returngoodsstockdowmAll(this.removeData)
            }).catch(() => {});
        },
        //下架
        returngoodsstockdowmAll(data){
            returngoodsstockdowmAllApi(data).then(res => {
                if(res.code == 0){
                    Toast('下架成功')
                    if(this.$route.query.code == 'sweepCode'){
                        this.$router.replace({name:'allocationOutstock',query:{orderid:this.$route.query.orderid}})
                    }else{
                        setTimeout(()=>{
                            this.$router.go(-1)
                        },1500)
                    }
                }else if(res.code == 1){
                    Toast('本次下架商品数量超过当前最大可下架商品数量（出库单出库商品数量-已创建下架单商品数量）')
                }else if(res.code == 2){
                    Toast('销售出库不能下架非正品区商品')
                }else if(res.code == 3){
                    Toast('出库单出库仓库不一致')
                }else if(res.code == 4){
                    Toast('存在状态不为待下架的出库单')
                }else if(res.code == 6){
                    Toast('本次下架商品数量超过库区最大可下架商品数量（库区可用库存-已创建下架单待下架商品数量）')
                }else if(res.code == 7){
                    Toast('该下架单不是待下架状态，不能修改')
                }else if(res.code == 8){
                    Toast('存在已申请退款的销售出库单')
                }else if(res.code == 9){
                    Toast('该订单已下架，请勿重复下架')
                }else if(res.code == 11){
                    Toast('传入的源出库单明细不存在')
                }else if(res.code == 12){
                    Toast('下架数量不能小于0')
                }else if(res.code == 13){
                    Toast('目标位置的商品正在盘点中，不能进行此操作')
                }
            })
        },
        waitingfordismountingorderlist(){
            waitingfordismountingorderlistApi().then(res => {
                if(res.code == 0){
                    this.dataList = res.Data
                    this.dataList.forEach(item => {
                        item.checked = false
                        if(item.orderId == this.$route.query.orderid){
                            item.checked = true
                        }
                    })
                }
            })
        },
        //选择单号
        toPickUp(orderData){
            if(this.$route.query.orderid == orderData.orderId) return
            this.dataList.forEach(item => {
                item.checked = false
            })
            orderData.checked = true
            if(orderData.type == 1){
                this.$router.replace({name:'cancellationRemove',query:{orderid:orderData.orderId,type:'xiajia'}})
            }else if(orderData.type == 2){
                this.$router.replace({name:'allocationRemove',query:{orderid:orderData.orderId,type:'xiajia'}})
                this.transferouttockdowmprolist(orderData.orderId)
            }else{
                this.$router.replace({name:'soldRemove',query:{orderid:orderData.orderId,type:'xiajia'}})
            }
            this.$forceUpdate()
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
        },
        //修改数量
        changNum(val){
            val.downItemNum < 0 ? val.downItemNum = 0 : val.downItemNum
            val.downItemNum = Math.ceil(val.downItemNum)
        }
    },
    components: {
        saomiaoHeader
    },
};
</script>

<style scoped lang="less">
.pick-up{
    .collapse{
        margin-bottom: 20px;
    }
    /deep/ .van-collapse-item__wrapper{
        .van-collapse-item__content{
            padding: 0;
            padding-bottom: 60px;
        }
    }
    .order-list{
        height: 70px;
        line-height: 70px;
        color: #999;
        font-size: 24px;
        border-bottom: 1px solid #999;
        padding: 0 30px;
        .fl-right{
            margin-top:14px;
        }
    }
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
                    margin-top:5%;
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
    .goods-shelves{
        margin-top:20px;
        padding: 30px 0 0;
        background-color: #fff;
        margin-bottom: 100px;
        .set-shelves{
            margin:0 30px;
            background-color: #DDDDDD;
            height: 68px;
            line-height: 68px;
            text-align: center;
            font-size: 30px;
            color: #333;
            margin-bottom: 20px;
            .van-icon-play{
                transform: rotate(90deg);
            }
        }
        .shelves-item{
            padding: 30px;
            border-bottom: 1px solid #999;
            &:nth-last-child(1){
                border:0
            }
            .item-title{
                padding-top:10px;
                font-size:26px;
                color: #333;
                text-align: left;
                overflow: hidden;
                margin-bottom: 26px;
                img{
                    width: 40px;
                    vertical-align: middle;
                    float: right;
                }
            }
            .item-number{
                display: flex;
                justify-content: space-between;
                font-size: 20px;
                color: #333;
                .item-input{
                    width: 140px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    border: 1px #dcdcdc solid;
                    padding-top: 2px;
                    input{
                        width: 90%;
                        height: 85%;
                        border:0;
                        text-align: center;
                        margin-top:5%;
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
