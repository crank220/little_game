var op=["tick1","xingxing1","xingxing2","xingxing3","xingxing4","xingxing5"];
var level=[0,1000,3000,6000,9000,12000,15000];
var curLevel=1; // 当前关数
var curScore=0;  //当前分 
var game=[];//10行10列的数组---1~5的随机数
var same=[];  //相同色的数组
var sameN=0;
var t=0;
//创建表格
		 
function maketable(){
for(i=0;i<10;i++){
	var tr=tb.insertRow();
	for(j=0;j<10;j++){
		var td=tr.insertCell();
		td.innerHTML="&nbsp";
		//给格子自定义属性
		td.i=i;
		td.j=j;
	}
}
}
maketable();
		 
function xin(){
	//10*10数组
	for(i=0;i<10;i++){
		var sz=new Array();
		game.push(sz);
	}
	for(i=0;i<30;i++){
		var sz=new Array();
		same.push(sz);
	}
	for(i=0;i<10;i++){
		for(j=0;j<10;j++){
			//随机数1~5
			var s=parseInt(Math.random()*5)+1;
			tb.rows[i].cells[j].innerHTML="<img src='img/"+op[s]+".png'/>";
			game[i][j]=s;
		}
	}
	divLevel.innerHTML="<h1>第"+curLevel+"关</h1>";
	divTarget.innerHTML="<h2>目标"+level[curLevel]+"分</h2>";
	divScore.innerHTML="<h3 align=center>"+0+"</h3>";
	CurScore.innerHTML="";
}
xin(); 
function play(){
	//你点的是哪一个格子
	var obj=event.srcElement.parentNode;
	//		 		alert(obj.i+"--"+obj.j+"颜色"+game[obj.i][obj.j]);
	same[0][0]=obj.i;
	same[0][1]=obj.j;
	sameN=1;
	
	for(var i=0;i<sameN;i++){
		var x,y;
		x=same[i][0];
		y=same[i][1];
		find(x,y);
	}
	//            alert(same);
	deletestart(); // 消除
	move(); // 移动
	find0Col();//  找0列
	show(); // 重新显示
	isGameOver();
}
		 
function find(i,j){
	var color=game[i][j];
	var x,y;
	x=i-1;
	y=j;
	// 上
	if(x>=0 && x<10 && y>=0 && y<10 && game[x][y]==color){
		check(x,y);
	}
	// 下
	x=i+1;
	y=j;
	if(x>=0 && x<10 && y>=0 && y<10 && game[x][y]==color){
		check(x,y);
	}
	// 左
	x=i;
	y=j-1;
	if(x>=0 && x<10 && y>=0 && y<10 && game[x][y]==color){
		check(x,y);
	}
	// 右
	x=i;
	y=j+1;
	if(x>=0 && x<10 && y>=0 && y<10 && game[x][y]==color){
		check(x,y);
	}
}
		 
function check(i,j){
	//找到就不放入
	var ok=false;
	for(var k=0;k<sameN;k++){
		if(same[k][0]==i && same[k][1]==j){
			ok=true;  // 重复
			break;
		}
	}
	if(ok==false){
		same[sameN][0]=i;
		same[sameN][1]=j;
		sameN++;
	}
}
function deletestart(){
	var x,y;
	//  一个点不可以删
	if(sameN<2){
		return;
	}
	for(var i=0;i<sameN;i++){
		x=same[i][0];
		y=same[i][1];
		//如何找到对应下标的格子
		var td=tb.rows[x].cells[y];
		td.innerHTML="";
		game[x][y]=0;
		//             td.style.background="white";
	}
	divScore.innerHTML=sameN*sameN*5+t;
	t=parseInt(divScore.innerHTML);
	curScore=t;
}
function move(){
	for(j=0;j<10;j++){
		var n=0;
		for(var i=0;i<10;i++){
			if(game[i][j]==0){
				n++;
			}
		}
		//		 	alert("找到"+n+"个空");
		for(var k=0;k<n;k++){
			var begin=0;
			for(var i=9;i>=0;i--){
				if(game[i][j]==0){
					begin=i;
					break;
				}
			}
			for(var i=begin;i>=1;i--){
				var t=game[i][j];
				game[i][j]=game[i-1][j];
				game[i-1][j]=t;
			}
		}
	}
}
function show(){
	for(i=0;i<10;i++){
		for(j=0;j<10;j++){
			var s=game[i][j];
			var td=tb.rows[i].cells[j];
			tb.rows[i].cells[j].innerHTML="<img src='img/"+op[s]+".png'/>";
		}
	}
}
		 //找全为0的列
function find0Col(){
	for(var i=0;i<10;i++){
		var all=0;
		for(var j=0;j<10;j++){
			if(game[j][i]!=0){
				all=1;
				break;
			}
		}
		if(all==0){// 整列都是0
			moveLeft(i);
		}
	}
}
function moveLeft(n){
	for(var i=0;i<10;i++){
		for(var j=n;j<=8;j++){
			var t=game[i][j];
			game[i][j]=game[i][j+1];
			game[i][j+1]=t;
		}
	}
}
//  判断游戏是否结束 ？？
//  1-- 跳到下一关  分数满足
//  2-- over 分数没有满足
function isGameOver(){
	var n=0;     // 存还有多少个色块
	var x,y;
	for(i=9;i>=0;i--){
		for(j=0;j<=9;j++){
			var color=game[i][j];
			if(color!=0){
				x=i-1;
				y=j;
				// 上
				if(x>=0 && x<10 && y>=0 && y<10 && game[x][y]==color){
					return 1;
				}
				// 下
				x=i+1;
				y=j;
				if(x>=0 && x<10 && y>=0 && y<10 && game[x][y]==color){
					return 1;
				}
				// 左
				x=i;
				y=j-1;
				if(x>=0 && x<10 && y>=0 && y<10 && game[x][y]==color){
					return 1;
				}
				// 右
				x=i;
				y=j+1;
				if(x>=0 && x<10 && y>=0 && y<10 && game[x][y]==color){
					return 1;
				}
			}
		}
	}
	if(curScore<level[curLevel]){
		alert("Gameover  你智商还不够 ，百年后再来");
	}else{
		curLevel++;
		divLevel.innerHTML="<h1>第"+curLevel+"关</h1>";
		divTarget.innerHTML="<h2>目标"+level[curLevel]+"分</h2>";
		divCurScore.innerHTML="";
		xin();
	}
}
		 
		 