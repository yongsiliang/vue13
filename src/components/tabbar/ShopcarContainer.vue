<template>
    <div class="shopcar-container">

        <div class="goods-list">
            <div>111</div>
            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                       <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(tem.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                       <img :src="item.thumb_path" alt="">
                    
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">${{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 如何从购物车中获取商品数量 -->
                                <!-- 1：我可以先创建一个空对象，然后循环购物车中所有有的
                                    的商品数据，把当前循环这条商品的id 作为对象的属性名，count值
                                    作为对象的属性值，这样当把所有商品循环一遍，就会的到一个对象： { 89:1, 88:2 }
                                 -->
                                <a href="#" @click="remove(item.id,i)">删除{{$store.getters.getGoodsCount[item.id]}}</a>
                            </p>
                            
                        </div>
                    
                    </div>
                </div>
            </div>
            
       
       
        </div>
        
        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan" >
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmont.count}}</span> 件，
                        总价 ￥<span class="red">{{$store.getters.getGoodsCountAndAmont.amount}}</span> </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>

        <p>2{{$store.getters.getGoodsSelected}}</p>
        
    </div>
</template>

<script>
    import numbox from '../subcomponents/shopcar_numbox.vue'
    export default { 
        data(){
            return {
                goodslist:[] //购物车中所有商品的数据
            }
        },
        created(){
           this.getGoodsList()
        },
        methods:{
            getGoodsList(){
                //1 获取 store 中所有商品的id ,然后拼接出一个 用逗号分隔的字符串
              
                var idArr = []
                this.$store.state.car.forEach(item => idArr.push(item.id))
                //如果购物车中没有商品，则直接返回，否则报错
                // console.log(idArr.length)
               if(idArr.length <= 0){
                    console.log(1)
                   return;
                    
                }
                 console.log(idArr.length)
                //  localStorage.clear()
                 //获取购物车商品列表
                this.$http.get('api/goods/getshopcarlist/'+idArr.join(","))
                    .then(result => {
                        console.log(result)
                        if(result.body.status === 0){
                            console.log('inresult')
                            this.goodslist=result.body.message
                        }
                        console.log('outresult')
                    })
            },
            remove(id,index){//点击删除，把商品 从 store 中根据传递 的 id 删除，
            //同时把当前组件中的 goodslist 中，对应的那个商品，使用index 删除
            this.goodslist.splice(index,1)
            this.$store.commit('removeFromCar',id)

            }
        },
        selectedChanged(id,val){
            //每当点击开关，把最新的开关状态，同步到store
            // console.log(id+'---'+val)
            this.$store.commit("updateGoodsSelected",{id , selected:val})
        },

        components:{
            numbox
        }
    }

</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
   
   .mui-card-content-inner{
       display: flex;
       align-items: center;
   }
    
    .goods-list{
        display: flex;

        img{
            width: 60px;
            height: 60px;

        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color: red ;
                font-weight: bold;
            }
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-content: center;
        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }

}
</style>
