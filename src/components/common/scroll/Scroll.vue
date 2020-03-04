<template>
  <div class='wrapper' ref='wrapper'>
      <div>
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"Scroll",
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        },
        data: {
		    type: Array,
            default: () => {
                return []
            }
        },
    },
    data(){
        return {
            scroll:null,
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
            click: true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,
        })
        //监听滚动位置
        if(this.probeType ===2 || this.probeType ===3){
            this.scroll.on('scroll',(position)=>{
            // console.log(position);
                this.$emit('scroll',position);
            })
        }
        if(this.pullUpLoad){
            //监听上拉加载
            this.scroll.on('pullingUp',()=>{
                // console.log('上拉加载更新了')
                this.$emit('pullingUp');
            })
        }
    },
    methods:{
        scrollTo(x,y,time=800){
          this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
            this.scroll.finishPullUp();
        },
        refresh(){
            // console.log('refresh执行了')
            this.scroll && this.scroll.refresh();
        },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0;
        }
    }
}
</script>

<style>

</style>