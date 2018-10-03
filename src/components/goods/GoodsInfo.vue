<template>
    <div class="goodinfo-container">

        <transition
            @before-enter="beforEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
       
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lubotu" :isfull="false"></swiper>
                </div>
            </div>
		</div>

        <!-- 商品购买区域 -->

        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：<del>{{goodsinfo.market_price}}</del>&nbsp;&nbsp;
                            销售价：<span class="now_price">{{goodsinfo.sell_price}}</span>
                        </p>
                        <p>购买数量：<numberbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numberbox>  
                        </p>
                        <p>
                            <mt-button type='primary' size='small' >立即购买</mt-button>
                            <mt-button type='danger' size='small' @click="addToShopCar">加入购物车</mt-button>
                            <!-- 涉及父子组件 嵌套 ，所以无法直接在 goodsinfo 页面中获取到
                            选中的商品数量值
                            怎么解决这个问题？ 涉及到了 子组件向父组件传值了 （事件调用机制）
                            
                            事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做参数传
                            给这个方法
                             -->
                        </p>
					</div>
				</div>
			</div>

        <!-- 商品参数区域 -->
            <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
                        <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                        <p>上架时间：{{goodsinfo.add_time |dataFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>
<script>

// 导入轮播图组件
    import swiper from '../subcomponents/swiper.vue'
    //导入数字选择框组件
    import numberbox from '../subcomponents/goodsinfo_numberbox.vue'

    export default{
        data(){
            return{
                id:this.$route.params.id, //将路由参数对象中的id挂载到data
                lubotu:[],      //轮播图数据
                goodsinfo:{},    //获取的商品信息
                ballFlag:false , //控制小球隐藏与显示
                selectedCount:1  //保存用户选中商品，默认1
            }
        },
        created(){
            this.getLunbotu()
            this.getGoodsInfo()
        },
        methods:{
            getLunbotu(){
                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                    if(result.body.status===0){
                        //先循环轮播图数组中的每一项，为item 添加img 属性，因为轮播图 组件
                        //中，只认识  item.img 不认识 item.src
                        result.body.message.forEach(item=>{
                            item.img=item.src
                        })
                        this.lubotu=result.body.message
                    }else{

                    }
                })
            },
            getGoodsInfo(){
                this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                    if(result.body.status===0){
                        this.goodsinfo=result.body.message[0]
                    }else{

                    }
                })
            },
            goDesc(id){//点击使用编程式导航跳转到图文介绍页面
                this.$router.push({name:'goodsdesc',params:{id}})
            },
            goComment(id){//点击跳转到 评论页面
                this.$router.push({name:'goodscomment',params:{id}})
            },
            addToShopCar(){//添加到购物车
                 this.ballFlag=!this.ballFlag
                //  { id:商品id ,count:要购买的数量,price:商品的单价,selected:true }
               //拼接出一个要保存到 store 中car 数组里的 商品信息对象
               var goodsinfo={ 
                    id: this.id ,
                    count: this.selectedCount,
                    price: this.goodsinfo.sell_price,
                    selected: true 
                    
                    }
                    //调用 store 中的mutations 来将商品加入购物车
                    this.$store.commit('addToCar',goodsinfo)
            },
            beforEnter(el){
                el.style.transform="translate(0,0)"
            },
            enter(el,done){

                // 小球动画优化思路：
                //1：先分析导致 动画不准确的 本质原因：把小球位移到的位置，已经局限在了某一分辨率下
                // 的 滚动条未滚动的情况下：
                //2.只要分辨率和测试的时候不一样，或者滚动条有一定距离之后，问题出现了
                //结论：不能把位置的横纵坐标写死 了，而是应该，根据不同的情况，动态计算坐标值
                //4.解题思路： 先得到 徽标 的横纵坐标，然后的到小球的横纵坐标，然后，让 y 值求差。x也
                //求差，得到的结果就是横纵坐标要位移的距离
                //5.如何 获取 徽标和小球的位置？？？ domObject.getBoundingClientRect()
                

                //获取小球 在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect()
               //获取徽标在页面中的位置
                const badgePosition =document
                    .getElementById('badge')
                    .getBoundingClientRect()

                const xDist =badgePosition.left - ballPosition.left;
                const yDist =badgePosition.top - ballPosition.top;

                el.offsetWidth;
                el.style.transform=`translate(${xDist}px,${yDist}px)`
                el.style.transition='all 0.5s cubic-bezier(.4,-0.3,1,.68)'
                done()
            },
            afterEnter(el){
                this.ballFlag=!this.ballFlag
            },
            getSelectedCount(count){
                //当子组件把数量传递给父组件的时候，把选中的值保存到 data 上
                this.selectedCount=count
                // console.log('父count'+this.selectedCount)

            }
        },
        components:{
            swiper,
            numberbox
        }
    }


</script>

<style lang="scss" scoped>
.goodinfo-container{
    background-color: #eee;
    overflow: hidden;

    .now_price{
        color:red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;

        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top:390px;
        left:146px;
       transform: translate(93px,230px)

    }
}
</style>

