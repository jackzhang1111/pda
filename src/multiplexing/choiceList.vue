<template>
<!-- 取消订单遮罩 -->
    <div class="cancel-order">
        <div class="balance-header">
            <van-icon name="arrow-left" class="arrow-left" @click="$emit('choiceStatus',true)"/>
            <span class="header-t1">{{title}}</span>
        </div>
        <div class="place"></div>
        <div class="yuanyin-list" v-for="nationalCity in nationalCityList" :key="nationalCity.areaId" @click="choiceCity(nationalCity.areaId,nationalCity.areaName,nationalCity.areaCode)">
            <span>{{nationalCity.areaName}}</span>
            <div class="yuan" ></div>
        </div>  
    </div>
</template>

<script>
// import {basearealistApi} from '@/api/accountSettings/index.js'
export default {
    props: {

    },
    data() {
        return {
            istrue:true,
            title:'请选择国家',
            formData:{
                area_level:null,
                parent_id:null
            },
            nationalCityList:[],
            addreData:{
                lev1:{
                    id:'',
                    name:'',
                    areaCode:''
                },
                lev2:{
                    id:'',
                    name:'',
                    areaCode:''
                },
                lev3:{
                    id:'',
                    name:'',
                    areaCode:""
                },
                lev4:{
                    id:'',
                    name:'',
                    areaCode:''
                }
            }
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
        //获取国家城市列表
        basearealist(data){
            // basearealistApi(data).then(res => {
            //     if(res.code == 0){
            //         this.nationalCityList = res.Data
            //     }
            // })
        },
        //点击了某一条
        choiceCity(id,name,areaCode){
            this.$emit('choiceStatus',true)
            //如果选择了上级,清空下级级并赋值
            if(this.formData.area_level == 1){
                this.addreData.lev1.id = id
                this.addreData.lev1.name = name
                this.addreData.lev1.areaCode = areaCode

                this.$fn.deepnull(this.addreData.lev2)
                this.$fn.deepnull(this.addreData.lev3)
                this.$fn.deepnull(this.addreData.lev4)
            }else if(this.formData.area_level == 2){
                this.addreData.lev2.id = id
                this.addreData.lev2.name = name
                this.addreData.lev2.areaCode = areaCode
                this.$fn.deepnull(this.addreData.lev3)
                this.$fn.deepnull(this.addreData.lev4)

            }else if(this.formData.area_level == 3){
                this.addreData.lev3.id = id
                this.addreData.lev3.name = name
                this.addreData.lev3.areaCode = areaCode
                this.$fn.deepnull(this.addreData.lev4)
  
            }else if(this.formData.area_level == 4){
                this.addreData.lev4.id = id
                this.addreData.lev4.name = name
                this.addreData.lev4.areaCode = areaCode
            }
            this.$emit('getchoice',this.addreData)
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.cancel-order{
    background-color: #fff;
    box-sizing: border-box;
    overflow: auto;
    .balance-header{
        width: 100%;
        height: 88px;
        background-color: #f2f3f5;
        text-align: center;
        position: fixed;
        line-height: 88px;
        z-index: 3;
        .arrow-left{
            position: absolute;
            top:20px;
            left:30px;
            font-size: 40px;
            
        }
        .header-t1{ 
            display: inline-block;
            line-height: 88px;
            font-size: 36px;
            color: #010101;
        }
        .header-t2{
            position: absolute;
            right: 30px;
            font-size: 30px;
        }
    }
    .place{
        height: 88px;
    }
    .yuanyin-list{
        padding: 0 30px;
        height: 100px;
        line-height: 100px;
        font-size:30px;
        color: #333;
        border-bottom: 1px solid #DCDCDC;
        position: relative;
    }
    .yuan{
        width:40px;
        height:40px;
        position: absolute;
        border-radius: 50%;
        border:2px solid rgba(153,153,153,1);
        top:30px;
        right:30px;
    }
    .yuan-img{
        width:40px;
        height:40px;
        position: absolute;
        top:30px;
        right:30px;
        img{
            position: absolute;
            top:0;
            left:0
        }
    }
}
</style>
