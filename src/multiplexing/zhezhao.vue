<template>
    <div class="zhezhao" @click="clizhezhao">
        <slot></slot>   
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
        clizhezhao(){
            this.$emit('cancalZhezhao',false)
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.zhezhao{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    background:rgba(0,0,0,0.5);
    z-index: 10
}
</style>
