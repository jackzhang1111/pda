<template>
    <div class="current-phone">
        <nosaomiao-header></nosaomiao-header>
        <div class="container">
            <img src="@/assets/img/icon-06@2x.png">
            <p>当前手机号</p>
            <p class="mobile">{{$route.query.mobile}}</p>
            <span>此手机号将显示在个人信息中，</span><br>
            <span>你也可以使用此手机号登录。</span>
            <!-- <div class="btn" @click="$router.push({name:'replacementPhone'})">更换手机号</div> -->
        </div>
        
    </div>
</template>

<script>
import nosaomiaoHeader from '@/multiplexing/nosaomiaoHeader.vue'
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
.current-phone{
    .container{
        padding-top: 120px;
        text-align: center;
        img{
            width: 157px;
            height: 241px;
            margin-bottom: 49px;
        }
        p{
            font-size: 30px;
            color: #333;
        }
        span{
            color: #999;
            line-height: 36px;
            font-size: 24px;
        }
        .mobile{
            font-size: 50px;
            margin:40px 0;
            font-weight: bold;
        }
        .btn{
            display: inline-block;
            width:600px;
            height:88px;
            background:rgba(51,51,51,1);
            border-radius:44px;
            font-size: 40px;
            color: #fff;
            text-align: center;
            line-height: 88px;
            margin-top:80px;
        }
    }
}
</style>
