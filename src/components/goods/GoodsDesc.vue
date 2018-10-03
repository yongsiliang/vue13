<template>
    <div class="goodsdesc-container">
        <h3>{{info.title}}</h3>
        <hr>
        <div class="content" v-html="info.content">

        </div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                info:{},
                id:this.$route.params.id
            }
        },
        created(){
            this.getGoodsDesc()
        },
        methods:{
            getGoodsDesc(){
                console.log(111)
                this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
                   console.log(22)
                  if(result.body.status===0){
                       this.info=result.body.message[0]
                   } 
                })
            }
        }
    }
</script>

<style lang="scss" >
.goodsdesc-container{
    padding:3px;
    h3{
        font-size: 16px;
        color: #226aff;
        text-align: center;
       
    }
    .content{
        img{
            width: 100%;
        }    
    }
}
</style>

