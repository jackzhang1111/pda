<template>
    <div class="account">
        <div class="account-header">
            <span>我的</span>
            <van-icon name="setting-o" size="20" class="setting"/>
        </div>
        <div class="pd-30">
            <div class="business-card" @click="$router.push({name:'informationList'})">
                <p class="card-name">{{userinfoPda.username}}</p>
                <p>账号：{{userinfoPda.mobile}}</p>
                <van-icon name="arrow" size="20" class="arrow" color="#A3A3A3" />
            </div>
            <div class="option-list">
                <div class="option-item">
                    <img src="@/assets/img/message.png">
                    <span>留言</span>
                    <div class="fl-right">
                         <van-icon name="arrow" size="15" class="arrow" color="#A3A3A3"/>
                    </div>
                </div>
                <div class="option-item">
                    <img src="@/assets/img/notice.png">
                    <span>通知</span>
                    <div class="fl-right">
                         <van-icon name="arrow" size="15" class="arrow" color="#A3A3A3"/>
                    </div>
                </div>
                <div class="option-item">
                    <img src="@/assets/img/set.png">
                    <span>设置</span>
                    <div class="fl-right">
                         <van-icon name="arrow" size="15" class="arrow" color="#A3A3A3"/>
                    </div>
                </div>
                <div class="option-item">
                    <img src="@/assets/img/site.png">
                    <span>更换站点</span>
                    <div class="fl-right">
                         <van-icon name="arrow" size="15" class="arrow" color="#A3A3A3"/>
                    </div>
                </div>
            </div>
            <div class="login-out" @click="$router.push({name:'login'})">退出登录</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            userinfoPda:{}
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.userinfoPda = JSON.parse(localStorage.userinfoPda)
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
.account{
    .account-header{
        height: 88px;
        line-height: 88px;
        text-align: center;
        font-size: 36px;
        position: relative;
        .setting{
            position: absolute;
            right:30px;
            top:50%;
            transform: translateY(-50%);
        }
    }
    .business-card{
        padding: 56px 40px 40px;
        position: relative;
        color: #333;
        font-size: 30px;
        border-radius:20px;
        border: 1px solid #3B3B3B;
        background-color: #fff;
        box-shadow:0px 12px 10px 0px rgba(59,59,59,0.14);
        .card-name{
            font-size:60px;
            font-weight:bold;
            margin-bottom: 20px;
        }
        .arrow{
            position: absolute;
            right:40px;
            top:50%;
            transform: translateY(-50%);
        }
    }
    .option-list{
        margin:95px 30px 117px;
        .option-item{
            height: 100px;
            line-height: 100px;
            padding: 0 30px;
            font-size: 30px;
            border-bottom: 1px solid #DCDCDC;
            img{
                width: 36px;
                height: 36px;
                vertical-align: middle;
                margin-right:23px;
            }
        }
    }
    .login-out{
        width:400px;
        height:88px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(220,220,220,1);
        border-radius:44px;
        line-height: 88px;
        text-align: center;
        font-size:36px;
        margin-left:50%;
        transform: translateX(-50%);
    }
}

</style>
