<template>
    <div class="distribution-detail">
        <nosaomiao-header :title="orderStatus(detailData.orderCourierStatus,'statusList')"></nosaomiao-header>
        <div class="detail-con">
            <div class="shxx">
                <div class="shxx-header">
                    <p class="p1">收货信息</p> 
                    <p>订单号:{{detailData.expressNo}}</p>
                </div>
                <div class="shxx-con">
                    <img :src="$webUrl+detailData.headImg" class="touxiang fl-left">
                    <div class="fl-left xinxi">
                        <div class="p1">
                            <span>{{detailData.consignee}}</span>
                            <span>{{detailData.mobile}}</span>
                        </div>
                        <div class="p2">
                            <span>{{detailData.addressDetail}}</span>
                        </div>
                    </div>
                </div>
                <div class="order-footer">
                    <div class="footer-item">
                        <img src="@/assets/img/phone@2x.png">
                        <span>拨打电话</span> 
                    </div>
                    <div class="footer-item">
                        <img src="@/assets/img/phone@2x.png">
                        <span>导航</span> 
                    </div>
                </div>
            </div>
            <div class="spqd">
                <div class="spqd-header">商品清单</div>
                <div class="spqd-list" v-for="(detail,index) in detailData.detailList" :key="index">
                    <img :src="$webUrl+detail.skuImg" class="shangpin-img fl-left">
                    <div class="fl-left good-name">
                        <p class="p1 clamp-2 c-333">{{detail.supplyName}}</p>
                        <p class="p2 c-666">TSIN：{{detail.tsinCode}}</p>
                        <p class="p3 c-666">
                            <span>{{detail.skuValuesTitle}}</span>
                            <span class="fl-right">x{{detail.detailNum}}</span>
                        </p>
                    </div>
                </div>
                <div class="spqd-footer">
                    <span>总计:</span>
                    <span>{{detailData.totalNum}}</span>
                </div>
            </div>
            <div class="order-time">
                <div class="time-item" v-if="detailData.acceptTime">
                    <span class="c-333">接单时间</span>
                    <div class="fl-right fs-22 c-666">{{detailData.acceptTime}}</div>
                </div>
                <div class="time-item" v-if="detailData.pickupTime">
                    <span class="c-333">揽件时间</span>
                    <div class="fl-right fs-22 c-666">{{detailData.pickupTime}}</div>
                </div>
                <div class="time-item" v-if="detailData.signTime">
                    <span class="c-333">签收时间</span>
                    <div class="fl-right fs-22 c-666">{{detailData.signTime}}</div>
                </div>  
            </div>
            <div class="qianshou" v-if="detailData.orderCourierStatus == 3">
                <p>
                   <span>签收凭证：</span>
                   <span>客户签收</span>
                </p>
                <div class="pingzheng">
                    <img :src="$webUrl+i.imgUrl" v-for="(i,index) in detailData.imgList" :key="index">
                </div>
            </div>
            <div class="qianshou" v-if="detailData.orderCourierStatus == 4">
                <p>拒签原因:</p>
                <p>{{detailData.refuseSignReason}}</p>
            </div>
            <div class="btns" v-if="detailData.orderCourierStatus == 2">
                <div class="btn-jq fl-left" @click="refuseTosign">客户拒签</div>
                <div class="btn-qs fl-right" @click="qsShow=true">确认签收</div>
            </div>
        </div>

        <van-action-sheet v-model="qsShow" :actions="actions" @select="onSelect" class="action-sheet"/>
        
        <zhezhao v-if="zhezhaoStatus">
            <div class="tanchuang">
                <div>
                    <div class="title">{{qhStatus?'拍照签收':'填写拒签原因'}}</div>
                    <div class="kuang">
                        <upload-all @getfilePathList="getfilePathList" :maxCount="3" v-if="qhStatus"></upload-all>
                        <div v-else>
                            <textarea class="textarea" placeholder="请填写客户拒签原因" v-model="qianshouData.refuseSignReason"></textarea>
                        </div>
                    </div>
                    <div class="tanchuang-btns">
                        <div class="fl-left qx-btn" @click="cancel">取消</div>
                        <div class="fl-left qd-btn" @click="confirm">确定</div>
                    </div>
                </div>
                
            </div>
        </zhezhao>

    </div>
</template>

