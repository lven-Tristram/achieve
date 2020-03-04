<template>
  <div>
    <div class='shop-info'>
        <div class='shop-top'>
            <img :src="shop.logo" alt="">
            <span class='title'>{{shop.name}}</span>
        </div>
        <div class='shop-middle'>
            <div class='shop-middle-item shop-middle-left'>
                <div class='info-sells'>
                    <div class='sells-count'>
                        {{shop.sells | sellCountFilter}}
                    </div>
                    <div class='sells-text'>总销量</div>
                </div>
                <div class='info-goods'>
                    <div class='goods-count'>{{shop.goodsCount}}</div>
                    <div class='goods-text'>全部宝贝</div>
                </div>
            </div>
            <div class='shop-middle-item shop-middle-right'>
                <table>
                    <tr v-for='(item,index) in shop.score' :key='index'>
                        <td>{{item.name}}</td>
                        <td class='score' :class='{"score-btter":item.isBetter}'>{{item.score}}</td>
                        <td class='better' :class='{"better-more":item.isBetter}'><span>{{item.isBetter? '高':'低'}}</span></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class='shop-bottom'>
            <div class='enter-shop'>进店逛逛</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"DatailShopInfo",
    props:{
        shop:{
            type:Object,
            default(){return {}}
        }
    },
    filters:{
        sellCountFilter:function(value){
            if(value<10000) return value;
            return (value/10000).toFixed(1)+'万'
        }
    }
}
</script>

<style>
.shop-info{
    margin:20px 0 20px;
    border-top:5px solid #f1f1f2;
    border-bottom:5px solid #f1f1f2;
}
.shop-top{
    display:flex;
    margin:20px 0 0 10px;
}
.shop-top img{
    width:35px;
    height:35px;
}
.title{
    align-self: center;
    margin-left:8px;
    color:#000;
}
.shop-middle{
    display:flex;
    justify-content:space-between;
}
.shop-middle-item{
    flex:1;
    font-size:12px;
}
.shop-middle-left{
    display:flex;
    align-self: center;
    /* text-indent:10px; */
    justify-content: space-between;
    color:#000;
}
.info-sells{
    transform: translateX(22px)
}
.info-goods{
    text-align: center;
}
.sells-text,.goods-text{
    margin-top:5px;
}
.shop-middle-left::after{
    display:block;
    content:'';
    width:1px;
    height:28px;
    background-color:#e8e8e7;
    /* margin-left:25px; */
}
.shop-middle-right{
    text-align: right;
}
.shop-middle-right table{
    margin:auto;
    border-spacing:8px 8px;
}
.shop-middle-right span{
    color:#fff;
    background-color:#5ea732;
    text-align:center;
}
.shop-middle-right .score{
    color:#5ea732;
}
.shop-middle-right .score-btter{
    color:#f13e3a;
}
.shop-middle-right .better-more span{
    background-color:#f13e3a;
}

.enter-shop{
    width:120px;
    text-align: center;
    background-color:#edeff2;
    padding:5px 10px;
    border-radius: 5px;
    font-size:13px;
    margin:15px auto;
}
</style>