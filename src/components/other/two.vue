<template>
    <div>
        <svg width=800 height=500></svg>
    </div>
</template>

<script>
import clay from "../../clay.js";

// 数据
import chinaMap from "../../assets/map.china.json";

// 组件
import "../../clay.js/chinaMap.js";

export default {
  mounted: function() {
    clay("svg:first-child").use("chinaMap", chinaMap);
  }
};
</script>
<style lang="scss" scoped>
div {
  height: 100vh;
  text-align: center;
  & > svg {
    margin-top: 1rem;
  }
}
</style>

