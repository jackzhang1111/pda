<template>
    <div class="tabbar-header">
        <span>{{headerTitle}}</span>
        <van-icon name="chat-o" size="20" class="chat"/>
    </div>
</template>

<script>
export default {
    props: {
        headerTitle:{
            type:String,
            default:'TOSPINO'
        }
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
.tabbar-header{
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    position: relative;
    .chat{
        position: absolute;
        right:30px;
        top:50%;
        transform: translateY(-50%);
    }
}
</style>
