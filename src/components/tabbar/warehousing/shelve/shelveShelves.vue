<template>
<!-- 上架 -->
    <div class="pick-up">
        <saomiao-header @search="search"></saomiao-header>
        <van-collapse v-model="activeNames" class="collapse">
            <van-collapse-item>
                 <template #title>
                    <div>
                        <span>{{orderName}}</span>
                        <span class="fl-right fs-20">{{detailData.stockInOrderSn}}</span>
                    </div>
                </template>
                <div @click="toPickUp(data)" v-for="(data,index) in dataList" :key="index" class="order-list">
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
                <div class="printing-btn" @click="print" v-if="$route.query.type == 1">打印批次号</div>
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
                <div class="tiji" v-if="typeVal != 3">
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
                <span @click="showPicker = true">设置上架货位</span>
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker show-toolbar :columns="currentProduct.columns" @cancel="showPicker = false" @confirm="onConfirm" v-if="showPicker"/>
                </van-popup>
                <van-icon name="play"/>
            </div>
            <div class="shelves-item" v-for="(warehouse,index) in currentProduct.warehouselist" :key="index">
                <div class="item-title">
                    <span>{{warehouse.regionName}}</span>
                    <img src="@/assets/img/lajitong.svg" @click="detailWarehouse(index,warehouse)">
                </div>
                <div class="item-number">
                    <div>{{warehouse.volume}}/{{warehouse.volume-warehouse.takeVolume}}m³</div>
                    <div>{{warehouse.upItemNum*currentProduct.unitSize ? accMul(warehouse.upItemNum,currentProduct.unitSize) : 0}}m³</div>
                    <div class="item-input">
                        <input type="number" v-model="warehouse.upItemNum" @change="changNum(warehouse,'upItemNum')">
                    </div>
                </div>
            </div>
        </div>

        <div class="btns">
            <div class="btn-qbrk" @click="finishPicking">确认全部上架</div>
        </div>
        <div class="shelves-place"></div>
    </div>
</template>

<script>
var device = null,
    main = null,
    BluetoothAdapter = null,
    UUID=null,
    uuid = null,
    BAdapter = null,
    bluetoothSocket = null
