$(document).ready(function(e){
	zoomEvent();
});
function zoomEvent(){
	var handle=$("#bar"); //滚动珠
	var dragbar=$(".scrollbar"); //滚动条
	var al = $("#minus_key"); //minus
	var ar = $("#plus_key"); //plus
	var al_w = al.outerWidth(); //minus's width
	var step = 10; //one step(max = 100)
	var maxlen=parseInt(dragbar.width())-parseInt(handle.outerWidth()) - parseInt(al_w);  //滚动珠距离左边的最大距离
	console.log("滚动条长度::"+dragbar.width());
	console.log("滚动珠长度::"+handle.width());
	console.log("放大镜长度::"+al_w);
	console.log("最大滚动长度::"+maxlen);

	handle.bind("vmousedown",function(e){ //slide
		var x=e.pageX;
		var hx=parseInt(handle.css("left"));  
		$(document).bind("vmousemove",function(e){
			e.preventDefault();
			var left = e.pageX-x+hx < al_w ? al_w : (e.pageX-x+hx >= maxlen ? maxlen : e.pageX-x+hx); 
			handle.css({
				left:left
			});
			var ratio = (left - al_w)/(maxlen - al_w);
			zoomImage(picMesh,meshFrame,ratio);//zoom image
			$("#message").text(((left - al_w)/(maxlen - al_w)*100).toFixed(0)+"%");
		});
		$(document).bind("vmouseup",function(){
			$(this).unbind("vmousemove");
		})
	})

	al.bind("vclick" ,function(){ //plus
		var hx = parseInt(handle.css("left"));
		var left = -step + hx < al_w ? al_w : -step + hx;
		handle.css({
			left:left
		});
		var ratio = (left - al_w)/(maxlen - al_w);
		zoomImage(picMesh,meshFrame,ratio); //zoom image
		$("#message").text(((left - al_w)/(maxlen - al_w)*100).toFixed(0)+"%");
	});
	ar.bind("vclick" ,function(){ //minus
		var hx = parseInt(handle.css("left"));
		var left = step + hx >= maxlen ? maxlen : step+hx
		handle.css({
			left:left
		});
		var ratio = (left - al_w)/(maxlen - al_w);
		zoomImage(picMesh,meshFrame,ratio); //zoom image
		$("#message").text(((left - al_w)/(maxlen - al_w)*100).toFixed(0)+"%");
	});
	//document.ondragstart = function(){return false};
}