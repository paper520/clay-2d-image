<template>
    <div>
        <canvas width=1000 height=600>非常抱歉，您的浏览器不支持canvas!</canvas>
    </div>
</template>

<script>
import clay from "../../clay.js";

// 数据
import program from "../../assets/program.json";

// 组件
import "../../clay.js/normalTree.js";

export default {
  mounted: function() {
    clay("canvas:first-child").use("normalTree", program);
  }
};
</script>
<style lang="scss" scoped>
div {
  height: 100vh;
  text-align: center;
  & > canvas {
    margin-top: 0.3rem;
  }
}
</style>

