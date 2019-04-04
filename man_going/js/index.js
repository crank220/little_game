function Spirt(x,y){
	this.x=x;
	this.y=y;
	this.left=function(){
		game.style.backgroundPositionY="-128px";
		this.x=this.x-15;
		this.show();
	};
	this.up=function(){
		game.style.backgroundPositionY="-384px";
		this.y=this.y-15;
		this.show();
	};
	this.right=function(){
		game.style.backgroundPositionY="-256px";
		this.x=this.x+15;
		this.show();
	};
	this.down=function(){
		game.style.backgroundPositionY="0px";
		this.y=this.y+15;
		this.show();
	};
	var n=0; // 记录播放到第几张图了
	this.show=function(){
		game.style.backgroundPositionX=n+"px";
		game.style.top = this.y +"px";
		game.style.left = this.x +"px";
		n=n-85;
		if(n<-255){
			n=0;
		}
	}
}

var a=new Spirt(0,0); // 建立一个对象
// 网页加键盘事件
document.onkeydown=function(){
	var k=event.keyCode;
	switch(k){
		case 37:
			a.left();
		break;
		case 38:
			a.up();
		break;
		case 39:
			a.right();
		break;
		case 40:
			a.down();
		break;
	}
}