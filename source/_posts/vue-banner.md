---
title: vue banner轮播
categories: vue.js
tags: ['js','css','html','vue.js']
---

以前没用用过spa实现轮播，这次想用单页模式写个轮播玩玩

### 代码如下

```

<template>
  <div class="home-page">
    <div class="banner-area">
      <ul class="swiper-container">
        <li class="slide" v-for="(url,index) in slideImgs" v-bind:key="index" v-bind:class="{active: slideActiveIndex == index}" v-bind:style="{background:'url('+url+')'}"></li>
      </ul>
      <ul class="slide-dot">
        <li v-for="(url,index) in slideImgs" v-bind:key="index" v-bind:class="{active: slideActiveIndex == index}" v-on:click="switchSlide(index)"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideImgs: ['https://img1.gtimg.com/v_syjx/pics/hv1/30/85/2218/144247155.jpg', 'https://img1.gtimg.com/v/pics/hv1/102/95/2218/144249777.jpg', 'https://img1.gtimg.com/v/pics/hv1/216/252/2218/144289926.jpg', 'https://img1.gtimg.com/ent/pics/hv1/157/15/2219/144294457.jpg'],//轮播图片
      slideActiveIndex: 0,//轮播下标
      _time: 0
    }
  },
  mounted() {
    this.slideLoop();
  },
  methods: {
    switchSlide(index) {
      clearInterval(this._time);
      this.slideActiveIndex = index;
      this.slideLoop();
    },
    //定时轮播
    slideLoop() {
      this._time = setInterval(this.next, 4000);
    },
    next() {
      if (this.slideActiveIndex + 1 >= this.slideImgs.length) {
        this.slideActiveIndex = 0;
      } else {
        this.slideActiveIndex++;
      }
    }
  },
  destroyed() {
    clearInterval(this._time);
  }
}
</script>
<style lang="less" scoped>
.home-page {
  font-size: 18px;
}

.banner-area {
  position: relative;
  height: 480px;
}

.swiper-container {
  height: 100%;
  position: relative;
  .slide {
    transition: all 1.8s ease;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    &.active {
      opacity: 1;
      z-index: 9;
    }
  }
}

.slide-dot {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%, 0);
  z-index: 9;
  font-size: 0;
  li {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
    margin-right: 10px;
    &.active {
      background-color: rgb(0, 161, 214);
    }
    &:hover {
      background-color: rgb(0, 161, 214);
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>


```

简单的实现了一个淡入淡出的轮播，感觉代码上比传统的写法少很多。还是蛮有趣的，后面还可以玩玩更复杂的轮播