<template>
    <div class="distribution-detail">
        <nosaomiao-header></nosaomiao-header>
        <div class="detail-con">
            <div class="shxx">
                <div class="shxx-header">
                    <p class="p1">收货信息</p> 
                    <p>订单号:GHOJ2019111164615</p>
                </div>
                <div class="shxx-con">
                    <img src="@/assets/img/wodezichan.png" class="touxiang fl-left">
                    <div class="fl-left xinxi">
                        <div class="p1">
                            <span>李四</span>
                            <span>16163264611</span>
                        </div>
                        <div class="p2">
                            <span>加纳 大阿克拉省 艾博罗阿也伊 顺有顺月 光博客 可顺月沉吟</span>
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
                <div class="spqd-list" v-for="(i,index) in 3" :key="index">
                    <img src="@/assets/img/wodezichan.png" class="shangpin-img fl-left">
                    <div class="fl-left good-name">
                        <p class="p1 clamp-2 c-333">华为HONOR荣耀20pro直降全面屏网通手机官方旗舰店正品v20s官网新品麒品v20s官网新品麒品v20s官网新品麒品v20s官网新品麒</p>
                        <p class="p2 c-666">TSIN：5616</p>
                        <p class="p3 c-666">
                            <span>白色/S码</span>
                            <span class="fl-right">x20</span>
                        </p>
                    </div>
                </div>
                <div class="spqd-footer">
                    <span>总计:</span>
                    <span>40</span>
                </div>
            </div>
            <div class="order-time">
                <div class="time-item">
                    <span class="c-333">接单时间</span>
                    <div class="fl-right fs-22 c-666">2019-11-11 16:07:59</div>
                </div>
                <div class="time-item">
                    <span class="c-333">揽件时间</span>
                    <div class="fl-right fs-22 c-666">2019-11-11 16:07:59</div>
                </div>
                <div class="time-item">
                    <span class="c-333">签收时间</span>
                    <div class="fl-right fs-22 c-666">2019-11-11 16:07:59</div>
                </div>  
            </div>
            <div class="qianshou" v-if="true">
                <p>
                   <span>签收凭证：</span>
                   <span>客户签收</span>
                </p>
                <div class="pingzheng"></div>
            </div>
            <div class="qianshou" v-if="true">
                <p>拒签原因:</p>
                <p>货品损坏</p>
            </div>
            <div class="btns">
                <div class="btn-jq fl-left" @click="dialogShow =true">客户拒签</div>
                <div class="btn-qs fl-right" @click="qsShow=true">确认签收</div>
            </div>
        </div>

        <van-action-sheet v-model="qsShow" :actions="actions" @select="onSelect" class="action-sheet"/>
        
        <zhezhao v-if="zhezhaoStatus">
            <div class="tanchuang">
                <div>
                    <div class="title">拍照签收</div>
                    <div class="kuang">
                        <upload-all @getfilePathList="getfilePathList" :maxCount="3" v-if="true"></upload-all>
                        <div v-if="false">
                            <textarea class="textarea" placeholder="请填写客户拒签原因"></textarea>
                        </div>
                    </div>
                    <div class="tanchuang-btns">
                        <div class="fl-left qx-btn">取消</div>
                        <div class="fl-left qd-btn">确定</div>
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
export default {
    props: {

    },
    data() {
        return {
            qsShow: false,
            dialogShow:false,
            actions: [
                { name: '拍照签收',value:1 },
                { name: '客户签收',value:2 },
                { name: '取消',value:0}
            ],
            uploadList:[],
            zhezhaoStatus:false
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
        //确认签收弹窗选择
        onSelect(item) {
            // 默认情况下，点击选项时不会自动关闭菜单
            // 可以通过 close-on-click-action 属性开启自动关闭
            this.show = false;
            console.log(item);
        },
        //获取上传图片列表
        getfilePathList(list){
            this.uploadList = list
        }
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
            width:357px;
            height:200px;
            background:rgba(245,245,245,1);
            border:1px solid rgba(201,201,201,1);
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
                height: 260px;
                border: 0;
                font-size: 24px;
                line-height:30px;
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
