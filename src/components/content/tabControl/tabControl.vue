<template>
  <div class='tab-control'>
      <div v-for="(item,index) in titles" class='tab-control-item'
       :class='{active:index === indexItem}' 
       @click='itemClick(index)'>
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:"TabControl",
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            indexItem:0
        }
    },
    methods:{
        itemClick(index){
            // console.log(index);
            this.indexItem = index;
            this.$emit('tabClick',index);
        },
    }
    
}
</script>

<style>
.tab-control{
    display:flex;
    text-align: center;
    height:44px;
    line-height:44px;
    font-size:15px;
    background-color:#fff;
    cursor: pointer;
    /* z-index:10; */
}
.tab-control-item{
    flex:1;
    z-index:10;
}
.active span{
    color:var(--color-tint);
    border-bottom:3px solid var(--color-tint);
    padding:5px;
}
.active{
    color:var(--color-high-text);
}
</style>