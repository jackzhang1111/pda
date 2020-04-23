<template>
<!-- 下架 -->
    <div class="pick-up">
        <div v-show="!batchNoListStatus">
            <saomiao-header @search="search"></saomiao-header>
            <div class="pick-up-order">出库单号：{{detailData.shelfDownorderSn}}</div>
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
                        <div class="c-999">{{detailedGuige.name}}</div>&nbsp;&nbsp;&nbsp;
                        <div class="c-666" @click="replaceBatchNo(detailedGuige.name)">{{detailedGuige.value}}</div>
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
                </div>
            </div>
            <div class="goods-shelves">
                <div class="set-shelves">
                    <span>下架货位</span>
                    <van-icon name="play"/>
                </div>
                <div class="shelves-item" v-for="(warehouse,index) in currentProduct.warehouselist" :key="index">
                    <div class="item-title">
                        <span>{{warehouse.regionName}}</span>
                        <span class="fs-18">(库存:{{warehouse.canUseNum?warehouse.canUseNum:0}})</span>
                    </div>
                    <div class="item-number">
                        <div>{{warehouse.volume}}m³</div>
                        <div>{{warehouse.takeVolume}}m³</div>
                        <div class="item-input">
                            <input type="number" v-model="warehouse.downItemNum">
                        </div>
                    </div>
                </div>
            </div>
            <div class="btns">
                <div class="btn-qbrk" @click="allShelves">确认全部下架</div>
            </div>
            <div class="shelves-place"></div>
        </div>
        <div v-if="batchNoListStatus">
            <batch-no-list @choiceStatus="choiceStatus" @batchDatas="batchDatas" :dataObj="dataObj"></batch-no-list>
        </div>
    </div>
</template>

