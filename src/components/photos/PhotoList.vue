<template>
    <div>
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item',item.id  == 0 ? 'mui-active':'null']" 
                        v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
							{{item.title}}
						</a>						
						
					</div>
				</div>

		</div>
        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link tag="li" v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>


    </div>
</template>

<script>
    //1：导入mui的js文件
    import mui from '../../lib/mui/js/mui.min.js'
    
    
    export default{
        data:function(){
            return{
                cates:[],  //所有分类列表数组
                list:[]     //图片列表数组
            }
        },
        created(){
            this.getAllCategory()
            //默认进入图片全部
            this.getPhotoListByCateId(0)
        },
        mounted(){
            //当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
            //如果操作元素了，最好放在 mounted里面，因为，这时的DOM是最新的
            //2：初始化划动控件
            mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{
            getAllCategory(){//获取所有的图片分类
                
                this.$http.get('api/getimgcategory')
                    .then(result => {
                        if(result.body.status === 0){
                            //手动拼接一个最完整的 分类列表
                            result.body.message.unshift({title:"全部",id:0})
                            this.cates=result.body.message
                        }
                    })
            },
            getPhotoListByCateId(cateId){//根据分类id，获取图片列表
                this.$http.get('api/getimages/'+cateId).then(result=>{
                    if(result.body.status===0){
                        
                        console.log(result)
                        this.list=result.body.message
                    }else{
                       
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    *{
        // CSS属性 touch-action 用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作
        //touch-action: pan-y;启用单指垂直平移手势。
       touch-action: pan-y;
    }
    .photo-list{

        list-style: none;
        margin: 0;
        padding:10px;
        padding-bottom: 10px;
        li{
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 6px #999;
            position: relative;


            img{
                width: 100%;
            // 只有元素属于inline或是inline-block ，vertical-align属性才会起作用。
            //    vertical-align 属性设置元素的垂直对齐方式
            //vertical-align: middle;  /*把此元素放置在父元素的中部*/
               vertical-align: middle;
            }
            // 懒加载图片
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info{
                color:white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 84px;


                .info-title{
                    font-size: 14px;
                }
                .info-body{
                    font-size: 13px;
                }
            }
        }
    }



    
</style>
