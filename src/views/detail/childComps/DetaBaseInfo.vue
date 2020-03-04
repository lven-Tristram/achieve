<template>
  <div v-if="Object.keys(goods).length !== 0" class='base-info'>
     <div class='info-title'>{{goods.title}}</div>
        <div class='info-price'>
          <span class='n-price'>{{goods.newPrice}}</span>
          <span class='o-price'>{{goods.oldPrice}}</span>
          <span v-if='goods.discount' class='discount'>{{goods.discount}}</span>
      </div>
     <div class='info-other'>
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.service[goods.service.length-1].name}}</span>
      </div>
       <div class='info-service'>
          <span class='info-service-item' v-for='index in goods.service.length-1' :key='index'>
              <img :src="goods.service[index-1].icon" alt="">
              <span>{{goods.service[index-1].name}}</span>
          </span>
      </div>
  </div>
</template>

<script>
export default {
    name:"DataBaseInfo",
    props:{
        goods:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    
}
</script>

<style>
.base-info{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    height:140px;
    padding:0 10px;
    margin-top:15px;
}
.info-price{
    display:flex;
}
.info-title{
    font-size:16px;
    font-weight:550;
    color:black;
    letter-spacing: 1px;
    text-indent:10px;
    text-align:justify;
}
.n-price{
    font-size:19px;
    color:var(--color-high-text);
}
.o-price{
    padding:0 5px;
    font-size:12px;
    align-self:flex-end;
}
.discount{
    height:15px;
    padding:0 3px;
    font-size:12px;
    color:#fff;
    background-color:var(--color-tint);
    border-radius:5px;
    line-height: 15px;
}
.info-other{
    display:flex;
    justify-content:space-between;
}
.info-other span{
    font-size:12px;
    color:var(--color-text);
}
.info-service{
    display:flex;
    justify-content:space-between;
    font-size:12px;
}
.info-service-item{
    display:flex;
}
.info-service-item span{
    margin-left:5px;
}
.info-service img{
    width:12px;
    height:12px;
}
</style>