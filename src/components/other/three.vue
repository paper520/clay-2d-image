<template>
    <div id='curve_graph'></div>
</template>

<script>
import clay from "../../clay.js";

// 组件
import "../../clay.js/curve-graph.js";

export default {
  mounted: function() {
    clay("#curve_graph").use("curveGraph", {});
  }
};
</script>
<style lang="scss" scoped>
div {
  height: 100vh;
  text-align: center;
  padding-top: 1rem;
}
</style>

