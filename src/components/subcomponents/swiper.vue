<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 在组件中，使用 v-for 循环的话，一定要使用 key -->
            <!-- 谁使用轮播图组件 谁为我传递 lunbotuList -->
            <!-- 此时，lunbotoList 应该是父组件向子组件传值来设置 -->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
                <img :src="item.img" alt="" :class="{'full':isfull}">
            </mt-swipe-item>
           
        </mt-swipe>
    </div>
        <!-- 分析：为什么商品 -->


</template>

<script>
    export default{

        props:['lunbotuList','isfull']
    }
</script>

<style lang="scss" scoped>
    .mint-swipe{
    height: 200px;
    //  : 交集选择器
    // .mint-swipe-item:nth-child(1){
    //     background: blue;
    // }
    .mint-swipe-item{
        text-align: center;

        // &:nth-child(1){
        //     background: red;
        // }
        // &:nth-child(2){
        //     background: blue;
        // }
        // &:nth-child(3){
        //     background:cyan;
        // }
        img{
            height:100%;
            // width: 100%;
        }
    }
}
.full{
    width: 100%;
}
</style>
