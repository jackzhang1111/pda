<template>
    <div class="sweep-code">
        <div class="fanhui">
            <van-icon name="arrow-left" color="#000" size="30" @click="$router.go(-1)"/>
        </div>
        <div id="panel" v-show="panelStatus"></div>
    </div>
</template>

<script>
var scan = null;
var view = null;
var scanBarVew = null
import {getlogisticsorderbyordersnApi} from '@/api/logistics/index.js'
import {pdascanningordernoinApi,pdascanningordernooutApi} from '@/api/warehousing/warehousSupplied/index.js'
import { Dialog ,Toast } from 'vant';
export default {
    props: {

    },
    data() {
        return {
            panelStatus:true,
            code:null,
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.startRecognize()
        this.code = this.$route.query.code
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
                
                if(that.code == 1){
                    that.pdascanningordernoin(result)
                }else if(that.code == 2){
                    that.pdascanningordernoout(result)
                }
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
                    that.$router.replace({name:'orderInput',query:{code:that.code}})
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

        //PDA扫描入库
        pdascanningordernoin(orderSn){
            pdascanningordernoinApi({orderSn}).then(res => {
                if(res.code == 0){
                    if(res.Data.type == 1){
                        this.$router.replace({name:'suppliedPickUp',query:{orderid:res.Data.orderId}})
                    }else if(res.Data.type == 2){
                        this.$router.replace({name:'allocationInstorage',query:{orderid:res.Data.orderId}})
                    }else if(res.Data.type == 3){
                        this.$router.replace({name:'warehouSalesPickUp',query:{backOrderId:res.Data.orderId}})
                    }
                }else if(res.code == -1){
                    Toast('订单不存在')
                }
            })
        },
        //PDA扫描出库
        pdascanningordernoout(orderSn){
            pdascanningordernooutApi({orderSn}).then(res => {
                if(res.code == 0){
                    if(res.Data.type == 1){
                        this.$router.replace({name:'soldRemove',query:{orderid:res.Data.orderId}})
                    }else if(res.Data.type == 2){
                        this.$router.replace({name:'allocationRemove',query:{orderid:res.Data.orderId}})
                    }else if(res.Data.type == 3){
                        this.$router.replace({name:'cancellationRemove',query:{orderid:res.Data.orderId}})
                    }
                }else if(res.code == -1){
                    Toast('订单不存在')
                }
            })
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
        height: 92%;
        position: fixed;
        left: 0;
        top: 8%;
        background: rgba(0,0,0,1);
        z-index: 9;
        
    }
    
}
</style>
