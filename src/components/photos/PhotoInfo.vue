<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time | dataFormat}}</span>
            <span>点击：{{photoinfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图 -->
         
      <div class="thumbs">
          <vue-preview :slides="list" @close="this.handleClose"></vue-preview>
            <!-- <img class="preview-img" v-for="(item,index) in list" :src="item.src"
            height="100" @click="$preview.open(index,list)" :key='item.src'> -->
      </div>
      
      
        <!-- 图片内容区 -->
        <div class="content" v-html="photoinfo.content" ></div>
        <!-- 评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>

//导入评论子组件
import comment from '../subcomponents/comment.vue'


    export default{
        data:function(){
            return{
                id:this.$route.params.id,//从路由获取到的图片id
                photoinfo:{} ,  //放置服务器返回的图片详情
               
               slide1: [
                {
                    src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                    msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                    alt: 'picture1',
                    title: 'Image Caption 1',
                    w: 600,
                    h: 400
                },
                {
                    src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
                    msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
                    alt: 'picture2',
                    title: 'Image Caption 2',
                    w: 1200,
                    h: 900
                }
                ],
             
              list:[]//缩略图的数组

            }
        },
        created(){
          this.getPhotoInfo();
          this.getThumbs();
        },
        methods:{
            getPhotoInfo(){//获取图片详情
                this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                    if(result.body.status===0){
                        this.photoinfo=result.body.message[0]
                    }else{

                    }
                })
            },
            handleClose () {
                console.log('close event')
            },
            getThumbs(){
                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                    if(result.body.status===0){
                        console.log(result)
                        //循环每个图片数据，补全图片宽和高
                        result.body.message.forEach(item => {
                            item.w=600
                            item.h=400
                        });
                        //把完整数据保存到list
                        this.list=result.body.message
                    }else{
                        // Toast('')
                    }
                })
            }

        },
        components:{ //注册评论子组件
            'cmt-box':comment
        }
    }

</script>

<style lang="scss" scoped>
    .photoinfo-container{
        padding: 3px;
        
        h3{
            color: #26A2FF;
            font-size: 15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content{
            font-size: 13px;
            text-indent: 2em;
        }
        .thumbs{
            img{
                margin: 10px;
                box-shadow: 0 0 8px #999;
            }
        }
    }
</style>
