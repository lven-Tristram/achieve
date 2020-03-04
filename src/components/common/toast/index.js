import Toast from './Toast.vue'
const obj = {}
obj.install = function(Vue){
    //1.创建组件构造器
    const toastContrustor = Vue.extend(Toast);
    //2.new的方式,根据组件构造器,可以创建出一个组件对象
    const toast = new toastContrustor();
    //3.将组件对象,手动挂载到某一个元素上
    toast.$mount(document.createElement('div'));
    //toast.#el对应的就是当前这个div
    document.body.appendChild(toast.$el);
    //最后在Vue原型上添加$toast属性,将toast组件对象赋值给对方
     Vue.prototype.$toast = toast; //在Vue原型上加入$toast
}
export default obj