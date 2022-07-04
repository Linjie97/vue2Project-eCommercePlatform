<template>
  <div class="spec-preview">
    <!-- 控制台报错的原因是空数组第一个元素就是undefined，没办法读取到imgUrl属性
    在父组件请求数据的时候加一个||[{}] -->
    <img :src='skuImageList[currentIndex].imgUrl' />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src='skuImageList[currentIndex].imgUrl'  ref="big"/>
    </div>
    <!-- 蒙层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        currentIndex:0 
      }
    },
    mounted(){
      // 全局事件总线：获取兄弟组件传递过来的索引值
      this.$bus.$on('getIndex',(index)=>{
         this.currentIndex = index;
      })
    },
    methods:{
      handler(event){
        let mask = this.$refs.mask;
        let big = this.$refs.big;
        let left = event.offsetX - mask.offsetWidth/2;
        let top = event.offsetY - mask.offsetHeight/2;
        // 约束范围
        if(left<0) left = 0;
        // 这里是因为两个蒙版正好是整个盒子的宽度
        if(left>= mask.offsetWidth) left = mask.offsetWidth;
        if(top<0) top = 0;
        if(top>= mask.offsetHeight) top = mask.offsetHeight;
        // 修改元素的left|top属性
        mask.style.left = left+'px';
        mask.style.top = top+'px';
        // 放大镜：放大两倍，并向右向下移动
        big.style.left = -2*left+'px';
        big.style.top = -2*top+'px';
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>