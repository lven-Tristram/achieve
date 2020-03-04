import {ADD_COUNTER,ADD_TO_CART} from './mutation-type'
export default {
    addCart(context,payload){
        //1.2使用for循环遍历
        // let oldProduct = null;
        // for(let item of state.cartList){ 
        //     if(item.iid === payload.iid){//根据商品id判断商品中是否有相同的商品
        //         oldProduct = item;
        //     }
        // }
        //1.1使用find()方法,查找之前数组中是否有该商品
       return new Promise((resolve,reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
            if(oldProduct){//当前商品数量+1
                resolve('当前商品数量+1')
                context.commit(ADD_COUNTER,oldProduct)
            }else{//添加新的商品
                resolve('当前商品已添加到购物车')
                payload.count = 1;
                context.commit(ADD_TO_CART,payload)
            }
        })
        
    }
}