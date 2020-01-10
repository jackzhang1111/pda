<template>
    <div class="saomiaono-order">
        <zhezhao>
            <div class="no-order">
                <div class="no-order-con">
                    <img src="../assets/img/icon-03@2x.png">
                    <p>抱歉</p>
                    <p>您扫描的商品不在此单号</p>
                </div>
                <div class="btn">确定</div>
            </div>
        </zhezhao>
    </div>
</template>

<script>
import zhezhao from '@/multiplexing/zhezhao.vue'
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
        zhezhao
    },
};
</script>

<style scoped lang="less">
.saomiaono-order{
    text-align: center;
    .no-order{
        display: inline-block;
        background-color: #fff;
        margin-top:294px;
        border-radius:20px;
        .no-order-con{
            width: 520px;
            height: 500px;
            position: relative;
            border-bottom: 1px solid #F2F3F5;
            img{
                width: 203px;
                height: 203px;
                margin-top:130px;
                margin-bottom: 38px;
            }
            p{
                line-height:36px;
                font-size: 24px;
            }
        }
        .btn{
            height: 100px;
            line-height: 100px;
            font-size: 40px;
            color: #333;
            text-align: center;
        }
    }
}

</style>
