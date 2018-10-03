<template>
    <div class="goods-list">
       
       
        <!-- <router-link tag="div" :to="'/home/goodsinfo/'+item.id" class="goods-item" v-for="item in goodslist" :key="item.id">
           <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">${{item.sell_price}}</span>
                    <span class="old">${{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_qunatity}}件</span>
                </p>
            </div>
        </router-link> -->
        <!-- 在网页中有两种跳转方式 
            1：使用a 标签 的方式叫做标签跳转
            2：使用window.location.href 的形式，叫做编程式导航
        -->
       <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
           <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">${{item.sell_price}}</span>
                    <span class="old">${{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_qunatity}}件</span>
                </p>
            </div>
        </div>


        <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
    

    
    </div>
</template>

<script>
    export default{
        data:function(){//data 是往自己内部组件，挂载一些私有数据
            return {
                
                pageindex:1,  //分页的页数
                goodslist:[]  //存放商品列表的数组

            }
        },
        created(){
           this.getGoodsList() 
        },
        methods:{
            getGoodsList(){//获取商品列表
            // console.log(111)
                this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result => { 
                    if(result.body.status===0){
                        // console.log(result)
                        // this.goodslist=result.body.message
                        this.goodslist=this.goodslist.concat(result.body.message)
                    }else{
                         console.log('失败')
                    }
                })
            },
            getmore(){
                this.pageindex++
                this.getGoodsList()
            },
            goDetail(id){//使用js的形式进行路由导航

                //注意：一定要区分 this.$router 和 this.$route
                //其中： this.$route 是路由【参数对象】，所有路由中的参数，params,query 都属于它
                //其中： this.$router 是一个路由【导航对象】，用它可以方便的使用 JS 代码，实现路由 的
                //前进、后退、跳转到新的URL地址

                //1：最简单的
            //   this.$router.push("/home/goodsinfo/"+id)
               
               //2:传递对象  .query方式传参   接收参数 ：this.$route.query.id
                // this.$router.push({path:"/home/goodsinfo/"+id})

                // 3:params方式传参       接收参数  :this.$route.params.id
                    this.$router.push({
                        name:'goodsinfo',
                        params:{id}
                    })
                    /*
                    注意:params传参，push里面只能是 name:'xxxx',不能是path:'/xxx',
                    因为params只能用name来引入路由，如果这里写成了path，接收参数页面会是undefined！！！
            另外，二者还有点区别，直白的来说query相当于get请求，页面跳转的时候，可以在地址栏看到请求参数，
            而params相当于post请求，参数不会再地址栏中显示
                    */ 
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content:space-between;

        .goods-item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 3px 0;
            padding:2px;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;

            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 3px;
                }
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                    
                }
                .sell{
                        display: flex;
                        justify-content: space-between;
                        font-size: 12px;
                    }
            }
        }
    }


</style>

