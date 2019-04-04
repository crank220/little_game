// 小鱼
var babyObj=function(){
	this.x;
	this.y;
	this.angle;
//	this.babyEye=new Image();
	this.babyBody=new Image();
//	this.babyTail=new Image();
	this.babyTails=[];  //  存尾部图片
	this.tailn;         // 记录第几张图片
	this.tailTimer;   // 尾部计数器
	//  眼睛
	this.eyes=[];  //  存眼睛的两张图
	this.eyen=0;  //  记录第几张图
	this.eyeTimer=0; //  眼睛计时器
	this.eyeInterval=1000; // 眨眼等待时间
}
babyObj.prototype.init=function(){
	this.x=canWidth/2 + Math.random()*200;
	this.y=canHeight/2+ Math.random()*200;
	this.angle=0;
//	this.babyEye.src="src/babyEye0.png";
	this.babyBody.src="src/babyFade0.png";
//	this.babyTail.src="src/babyTail0.png";
	for(i=0;i<8;i++){
			this.babyTails[i]=new Image();
		    this.babyTails[i].src="src/babyTail"+i+".png";
		}
		this.tailn=0;
		this.tailTimer=0;
		//  眼睛动画 图片更换
	for(i=0;i<2;i++){
		this.eyes[i]=new Image();
		this.eyes[i].src="src/bigEye"+i+".png";
	}
};
babyObj.prototype.draw=function(){
	// 根据鼠标调整鱼的位置
	this.x = lerp(mom.x,this.x,0.93);
	this.y = lerp(mom.y,this.y,0.93);
	var a=mom.x-this.x;
	var b=mom.y-this.y;
	this.angle=Math.atan2(b,a)+Math.PI;
	this.tailAni();
	this.eyeAni();
	// 自己定义鱼的坐标系
	ctx1.save();
	ctx1.translate(this.x,this.y);  // 新的0,0  起点
	ctx1.rotate(this.angle);
	ctx1.drawImage(this.babyTails[this.tailn],-this.babyTails[this.tailn].width/2+23,-this.babyTails[this.tailn].height/2);
	ctx1.drawImage(this.babyBody,-this.babyBody.width/2,-this.babyBody.height/2);
	ctx1.drawImage(this.eyes[this.eyen],-this.eyes[this.eyen].width/2,-this.eyes[this.eyen].height/2);
	ctx1.restore();
};
//  处理尾部动画
babyObj.prototype.tailAni=function(){
	this.tailTimer+=15;
	if(this.tailTimer>45){
		this.tailn=(this.tailn+1)%8;
		this.tailTimer%=45;
	}
} 
// 眼睛动画
 babyObj.prototype.eyeAni=function(){
 	this.eyeTimer+=15;
 	if(this.eyeTimer>this.eyeInterval){
 		this.eyen = (this.eyen+1)%2;
 		if(this.eyen==0){
 			this.eyeInterval=2000+Math.random()*200;
 		}else{
 			this.eyeInterval=300;
 		}
 		this.eyeTimer%=this.eyeInterval;
 	}
 }