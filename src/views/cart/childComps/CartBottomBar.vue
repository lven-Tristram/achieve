<template>
  <div class='bottom-bar'>
      <div class='check-content'>
          <check-buttom :is-checked='isSelectAll' class='check-button' @click.native='checkClick'/>
          <span>全选</span>
      </div>
      <div class='price'>
          合计:{{totalPrice}}
      </div>
      <div class='calculate' @click='settlement'>
          结算({{checkLength}})
      </div>
  </div>
</template>

<script>
import CheckButtom from 'components/content/checkButtom/CheckButtom'
import {mapGetters} from 'vuex'
export default {
    name:"CartBottomBar",
    components:{
        CheckButtom
    },
    computed:{
        ...mapGetters(['cartList']),
        totalPrice(){
            return '＄' + this.cartList.filter(item => {
                // console.log(item);
                return item.checked
            }).reduce((preValue,item) => {
                //  console.log(preValue);
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.cartList.filter(item => item.checked).length
        },
        isSelectAll(){//全选状态
            if(this.cartList.length ===0 ) return false;
            //1.filter方法
            // return !(this.cartList.filter(item => !item.checked).length)
            //2.find方法
            return !this.cartList.find(item => !item.checked)
        }
    },
    methods:{
        checkClick(){
            if(this.isSelectAll){//全选状态下,点击后不全选
                this.cartList.forEach(item => item.checked = false)
            }else{//某些未选中或者不全选中,点击后为全选
                this.cartList.forEach(item => item.checked = true)
            }
        },
        settlement(){
            if(this.checkLength === 0) this.$toast.show('请添加商品')
        }
    }
}
</script>

<style>
.bottom-bar{
    position: relative;
    display:flex;
    height:40px;
    background-color:#ccc;
}
.check-content{
    display:flex;
    align-items:center;
    width:80px;
}
.check-button{
    width:20px;
    height:20px;
    margin:0 8px 0 20px;
}
.price{
    text-align: center;
    line-height: 40px;
    flex:1;
    /* color:#eee; */
}
.calculate{
    width:80px;
    line-height: 40px;
    background-color:red;
    color:#fff;
    text-align: center;
    }
</style>