<template>
  <nav>
    <header>
      <em @click="toGithub">
        clay-2d-image
      </em>
      主要是使用clay.js绘制的一些有趣2D的图形用例
    </header>
    <router-link to="/pie_one"></router-link>
    <router-link to="/tree_one"></router-link>
    <router-link to="/other_one"></router-link>
    <router-link to="/other_two"></router-link>
    <router-link to="/other_three"></router-link>
    <a class='_blank'>-补充对齐-</a>
    <a class='_blank'>-补充对齐-</a>
    <a class='_blank'>-补充对齐-</a>
    <a class='_blank'>-补充对齐-</a>
    <a class='_blank'>-补充对齐-</a>
    <a class='_blank'>-补充对齐-</a>
    <a class='_blank'>-补充对齐-</a>
  </nav>
</template>

<script>
export default {
  methods: {
    toGithub: function() {
      window.location.href = "https://github.com/yelloxing/clay-2d-image";
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  text-align: center;
  padding: 0.3rem 0;
  & > header {
    line-height: 0.3rem;
    & > em {
      display: block;
      font-style: normal;
      font-size: 0.22rem;
      line-height: 0.6rem;
      cursor: pointer;
      &::before {
        background-image: url("assets/clay.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 50%;
        display: block;
        content: " ";
        height: 0.7rem;
        width: 0.7rem;
        border-radius: 50%;
        background-color: #ecf3f7;
        margin: auto;
      }
    }
  }
  & > a {
    display: inline-block;
    width: 3rem;
    height: 2rem;
    margin-top: 0.4rem;
    text-align: center;
    background-size: 100% auto;
    background-repeat: no-repeat;
    vertical-align: top;
    background-position: center;
    font-size: 0;
    &._blank {
      opacity: 0;
      height: 0;
    }
    &:nth-child(2) {
      background-image: url("assets/pie_one.png");
    }
    &:nth-child(3) {
      background-image: url("assets/tree_one.png");
    }
    &:nth-child(4) {
      background-image: url("assets/other_one.png");
    }
    &:nth-child(5) {
      background-image: url("assets/other_two.png");
    }
    &:nth-child(6) {
      background-image: url("assets/other_three.png");
    }
  }
}
</style>



