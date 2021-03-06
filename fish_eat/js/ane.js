var aneObj = function () {
	this.x = [];   // 海草x 位置
	this.len = [];
}

aneObj.prototype.num = 50;
aneObj.prototype.init = function () {
	for (var i = 0; i < this.num; i++) {
		this.x[i] = i * 17 + Math.random() * 15;
		this.len[i] = 200 + Math.random() * 50;
	}
}
aneObj.prototype.draw = function () {
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.strokeStyle = "#3b154e";
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	for (var i = 0; i < this.num; i++) {
		ctx2.beginPath();
		ctx2.moveTo(this.x[i], canHeight);
		ctx2.lineTo(this.x[i], canHeight - this.len[i]);
		ctx2.stroke();
		ctx2.closePath();
	}
	ctx2.restore();
}
