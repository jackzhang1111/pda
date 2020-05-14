<template>
    <div>
        <div class="balance-header">
            <van-icon name="arrow-left" class="arrow-left" @click="$emit('choiceStatus',false)"/>
            <span class="header-t2 c-orange" @click="isOk">确定</span>
        </div>
        <div class="place"></div>
        <div class="batch-list" v-for="(batch,index) in noList" :key="index" @click="changeCheckbox(batch)">
            <span>{{batch.inbatchNo}}</span>
            <van-checkbox v-model="batch.checked" icon-size="24px" class="checkbox fl-right" checked-color="#F83600" ></van-checkbox>
        </div>
    </div>
</template>

<script>
import {saleoutorderstockdowmprobatchNoApi} from '@/api/warehousing/sold/index.js'
import { Toast } from 'vant';
export default {
    props: {
        dataObj:{
            type:Object,
            default: ()=>{
                return {}
            }
        }
    },
    data() {
        return {
            noList:[]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.saleoutorderstockdowmprobatchNo(this.dataObj)
    },
    watch: {
        
    },
    methods: {
        //销售下架获取所有商品入库批次列表信息
        saleoutorderstockdowmprobatchNo(data){
            saleoutorderstockdowmprobatchNoApi(data).then(res => {
                if(res.code == 0){
                    this.noList = res.Data
                    this.noList.forEach(item => {
                        item.checked = false
                    })
                }
            })
        },
        //选中某条数据
        changeCheckbox(item){
            item.checked = !item.checked
            this.$forceUpdate()
        },
        //确定
        isOk(){
            let arr = []
            this.noList.forEach(item => {
                if(item.checked){
                    arr.push(item.inbatchNo)
                }
            })
            if(arr.length == 0){
                Toast('请选择批次号')
                return
            }
            this.$emit('choiceStatus',false)
            this.$emit('batchDatas',arr)
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.balance-header{
    width: 100%;
    height: 88px;
    background-color: #f2f3f5;
    text-align: center;
    position: fixed;
    line-height: 88px;
    z-index: 3;
    .header-t2{
        position: absolute;
        right: 30px;
        font-size: 30px;
    }
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
.batch-list{
    height: 80px;
    border: 1px solid #DCDCDC;
    border-bottom: 0;
    line-height: 80px;
    padding: 0 30px;
    &:nth-last-child(1){
        border-bottom: 1px solid #DCDCDC;
    }
    .checkbox{
        padding-top: 16px;
    }
}
</style>
