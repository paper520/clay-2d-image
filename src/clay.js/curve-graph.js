import clay from "./index.js";
clay.component("curveGraph", function () {
    return {
        "link": function (element) {

            // 2015 和 2016降水量
            var data = {
                "2015": [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                "2016": [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
            };

            clay('<canvas>非常抱歉，您的浏览器不支持canvas!</canvas>')
                .appendTo(element)
                .attr('width', 600)
                .attr('height', 420);

            // 需要三个图层
            var layer = clay('canvas').layer(),
                // 温馨提示：后获取的图层在上层
                painter1 = layer.painter('background'),
                painter2 = layer.painter('infomation'),
                painter3 = layer.painter('line');

            // 文字设置
            painter1.textBaseline = 'middle';

            // 在背景图层绘制刻度尺和提示文字等
            clay.loop([
                // y坐标，颜色
                [60, '#538bf6'],
                [120, '#cccccc'],
                [180, '#cccccc'],
                [240, '#cccccc'],
                [300, '#cccccc'],
                [360, '#e42d58']
            ], function (num) {

                // 画线条
                painter1.beginPath();
                painter1.moveTo(60, num[0]);
                painter1.lineTo(540, num[0]);
                painter1.lineWidth = 1;
                painter1.strokeStyle = num[1];
                painter1.closePath();
                painter1.stroke();

                // 画刻度
                painter1.beginPath();
                painter1.moveTo(60, num[0]);
                painter1.lineTo(50, num[0]);
                painter1.lineWidth = 1;
                painter1.strokeStyle = "#333333";
                painter1.closePath();
                painter1.stroke();

                // 添加刻度值
                painter1.textAlign = 'right';
                painter1.fillText(250 - (num[0] - 60) / 300 * 250, 45, num[0]);

            });

            clay.loop([
                [80, '2015-1', '2016-1'],
                [160, '2015-3', '2016-3'],
                [240, '2015-5', '2016-5'],
                [320, '2015-7', '2016-7'],
                [400, '2015-9', '2016-9'],
                [480, '2015-11', '2016-11']
            ], function (num) {

                // 画刻度
                painter1.beginPath();
                painter1.moveTo(num[0], 50);
                painter1.lineTo(num[0], 60);
                painter1.lineWidth = 1;
                painter1.strokeStyle = "#538bf6";
                painter1.closePath();
                painter1.stroke();

                painter1.beginPath();
                painter1.moveTo(num[0], 360);
                painter1.lineTo(num[0], 370);
                painter1.lineWidth = 1;
                painter1.strokeStyle = "#e42d58";
                painter1.closePath();
                painter1.stroke();

                // 添加刻度值
                painter1.textAlign = 'center';
                painter1.fillStyle = "#538bf6";
                painter1.fillText(num[1], num[0], 40);

                painter1.fillStyle = "#e42d58";
                painter1.fillText(num[2], num[0], 380);

            });

            // 补充额外一条线
            painter1.beginPath();
            painter1.moveTo(60, 60);
            painter1.lineTo(60, 360);
            painter1.lineWidth = 1;
            painter1.strokeStyle = "#333333";
            painter1.closePath();
            painter1.stroke();

            function toImageData(oralData) {
                var flag = 0, imageData = [];
                for (; flag < oralData.length; flag++) {
                    imageData.push([
                        40 * flag + 80,
                        (250 - oralData[flag]) / 250 * 300 + 60
                    ]);
                }
                return imageData;
            }

            // 获取二条曲线的插值函数
            var data2015 = toImageData(data['2015']),
                data2016 = toImageData(data['2016']),
                line2015 = clay.cardinal().setP(data2015),
                line2016 = clay.cardinal().setP(data2016);

            // 启动动画
            clay.animation(function (deep) {

                var flag;
                // 2015年
                painter3.beginPath();
                painter3.moveTo(80, line2015(80));
                for (flag = 80; flag <= deep * 440 + 80; flag += 0.1) {
                    painter3.lineTo(flag, line2015(flag));
                }
                painter3.strokeStyle = "#538bf6";
                painter3.stroke();

                // 2016年
                painter3.beginPath();
                painter3.moveTo(80, line2016(80));
                for (flag = 80; flag <= deep * 440 + 80; flag += 0.1) {
                    painter3.lineTo(flag, line2016(flag));
                }
                painter3.strokeStyle = "#e42d58";
                painter3.stroke();

                // 更新页面
                layer.update();
            }, 700, function () {

                // 绘制点
                var flag;
                painter3.fillStyle = "#fff";
                painter3.lineWidth = 0.5;
                for (flag = 80; flag <= 520; flag += 40) {

                    // 2015
                    painter3.beginPath();
                    painter3.strokeStyle = "#538bf6";
                    painter3.arc(flag, line2015(flag), 2, 0, Math.PI * 2);
                    painter3.stroke();
                    painter3.fill();

                    // 2016
                    painter3.beginPath();
                    painter3.strokeStyle = "#e42d58";
                    painter3.arc(flag, line2016(flag), 2, 0, Math.PI * 2);
                    painter3.stroke();
                    painter3.fill();
                }

                layer.update();

                // 动画结束添加虚线
                painter2.setLineDash([2]);
                painter2.lineWidth = 2;
                painter2.textAlign = 'right';
                painter2.textBaseline = 'middle';
                var canvasClay = clay('canvas').bind('mousemove', function (event) {

                    event = event || window.event;
                    var pos = canvasClay.position(event);

                    layer.clean(painter2);

                    if (pos.x > 60 && pos.x < 540 && pos.y > 60 && pos.y < 360) {
                        painter2.beginPath();
                        painter2.moveTo(60, pos.y);
                        painter2.lineTo(540, pos.y);
                        painter2.stroke();

                        painter2.beginPath();
                        painter2.moveTo(pos.x, 60);
                        painter2.lineTo(pos.x, 360);
                        painter2.stroke();

                        // 绘制提示文字
                        painter2.beginPath();
                        painter2.rect(10, pos.y - 10, 50, 20);
                        painter2.fillStyle = '#000';
                        painter2.fill();
                        painter2.fillStyle = '#fff';
                        painter2.fillText((250 - (pos.y - 60) / 300 * 250).toFixed(2), 55, pos.y);

                    }

                    layer.update();
                });
            });

            // 绘制提示信息
            painter1.fillStyle = "#fff";
            painter1.lineWidth = 1;

            painter1.beginPath();
            painter1.strokeStyle = "#538bf6";
            painter1.moveTo(190, 10);
            painter1.lineTo(220, 10);
            painter1.stroke();
            painter1.beginPath();
            painter1.moveTo(210, 10);
            painter1.arc(205, 10, 5, 0, Math.PI * 2);
            painter1.stroke();
            painter1.fill();

            painter1.beginPath();
            painter1.strokeStyle = "#e42d58";
            painter1.moveTo(300, 10);
            painter1.lineTo(330, 10);
            painter1.stroke();
            painter1.beginPath();
            painter1.moveTo(320, 10);
            painter1.arc(315, 10, 5, 0, Math.PI * 2);
            painter1.stroke();
            painter1.fill();

            painter1.fillStyle = "#000";
            painter1.fillText('2015降水量', 260, 10);
            painter1.fillText('2016降水量', 370, 10);

            layer.update();
        }
    };
});
