<template>
    <div>
        <canvas width=600 height=600>非常抱歉，您的浏览器不支持canvas!</canvas>
    </div>
</template>

<script>
import clay from "../../clay.js";

// 数据
var rental_price = {
  data: [
    // 租房价格：最低、最高、平均
    ["北京", 5000, 10000, 6785.71],
    ["上海", 4000, 10000, 6825],
    ["深圳", 3000, 6500, 4463.33],
    ["广州", 2500, 5600, 3793.83],
    ["苏州", 2000, 4000, 3060],
    ["杭州", 2000, 4000, 3222.33],
    ["南京", 2500, 4000, 3133.33],
    ["福州", 1800, 4000, 3100],
    ["青岛", 2000, 3500, 2750],
    ["济南", 2000, 3000, 2500],
    ["长春", 1800, 3000, 2433.33],
    ["大连", 2000, 2700, 2375],
    ["温州", 1500, 2800, 2150],
    ["郑州", 1500, 2300, 2100],
    ["武汉", 1600, 3500, 2057.14],
    ["成都", 1500, 2600, 2037.5],
    ["东莞", 1500, 2417.54, 1905.85],
    ["沈阳", 1500, 2000, 1775],
    ["烟台", 1500, 1800, 1650]
  ]
};

// 组件
import "../../clay.js/barPolar.js";

export default {
  mounted: function() {
    clay("canvas:first-child").use("barPolar", rental_price);
  }
};
</script>
<style lang="scss" scoped>
div {
  height: 100vh;
  text-align: center;
  & > canvas {
    margin-top: 0.2rem;
  }
}
</style>

