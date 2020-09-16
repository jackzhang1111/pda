<template>
    <div>
        <div class="sweep-code" v-if="isSwppe">
            <div id="panel" v-show="panelStatus"></div>
        </div>
        <div v-else>
            <order-input @showPickUps="showPickUps" @submits="submits"></order-input>
        </div>
    </div>
</template>

<script>
var scan = null;
var view = null;
var scanBarVew = null
import orderInput from './orderInput.vue'
export default {
    props: {

    },
    data() {
        return {
            panelStatus:true,
            isSwppe:true
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
        this.closeView()
    },
    watch: {

    },
    methods: {
        startRecognize() {
            let that = this
            var ws = null
            var filter = [8,9,10];
            scan=new plus.barcode.Barcode('panel',filter,{frameColor:'#00FF00',scanbarColor:'#00FF00'});
            ws = plus.webview.currentWebview();
            scan.onmarked = onmarked;
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
                that.$emit('search',result)
                that.$emit('showSweepCode',true)
                // alert(text + result);
                that.closeScan()
            }
            // 创建子窗口
			function createSubview() {
				view = new plus.nativeObj.View('nbutton', {
					bottom: '25%',
					left: '0%',
					width: '100%',
					height: '44px'
				}, [{
					tag: 'font',
					id: 'text',
					text: '将条码放入框内,即可快速扫码',
					textStyles: {
						color: '#FFFFFF'
					}
				}]);
				ws.append(view);
            }
            function createView(){
                scanBarVew = new plus.nativeObj.View('test',{bottom:'60px',left:'10%',height:'44px',width:'80%',backgroundColor:'#fff'});
                scanBarVew.drawRect("#fff", {top:'25%',left:'25%',width:'50%',height:'50%'}, 'test');
                scanBarVew.drawText('手动输入', {bottom:'0px',height:'44px'}, {color:'#333333'}, 'font2');
                scanBarVew.show();
                scanBarVew.interceptTouchEvent(true);
                scanBarVew.addEventListener("click", function(e) {
                    that.isSwppe = false
                    scan.close();
                    that.closeView()
                    that.panelStatus = false
                }) 
            }
            createSubview()
            createView()
        },
        //开始扫描
        startScan() {
            scan.start();
        },
        //关闭条码识别控件
        closeScan() {
            scan.close();
            this.closeView()
            this.panelStatus = false
        },
        //关闭视图控件
        closeView() {
            view.close();
            scanBarVew.close()
        },

        submits(val){
            this.showPickUps()
            this.$emit('search',val)
        },
        showPickUps(){
            this.$emit('showSweepCode',true)
        }
    },
    components: {
        orderInput
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
        height: 92%;
        position: fixed;
        left: 0;
        top: 8%;
        background: rgba(0,0,0,1);
        z-index: 9;
        
    }
    
}
</style>
