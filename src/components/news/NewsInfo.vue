
<template>
    <div class="newsinfo-container">
      <!-- 大标题 -->
       <h3 class="title">{{newsinfo.title}}</h3>
      <!-- 子标题 -->
       <p class="subtitle"> 
            <span>发表时间：{{newsinfo.add_time | dataFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>            
       </p>
       <hr>
      <!-- 内容区 -->
       <div class="content" v-html="newsinfo.content"></div>
      <!--评论子组件区  -->
    <component-box :id="this.id"></component-box>
    </div>

</template>

<script>
import {Toast} from "mint-ui"
//导入评论子组件
import comment from "../subcomponents/comment.vue"


export default{
    data:function(){
        return{
            id:this.$route.params.id, //将 URL地址传递过来的id值 ，挂载到data上，方便以后调用
            newsinfo:{}
        
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){//获取新闻详情
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.newsinfo=result.body.message[0]
                   // console.log(result)
                }else{
                    Toast('获取新闻失败！')
                }
            })
        }
    },
    components:{//注册子组件节点
        "component-box":comment
    }
        
    
}

    
</script>

<style lang="scss" >
.newsinfo-container{
    padding: 0 4px;
 

    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle{
        font-size: 12px;
        color: blue;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width: 100%;
        }
    }

}


</style>
