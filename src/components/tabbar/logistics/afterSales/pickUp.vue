<template>
<!-- 取件 -->
    <div class="pick-up">
        <nosaomiao-header></nosaomiao-header>
        <div class="pick-up-order">退货单号：FGS14964616516</div>
        <div class="order-detail">
            <div class="detail-header">
                <van-icon name="play" class="play-left" color="#DCDCDC"/>
                <div class="num-input">
                    <input type="number" v-model="current">
                </div>
                <span class="ma-35 header-font">/</span>
                <span class="header-font">5</span>
                <van-icon name="play" class="play-right"/>
            </div>
            <div class="order-product">
                <img src="../../../../assets/img/product@2x.png">
                <div class="product">
                    <p>百思图冬季商场同款舒适帅气休闲靴系带牛皮马丁靴女皮靴DD989DZ8</p>
                    <p class="guige">TSIN：5616</p>
                </div>
            </div>
            <div class="detailed">
                <div class="detailed-item" v-for="(detailedGuige,index) in detailedGuigeList" :key="index">
                    <span class="guige-name">{{detailedGuige.name}}</span>
                    <span class="guige-value">{{detailedGuige.value}}</span>
                </div>
                <div class="volume">
                    <div class="volume-item">
                        <span class="c-999">单位体积 长×宽×高(cm³)</span>
                        <div class="fl-right volume-value">
                            <span>61.5</span>
                            <span>x</span>
                            <span>500.5</span>
                            <span>x</span>
                            <span>61.5</span>
                        </div>
                    </div>
                    <div class="volume-item">
                        <div class="fl-right">
                            <span class="c-999">体积:</span>
                            <span class="fs-22 c-333">1.86520008</span>
                            <span class="c-999">m³</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-wcqj" @click="finishPicking">完成取件</div>
    </div>
</template>

<script>
import nosaomiaoHeader from '@/multiplexing/nosaomiaoHeader.vue'
import { Dialog } from 'vant';
export default {
    props: {

    },
    data() {
        return {
            current:1,
            detailedGuigeList:[
                {name:'规格属性',value:'白色/S'},
                {name:'供应商',value:'深圳市卜鸣科技'},
                {name:'批次号',value:'54616DDGV6'},
                {name:'销售退货数量',value:'100'},
                {name:'FNSKU',value:'6461654'},
                {name:'供应商',value:'100'},
                {name:'国际码',value:'FSN46166'},
                {name:'供应商',value:'26'}
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
        //完成取件
        finishPicking(){
            Dialog.confirm({
                title: '温馨提示',
                message: '您确认商品完成取件了吗？'
            }).then(() => {
                // on confirm
            }).catch(() => {
            // on cancel
            });
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
            }
            .product{
                display: inline-block;
                width: 518px;
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
            .volume{
                padding: 14px 30px 20px;
                .volume-item{
                    height: 40px;
                    line-height: 40px;
                    .volume-value{
                        span{
                            margin-left:30px;
                        }
                    }
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
