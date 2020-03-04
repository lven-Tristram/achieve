module.exports = {
  plugins: {
    autoprefixer: {}
  },
  "postcss-px-to-viewport":{
    viewportWidth:375,//视口的宽度,对应设计稿的宽度
    viewportHeight:667,//视口的高度,对应设计稿的高度
    unitPrecision:5,//指定'px'转换为视口单位值的小数位数
    viewportUnit:'vw',//指定转换视口的单位,转换单位为vw
    selectorBlackList:['tab-bar'],//指定不需要转换的类,该方式是按正则匹配
    minPixeValue:1,//小于或者等于1px不转换为视口单位
    mediaQuery:false,//允许媒体查询中转换
    exclude:[/TabBar/],//匹配文件,必须是正则表达式
  }
}
