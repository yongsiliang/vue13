<template>
    <div>

        <!-- 轮播图区域 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>

        <h3>HomeContainer</h3>

    </div>
</template>

<script>
    
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
    //  : 交集选择器
    // .mint-swipe-item:nth-child(1){
    //     background: blue;
    // }
    .mint-swipe-item{
        &:nth-child(1){
            background: red;
        }
        &:nth-child(2){
            background: blue;
        }
        &:nth-child(3){
            background:cyan;
        }
    }

}
</style>
