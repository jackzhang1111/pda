<template>
    <div>
        <div class="saomiao-header">
            <van-icon name="arrow-left" size="20" class="v-middle" @click="$router.go(-1)"/>
            <van-search placeholder="请输入搜索关键词" v-model="value" class="v-middle"/>
            <img src="@/assets/img/saomiao2.svg" class="v-middle">
        </div>
        <div class="place"></div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            value:''
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

    },
};
</script>

<style scoped lang="less">
.saomiao-header{
    width: 100%;
    height: 88px;
    position: fixed;
    top:0;
    line-height: 88px;
    padding: 0 30px;
    box-sizing: border-box;
    z-index: 1;
    background-color: #F8F8FA;
    .van-search{
        display: inline-block;
        padding: 0;
        width:550px;
        height:58px;
        line-height: 58px;
        background:rgba(255,255,255,1);
        border-radius:29px;
        margin: 0 20px 0 10px;
        .van-search__content{
            width:550px;
            height:58px;
            line-height: 58px;
            background:rgba(255,255,255,1);
            border-radius:29px;
        }
    }
}
.v-middle{
    vertical-align: middle
}
</style>
