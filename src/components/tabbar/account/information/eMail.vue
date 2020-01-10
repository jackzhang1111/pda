<template>
    <div class="e-mail">
        <nosaomiao-header></nosaomiao-header>
        <div class="container">
            <div class="input-con">
                <input type="number" class="mobile" placeholder="请输入您要更改的邮箱">
                <div class="fl-right">
                    <van-icon name="cross" size="16" color="#999"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import nosaomiaoHeader from '../itemComponents/nosaomiaoHeader'
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
        nosaomiaoHeader
    },
};
</script>

<style scoped lang="less">
.e-mail{
    .container{
        padding: 30px;
        .input-con{
            height: 110px;
            line-height: 110px;
            border-bottom: 1px solid #DCDCDC;
            margin-bottom: 2px;
            position: relative;
            padding: 0 20px;
            .mobile{
                width: 50%;
                height: 50%;
                border:0;
                background-color:transparent;
                font-size: 30px;
            }
        }
    }
}
</style>