import saomiaoHeader from '@/multiplexing/saomiaoHeader.vue'
import { Dialog ,Toast } from 'vant';
import {stockInToShelvesApi,stockInToShelvesAllApi,getwarehouseregionIDApi} from '@/api/warehousing/warehousSupplied/index.js'
import {transferinstockdowmproshelvesApi} from '@/api/warehousing/allocation/index.js'
import {customerservicebackordershelvesApi} from '@/api/warehousing/warehouAfterSales/index.js'
import {waitingforlaunchorderlistApi} from '@/api/warehousing/shelve/index.js'
import BTool from '@/static/js/BluetoothTool.js'
export default {
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
                {name:'入库数量',value:''},
                {name:'FNSKU',value:''},
                {name:'装箱数量',value:''},
                {name:'国际码',value:''},
                {name:'上架数量',value:''},
                {name:'入库类型',value:''},
                {name:'单位重量(kg)',value:''},
                {name:'入库仓库',value:''},
                {name:'装箱重量(kg)',value:''},
            ],
            shelvesData:{
                shelvesOrderId:0,
                sourceType:2,
                productlist:[]
            },
            removeData:{
                productlist:[],
                shelfDownOrderId:'',
                sourceType:2
            },
            value: '',
            showPicker: false,
            columns: [],
            paraObj:{
                typeId:2,
                paramId:''
            },
            typeVal:0,
            dataList:[],
            activeNames: [],
            bluetoothState: {},
            pairedDevices: [],
            address:null,
            goodsShelves:[],//接口货架货位
        };
    },
    computed: {
        playLeft() {
            return  this.current == 1
        },
        playRight() {
            return  this.current == this.listLength
        },
        orderName(){
            return this.typeVal == 1 ? '供货入库单号' : this.typeVal == 2 ? '调拨入库单号':'销售退货入库单号'
        }
    },
    mounted() {
        this.paraObj.paramId = this.$route.query.paramId
        this.paraObj.typeId = this.$route.query.typeId
        this.typeVal = this.$route.query.type
        this.waitingforlaunchorderlist()
        if(this.$route.query.type == 1){
            this.stockInToShelves(this.paraObj)
        }else if(this.$route.query.type == 2){
            this.transferinstockdowmproshelves(this.paraObj)
        }else if(this.$route.query.type == 3){
            this.customerservicebackordershelves(this.paraObj)
        }
    },
    created() {
        setTimeout(()=>{this.getBluetooth()},500)
    },
    beforeDestroy(){
        try{
            device = null //这里关键
            bluetoothSocket.close();
        }catch(err){
            console.log(err,'beforeDestroy');
        }
    },
    watch: {
        currentProduct:{
            handler:function(newVal){
                this.setCurrentProduct()
            }
        },
        typeVal:{
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
        //供货入库上架信息
        stockInToShelves(data){
            stockInToShelvesApi(data).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
                    this.currentProduct = res.Data.productList[this.current-1]
                    this.listLength = res.Data.productList.length
                    this.productArray = res.Data.productList

                    this.shelvesData.shelvesOrderId = res.Data.shelvesOrderId
                   
                    this.setCurrentProduct()
                    this.getwarehouseregionID({warehouseId:res.Data.warehouseId})
                }
            })
        },
        //售后退货入库上架详情
        customerservicebackordershelves(data){
            customerservicebackordershelvesApi(data).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
                    this.currentProduct = res.Data.productList[this.current-1]
                    this.listLength = res.Data.productList.length
                    this.productArray = res.Data.productList
                    this.removeData.shelfDownOrderId = this.detailData.shelfDownOrderId
                    this.shelvesData.shelvesOrderId = res.Data.shelvesOrderId
                   
                    this.setCurrentProduct()
                    this.getwarehouseregionID({warehouseId:res.Data.warehouseId})
                }
            })
        },
        //调拨入库上架详情
        transferinstockdowmproshelves(data){
            transferinstockdowmproshelvesApi(data).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
                    this.currentProduct = res.Data.productList[this.current-1]
                    this.listLength = res.Data.productList.length
                    this.productArray = res.Data.productList
                    this.removeData.shelfDownOrderId = this.detailData.shelfDownOrderId
                    this.shelvesData.shelvesOrderId = res.Data.shelvesOrderId
                    
                    this.setCurrentProduct()
                    this.getwarehouseregionID({warehouseId:res.Data.warehouseId})
                }
            })
        },


        //当前商品基本属性
        setCurrentProduct(){
            if(this.typeVal == 3){
                //售后退货单
                this.detailedGuigeList = [
                    {name:'规格属性',value:''},
                    {name:'供应商',value:''},
                    {name:'批次号',value:''},
                    {name:'入库数量',value:''},
                    {name:'FNSKU',value:''},
                    {name:'国际码',value:''},
                    {name:'入库类型',value:''},
                    {name:'上架数量',value:''},
                    {name:'入库仓库',value:''},
                    {name:'单位重量(kg)',value:''},
                ]
                this.detailedGuigeList[0].value = this.currentProduct.skuValuesTitle
                this.detailedGuigeList[1].value = this.currentProduct.businessName
                this.detailedGuigeList[2].value = this.currentProduct.batchNo
                this.detailedGuigeList[3].value = this.currentProduct.detailNum
                this.detailedGuigeList[4].value = this.currentProduct.fnskuCode
                this.detailedGuigeList[5].value = this.currentProduct.intCode
                this.detailedGuigeList[6].value = this.currentProduct.stockIntype
                this.detailedGuigeList[7].value = this.currentProduct.hasInDetailNum
                this.detailedGuigeList[8].value = this.currentProduct.stockInWarehouse
                this.detailedGuigeList[9].value = this.currentProduct.unitWeight
            }else{
                //供货入库单,调拨入库单
                this.detailedGuigeList = [
                    {name:'规格属性',value:''},
                    {name:'供应商',value:''},
                    {name:'批次号',value:''},
                    {name:'入库数量',value:''},
                    {name:'FNSKU',value:''},
                    {name:'装箱数量',value:''},
                    {name:'国际码',value:''},
                    {name:'上架数量',value:''},
                    {name:'入库类型',value:''},
                    {name:'单位重量(kg)',value:''},
                    {name:'入库仓库',value:''},
                    {name:'装箱重量(kg)',value:''},
                ]
                this.detailedGuigeList[0].value = this.currentProduct.skuValuesTitle
                this.detailedGuigeList[1].value = this.currentProduct.businessName
                this.detailedGuigeList[2].value = this.currentProduct.batchNo
                this.detailedGuigeList[3].value = this.currentProduct.detailNum
                this.detailedGuigeList[4].value = this.currentProduct.fnskuCode
                this.detailedGuigeList[5].value = this.currentProduct.goodnumPerBox
                this.detailedGuigeList[6].value = this.currentProduct.intCode
                this.detailedGuigeList[7].value = this.currentProduct.hasInDetailNum
                this.detailedGuigeList[8].value = this.currentProduct.stockIntype
                this.detailedGuigeList[9].value = this.currentProduct.unitWeight
                this.detailedGuigeList[10].value = this.currentProduct.stockInWarehouse
                this.detailedGuigeList[11].value = this.currentProduct.boxWeight
            }
        },
        //小数点计算
        accMul(arg1,arg2){
            var m=0,s1=arg1.toString(),s2=arg2.toString();
            try{m+=s1.split(".")[1].length}catch(e){}
            try{m+=s2.split(".")[1].length}catch(e){}
            return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
        },
        //确认全部上架
        finishPicking(){
            let arr = []
            this.productArray.forEach(ele => {
                let obj = {
                    batchNo:ele.batchNo,
                    skuId:ele.skuId,
                    stockInOrderType:this.typeVal,
                    orderDetailId:ele.orderDetailId,
                    unitSize:ele.unitSize,
                    proRegion:[]
                }
                ele.warehouselist.forEach(item => {
                    if(Number(item.upItemNum)>0){
                        let proRegionObj = {
                            regionId:item.regionId,
                            orderDetailId:ele.orderDetailId,
                            stockInOrderType:this.typeVal,
                            upItemNum:Number(item.upItemNum),
                        }
                        obj.proRegion.push(proRegionObj)
                    }
                })
                if(obj.proRegion.length > 0){
                    arr.push(obj)
                }
                this.shelvesData.productlist = arr
            });
            Dialog.confirm({
                title: '温馨提示',
                message: '您确定要“确认全部上架”操作吗?'
            }).then(() => {
                let productIndex, proRegionIndex,flag = true
                if(this.productArray.length != this.shelvesData.productlist.length){
                    flag = false
                }
                if(flag){
                    for (productIndex = 0; productIndex < this.shelvesData.productlist.length; productIndex++) { 
                        let num = 0,allNum = 0
                        for(proRegionIndex = 0; proRegionIndex < this.shelvesData.productlist[productIndex].proRegion.length; proRegionIndex++){
                            num += this.shelvesData.productlist[productIndex].proRegion[proRegionIndex].upItemNum
                        }
                        if(this.productArray[productIndex].hasInDetailNum != num){
                            flag = false
                        }
                    }
                }
                if(!flag){
                    Toast('全部上架数量不正确')
                    return
                }
                if(this.shelvesData.productlist.length == 0){
                    Toast('请选择库区上架')
                    return
                }
               this.stockInToShelvesAll(this.shelvesData)
            }).catch(() => {});
        },
        onConfirm(value,valueIndexs) {
            let threeShel = null,  twoShel = null, currIndex = null, isOne = null
            if(this.currentProduct.columns.length == 0) return
            twoShel = this.currentProduct.columns[valueIndexs[0]].children[valueIndexs[1]]
            threeShel = this.currentProduct.columns[valueIndexs[0]].children[valueIndexs[1]].children[valueIndexs[2]]
            this.currentProduct.warehouselist.push(this.$fn.copy(threeShel))  
            this.showPicker = false;

            this.currentProduct.columns.forEach((one,oneIndex) => {
                let oneId = one.regionId
                one.children.forEach((two,twoIndex) => {
                    two.children.forEach((three,threeIndex) => {
                        if(three.regionId == threeShel.regionId){
                            currIndex = threeIndex
                            if(three.regionId == oneId){
                                //只有库区
                                isOne = true
                            }
                        }
                    })
                })
            })
            if(currIndex != null && !isOne){
                //货架货区
                twoShel.children.splice(valueIndexs[2],1)
            }else{
                //只有货区
                this.currentProduct.columns.splice(valueIndexs[0],1)
            }
        },
        //全部上架
        stockInToShelvesAll(data){
            stockInToShelvesAllApi(data).then(res => {
                if(res.code == 0){
                    Toast('上架成功')
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1500)
                }else if(res.code == 1){
                    Toast('本次上架商品数量超过当前最大可上架商品数量（入库单入库商品数量-已创建上架单商品数量）')
                }else if(res.code == 2){
                    Toast('存在重复的入库单')
                }else if(res.code == 3){
                    Toast('入库单入库仓库不一致')
                }else if(res.code == 4){
                    Toast('该入库单已上架，无需重复操作')
                }else if(res.code == 5){
                    Toast('存在本次上架数总数等于0的入库单')
                }else if(res.code == 6){
                    Toast('本次上架商品体积超过库区最大可上架体积（库区空闲体积-已创建上架单待上架商品体积）')
                }else if(res.code == 7){
                    Toast('该上架单不是待上架状态，不能修改')
                }else if(res.code == 8){
                    Toast('上架位置必须为无货架库区或者货位')
                }else if(res.code == 9){
                    Toast('商品不能上架到非站点仓库的正品库区')
                }else if(res.code == 11){
                    Toast('传入的源入库单明细不存在')
                }else if(res.code == 12){
                    Toast('上架数量不能小于0')
                }else if(res.code == 13){
                    Toast('目标位置的商品正在盘点中，不能进行此操作 ')
                }
            })
        },
        waitingforlaunchorderlist(){
            waitingforlaunchorderlistApi().then(res => {
                if(res.code == 0){
                    this.dataList = res.Data
                    this.dataList.forEach(item => {
                        item.checked = false
                        if(item.orderId == this.$route.query.paramId){
                            item.checked = true
                        }
                    })
                }
            })
        },
        //选择单号
        toPickUp(orderData){
            if(this.paraObj.paramId == orderData.orderId) return
            this.dataList.forEach(item => {
                item.checked = false
            })
            orderData.checked = true
            this.typeVal = orderData.type
            this.paraObj.paramId = orderData.orderId
            this.$router.replace({name:'shelveShelves',query:{paramId:orderData.orderId,typeId:2,type:orderData.type}})
            if(this.$route.query.type == 1){
                this.stockInToShelves(this.paraObj)
            }else if(this.$route.query.type == 2){
                this.transferinstockdowmproshelves(this.paraObj)
            }else if(this.$route.query.type == 3){
                this.customerservicebackordershelves(this.paraObj)
            }
            this.$forceUpdate()
        },
        //垃圾桶
        detailWarehouse(index,item){
            Dialog.confirm({
                title: '温馨提示',
                message: '您确定要删除该货位吗?'
            }).then(() => {
                this.currentProduct.warehouselist.splice(index,1)
                let onecolumnIndex = null,twocolumnIndex
                if(item.parentRegionId){
                    this.currentProduct.columns.forEach((column,columnIndex) => {
                        column.children.forEach((two,twoIndex) => {
                            if(two.regionId == item.parentRegionId){
                                onecolumnIndex = columnIndex
                                twocolumnIndex = twoIndex
                                item.upItemNum = 0
                                two.children.push(item)
                            }
                        })
                    })
                    this.currentProduct.columns[onecolumnIndex].children[twocolumnIndex].children.sort(this.$fn.compare('regionId'))
                }else{
                    let ele = null
                    this.goodsShelves.forEach(good => {
                        if(good.regionId == item.regionId){
                            ele = good
                            ele.upItemNum = 0
                        }
                    })
                    this.currentProduct.columns.push(ele)
                }
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
        },
        //修改数量
        changNum(val,name){
            //大于0
            val[name] < 0 ? val[name] = 0 : val[name]
            //取整
            val[name] = Math.ceil(val[name])
        },
        //PDA获取所有库位信息接口
        getwarehouseregionID(data){
            getwarehouseregionIDApi(data).then(res => {
                if(res.code == 0){
                    res.Data.forEach((one,oneIndex) => {
                        one.text = one.regionName
                        //货区不可摆放
                        if(one.canShelf == 0){
                            if(one.children.length > 0){                            
                                one.children.forEach((two,twoIndex) => {
                                    two.text = two.regionName
                                    if(two.children.length > 0){
                                        two.children.forEach((three,threeIndex) => {
                                            three.text = three.regionName
                                        })
                                        if(twoIndex == (one.children.length - 1)){
                                            this.goodsShelves.push(one)
                                        }
                                    }
                                })
                            }
                        }else{
                            let obj = {
                                canShelf: one.canShelf,
                                children: null,
                                isShelf: one.isShelf,
                                parentRegionId: one.parentRegionId,
                                regionId: one.regionId,
                                regionName: one.regionName,
                                regionNo: one.regionNo,
                                regionType: one.regionType,
                                text:one.regionName,
                                takeVolume: one.takeVolume,
                                upItemNum: one.upItemNum,
                                useStatus: one.useStatus,
                                volume: one.volume,
                                warehouseId: one.warehouseId,
                                warehouseNo: one.warehouseNo,
                                warehouseType: one.warehouseType,
                            }
                            one.children.push({children:[obj],regionName:one.regionName,text:one.regionName})
                            this.goodsShelves.push(one)
                        }
                    })
                    this.productArray.forEach(ele => {
                        ele.warehouselist = new Array()
                        ele.columns = this.$fn.copy(this.goodsShelves) 
                    })
                }
            })
        },
        //初始化打印机参数
        getReady(){
            main = plus.android.runtimeMainActivity();
            BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
            UUID = plus.android.importClass("java.util.UUID");
            uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");//不需要更改
            BAdapter = BluetoothAdapter.getDefaultAdapter();
            BAdapter.cancelDiscovery(); //停止扫描
            device = BAdapter.getRemoteDevice(this.address);//这里是蓝牙打印机的蓝牙地址
            plus.android.importClass(device);
            bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);
            plus.android.importClass(bluetoothSocket);
        },
        //初始化寻找打印机参数
        getBluetooth(){
            var that = this;
            var onPlusReady=function(){
                that.bluetoothTool = BTool.BluetoothTool();
                that.bluetoothState = that.bluetoothTool.state;
                that.getPairedDevices()
            }
            if(typeof plus!="undefined"){
                onPlusReady();
            }
        },
        //获取蓝牙地址
        getPairedDevices: function() {
            try{
                this.pairedDevices = this.bluetoothTool.getPairedDevices();
                this.address = this.pairedDevices[0].address
                this.getReady()
            }catch(error){
                Toast('请链接蓝牙')
                console.log(error,'error');
            }
            
        },
        print() {
            if(!bluetoothSocket.isConnected()) {
                try{
                    bluetoothSocket.connect();
                }catch(error){
                    Toast('打印机链接断开了，重新连接中');
                    this.getReady()
                }
            }

            if(bluetoothSocket.isConnected()) {
                var outputStream = bluetoothSocket.getOutputStream();
                plus.android.importClass(outputStream);
                var s = plus.android.importClass('java.lang.String');
                var bytes;

                var size="SIZE 10mm,30mm\n";
                bytes = plus.android.invoke(size, 'getBytes', 'gb18030');
                outputStream.write(bytes);
                outputStream.flush();
                
                var gap="GAP 0mm\n";
                bytes = plus.android.invoke(gap, 'getBytes', 'gb18030');
                outputStream.write(bytes);
                outputStream.flush();
                
                var speed="SPEED 5\n";
                bytes = plus.android.invoke(speed, 'getBytes', 'gb18030');
                outputStream.write(bytes);
                outputStream.flush();
                
                var density="DENSITY 8\n";
                bytes = plus.android.invoke(density, 'getBytes', 'gb18030');
                outputStream.write(bytes);
                outputStream.flush();
                
                var cls="CLS \n";
                bytes = plus.android.invoke(cls, 'getBytes', 'gb18030');
                outputStream.write(bytes);
                outputStream.flush();
                
                // var values1=`TEXT 10,10,\"TSS24.BF2\",0,1,1,\"${this.currentProduct.batchNo}\"\n`
                // bytes = plus.android.invoke(values1, 'getBytes', 'gb18030');
                // outputStream.write(bytes);
                // outputStream.flush();
                
                var values2=`BARCODE 25,0,\"128\",50,1,0,1,1,\"${this.currentProduct.batchNo}\"\n`;
                bytes = plus.android.invoke(values2, 'getBytes', 'gb18030');
                outputStream.write(bytes);
                outputStream.flush();
                
                
                var string = "PRINT 1\n";//必须以创建字符串对象的形式创建对象，否则返回NULL
                bytes = plus.android.invoke(string, 'getBytes', 'gb18030');
                outputStream.write(bytes);
                outputStream.flush();
                    
            }else {
                Toast('蓝牙链接失败');
            }
        },
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
    .order-detail{
        background-color: #fff;
        .detail-header{
            height: 88px;
            line-height: 88px;
            text-align: center;
            border-bottom: 1px solid #F2F3F5;
            position: relative;
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
        .printing-btn{
            position: absolute;
            right:20px;
            top:20px;
            height: 50px;
            border: 1px solid;
            padding: 0 10px;
            line-height: 50px;
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
                text-align: center;
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
.fs-20{
    font-size: 20px;

}
.pl-30{
    padding-left:30px;
}
.pick-up{
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
}
</style>
