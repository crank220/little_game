var momObj=function(){
	this.x;
	this.y;
	this.bigEye=new Image();
	this.bigBody=new Image();
//	this.bigTail=new Image();
	this.bigTails=[];  //  存尾部图片
	this.tailn;         // 记录第几张图片
	this.tailTimer;   // 尾部计数器
	//  眼睛
	this.eyes=[];  //  存眼睛的两张图
	this.eyen=0;  //  记录第几张图
	this.eyeTimer=0; //  眼睛计时器
	this.eyeInterval=1000; // 眨眼等待时间
}

momObj.prototype.init=function(){
	this.x=canWidth/2;
	this.y=canHeight/2;
	this.angle=0;
//	this.bigEye.src="src/bigEye0.png";
	this.bigBody.src="src/bigSwim0.png";
	for(i=0;i<8;i++){
		this.bigTails[i]=new Image();
	    this.bigTails[i].src="src/bigTail"+i+".png";
	}
	this.tailn=0;
	this.tailTimer=0;
	//  眼睛动画 图片更换
	for(i=0;i<2;i++){
		this.eyes[i]=new Image();
		this.eyes[i].src="src/bigEye"+i+".png";
	}
};

momObj.prototype.draw=function(){
	// 根据鼠标调整鱼的位置
	this.x = lerp(mx,this.x,0.92);
	this.y = lerp(my,this.y,0.92);
	var a=mx-this.x;
	var b=my-this.y;
	this.angle=Math.atan2(b,a)+Math.PI;
	this.tailAni();
	this.eyeAni();
	// 自己定义鱼的坐标系
	ctx1.save();
	ctx1.translate(this.x,this.y);  // 新的0,0  起点
	ctx1.rotate(this.angle);
	ctx1.drawImage(this.bigTails[this.tailn],-this.bigTails[this.tailn].width/2+30,-this.bigTails[this.tailn].height/2);
	ctx1.drawImage(this.bigBody,-this.bigBody.width/2,-this.bigBody.height/2);
	ctx1.drawImage(this.eyes[this.eyen],-this.eyes[this.eyen].width/2,-this.eyes[this.eyen].height/2);
	ctx1.restore();
};
//  处理尾部动画
momObj.prototype.tailAni=function(){
	this.tailTimer+=15;
	if(this.tailTimer>45){
		this.tailn=(this.tailn+1)%8;
		this.tailTimer%=45;
	}
}
// 眼睛动画
 momObj.prototype.eyeAni=function(){
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