<script>
import nosaomiaoHeader from '@/multiplexing/nosaomiaoHeader.vue'
import zhezhao from '@/multiplexing/zhezhao.vue'
import uploadAll from '@/multiplexing/uploadAll'
import {logisticsorderinfoApi,signlogisticsorderApi} from '@/api/logistics/delivery/index.js'
import {Toast} from 'vant'
export default {
    props: {

    },
    data() {
        return {
            qsShow: false,
            qhStatus:true,
            actions: [
                { name: '拍照签收',value:1 },
                // { name: '客户签收',value:2 },
                { name: '取消',value:0}
            ],
            uploadList:[],
            zhezhaoStatus:false,
            detailData:{},
            statusList:[
                {name:'待接单',type:0},
                {name:'待揽件',type:1},
                {name:'配送中',type:2},
                {name:'已签收',type:3},
                {name:'拒绝签收',type:4},
            ],
            qianshouData:{
                orderId:this.$route.query.orderid,
                signType:null,
                refuseSignReason:'',
                imgList:[]
            }
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.logisticsorderinfo(this.$route.query.orderid)
    },
    watch: {

    },
    methods: {
        //确认签收弹窗选择
        onSelect(item) {
            // 默认情况下，点击选项时不会自动关闭菜单
            // 可以通过 close-on-click-action 属性开启自动关闭
            this.qsShow = false;
            if(item.value == 1){
                this.zhezhaoStatus = true
                this.qhStatus = true
                this.qianshouData.signType = 1
            }
        },
        //拒签按钮
        refuseTosign(){
            this.zhezhaoStatus = true
            this.qhStatus = false
            this.qianshouData.signType = 2
        },
        //获取上传图片列表
        getfilePathList(list){
            this.uploadList = list
        },
        //配送单详情
        logisticsorderinfo(id){
            logisticsorderinfoApi({order_id:id}).then(res => {
                if(res.code == 0){
                    this.detailData = res.Data
                }else if(res.code == 1){
                    Toast(res.orderSn+'不属于您的配送单，请联系客服')
                    this.$router.go(-1)
                }else if(res.code == 2){
                    Toast('不存在此单号，请重新扫描')
                    this.$router.go(-1)
                }
            })
        },
        //编译状态
        orderStatus(type,list){
            let name = ''
            this[list].forEach(statu => {
                if(statu.type == type){
                    name = statu.name
                }
            })
            return name
        },
        //签收/拒签 确定按钮
        confirm(){
            let arr = []
            if(this.qianshouData.signType == 1){
                this.uploadList.forEach(item => {
                    let obj = {
                        imgUrl:item
                    }
                    arr.push(obj)
                    this.qianshouData.imgList = arr
                })
                if(this.qianshouData.imgList.length <= 0){
                    Toast('签收图片不能为空')
                    return
                }
            }else{
                this.qianshouData.imgList = []
            }

            this.signlogisticsorder(this.qianshouData)

        },
        //签收/拒签 取消按钮
        cancel(){
            this.zhezhaoStatus = false
            this.qianshouData.refuseSignReason = ''
        },
        //签收/拒签接口
        signlogisticsorder(data){
            signlogisticsorderApi(data).then(res => {
                if(res.code == 0){
                    this.logisticsorderinfo(this.$route.query.orderid)
                    this.zhezhaoStatus = false
                }else if(res.code == 1){
                    Toast('参数requestModel不能为空')
                }else if(res.code == 2){
                    Toast('物流单Id必须大于0')
                }else if(res.code == 3){
                    Toast('参数签收类型signType不正确')
                }else if(res.code == 4){
                    Toast('请填写拒签原因')
                }else if(res.code == 5){
                    Toast('请上传签收凭证')
                }else if(res.code == 21){
                    Toast('该物流单不存在')
                }else if(res.code == 22){
                    Toast('该物流单不是待接单状态，不能接单')
                }else if(res.code == 31){
                    Toast('该物流单不属于当前配送人员，不能进行此操作')
                }
            })
        },
    },
    components: {
        nosaomiaoHeader,
        zhezhao,
        uploadAll
    },
};
</script>

<style scoped lang="less">
.distribution-detail{
    .detail-con{
        padding: 0 30px;
    }
    .shxx{
        font-size: 24px;
        color: #333;
        background-color: #fff;
        margin:20px 0;
        .shxx-header{
            padding: 30px;
            border-bottom: 1px solid #F2F3F5;
            .p1{
                font-size: 32px;
                margin-bottom: 56px;
            }
        }
        .shxx-con{
            padding: 30px 30px 59px;
            overflow: hidden;
            .touxiang{
                width: 100px;
                height: 97px;
                margin-right:21px;
            }
            .xinxi{
                width: 464px;
                .p1{
                    margin-bottom: 30px;
                    font-size: 26px;
                    span{
                        &:nth-child(1){
                            margin-right: 70px;
                        }
                    }
                }
                .p2{
                    font-size: 24px;
                    line-height:36px;
                    color: #999;
                }
            }
            
        }
        .order-footer{
            display: flex;
            justify-content:space-between;
            height: 88px;
            line-height: 88px;
            .footer-item{
                width: 50%;
                text-align: center;
                img{
                    width: 32px;
                    height: 32px;
                    vertical-align: middle;
                    margin-right:22px;
                }
            }
        }
    }
    .spqd{
        background-color: #fff;
        overflow: hidden;
        margin-bottom: 20px;
        .spqd-header{
            padding: 0 30px;
            height: 88px;
            line-height: 88px;
            font-size: 32px;
        }
        .spqd-list{
            overflow: hidden;
            padding: 0 30px 27px ;
            border-bottom: 1px solid #F2F3F5;
            margin-bottom: 30px;
            &:nth-last-child(2){
                margin:0;
            }
            .shangpin-img{
                width: 140px;
                height:140px;
                margin-right:20px;
            }
            .good-name{
                width: 464px;
                .p1{
                    font-size:24px;
                    line-height:36px;
                }
                .p2{
                    margin:18px 0 15px;
                    font-size:22px;
                }
                .p3{
                    margin:18px 0 15px;
                    font-size:24px;
                }
            }
        }
        .spqd-footer{
            padding: 0 30px;
            height: 88px;
            line-height: 88px;
            text-align: right;
            span:nth-child(2){
                font-size: 30px;
                margin-left:21px;
            }
        }
    }
    .order-time{
        background-color: #fff;
        padding: 0 30px;
        margin-bottom: 20px;
        .time-item{
            height: 88px;
            line-height: 88px;
            font-size: 26px;
            border-bottom: 1px solid #F2F3F5;
        }
    }
    .qianshou{
        padding: 30px;
        background-color: #fff;
        margin-bottom: 80px;
        p{
            font-size: 26px;
            color: #333;
            margin-bottom: 32px;
        }
        .pingzheng{
            display: flex;
            align-items: center;
            img{
                width: 200px;
                height:200px;
                margin-right:20px;
            }
        }
    }
    .btns{
        padding: 0 30px;
        margin:126px 0 40px;
        overflow: hidden;
        .btn-jq{
            width:300px;
            height:88px;
            background:rgba(201,201,201,1);
            border-radius:44px;
            line-height: 88px;
            text-align: center;
            color: #333;
            font-size: 40px;
        }
        .btn-qs{
            width:300px;
            height:88px;
            border-radius:44px;
            line-height: 88px;
            text-align: center;
            color: #fff;
            background-color: #000;
            font-size: 40px;
        }
    }
    .tanchuang{
        width: 80%;
        height: 500px;
        background-color: #fff;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        text-align: center;
        border-radius:20px;
        .title{
            height: 88px;
            line-height: 88px;
            font-size: 30px;
            
        }
        .kuang{
            width: 500px;
            height: 280px;
            border: 1px solid #C9C9C9;
            display: inline-block;
            margin-bottom: 44px;
            .upload-all{
                padding: 70px 0;
                /deep/ .van-uploader{
                    .van-uploader__preview{
                        width: 130px;
                        height: 130px;
                    }
                    .van-uploader__wrapper{
                        .van-uploader__upload{
                            width: 130px;
                            height: 130px;
                        }
                    }
                }
            }
            .textarea{
                width: 90%;
                height: 230px;
                border: 0;
                font-size: 24px;
                line-height:30px;
                margin-top: 20px;
            }
        }
        .tanchuang-btns{
            .qx-btn{
                width: 50%;
                height: 88px;
                background-color: #C9C9C9;
                line-height: 88px;
                font-size: 36px;
                color: #333;
                border-radius:0px 0px 0px 20px;
            }
            .qd-btn{
                width: 50%;
                height: 88px;
                background-color: #333333;
                line-height: 88px;
                font-size: 36px;
                color: #fff;
                border-radius:0px 0px 20px 0px;
            }
        }
    }
}
.action-sheet{
    border-radius: 0;
    /deep/ .van-hairline--top{
        font-size:35px;
        &:nth-last-child(1){
            color: #999;
        }
    }
}

.fs-22{
    font-size: 22px;
}
</style>
