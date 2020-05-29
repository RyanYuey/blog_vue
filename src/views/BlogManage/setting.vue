<template>
    <div class="container">
        <section>
            <h3 class="title">设置默认头像</h3>
            <div class="content">
                <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
                    <template v-if="item.status === 'finished'">
                        <img :src="host+ item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </div>
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    action="http://localhost:3000/upload"
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
                <Modal title="View Image" v-model="visible">
                    <img :src="host + img" v-if="visible" style="width: 100%">
                </Modal>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data () {
            return {
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': '/it/u=3995885402,1113893169&fm=26&gp=0.jpg'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': '/it/u=2711612570,2732226883&fm=11&gp=0.jpg'
                    }
                ],
                host:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy',
                img: '',
                visible: false,
                uploadList: []
            }
        },
        methods: {
            handleView (img) {
                this.img = img;
                this.visible = true;
            },
            handleRemove (file) {
                console.log(file)
                return
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                console.log('success',file)
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式错误'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '文件不能超出2M'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '图片不能超出5张'
                    });
                }
                return check;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        }
}
</script>

<style lang="scss" scoped>
    section{
        padding: 20px;
        .title{
            margin-bottom: 14px;
        }
    }

    // 图片列表
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>