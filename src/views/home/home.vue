<template>
<div id='home'>
  <nav-bar class="home-nav">
    <div slot='conter'>首页</div>
  </nav-bar>
  <tab-control :titles='["流行","新款","精选"]' @tabClick='tabClick' ref='tabControl1' class='tab-control' v-show='isTabFixed'/>
  <scroll class='contents' ref='scroll' 
  :probe-type='3' :pull-up-load='true'
   @scroll='contentScroll' @pullingUp='loadMore' >
    <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'/>
    <home-recommend-view :recommends="recommends" />
    <feature/>
    <tab-control :titles='["流行","新款","精选"]' @tabClick='tabClick' ref='tabControl2'/>
    <goods-list :goods="showGoods"/>
  </scroll>
  <back-top @click.native ="backClick" v-show='this.isShowBackTop'/>
  
  
</div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import HomeRecommendView from "./childComps/HomeRecommendView"
import Feature from './childComps/FeatureView'

import NavBar from "components/common/navtab/NavBar"
import TabControl from "components/content/tabControl/tabControl"
import GoodsList from "components/content/goodsHome/GoodsList"

import {getHomeMultidata,getHomeGoods} from 'network/home.js'
import Scroll from 'components/common/scroll/Scroll'
// import BackTop from 'components/content/backTop/BackTop'

import {itemListenerMixin,backTopMixin} from 'common/mixin'
export default {
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      Feature,
      TabControl,
      Scroll,
      // BackTop,
      GoodsList
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currenType:'pop',
        // isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh();
    },
    deactivated(){//处于不活跃状态时
      this.saveY = this.$refs.scroll.getScrollY();
      //取消全局事件监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    computed:{//计算属性
      showGoods(){
        return this.goods[this.currenType].list
      },
    },
    created(){
      //1.请求多个数据
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted(){},
    methods:{
      //监听方法
      tabClick(index){
        switch(index){
          case 0:
            this.currenType = 'pop';
            break;
          case 1:
            this.currenType = 'new';
            break;
          case 2:
            this.currenType = 'sell';
            break;
        }
        this.$refs.tabControl1.indexItem = index;
        this.$refs.tabControl2.indexItem = index;
      },
      // backClick(){
      //   // console.log(this.$refs.scroll.scroll)
      //   this.$refs.scroll.scrollTo(0,0);
        
      // },
      contentScroll(position){
        this.listenShowBackTop(position);//滚动到一定位置显示返回顶部按钮
        //根据滚动条高度动态对决定tabControl样式
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
        // console.log((-position.y)>this.tabOffsetTop)
      },
      loadMore(){
        // console.log('上拉加载更新')
        this.getHomeGoods(this.currenType);
        this.$refs.scroll.refresh();
      },
      swiperImageLoad(){//监听轮播图片加载获取正确的OffsetTop值
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      //  console.log(this.tabOffsetTop)
      },
      //网络请求方法
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res.data)
          this.banners = res.data.banner.list;//将数据保存在data数据属性里
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1; 
        // console.log(this.goods[type]);
        getHomeGoods(type,page).then(res=>{
          // console.log(res.data.list)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page+=1;
          this.$refs.scroll.finishPullUp();
        })
      }
    }
}
</script>

<style>
#home{
  position: relative;
  height:100vh;
  /* padding-top:44px; */
}
.home-nav{
  background-color:var(--color-tint);
  color:#fff;
  /* position:fixed; 在浏览器原生滚动时,为了让导航不跟随一起滚动
  left:0;
  right:0;
  top:0;
  bottom:0;
  z-index:9; */
}

.contents{
  position:absolute;
  top: 44px;
  bottom: 49px;
  left:0;
  right:0;
  overflow:hidden;
}
.tab-control{
  position:relative;
  z-index: 9;
}
/* .content{
  height: calc(100% - 93px);
  overflow:hidden;
  margin-top:44px;
} */
</style>