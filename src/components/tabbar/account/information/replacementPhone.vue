<template>
    <div class="replacement-phone">
        <nosaomiao-header></nosaomiao-header>
        <div class="container">
            <div class="input-con">
                <input type="number" class="mobile" placeholder="请输入您要更改的手机号">
                <div class="fl-right" @click="showPicker = true">
                    <span class="quhao c-666">{{value}}</span>
                    <van-icon name="arrow" size="16" color="#999"/>
                </div>
            </div>
            <div class="input-con">
                <input type="number" class="mobile" placeholder="验证码">
                <div class="btn-fsyzm">发送验证码</div>
            </div>
        </div>

        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"/>
        </van-popup>
    </div>
</template>

<script>
import nosaomiaoHeader from '../itemComponents/nosaomiaoHeader'
export default {
    props: {

    },
    data() {
        return {
            columns: ['+86', '+233',],
            showPicker:false,
            value:'+86'
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
        onChange(picker, value, index) {
            console.log(`当前值：${value}, 当前索引：${index}`);
        },
        onConfirm(value) {
            this.value = value;
            this.showPicker = false;
        }
    },
    components: {
        nosaomiaoHeader,
    },
};
</script>

<style scoped lang="less">
.replacement-phone{
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
            .quhao{
                margin-right:10px;
                font-size: 30px;
            }
            .btn-fsyzm{
                padding:0 26px;
                height: 70px;
                background:#fff;
                border-radius:10px;
                text-align: center;
                line-height: 70px;
                font-size: 30px;
                color: #666;
                position: absolute;
                right: 20px;
                top: 0;
                bottom: 0;
                margin:auto;
            }
        }
    }
}
</style>
