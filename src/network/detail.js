import {request} from './request'
export function getDetail(iid){
    return request({
        url:'/detail',
        params:{iid}
    })
}
export function getRecommend(){
    return request({
        url:'/recommend'
    })
}
export class Goods{
    constructor(itemInfo,columns,services){
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.service = services;
        this.realPrice = itemInfo.lowNowPrice;
        this.desc = itemInfo.desc;//用于购物车展示商品描述
        this.realPrice = itemInfo.lowNowPrice;//有些价格有区间,写死商品的最低价格,用于购物车展示商品价格
    }
}

export class Shop{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}

export class GoodsParam{
    constructor(info,rule){
        //可能有些images没有值,所以判断,有值返回该值,没有值返回空
        this.image = info.images?info.images[0]:'';
        this.info = info.set;
        this.sizes = rule.tables;
    }
}