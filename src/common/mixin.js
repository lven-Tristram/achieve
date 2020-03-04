import {debounce} from './utli'
import BackTop from 'components/content/backTop/BackTop'
import {POP,NEW,SELL} from './const'
export const itemListenerMixin = {//这里可以放置很多方法,methods,computed
    data(){
        return {
            itemImgListener:null,
            refresh:null
        }
    },
    mounted(){
      this.refresh = debounce(this.$refs.scroll.refresh,800)
      this.itemImgListener = ()=>{
        this.refresh()
      };
      //监听GoodsListImte中的图片加载完成
      this.$bus.$on('itemImageLoad',this.itemImgListener);
    //   console.log('我是混入mounted')
    },
}

export const backTopMixin = {//返回顶部
  components:{
    BackTop
  },
  data(){
    return {
      isShowBackTop:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0);
    },
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y)>1000
    }
  }
}

export const tabControlMini = {
  data(){
    return {
      currentType:POP
    }
  },
  methods:{
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break;
      }
      // console.log(this.currentType)
    }
  }
}