<template>
  <div id='datail'>
      <detail-nav-bar class='datail-nav' @clickIndex='titleClick' ref='nav'/>
      <scroll class='content-det' ref='scroll' :probe-type='3' @scroll='contentScroll'>
        <detail-swiper :topImages='topImages'/>
        <deta-base-info :goods='goods'/>
        <detail-shop-info :shop='shop'/>
        <detail-goods-info :detailInfo='detailInfo' @imageLoad='imgLoad'/>
        <detail-params-info ref='params' :paramInfo='paramInfo'/>
        <detail-comment-info ref='comment' :commentInfo='commentInfo'/>
        <goods-list ref='recommend' :goods='recommend'/>
      </scroll>
      <detail-bottom-bar @addToCart='addToCart'/>
      <back-top @click.native ="backClick" v-show='this.isShowBackTop'/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavbar'
import DetailSwiper from './childComps/DetailSwiper'
import DetaBaseInfo from './childComps/DetaBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamsInfo from './childComps/DetailParamsInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from 'components/content/goodsHome/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import {debounce} from 'common/utli'
import {mapActions} from 'vuex'
export default {
    name:"Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetaBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailBottomBar,
        Scroll,
        DetailParamsInfo,
        DetailCommentInfo,
        GoodsList,

    },
    data(){
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommend:[],
            getThemeTopY:null,
            themeTopYs:[],
            currentIndex:0,
        }
    },
    mixins:[itemListenerMixin,backTopMixin],
    deactivated(){
        this.$bus.$off('itemImageLoad',this.itemImgListener)
    },
    created(){
        this.iid = this.$route.params.iid
        getDetail(this.iid).then(res=>{
            // console.log(res);
            const data = res.result;
            this.topImages = data.itemInfo.topImages;
            //获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
            //获取店铺信息
            this.shop = new Shop(data.shopInfo);
            // console.log(this.shop)
            //获取商品详情信息
            this.detailInfo = data.detailInfo;
            //获取商品参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
            if(data.rate.cRate !==0 ){
                this.commentInfo = data.rate.list[0]
            }
            this.getThemeTopY = debounce(()=>{
                this.themeTopYs = [];
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                this.themeTopYs.push(Number.MAX_VALUE);
                //  console.log(this.themeTopYs)
            },1000)
            
        })
        //商品推荐数据
        getRecommend().then(res=>{
            this.recommend = res.data.list;
        })
        
    },
    methods:{
        ...mapActions(['addCart']),
        imgLoad(){
            this.refresh();
            this.getThemeTopY();
            // console.log('this.themeTopYs')
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
            // console.log(index)
        },
        contentScroll(position){
            const positionY = -position.y;//获取y值
            let length = this.themeTopYs.length;
            //positionY与主题中值进行对比
            /**1.positionY在0和1200之间 index=0
             * 2.positionY在1200和1600之间 index=1
             * 3.positionY在2000和2300之间 index=2
             * 4.positionY在2600和2800之间 index=3
             */
            for(let i=0;i<length-1;i++){
                if(this.themeTopYs!==i && (positionY>this.themeTopYs[i] &&positionY<this.themeTopYs[i+1])){
                    this.currentIndex = i;
                    this.$refs.nav.cunrrentIndex = this.currentIndex;
                }
            }
            // for(let i=0;i<length;i++){
            //     if(this.currentIndex !==i && ((i<length-1 &&positionY >=this.themeTopYs[i] && positionY<this.themeTopYs[i+1] )||(i===length-1&&positionY >=this.themeTopYs[i]))){
            //         this.currentIndex = i;
            //         this.$refs.nav.cunrrentIndex = this.currentIndex;
            //         // console.log(this.currentIndex)
            //     }
            // }
            //是否显示回到顶部按钮
            this.listenShowBackTop(position);
        },
        addToCart(){
            //1.获取购物车商品展示信息
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;
            // console.log(product)
            //2.将商品信息添加到购物车里
            // this.$store.commit('addCart',product);
            // this.$store.dispatch('addCart',product).then(res => {
            //     console.log(res)
            // })
            this.addCart(product).then(res => {
                // console.log(res)
                this.$toast.show(res)
            })
            // console.log(product)
        }
    }
}
</script>

<style>
#datail{
    position: relative;
    height:100vh;
    background-color:#fff;
    z-index:10;
}
.datail-nav{
    position: relative;
    background-color:#fff;
    z-index:11;
}
.content-det{
    height:calc(100% - 44px - 49px);
}
</style>