// 果实类
var fruitObj=function(){
	this.num=30;
	this.alive=[];   //true  false
	this.x=[];
	this.y=[];  // 存储每个果子的位置
	this.size=[];// 存储每个果子的大小
	this.speed=[];   // 存每个果子的速度
	this.type=[];  // 果子的颜色
	this.blue=new Image();
	this.orange=new Image();
};
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.size[i]=0;
		this.type[i]="";
		this.speed[i]=Math.random()*0.01+0.005;   // [1,5]
		this.born(i);   //  让每个果子出生
	}
	this.orange.src="src/fruit.png";
	this.blue.src="src/blue.png";
};
fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
	if(this.alive[i]){  //  如果果子是活的
		// 查看果子的颜色
	   var pic=this.type[i]=="blue"? this.blue : this.orange ;
		if(this.size[i]<13){
			this.size[i]+=0.15;
			//draw()
		}else{
			this.y[i]-=this.speed[i]*70;
		}
			ctx2.drawImage(pic,this.x[i]-this.size[i]/2,this.y[i]-this.size[i]/2,this.size[i],this.size[i]);
		     if(this.y[i]<0){
		     	this.alive[i]=false;    // 让果子失效
		     }
	  }
	}
};
//  死亡
fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
};
// 出生
fruitObj.prototype.born=function(i){
	this.alive[i]=true;
     this.size[i]=0;  //果子大小初始化
     if(Math.random()>0.6){   //  0-1
     	this.type[i]="blue";
     }else{
     	this.type[i]="orange";
     }
	//长谁的上面   -- 随机
	var aneid=parseInt(Math.random()*ane.num);
	this.x[i]=ane.x[aneid];
	this.y[i]=canHeight-ane.len[aneid];
};
fruitObj.prototype.update=function(){
	var n=0;  // 记录活动的果子数量
	var bi=0;   // 等待出生的id
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			n++;
		}else{
			bi=i;
		}
	}
	if(n<15){
		this.born(bi);
	}
};