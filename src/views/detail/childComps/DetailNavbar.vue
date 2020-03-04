<template>
  <div>
      <nav-bar>
          <div slot='left' class='nav-img' @click='backClick'>
            <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot='conter' class='nav-titles'>
                <div v-for='(item, index) in titles' class='nav-item' 
                    :class='{activa:index===cunrrentIndex}' @click='clickIndex(index)'>
                    {{item}}
                </div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navtab/NavBar'
export default {
    name:"DetailNavBar",
    components:{
        NavBar
    },
    data(){
        return {
            titles:['商品','参数','评论','推荐'],
            cunrrentIndex:0
        }
    },
    methods:{
        backClick(){
            this.$router.back()
        },
        clickIndex(index){
            this.cunrrentIndex = index
            this.$emit('clickIndex',index);
        }
    }
}
</script>

<style>
.nav-titles{
    display:flex;
    font-size:12px;
}
.nav-item{
    flex:1;
}
.nav-img img{
    margin-top:12px;
}
.activa{
    color:var(--color-high-text)
}
</style>