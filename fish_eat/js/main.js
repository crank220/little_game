var can1,can2;
var ctx1,ctx2;
var canWidth,canHeight;
var bgPic=new Image();
var ane;
var fruit;
var mom,baby;
var mx,my;   //  鼠标的坐标

//程序的入口
document.body.onload=game;
function game(){
	init();   //初始化
	//  每秒执行30帧
	 setInterval(gameloop,1000/30);
}
function init(){
	//  fish，特效，圆圈
	can1=document.getElementById("canvas1");
	can1.addEventListener("mousemove",onMousemove,false);
	//  背景，海草，
	can2=document.getElementById("canvas2");
	ctx1=can1.getContext("2d");
	ctx2=can2.getContext("2d");
	bgPic.src="src/background.jpg";
	canWidth=can1.width;
	canHeight=can1.height;
	ane= new aneObj();  //  新建一个海草对象
	fruit=new fruitObj();
	ane.init();
	fruit.init();
	mom=new momObj();
	mom.init();
	mx=canWidth/2;
	my=canHeight/2;
	baby=new babyObj();
	baby.init();
	
}
function gameloop(){
	drawBackground();
	ane.draw();
	fruit.draw();
	fruit.update();
	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
	eatFruit();   //  检查吃了果子
	baby.draw();
}
// 鼠标移动时运行
function onMousemove(e){
	mx=e.offsetX;
	my=e.offsetY;
}
