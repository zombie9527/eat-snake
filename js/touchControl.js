window.onload = function (){
	var HEIGHT=100,
		WIDTH=100,
		speed=100,
		sx = 5,sy = 0;
	var x,y,
		x1,y1,
		m,n1,n2,
		ex,ey,
		speedx,speedy,
		intoswitc=false,
		i,
		longx=[],longy=[];
		
		longx[0] = 250;longy[0]=250;
		longx[1] = 240;longy[1]=250;
		
		var box = document.getElementById("controlBox");
		var ball = document.getElementById("controlBall");
		var quick = document.getElementById("quick");
		var canvas = document.getElementById("canvas");
    	var context = canvas.getContext("2d");
    	var bagin = document.getElementById("bagin");
    	var hint = document.getElementById('hint');
    	var start = document.getElementById("start");
    	
		canvas.width = window.screen.width *0.95;
		canvas.height = window.screen.height *0.75;
    	
    	speedx = quick.getBoundingClientRect().left;
    	speedy = quick.getBoundingClientRect().top;
    	
    	
    	function draw(){
	        context.clearRect(0,0,canvas.width,canvas.height);
	        context.save();
	        
	        context.fillStyle = "#ccc";
        	context.fillRect(0,0,canvas.width,canvas.height);
        	
        	context.beginPath();
    		context.arc(ex,ey,3,0,2*Math.PI);
	        context.fillStyle = "#900"
	        context.fill();
    		context.restore();
        	
        	for(i=0;i<longx.length;i++){
        		context.beginPath();
        		context.arc(longx[i],longy[i],5,0,2*Math.PI);
        		if(i==0)
		        	context.fillStyle = "#009";
		        else
		        	context.fillStyle = "#336699"
		        context.fill();
        		context.restore();
        	}
        	longx.unshift(longx[0] + sx);
        	longy.unshift(longy[0] + sy);
        	into = food();
        	if(into == 2){
        		paint("you are die");
	        	return ;
        	}else{
	        	if(into==1){
	        		ex = Math.random()*(canvas.width-10)+5;
	        		ey = Math.random()*(canvas.height-10)+5;
	        	}else{
	        		longx.pop();
		        	longy.pop();
	        	}
	        	setTimeout(draw,speed);
        	}
    	 }
    	function food(){
    		if(longx[0]>ex-5 && longx[0]<ex+5 && longy[0]>ey-5 && longy[0]<ey+5){
    			return 1;
    		}else if(longx[0]>canvas.width-5 || longx[0]<5 || longy[0]>canvas.height-5 || longy[0]<5){
    			return 2;
    		}
    		return 0;
    	}
    	function speedUp(){
    		speed = 30;
    	};
    	function speedDown(){
    		speed = 100;
    	};
    	quick.addEventListener("mousedown",speedUp);
    	quick.addEventListener("mouseup",speedDown);
    	document.addEventListener("keydown",function(event){
    		event.preventDefault();
    		event.stopPropagation();
    		if (event.keyCode==37){
    			sy = 0;
    			sx = -5;
    		}
			if (event.keyCode==38){
    			sy = -5;
    			sx = 0;
    		}
			if (event.keyCode==39){
    			sy = 0;
    			sx = 5;
    		}
			if (event.keyCode==40){
    			sy = 5;
    			sx = 0;
    		}
			if (event.keyCode==32){
				speed = 30;
			}
    	});
    	document.addEventListener("keyup",speedDown);
		function stouch(event){
			event.preventDefault();
			var events = event;
			for (var i =0;i<events.touches.length;i++) {
				event = events.touches[i];
				var xx = event.pageX ;
				var yy = event.pageY ;
				if(xx>speedx-5 && xx <speedx+55 && yy > speedy-5 && yy < speedy+55){
					speedUp();
					return false;
				}
				x = event.pageX ;
				y = event.pageY ;
			}
			box.style.left = x-WIDTH-10+"px";
			box.style.top = y-HEIGHT-10+"px";
			ball.style.left = WIDTH - 25 +"px";
			ball.style.top = HEIGHT - 25 +"px";
			box.style.display="block";
			switc  = true;
		}
		document.addEventListener("touchmove",function(event){
			event.preventDefault();
			if(switc){
				event = event.touches[0];
				x1 = event.pageX-x;
				y1 = event.pageY-y;
				m=Math.sqrt((x1)*(x1)+(y1)*(y1));
				n1 = x1/m;
				n2 = y1/m;
				sx = 5*n1;
				sy = 5*n2;
				if(x1>WIDTH || x1<-WIDTH|| y1>HEIGHT || y1<-HEIGHT){
					x1 = WIDTH*n1+WIDTH-25;
					y1 = HEIGHT*n2+HEIGHT-25;
				}else{
					x1 = x1+WIDTH-25;
					y1 = y1+HEIGHT-25;
				}
				ball.style.left = x1+"px";
				ball.style.top = y1+"px";
				
				
			}
		});
		document.addEventListener("touchend",function(){
			switc = false;
			speedDown();
			box.style.display="none";
		});
		start.addEventListener("click",function(){
			bagin.style.display = "none";
			init();
		});
		function init(){
    		ex = 100;
    		ey = 100;
    		longx[0] = 250;longy[0]=250;
			longx[1] = 240;longy[1]=250;
			document.addEventListener("touchstart",stouch);
			setTimeout(draw,speed);
    	}
		function paint(texts){
			bagin.style.display = "block";
			hint.innerHTML = texts || "贪吃蛇";
		}
		paint();
}