<template>
  <div class='cart'>
    <nav-bar class='nav-bar'>
      <div slot='conter'>购物车({{length}})</div>
    </nav-bar>
    <cart-list/>
  <cart-bottom-bar/>
  </div>
  
</template>

<script>
import NavBar from 'components/common/navtab/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import {mapGetters} from 'vuex'
export default {
    name:'Cart',
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //两种语法
      // ...mapGetters(['cartLength'])
      ...mapGetters({length:'cartLength'})
    }
}
</script>

<style>
.cart{
  height:100vh;
}
.nav-bar{
  background-color:var(--color-tint);
  color:#fff;
  font-weight:600;
}
</style>