// 碰撞检查   --- 吃果子
function eatFruit() {
	for (var i = 0; i < fruit.num; i++) {
		if (fruit.alive[i]) {
			// 计算两点间的距离
			var len = calLen2(fruit.x[i], fruit.y[i], mom.x, mom.y);
			if (len < 400) {
				fruit.dead(i);
			}
		}
	}
}
