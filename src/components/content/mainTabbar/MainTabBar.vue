<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/home-l.svg" alt=""><!--assets/img/tabbar/home-l.svg-->
        <img slot="item-icon-active" src="~assets/img/tabbar/home.svg" alt="">
        <div  slot='item-text'>首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/product-cate.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/widgets-f.svg" alt="">
        <div  slot='item-text'>分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/purchase.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/sponsor-l.svg" alt="">
        <div  slot='item-text'>购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/vipuser-l.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/vipuser-f.svg" alt="">
        <div  slot='item-text'>我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/tabBar';
import TabBarItem from 'components/common/tabbar/tabbarItem';
export default {
    name:"MainTabBar",
    components:{
        TabBar,
        TabBarItem
    }
}
</script>

<style>

</style>