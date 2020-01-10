<template>
<!-- 居住地 -->
    <div class="where">
        <nosaomiao-header></nosaomiao-header>
        <div class="container">
            <div class="input-con">
                <span>中国</span>
                <div class="fl-right" @click="showPicker = true">
                    <van-icon name="arrow" size="16" color="#999"/>
                </div>
            </div>
            <div class="input-con">
                <span>广东省</span>
                <div class="fl-right" @click="showPicker = true">
                    <van-icon name="arrow" size="16" color="#999"/>
                </div>
            </div>
            <div class="input-con">
                <span>深圳市</span>
                <div class="fl-right" @click="showPicker = true">
                    <van-icon name="arrow" size="16" color="#999"/>
                </div>
            </div>
            <div class="input-con">
                <span>光明区</span>
                <div class="fl-right" @click="showPicker = true">
                    <van-icon name="arrow" size="16" color="#999"/>
                </div>
            </div>
            <div class="textarea-con">
                <textarea class="textarea" v-model="beizhu"></textarea>
            </div>
        </div>
        <div class="save">保存</div>
    </div>
</template>

<script>
import nosaomiaoHeader from '@/multiplexing/nosaomiaoHeader.vue'
export default {
    props: {

    },
    data() {
        return {
            beizhu:'南环大道禾仓路格雅科技大厦'
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
.where{
    position: relative;
    height: 100vh;
    .container{
        padding: 30px;
        .input-con{
            height: 110px;
            line-height: 110px;
            border-bottom: 1px solid #DCDCDC;
            margin-bottom: 2px;
            position: relative;
            padding: 0 20px;
            span{
                font-size:30px;
                color: #333;
            }
        }
        .textarea-con{
            padding: 0 20px;
            margin-top: 20px;
            .textarea{
                width: 100%;
                height: 150px;
                background-color:transparent;
                border: 0;
                font-size:30px;
                line-height: 30px;
            }
        }
    }
    .save{
        width: 690px;
        height:88px;
        position: absolute;
        bottom: 140px;
        left:30px;
        border-radius:44px;
        text-align: center;
        line-height: 88px;
        color: #fff;
        background-color: #333;
        font-size: 40px;
    }
}
</style>
