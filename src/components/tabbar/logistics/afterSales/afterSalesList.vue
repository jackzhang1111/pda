<template>
    <div class="distribution-list">
        <saomiao-header></saomiao-header>
        <div>
            <van-tabs type="card" color="#666666" title-active-color="#333333">
                <van-tab :title="tab.name" v-for='(tab,index) in tabList' :key="index" >
                    <div class="bscroll-con">
                        <div class="order" v-for="(i,index) in 6" :key="index" >
                            <div class="order-header">
                                <span>退货单号:GHOJ2019111164615</span>
                                <div class="fl-right">
                                    <span>待接单</span>
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
                                <div class="btn fl-right" @click.stop="pickUp">取件</div>
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
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import saomiaoHeader from '@/multiplexing/saomiaoHeader.vue'
import { Dialog } from 'vant';
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
            ]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        toDetail(){
            this.$router.push({name:'afterSalesDetail'})
        },
        //接单
        pickUp(){
           Dialog.confirm({
                title: '温馨提示',
                message: '您确定要取件吗？'
                }).then(() => {
                    // on confirm
                    this.$router.push({name:'afterSalesPickUp'})
                }).catch(() => {
                    // on cancel
                });
        }
    },
    components: {
        saomiaoHeader
    },
};
</script>

<style scoped lang="less">
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
}
</style>
