<template>
  <div v-if='Object.keys(detailInfo).length !== 0' class='goods-infos'>
      <div class='info-desc'>
          <div class='desc'>{{detailInfo.desc}}</div>
      </div>
      <div class='info-key'>{{detailInfo.detailImage[0].key}}</div>
      <div class='info-list'>
          <img v-for='(item,index) in detailInfo.detailImage[0].list' :src="item" @load='imgLoad' alt="">
      </div>
  </div>
</template>

<script>
export default {
    name:"DetailGoodsInfo",
    props:{
        detailInfo:{
            type:Object,
            defalt(){return {}}
        }
    },
    methods:{
        imgLoad(){
            this.$emit('imageLoad');
        }
    },
    watch:{
        datailInfo(){
            this.imagesLength = this.datailInfo.datailImage[0].list.length;
        }
    }
}
</script>

<style>
.info-desc{
    display:flex;
    flex-direction: column;
}
.info-desc::before{
    display:block;
    content:'';
    width:50px;
    height:1px;
    background-color:rgb(158, 144, 235);
    border-style:outset;
}
.info-desc::after{
    display:block;
    content:'';
    width:50px;
    height:1px;
    background-color:rgba(13, 119, 110, 0.829);
    align-self: flex-end;
    border-style:inset;
}
.desc{
    font-size:14px;
    margin:10px 0;
    padding:0 5px;
    text-indent:1em;
}
.info-key{
    font-size:14px;
    margin:15px 0 15px 5px;
}
.info-list{
    padding:0 5px;
}
.info-list img{
    width:auto;
    height:auto;
    max-width:100%;
    max-height:100%;
}
</style>