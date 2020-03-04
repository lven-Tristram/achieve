<template>
  <div class='recommend'>
      <div class='recommend-item' v-for="item in recommends">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:"HomeRecommendView",
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
    .recommend{
        display:flex;
        text-align: center;
        font-size:12px;
        padding:15px 0 22px;
        border-bottom:8px solid #eee;
    }
    .recommend-item{
        flex:1;
    }
    .recommend img{
        width:70px;
        height:70px;
        margin-bottom: 10px
    }
</style>