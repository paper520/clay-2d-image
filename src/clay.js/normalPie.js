import clay from "./index.js";
clay.component("normalPie", function () {
    return {
        "link": function (element, $scope) {

            // 图层
            var layer = element.layer(),

                // 画布尺寸
                size = element.size(),

                // 扇形
                arc = clay.canvas.arc(layer.painter('arc'))
                    .setCenter(size.width / 2, size.height / 2)
                    .config({
                        "strokeStyle": "#fff",
                        "lineWidth": 2
                    }),

                // 画笔
                pen, pencil = layer.painter("info")

            // 绘制文字对象
            var text = clay.canvas.text(layer.painter('text'))
                .setColor('#0f0')
                .setSize(10);

            // 配置连线
            pencil.strokeStyle = "#0f9";
            pencil.lineWidth = 1.5;

            // 建立布局
            clay.pieLayout()

                // 配置数据格式
                .setValue(function (orl) {
                    return orl.val;
                })

                // 配置绘图方法
                .drawer(function (info, index) {

                    // 启动动画
                    clay.animation(function (deep) {
                        // 配置
                        pen = arc.config({
                            "fillStyle": ["#6d9b2b", "#578662", "#579097", "#245291"][index]
                        })(info.begin, info.deg, 0, size.width / 6 * deep);

                        // 绘制
                        pen.fill();
                        pen.stroke();
                    }, 200, function () {
                        // 绘制文字
                        text(info.line[0][0] / 2 + size.width / 4, info.line[0][1] / 2 + size.height / 4, (info.p * 100).toFixed(0) + "%").fill();
                    });

                    // 绘制子环
                    clay.pieLayout()

                        .setDeg(info.deg)
                        .setBegin(info.begin)

                        // 配置数据格式
                        .setValue(function (orl) {
                            return orl.val;
                        })

                        // 配置绘图方法
                        .drawer(function (_info) {

                            // 启动动画
                            clay.animation(function (deep) {
                                // 配置
                                pen = arc.config({
                                    "fillStyle": ["#99c163", "#70a976", "#6ab0be", "#4670ae"][index]
                                })(_info.begin, _info.deg, size.width / 6, size.width / (6 - 2 * deep));

                                // 绘制
                                pen.fill();
                                pen.stroke();

                                // 更新
                                layer.update();
                            }, 1200, function () {

                                // 绘制连线
                                pencil.beginPath();
                                pencil.moveTo(_info.line[0][0], _info.line[0][1]);
                                pencil.lineTo(_info.line[1][0], _info.line[1][1]);
                                pencil.lineTo(_info.line[2][0], _info.line[2][1]);
                                pencil.stroke();

                                // 绘制文字
                                text.setAlign(_info.line[3])(_info.line[2][0], _info.line[2][1], _info.org.info + "，" + _info.org.val + "，" + (_info.p * info.p * 100).toFixed(0) + "%").fill();

                                // 更新
                                layer.update();
                            });

                        })

                        // 配置，为了提示绘制信息
                        .setCenter(size.width / 2, size.height / 2)
                        .setDis(20, 10)
                        .setRadius(size.width / 4)

                        // 启动内图
                        (info.org.children);

                })
                .setBegin(- Math.PI / 2)

                // 配置，为了提示绘制信息
                .setCenter(size.width / 2, size.height / 2)
                .setRadius(size.width / 6)

                // 启动
                ($scope.data);
        }
    };
});