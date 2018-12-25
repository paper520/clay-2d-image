import clay from "./index.js";
clay.component("chinaMap", function () {
    return {
        "link": function (element, $scope) {
            var map = clay.map().scale(7);

            var colors = clay.getColors($scope.data.features.length);

            function createImg(index, points) {
                var temp = map(points[0][0], points[0][1]);

                var result = "M" + (400 + temp[0]) + "," + (temp[1] + 250);
                for (var flag = 1; flag < points.length; flag++) {
                    temp = map(points[flag][0], points[flag][1]);
                    result += "L" + (400 + temp[0]) + "," + (temp[1] + 250);
                }
                clay('<path stroke="#fff" fill=' + colors[index] + ' d=' + result + '></path>').appendTo(clay('g').eq(index));
            };

            var imgG = clay('svg').find('g.img').data($scope.data.features).enter('<g class="img">').appendTo('svg').refresh();

            clay('<g class="province"></g>').appendTo('svg');

            // 绘制地图
            imgG.attr('name', function (data, index) {

                // 绘制轮廓
                var flag, points = data.geometry.coordinates, temp, result;
                if (typeof points[0][0][0] === 'number') {
                    createImg(index, points[0]);
                } else {
                    for (flag = 0; flag < points[0].length; flag++) {
                        createImg(index, points[0][flag]);
                    }
                }

                // 绘制省会
                temp = map(data.properties.cp[0], data.properties.cp[1]);
                clay("<circle r='2' fill='#f00' stroke='#fff' cx=" + (temp[0] + 400) + " cy=" + (temp[1] + 250) + "></circle>").appendTo(clay('g').eq(index));
                if (data.properties.name == '北京')
                    clay("<text style='font-size:12px;text-anchor: middle;dominant-baseline: middle;' r='2' fill='#f00' stroke='#000' x=" + (temp[0] + 400) + " y=" + (temp[1] + 240) + ">" + data.properties.name + "</text>").appendTo(clay('g.province'));
                else if (data.properties.name == '香港')
                    clay("<text style='font-size:10px;text-anchor: middle;dominant-baseline: middle;' r='2' fill='#000' x=" + (temp[0] + 420) + " y=" + (temp[1] + 260) + ">" + data.properties.name + "</text>").appendTo(clay('g.province'));
                else if (data.properties.name == '澳门')
                    clay("<text style='font-size:10px;text-anchor: middle;dominant-baseline: middle;' r='2' fill='#000' x=" + (temp[0] + 400) + " y=" + (temp[1] + 270) + ">" + data.properties.name + "</text>").appendTo(clay('g.province'));
                else if (data.properties.name == '广东')
                    clay("<text style='font-size:10px;text-anchor: middle;dominant-baseline: middle;' r='2' fill='#000' x=" + (temp[0] + 400) + " y=" + (temp[1] + 240) + ">" + data.properties.name + "</text>").appendTo(clay('g.province'));
                else
                    clay("<text style='font-size:10px;text-anchor: middle;dominant-baseline: middle;' r='2' fill='#000' x=" + (temp[0] + 400) + " y=" + (temp[1] + 260) + ">" + data.properties.name + "</text>").appendTo(clay('g.province'));

                return data.properties.name;

            });
        }
    };
});
