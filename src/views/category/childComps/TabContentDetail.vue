<template>
  <grid-view>
      <goods-list-item v-for='(item,index) in categoryDetail' :key='index' :goodsItem='item'></goods-list-item>
  </grid-view>
</template>

<script>
import GridView from 'components/common/gridView/GridView'
import GoodsListItem from 'components/content/goodsHome/GoodsListItem'
export default {
    name:'TabContentDetail',
    components:{
        GridView,
        GoodsListItem
    },
    props:{
        categoryDetail:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>

</style>