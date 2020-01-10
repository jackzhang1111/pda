<template>
    <div class="search-order">
        <saomiao-header></saomiao-header>
        <div class="order-list">
            <div class="order-item" v-for="(i,index) in 6" :key="index">
                <div class="order-header">
                    <span>单号:GHOJ2019111164615</span>
                    <span class="fl-right fs-30">待上架</span>
                </div>
                <div class="order-con">
                    <p>供应商：深圳市卜鸣科技</p>
                    <p>入库仓库：加纳一号仓库</p>
                    <p>供货数量：150</p>
                    <div class="btn fl-right" @click.stop="receipt">接单</div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import saomiaoHeader from '@/multiplexing/saomiaoHeader.vue'
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

    },
    components: {
        saomiaoHeader,
    },
};
</script>

<style scoped lang="less">
.search-order{
    .order-list{
        padding: 0 30px;
        .order-item{
            background-color: #fff;
            border-bottom: 1px solid #F2F3F5;
            margin-bottom: 20px;
            .order-header{
                height: 80px;
                line-height: 80px;
                font-size: 24px;
                padding: 0 30px;
            }
            .order-con{
                padding: 30px;
                overflow: hidden;
                p{
                    margin-bottom: 20px;
                    color: #999;
                    font-size: 22px;
                }
                .btn{
                    width:100px;
                    height:48px;
                    border:1px solid rgba(102,102,102,1);
                    line-height: 48px;
                    text-align: center;
                    font-size: 26px;
                    border-radius:6px;
                }
            }
        }
        
    }
}
.fs-30{
    font-size: 30px
}
</style>
