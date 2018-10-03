<template>
    <!-- 不知道什么时候得到 max 值 ，但是，总归有一刻，会得到一个真正的max值 
    可以使用 watch 属性监听，来监听 父组件 传递过来的 max值，不管 watch 会被触发几次
    但是最后一次，肯定是一个合法 max 值
    -->
    <div class="mui-numbox" data-numbox-min='1' >
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" 
        @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
    import mui  from '../../lib/mui/js/mui.min'
    export default { 
        mounted(){
            //初始化数字选择框
            mui('.mui-numbox').numbox()
            // console.log(this.max)
        },
        methods:{
            countChanged(){
                //每当文本框的数据被修改,立即把最新的数据，通过事件调用，传给父组件
                // console.log(this.$refs.numbox.value)
                this.$emit('getcount',parseInt(this.$refs.numbox.value))
            }
        },
        props:["max"],
        watch:{
            'max':function(newVal,oldVal){
                //使用JS API设置 numbox 的最大值
            mui('.mui-numbox').numbox().setOption('max',newVal)
            }
        }
    }
    
</script>

<style lang="scss" scoped>

</style>


