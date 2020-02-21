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
import {getlogisticsorderbyordersnApi} from '@/api/logistics/index.js'
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
        // this.aaa()
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
                let obj = {
                    orderSn:result
                }
                that.getlogisticsorderbyordersn(obj)
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
            createSubview()
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
        },

        aaa(){
            var first = null;  
            var webview = plus.webview.currentWebview();  
            
            plus.key.addEventListener('backbutton', function() {  
                webview.canBack(function(e) {  
                    if (e.canBack) {  
                        webview.back(); //这里不建议修改自己跳转的路径  
                    } else {  
                        //首次按键，提示‘再按一次退出应用’  
                        if (!first) {  
                            first = new Date().getTime(); //获取第一次点击的时间戳  
                            // console.log('再按一次退出应用');//用自定义toast提示最好  
                            // toast('双击返回键退出应用'); //调用自己写的吐丝提示 函数  
                            plus.nativeUI.toast("再按一次退出应用", {  
                                duration: 'short'  
                            }); //通过H5+ API 调用Android 上的toast 提示框  
                            // alert('123')
                            setTimeout(function() {  
                                first = null;  
                            }, 1000);  
                        } else {  
                            if (new Date().getTime() - first < 1000) { //获取第二次点击的时间戳, 两次之差 小于 1000ms 说明1s点击了两次,  
                                plus.runtime.quit(); //退出应用  
                            }  
                        }  
                    }  
                })  
            });
        },
        //通过物流单号得到物流单Id
        getlogisticsorderbyordersn(data){
            getlogisticsorderbyordersnApi(data).then(res => {
                if(res.code == 0){
                    //根据类型判断跳转到哪
                    if(this.code == 1){
                        //跳到揽件页面
                        this.$router.replace({name:'packagePieces',query:{orderid:res.orderId}})
                    }else if(this.code == 2){
                        //跳到签收详情页面
                        this.$router.replace({name:'distributionDetail',query:{orderid:res.orderId}})
                    }else if(this.code == 3){
                        //跳到取件页面
                        this.$router.replace({name:'afterSalesPickUp',query:{orderid:res.orderId}})
                    }
                }
            })
        }
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
