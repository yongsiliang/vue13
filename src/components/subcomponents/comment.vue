<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入分享的内容(最多吐槽120字) " maxlength="120"></textarea>
        
        <mt-button type="primary" size="large">发表评论</mt-button> 
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.pageIndex">
                <div class="cmt-title"> 
                    第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.pageIndex |dataFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content}}
                </div>
            </div>
        </div>
        


        <!-- plain 幽灵按钮 -->
        <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>       
    </div>
</template>

<script>

import {Toast} from "mint-ui"

export default{
    data:function(){
        return{
            pageIndex:1, ///默认展示第一页数据
            comments:[]   //所有的评论数据
        }
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){//获取评论
             this.$http.get("api/getcomments/"+this.id+"?pageindex="+
             this.pageIndex).then(result=>{
              if(result.body.status === 0){
                //    this.comments=result.body.message;
                //每当获取新评论数据的时候，不要把老数据清空覆盖，而是以老数据接上新数据
                this.comments=this.comments.concat(result.body.message)
                console.log(result)
              }else{
                Toast("获取评论失败")
              }   
             })
        },
        getmore(){//加载更多
            this.pageIndex++;
            this.getComments();
        }
       
    },
    props:["id"]
}
    
</script>

<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .cmt-list{
            margin: 5px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                  background-color: #ccc;
                  line-height: 30px;
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                }

            }
            
        }
    }
</style>
