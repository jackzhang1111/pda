<template>
    <div class="sweep-code">
        <div class="fanhui">
            <van-icon name="arrow-left" color="red" size="30" @click="$router.go(-1)"/>
        </div>
        <div id="panel" v-show="panelStatus"></div>
    </div>
</template>

<script>
var scan = null;
export default {
    props: {

    },
    data() {
        return {
            panelStatus:true
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.startRecognize()
    },
    beforeDestroy(){
        this.closeScan()
    },
    watch: {

    },
    methods: {
        startRecognize() {
            let that = this
            var filter = [8,9,10];
            scan=new plus.barcode.Barcode('panel',filter,{frameColor:'#00FF00',scanbarColor:'#00FF00'});
            scan.onmarked = onmarked;
            console.log(2);
            that.startScan()
            function onmarked(type, result) {
                var text = '未知: ';
                switch (type) {
                    case plus.barcode.CODE128:
                        text = 'CODE128: ';
                    break;
                    case plus.barcode.CODE39:
                        text = 'CODE39: ';
                        break;
                }
                alert(text + result);
                that.closeScan()
            }
        },
        //开始扫描
        startScan() {
            scan.start();
        },
        //关闭条码识别控件
        closeScan() {
            scan.close();
            this.panelStatus = false
        },
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.sweep-code{
    position: relative;
    .fanhui{
        height: 100px;
        padding:30px 20px;
    }
    #panel{
        width: 100%;
        height: 90%;
        position: fixed;
        left: 0;
        top: 10%;
        background: rgba(0,0,0,1);
        z-index: 9;
    }
}
</style>
