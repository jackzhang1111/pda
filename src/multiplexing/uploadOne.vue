<template>
    <div class="upload-one">
        <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead"/>
    </div>
</template>

<script>
// import {uploadImgApi} from '@/api/register/index'
export default {
    props: {
        imgName:{
            type:String,
            default:''
        },
    },
    data() {
        return {
            fileList:[],
            filePath:''
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
            //         this.filePath = res.filePath
            //         this.fileList.push(file)
            //         this.success(this.filePath)
            //     }
            // })
        },
        success(){
            this.$emit('getfilePath',this.filePath,this.imgName)
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.upload-one{
    width: 100%;
    position: relative;
    /deep/ .van-uploader{
        transform: scale(2) translate(20px,30px);
        .van-uploader__upload{
            margin-left: 8px;
        }
    }
}
</style>
