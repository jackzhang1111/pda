<template>
    <div>
        <div class="nosaomiao-header">
            <van-icon name="arrow-left" size="20" class="arrow-left" @click="$router.go(-1)"/>
            <span>待接单</span>
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
