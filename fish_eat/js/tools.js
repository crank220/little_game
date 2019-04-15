// 工具函数
function lerp(target, cur, ratio) {
	var delta = cur - target;
	return target + delta * ratio;
}
function calLen2(x1, y1, x2, y2) {
	return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
}
