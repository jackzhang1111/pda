<template>
<!-- 下架列表 -->
    <div class="shelve-list">
        <saomiao-header @search="search"></saomiao-header>
        <van-collapse v-model="activeNames" >
            <van-collapse-item title="下架单号">
                <div @click="toPickUp(data)" v-for="(data,index) in dataList" :key="index" class="order-list">
                    <span>{{data.orderSn}}</span> 
                    <div class="fl-right">
                        <van-checkbox v-model="data.checked"></van-checkbox>
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
import saomiaoHeader from '@/multiplexing/saomiaoHeader.vue'
import {waitingfordismountingorderlistApi} from '@/api/warehousing/shelve/index.js'
export default {
    props: {

    },
    data() {
        return {
            activeNames: [],
            dataList:[]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.waitingfordismountingorderlist()
    },
    watch: {

    },
    methods: {
        search(value){
            
        },
        toPickUp(orderData){
            if(orderData.type == 1){
                this.$router.replace({name:'cancellationRemove',query:{orderid:orderData.orderId,type:'xiajia',typeId:2}})
            }else if(orderData.type == 2){
                this.$router.replace({name:'allocationRemove',query:{orderid:orderData.orderId,type:'xiajia',typeId:2}})
            }else{
                this.$router.replace({name:'soldRemove',query:{orderid:orderData.orderId,type:'xiajia',typeId:2}})
            }
        },
        waitingfordismountingorderlist(){
            waitingfordismountingorderlistApi().then(res => {
                if(res.code == 0){
                    this.dataList = res.Data
                }
            })
        }
    },
    components: {
        saomiaoHeader
    },
};
</script>

<style scoped lang="less">
.shelve-list{
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
