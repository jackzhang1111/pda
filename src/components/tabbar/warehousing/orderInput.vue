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
                        this.$router.push({name:'suppliedPickUp',query:{orderid:res.Data.orderId}})
                    }else if(res.Data.type == 2){
                        this.$router.push({name:'allocationInstorage',query:{orderid:res.Data.orderId}})
                    }else if(res.Data.type == 3){
                        this.$router.push({name:'warehouSalesPickUp',query:{orderid:res.Data.orderId}})
                    }
                }
            })
        },
        //PDA扫描出库
        pdascanningordernoout(orderSn){
            pdascanningordernooutApi({orderSn}).then(res => {
                if(res.code == 0){
                    if(res.Data.type == 1){
                        this.$router.push({name:'soldOutstock',query:{orderid:res.Data.orderId}})
                    }else if(res.Data.type == 2){
                        this.$router.push({name:'allocationOutstock',query:{orderid:res.Data.orderId}})
                    }else if(res.Data.type == 3){
                        this.$router.push({name:'cancellationOutstock',query:{orderid:res.Data.orderId}})
                    }
                }
            })
        },
        submit(){
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
