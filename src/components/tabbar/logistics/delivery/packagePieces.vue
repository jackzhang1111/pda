<template>
<!-- 揽件详情 -->
    <div class="package-pieces">
        <nosaomiao-header></nosaomiao-header>
        <div class="order-con">
            <div class="order-no">
                <p>订单号：FSG56256461625</p>
            </div>
            <div class="spqd">
                <div class="spqd-header">商品清单</div>
                <div class="spqd-list" v-for="(i,index) in 6" :key="index">
                    <img src="@/assets/img/wodezichan.png" class="shangpin-img fl-left">
                    <div class="fl-left good-name">
                        <p class="p1 clamp-2 c-333">华为HONOR荣耀20pro直降全面屏网通手机官方旗舰店正品v20s官网新品麒品v20s官网新品麒品v20s官网新品麒品v20s官网新品麒</p>
                        <p class="p2 c-666">TSIN：5616</p>
                        <p class="p3 c-666">
                            <span>白色/S码</span>
                            <span class="fl-right">x20</span>
                        </p>
                    </div>
                </div>
                <div class="spqd-footer">
                    <span>总计:</span>
                    <span>40</span>
                </div>
            </div>
        </div>
        
        <div class="qrlj-btn" @click="pieces">确认揽件</div>
    </div>
</template>

<script>
import nosaomiaoHeader from '@/multiplexing/nosaomiaoHeader.vue'
import { Dialog } from 'vant'
export default {
    props: {

    },
    data() {
        return {

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
        //揽件
        pieces(){
            Dialog.confirm({
                title: '温馨提示',
                message: '您确认揽件并配送吗？'
                }).then(() => {
                    // on confirm
                    console.log(123);
                }).catch(() => {
                    // on cancel
                    console.log(456);
            });
        }
    },
    components: {
        nosaomiaoHeader
    },
};
</script>

<style scoped lang="less">
.package-pieces{
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
        position: relative;
        width: 100%;
        height: 110px;
        background-color: #333;
        line-height: 110px;
        font-size:40px;
        text-align: center;
        color: #fff;
        bottom: 0;
    }
    
}
</style>
