<template>
    <div class="upload-all">
        <van-uploader v-model="fileList" multiple :max-count="maxCount" :after-read="afterRead" @delete="deleteImg"/>
    </div>
</template>

<script>
// import {uploadImgApi} from '@/api/register/index'
export default {
    props: {
        maxCount:{
            type:Number,
            default:3
        }
    },
    data() {
        return {
            fileList:[],
            filePathList:[]
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
        afterRead(file) {
            // this.fileList.pop()
            // //new 一个FormData格式的参数
            // let params = new FormData()
            // params.append('file', file.file)
            // // 此时可以自行将文件上传至服务器
            // uploadImgApi(params,14).then(res => {
            //     if(res.code == 0){
            //         this.filePathList.push(res.filePath)
            //         this.fileList.push(file)
            //         this.success(this.filePath)
            //     }
            // })
        },
        //成功后将数据传回
        success(){
            this.$emit('getfilePathList',this.filePathList)
        },
        //删除文件
        deleteImg(file,item){
            this.filePathList.splice(item.index,1)
            this.success()
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.upload-all{
    width: 100%;
    position: relative;
/deep/ .van-uploader{
        display: -webkit-flex;
        display: flex;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-align-content: center;
        align-content: flex-start;
        justify-content : space-between;
        .van-uploader{
            width: 100%;
        }
        .van-uploader__preview{
            width: 200px;
            height: 200px;
            margin-right:36px;
            &:nth-child(3n){
                margin-right:0
            }
            .van-image{
                width: 100%;
                height: 100%;
            }
            .van-icon-clear{
                font-size: 40px;
            }
        }
        .van-uploader__upload{
            margin-left: 8px;
            width: 200px;
            height: 200px;
            
        }
    }
}
</style>
