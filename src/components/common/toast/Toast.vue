<template>
  <div class='toast' v-show='isShow'>
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
    name:"Toast",
    data(){
        return{
            message:'',
            isShow:false
        }
    },
    methods:{
        show(message='弹出消息',duration=2000){
            this.message = message;
            this.isShow = true;
            setTimeout(()=>{
                this.isShow = false;
                this.message = ''
            },duration)
        }
    }
}
</script>

<style>
.toast{
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index: 999;
    padding:8px 10px;
    color:#fff;
    border-radius: 5px;
    background-color:rgba(0,0,0,.75);
}
</style>