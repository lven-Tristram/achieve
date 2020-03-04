import Vue from 'vue'
import Router from 'vue-router'
import TabBar from '@/components/common/tabbar/tabBar'

const Home = ()=>import('views/home/home');
const Category = ()=>import('views/category/Category');
const Cart = ()=>import("views/cart/Cart");
const Profile = ()=>import("views/profile/Profile");
const Detail = ()=>import("views/detail/Detail");

//1安装插件
Vue.use(Router)
//2创建路由对象
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  },
];

const router = new Router({
  routes,
  mode:'history'
});

//3.导出 router
export default router;