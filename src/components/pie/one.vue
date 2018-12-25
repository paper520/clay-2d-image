<template>
  <div>
    <canvas width=500 height=320>非常抱歉，您的浏览器不支持canvas!</canvas>
  </div>
</template>

<script>
import clay from "../../clay.js";

// 数据
import income from "../../assets/income.json";

// 组件
import "../../clay.js/normalPie.js";

export default {
  mounted: function() {
    clay("canvas:first-child").use("normalPie", income);
  }
};
</script>
<style lang="scss" scoped>
div {
  height: 100vh;
  text-align: center;
  & > canvas {
    margin-top: 1rem;
  }
}
</style>