<script>
import saomiaoHeader from '@/multiplexing/saomiaoHeader.vue'
import batchNoList from './batchNoList.vue'
import { Dialog ,Toast } from 'vant';
import {saleoutorderstockdowmprolistApi,saleoutorderstockdowmprobatchRegionApi} from '@/api/warehousing/sold/index.js'
import {returngoodsstockdowmAllApi} from '@/api/warehousing/cancellation/index.js'
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
                {name:'出库仓库',value:''},
                {name:'FNSKU',value:''},
                {name:'出库数量',value:''},
                {name:'国际码',value:''},
                {name:'下架数量',value:''},
                {name:'出库类型',value:''},
                {name:'单位重量(kg)',value:''},
            ],
            removeData:{
                productlist:[],
                shelfDownOrderId:'',
                sourceType:2
            },
            productArray:[],
            batchNoListStatus:false,
            dataObj:{
                outWarehouseId:'',
                skuId:''
            }
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
        this.saleoutorderstockdowmprolist(this.$route.query.orderid)
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
        search(){

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
        //下架详情接口
        saleoutorderstockdowmprolist(orderId){
            saleoutorderstockdowmprolistApi({orderId}).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
                    this.currentProduct = res.Data.productList[this.current-1]
                    this.listLength = res.Data.productList.length
                    this.productArray = res.Data.productList
                    
                    this.removeData.shelfDownOrderId = this.detailData.shelfDownOrderId
                    this.dataObj.outWarehouseId = res.Data.outWarehouseId
                    this.setCurrentProduct()
                }
            })
        },
        //当前商品基本属性
        setCurrentProduct(){
            this.detailedGuigeList[0].value = this.currentProduct.skuValuesTitle
            this.detailedGuigeList[1].value = this.currentProduct.businessName
            this.detailedGuigeList[2].value = this.currentProduct.batchNo
            this.detailedGuigeList[3].value = this.currentProduct.warehouseName
            this.detailedGuigeList[4].value = this.currentProduct.fnskuCode
            this.detailedGuigeList[5].value = this.currentProduct.detailNum
            this.detailedGuigeList[6].value = this.currentProduct.intCode
            this.detailedGuigeList[7].value = this.currentProduct.downDetailNum
            this.detailedGuigeList[8].value = this.currentProduct.stockOuttype
            this.detailedGuigeList[9].value = this.currentProduct.unitWeight
        },
        //全部下架
        allShelves(){
            let arr = []
            //循环商品
            this.productArray.forEach(ele => {
                //将商品的批次号,转化成数组
                let itemBatchNo = ele.batchNo.split(',')
                //如果有多个批次号
                if(itemBatchNo.length>1){
                    //批次号循环
                    itemBatchNo.forEach(itemBatch => {
                        let obj = {
                            skuId:ele.skuId,
                            stockOutOrderDetailId:ele.orderDetailId,
                            stockOutOrderType:3,
                            proRegion:[]
                        }
                        //库区循环
                        ele.warehouselist.forEach(item => {
                            //如果库区里面是有值的
                            if(Number(item.downItemNum)>0){
                                //批次号等于该库区的批次号
                                if(item.batchNo == itemBatch){
                                    obj.batchNo = itemBatch
                                    let proRegionObj = {
                                        downItemNum:Number(item.downItemNum),
                                        regionId:item.regionId,
                                        stockOutOrderDetailId:ele.orderDetailId,
                                        stockOutOrderType:3
                                    }
                                    obj.proRegion.push(proRegionObj)
                                    
                                }
                            }
                        })
                        if(obj.batchNo){
                            arr.push(obj)
                        }
                    })
                }else{
                    let obj = {
                        batchNo:ele.batchNo,
                        skuId:ele.skuId,
                        stockOutOrderDetailId:ele.orderDetailId,
                        stockOutOrderType:3,
                        proRegion:[]
                    }
                    ele.warehouselist.forEach(item => {
                        if(Number(item.downItemNum)>0){
                            let proRegionObj = {
                                downItemNum:Number(item.downItemNum),
                                regionId:item.regionId,
                                stockOutOrderDetailId:ele.orderDetailId,
                                stockOutOrderType:3
                            }
                            obj.proRegion.push(proRegionObj)
                        }
                    })
                    if(obj.proRegion.length > 0){
                        arr.push(obj)
                    }
                }
                this.removeData.productlist = arr
            });
            Dialog.confirm({
                title: '温馨提示',
                message: '您确定要“确认全部下架”操作吗?'
            }).then(() => {
                let productIndex, proRegionIndex,flag = true
                if(this.productArray.length > this.removeData.productlist.length){
                    flag = false
                }
                if(flag){
                    let num = 0,num2 = 0
                    this.productArray.forEach(ele => {
                        num += ele.detailNum
                    })
                    this.removeData.productlist.forEach(ele => {
                        ele.proRegion.forEach(item => {
                            num2 += item.downItemNum
                        })
                    })
                    if(num != num2){
                        flag = false
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
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1500)
                }
            })
        },
        //更换批次
        replaceBatchNo(value){
            if(value != '批次号') return
            this.dataObj.skuId = this.currentProduct.skuId
            this.batchNoListStatus = true
        },
        //点击回退
        choiceStatus(status){
            this.batchNoListStatus = status
        },
        //点击确定
        batchDatas(batchArr){
            this.detailedGuigeList[2].value = batchArr.join(',')
            this.currentProduct.batchNo = batchArr.join(',')
            let obj = {
                outWarehouseId:this.dataObj.outWarehouseId,
                inbatchNo:batchArr
            }
            this.saleoutorderstockdowmprobatchRegion(obj)
        },
        //销售下架获取所有商品入库批次对应的库位列表信息
        saleoutorderstockdowmprobatchRegion(data){
            saleoutorderstockdowmprobatchRegionApi(data).then(res => {
                if(res.code == 0){
                    this.currentProduct.warehouselist = res.Data
                }
            })
        },
        
    },
    components: {
        saomiaoHeader,
        batchNoList
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
            display: flex;
            flex-wrap: wrap;
            .detailed-item{
                width: 46%;
                padding: 20px 0px 20px 30px;
                border-bottom: 1px solid #999;
                div{
                    display: inline-block;
                    word-wrap:break-word;
                    vertical-align: middle;
                    &:nth-child(2){
                        width: 60%;
                    }
                }
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
                    border: 2px solid #dcdcdc;
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
