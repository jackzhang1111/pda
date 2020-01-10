<template>
    <div class="distribution-list">
        <saomiao-header></saomiao-header>
        <div class="commodity-tab">
            <van-tabs type="card" color="#666666" title-active-color="#333333">
                <van-tab :title="tab.name" v-for='(tab,index) in tabList' :key="index">
                    <scroll class="bscroll-wrapper" ref="wrapper" :data="recordGroup" :pulldown="pulldown" :pullup="pullup" @pulldown="_pulldown" @pullup="_pullup">
                        <div class="bscroll-con">
                            <div class="order" v-for="(data,index) in dataList" :key="index" >
                                <div class="order-header">
                                    <span>物流单号:{{data.expressNo}}</span>
                                    <div class="fl-right">
                                        <span>{{orderStatus(data.orderCourierStatus,'statusList')}}</span>
                                    </div>
                                </div>
                                <div class="order-con" @click="toDetail">
                                    <img src="@/assets/img/wodezichan.png" class="touxiang fl-left">
                                    <div class="fl-left xinxi">
                                        <div class="p1">
                                            <span>李四</span>
                                            <span>16163264611</span>
                                        </div>
                                        <div class="p2">
                                            <span>加纳 大阿克拉省 艾博罗阿也伊 顺有顺月 光博客 可顺月沉吟</span>
                                        </div>
                                    </div>
                                    <div class="btn fl-right" @click.stop="receipt">接单</div>
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
import { Dialog } from 'vant';
import {getlogisticsorderApi} from '@/api/logistics/delivery/index.js'
export default {
    props: {

    },
    data() {
        return {
            tabList:[
                {name:'全部',value:0},
                {name:'待接单',value:1},
                {name:'待揽件',value:2},
                {name:'配送中',value:3},
                {name:'已签收',value:4},
                {name:'已拒签',value:5},
            ],
            dataList:[],
            recordGroup:[],
            pulldown:true,
            pullup:true,
            formData:{
                expressNo:'',
                orderCourierStatus:null,
                page:1,
                limit:10
            },
            guanmengou:true,
            totalCount:0,
            statusList:[
                {name:'待接单',type:0},
                {name:'待揽件',type:1},
                {name:'配送中',type:2},
                {name:'已签收',type:3},
                {name:'拒绝签收',type:4},
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
        toDetail(){
            this.$router.push({name:'distributionDetail'})
        },
        //接单
        receipt(){
           Dialog.confirm({
                title: '温馨提示',
                message: '您确定要接单吗？'
                }).then(() => {
                    // on confirm
                    console.log(123);
                }).catch(() => {
                    // on cancel
                    console.log(456);
            });
        },
        //配送列表
        getlogisticsorder(data,flag){
            getlogisticsorderApi(data).then(res => {
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
                }else{
                    this.pullup = false
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
                this.getlogisticsorder(this.formData,false)
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
            this.getlogisticsorder(this.formData,true)
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
                flex-basis:17% !important; 
                &:nth-child(2){
                    flex-basis:16% !important; 
                }
                &:nth-child(4){
                    flex-basis:16% !important; 
                }
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
