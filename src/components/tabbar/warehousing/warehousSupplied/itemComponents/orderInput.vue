<template>
    <div class="order-input">
        <div class="nosaomiao-header">
            <van-icon name="arrow-left" size="20" class="arrow-left" @click="showPickUp"/>
        </div>
        <div class="place"></div>
        <div class="input-line">
            <input type="text" placeholder="请输入商品条形码" v-model="orderNum" >
        </div>
        <div class="qd-btn" @click="submit">确定</div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            orderNum:'',
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
        submit(){
            this.$emit('submits',this.orderNum)
        },
        showPickUp(){
            this.$emit('showPickUps',true)
        }
    },
    components: {
        
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
.nosaomiao-header{
    width: 100%;
    height: 88px;
    position: fixed;
    top:0;
    line-height: 88px;
    box-sizing: border-box;
    font-size: 36px;
    text-align: center;
    z-index: 1;
    background-color: #F8F8FA;
    .arrow-left{
        position: absolute;
        left:30px;
        top:50%;
        transform: translateY(-50%);
    }
}
</style>
