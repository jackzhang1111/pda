<template>
    <div class="order-input">
        <nosaomiao-header></nosaomiao-header>
        <div class="input-line">
            <input type="text" placeholder="请输入商品条形码" v-model="orderNum" >
        </div>
        <div class="qd-btn" @click="submit">确定</div>
    </div>
</template>

<script>
import nosaomiaoHeader from '@/multiplexing/nosaomiaoHeader.vue'
import {pdascanningordernoinApi,pdascanningordernooutApi} from '@/api/warehousing/warehousSupplied/index.js'
import { Dialog ,Toast } from 'vant';
export default {
    props: {

    },
    data() {
        return {
            orderNum:'',
            code:null
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.code = this.$route.query.code
    },
    watch: {

    },
    methods: {
        //PDA扫描入库
        pdascanningordernoin(orderSn){
            pdascanningordernoinApi({orderSn}).then(res => {
                if(res.code == 0){
                    if(res.Data.type == 1){
                        this.$router.replace({name:'suppliedPickUp',query:{orderid:res.Data.orderId,code:'sweepCode'}})
                    }else if(res.Data.type == 2){
                        this.$router.replace({name:'allocationInstorage',query:{orderid:res.Data.orderId,code:'sweepCode'}})
                    }else if(res.Data.type == 3){
                        this.$router.replace({name:'warehouSalesPickUp',query:{backOrderId:res.Data.orderId,code:'sweepCode'}})
                    }
                }else if(res.code == 1){
                    Toast('入库单不存在，请重新扫描待入库订单')
                }else if(res.code == 2){
                    Toast('商品已入库，无需重复操作')
                }else if(res.code == 3){
                    Toast('商品已入库，请前往上架')
                }
            })
        },
        //PDA扫描出库
        pdascanningordernoout(orderSn){
            pdascanningordernooutApi({orderSn}).then(res => {
                if(res.code == 0){
                    if(res.Data.type == 1){
                        this.$router.replace({name:'soldRemove',query:{orderid:res.Data.orderId,code:'sweepCode'}})
                    }else if(res.Data.type == 2){
                        this.$router.replace({name:'allocationRemove',query:{orderid:res.Data.orderId,code:'sweepCode'}})
                    }else if(res.Data.type == 3){
                        this.$router.replace({name:'cancellationRemove',query:{orderid:res.Data.orderId,code:'sweepCode'}})
                    }
                }else if(res.code == 1){
                    Toast('出库单不存在，请重新扫描待出库订单')
                }else if(res.code == 2){
                    Toast('商品已出库，无需重复操作')
                }else if(res.code == 3){
                    Toast('商品已下架，请到对应单据完成出库')
                }
            })
        },
        submit(){
             this.pdascanningordernoin(this.orderNum)
             return
            if(this.code == 1){
                this.pdascanningordernoin(this.orderNum)
            }else if(this.code == 2){
                this.pdascanningordernoout(this.orderNum)
            }
        }
    },
    components: {
        nosaomiaoHeader
    },
};
</script>

<style scoped lang="less">
.order-input{
    padding:0 30px;
    .input-line{
        padding: 30px;
        border-bottom: 1px solid #DCDCDC;
        margin-bottom: 60px;
        input{
            width: 100%;
            font-size: 30px;
            border: 0;
            background-color: #F8F8FA;
        }
    }
    .qd-btn{
        background-color: #333333;
        color: #fff;
        font-size: 40px;
        text-align: center;
        line-height: 88px;
        border-radius:44px;
    }
}
</style>
