<template>
    <div class="distribution-list">
        <saomiao-header @search="search"></saomiao-header>
        <div class="commodity-tab">
            <van-tabs type="card" color="#666666" title-active-color="#333333" @change="onClick">
                <van-tab :title="tab.name" v-for='(tab,index) in tabList' :key="index" >
                    <scroll class="bscroll-wrapper" ref="wrapper" :data="recordGroup" :pulldown="pulldown" :pullup="pullup" @pulldown="_pulldown" @pullup="_pullup">
                        <div class="bscroll-con">
                            <div class="order" v-for="(data,index) in dataList" :key="index" >
                                <div class="order-header">
                                    <span>物流单号:{{data.expressNo}}</span>
                                    <div class="fl-right">
                                        <span>{{orderStatus(data.orderCourierStatusBack,'statusList')}}</span>
                                    </div>
                                </div>
                                <div class="order-con" @click="toDetail(data.orderId)">
                                    <img :src="$webUrl+data.headImg" class="touxiang fl-left">
                                    <div class="fl-left xinxi">
                                        <div class="p1">
                                            <span>{{data.consignee}}</span>
                                            <span>{{data.mobile}}</span>
                                        </div>
                                        <div class="p2">
                                            <span>{{data.addressDetail}}</span>
                                        </div>
                                    </div>
                                    <div class="btn fl-right" @click.stop="receipt(data.orderId)" v-if="data.orderCourierStatusBack == 0">接单</div>
                                    <div class="btn fl-right" @click.stop="pieces(data.orderId)" v-if="data.orderCourierStatusBack == 1">取件</div>
                                </div>
                                <div class="order-footer">
                                    <div class="footer-item">
                                        <img src="@/assets/img/phone@2x.png">
                                        <span>拨打电话</span> 
                                    </div>
                                    <div class="footer-item">
                                        <img src="@/assets/img/navigation@2x.png">
                                        <span>导航</span> 
                                    </div>
                                    <div class="footer-item">
                                        <img src="@/assets/img/abnormal@2x.png">
                                        <span>异常</span> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </scroll>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import saomiaoHeader from '@/multiplexing/saomiaoHeader.vue'
import { Dialog ,Toast} from 'vant';
import {getbacklogisticsorderApi,receivebacklogisticsorderApi} from '@/api/logistics/afterSales/index.js'
export default {
    props: {

    },
    data() {
        return {
            tabList:[
                {name:'全部',value:0},
                {name:'待接单',value:1},
                {name:'待取件',value:2},
                {name:'待入库',value:3},
                {name:'已入库',value:4},
            ],
            dataList:[],
            recordGroup:[],
            pulldown:true,
            pullup:true,
            guanmengou:true,
            totalCount:0,
            formData:{
                expressNo:'',
                orderCourierStatusBack:null,
                page:1,
                limit:10
            },
            statusList:[
                {name:'待接单',type:0},
                {name:'待取件',type:1},
                {name:'待入库',type:2},
                {name:'已入库',type:3},
            ]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.refreshOrder()
    },  
    watch: {

    },
    methods: {
        toDetail(orderid){
            this.$router.push({name:'afterSalesDetail',query:{orderid}})
        },
        //切换tab
        onClick(index) {
            if(index == 0){
                this.formData.orderCourierStatusBack = null
            }else{
                this.formData.orderCourierStatusBack = index - 1
            }  
            this.refreshOrder()
        },
        search(value){
            this.$router.push({name:'searchAfter',query:{expressNo:value}})
        },
        //售后列表
        getbacklogisticsorder(data,flag){
            getbacklogisticsorderApi(data).then(res => {
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
        //接单
        receivebacklogisticsorder(id){
            receivebacklogisticsorderApi({orderId:id}).then(res => {
                if(res.code == 0){
                    this.refreshOrder()
                }else if(res.code == 1){
                    Toast('参数requestModel不能为空')
                }else if(res.code == 2){
                    Toast('物流单Id必须大于0')
                }else if(res.code == 21){
                    Toast('该物流单不存在')
                }else if(res.code == 22){
                    Toast('该物流单不是待接单状态，不能接单')
                }
            })
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
                this.getbacklogisticsorder(this.formData,false)
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
            this.getbacklogisticsorder(this.formData,true)
            this.pullup = true
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
        //接单
        receipt(id){
            Dialog.confirm({
                title: '温馨提示',
                message: '您确定要接单吗？'
            }).then(() => {
                this.receivebacklogisticsorder(id)
            }).catch(() => {});
        },
        //取件
        pieces(orderid){
            this.$router.push({name:'afterSalesPickUp',query:{orderid}})
        },
    },
    components: {
        saomiaoHeader
    },
};
</script>

<style scoped lang="less">
.bscroll-wrapper{
    height: calc(100vh - 230px);
}
.distribution-list{
    /deep/ .van-tabs--card{
        padding: 0 30px;

        .van-tabs__wrap{
            margin:35px 0 20px;
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
    .order{
        background-color: #fff;
        font-size: 24px;
        overflow: hidden;
        border-bottom: 1px solid #F2F3F5;
        margin-bottom: 20px;
        .order-header{
            height: 79px;
            line-height: 79px;
            border-bottom: 1px solid #F2F3F5;
            padding: 0 30px;
        }
        .order-con{
            padding: 30px 30px 19px;
            border-bottom: 1px solid #F2F3F5;
            overflow: hidden;
            .touxiang{
                width: 100px;
                height: 97px;
                margin-right:30px;
            }
            .xinxi{
                width: 487px;
                .p1{
                    font-size: 26px;
                    color: #666;
                }
                .p2{
                    color: #999;
                    margin:30px 0 60px;
                }
            }
            .btn{
                width:100px;
                height:48px;
                border:1px solid #666666;
                border-radius:6px;
                line-height: 48px;
                text-align: center;
            }
        }
        .order-footer{
            display: flex;
            justify-content:space-between;
            height: 88px;
            line-height: 88px;
            .footer-item{
                width: 229px;
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
    .commodity-tab{
        /deep/ .van-tabs__content{
            position: relative;
            overflow: hidden;
        }
    }
}

</style>
