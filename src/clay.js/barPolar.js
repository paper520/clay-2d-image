import clay from "./index.js";
clay.component("barPolar", function () {
    return {
        "link": function (element, $scope) {

            var i, j, k,
                // 图层管理者
                layerManger = element.layer(),
                // 区域管理者
                regionManger = element.region();

            // 分别用于绘制背景、数据图形和悬浮提示的图层
            var bg_pencil = layerManger.painter('bg'),
                arc_pencil = layerManger.painter('arc'),
                prompt_pencil = layerManger.painter('prompt');

            // 5个圆环
            bg_pencil.strokeStyle = '#ccc';
            for (i = 1; i <= 5; i++) {
                if (i == 5) bg_pencil.strokeStyle = '#000';
                bg_pencil.beginPath();
                bg_pencil.moveTo(300 + i * 50, 300);
                bg_pencil.arc(300, 300, i * 50, 0, Math.PI * 2);
                bg_pencil.stroke();
            }

            bg_pencil.fillStyle = '#000';
            bg_pencil.textAlign = 'center';//左右居中
            bg_pencil.textBaseline = 'middle';//上下居中
            // 画弧对象
            var arc = clay.canvas.arc(bg_pencil)
                .setCenter(300, 300)
                .setRadius(250, 260);

            // 绘制外弧刻度和文字
            k = 2 * Math.PI / $scope.data.length;
            var matrix4 = clay.Matrix4().rotate(-0.5 * k, 300, 300);
            for (i = 0; i < $scope.data.length; i++) {
                // 刻度
                arc(-0.5 * Math.PI + k * i - 0.0025, 0.005);
                // 文字
                j = matrix4.rotate(k, 300, 300).use(300, 30);
                bg_pencil.strokeText($scope.data[i][0], j[0], j[1]);
            }

            // 绘制垂直刻度和数字
            bg_pencil.beginPath();
            bg_pencil.moveTo(300, 300);
            bg_pencil.lineTo(300, 50);
            bg_pencil.stroke();
            bg_pencil.textAlign = 'right';
            for (i = 0; i < 6; i++) {
                // 刻度
                bg_pencil.beginPath();
                bg_pencil.moveTo(290, 300 - i * 50);
                bg_pencil.lineTo(300, 300 - i * 50);
                bg_pencil.stroke();
                // 数字
                bg_pencil.strokeText(i * 2000, 285, 300 - i * 50);
            }

            // 初始化动画
            arc.painter(arc_pencil)
                .config({
                    "fillStyle": "#b2453e"
                });
            clay.animation(function (deep) {
                layerManger.clean(arc_pencil);
                for (i = 0; i < $scope.data.length; i++) {
                    arc(-0.5 * Math.PI + k * i + 0.5 * k - k * 0.4, k * 0.8, deep * 250 * $scope.data[i][1] / 10000, deep * 250 * $scope.data[i][2] / 10000).fill();
                }
                layerManger.update();
            }, 700, function () {
                arc.config({
                    "fillStyle": "#334553"
                });
                // 绘制平均值
                for (i = 0; i < $scope.data.length; i++) {
                    j = 250 * $scope.data[i][3] / 10000;
                    arc(-0.5 * Math.PI + k * i + 0.5 * k - k * 0.4, k * 0.8, j - 2, j + 2).fill();
                }
                layerManger.update();
                // 绘制区域
                for (i = 0; i < $scope.data.length; i++) {
                    regionManger.drawer(i, function (pencil) {
                        arc.painter(pencil)(-0.5 * Math.PI + k * i + 0.5 * k - k * 0.4, k * 0.8, 250 * $scope.data[i][1] / 10000, 250 * $scope.data[i][2] / 10000).fill();
                    });
                }
                prompt_pencil.textBaseline = 'middle';
                prompt_pencil.fillStyle = 'rgba(120,120,120,.7)';
                prompt_pencil.strokeStyle = 'rgb(250,250,250)';
                prompt_pencil.font = '12px Arial';
                // 悬浮提示信息
                element.bind('mousemove', function (event) {
                    event = event || window.event;
                    k = regionManger.getRegion(event);
                    layerManger.clean(prompt_pencil);
                    if (k) {
                        element.css('cursor', 'pointer');
                        i = $scope.data[k[0]];
                        prompt_pencil.beginPath();
                        prompt_pencil.rect(k[1] + 16, k[2] - 15, 120, 76);
                        prompt_pencil.fill();
                        prompt_pencil.strokeText(i[0], k[1] + 26, k[2]);
                        prompt_pencil.strokeText("最低：" + i[1] + "元", k[1] + 26, k[2] + 16);
                        prompt_pencil.strokeText("最高：" + i[2] + "元", k[1] + 26, k[2] + 32);
                        prompt_pencil.strokeText("平均：" + i[3] + "元", k[1] + 26, k[2] + 48);
                    }
                    layerManger.update();
                });
            });

            layerManger.update();
        }
    };
});