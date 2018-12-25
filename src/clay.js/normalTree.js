import clay from "./index.js";
clay.component("normalTree", function () {
    return {
        "link": function (element, $scope) {

            // 画笔
            var pencil = element.painter();
            pencil.strokeStyle = "gray";
            pencil.fillStyle = "gray";

            // 贝塞尔
            var bezier = clay.canvas.bezier(element)
                // 设置曲线类型
                .setType(0, 1)
                // 设置控制把柄的长度
                .setL(60);

            // 文字
            var text = clay.canvas.text(element)
                // 设置对齐方式（可选）
                .setAlign('left', 'top')
                // 设置字体大小，传递一个数字（可选）
                .setSize(6)
                // 设置字颜色（可选）
                .setColor("#000");

            // 布局
            clay.treeLayout()

                // 获取根结点的方法
                .root(function (initTree) {
                    return initTree;
                })

                // 获取子结点的方法
                .child(function (parentTree, initTree) {
                    return parentTree.children;
                })

                // 获取结点ID方法
                .id(function (treedata) {
                    return treedata.name;
                })

                .drawer(function (nodes, rootid, size) {
                    var item;

                    // 更新结点位置
                    var temp;
                    for (item in nodes) {
                        temp = nodes[item].top;
                        nodes[item].top = nodes[item].left * element.size().height / 5;
                        nodes[item].left = temp * (element.size().width - 50) / size;
                    }

                    // 绘制
                    for (item in nodes) {

                        // 画结点
                        pencil.beginPath();
                        pencil.moveTo(nodes[item].left + 2, nodes[item].top);
                        pencil.arc(nodes[item].left, nodes[item].top, 2, 0, Math.PI * 2);
                        pencil.fill();

                        if (nodes[item].pid) {
                            // 绘制连线
                            bezier(
                                nodes[nodes[item].pid].left, nodes[nodes[item].pid].top,
                                nodes[item].left, nodes[item].top
                            ).stroke();
                        }

                        // 绘制文字
                        text(
                            nodes[item].left + 3,
                            nodes[item].top + 3,
                            nodes[item].id,
                            Math.PI / 4
                        );

                    }

                })

                // 启动
                ($scope.data);
        }
    };
});