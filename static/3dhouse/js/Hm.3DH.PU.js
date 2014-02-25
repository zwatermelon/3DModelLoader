/******************************************弹出**************************************************************/
$(document).ready(function(e){
	popupEvent();
});
function popupEvent(){
	//定义滚动内容，和样式
	$(".container2").hScrollPane({
		mover:"ul",
		moverW:function(){return $(".container2 li").length*20-24;}(),
		showArrow:true,
		handleMinWidth:300,
		handleCssAlter:"draghandlealter",
		mousewheel:{moveLength:207}
	});
	//点击关闭按钮后关闭弹出层
	$(".popup_close").click(function(){
		popupFadeOut();
		$("#popup_con_floor").fadeOut(400);
		$("#popup_con_wall").fadeOut(400);
		$("#popup_con_ceil").fadeOut(400);
	})
	//图片点击后更换图片
	$("#popup_con_wall div ul li img").each(function(index) {  					
		$(this).click(function(){
			url = this.src;
			changeImage(wall,url,16,2);
		});
	});
	$("#popup_con_floor div ul li img").each(function(index) {  					
		$(this).click(function(){
			url = this.src;
			changeImage(floor,url,8,8);
		});
	});
	$("#popup_con_ceil div ul li img").each(function(index) {  					
		$(this).click(function(){
			url = this.src;
			changeImage(ceil,url,8,8);
		});
	});
	//图片点击后隐藏弹出层
	$(".floorImg").click(function(){
		$("#popup_con_floor").fadeOut(400);	
		popupFadeOut();
	})
	$(".wallImg").click(function(){
		$("#popup_con_wall").fadeOut(400);
		popupFadeOut();
	});
	$(".ceilImg").click(function(){
		$("#popup_con_ceil").fadeOut(400);
		popupFadeOut();
	})
	function popupFadeOut(){
		$(".popup").fadeOut(400);
		$(".transparent_class").fadeOut(400);
	};
	
	//拖动弹出层
	$('.popup').css({'left':($(window).width()-$('.popup').width())/2, 'top':($(window).height()-$('.popup').height())/2});	
	var dragging = false;
	var iX , iY;
	$(".popup_head").mousedown(function(e){
		e.preventDefault();
		console.log("head mouse down");
		dragging = true;
		iX = e.clientX - parseInt($(".popup").css('left'));
		iY = e.clientY - parseInt($(".popup").css('top'));
		//return false;
		$(document).mousemove(function(e){
			console.log("head mouse move");
			if(dragging){
				e.preventDefault();
				//var e = e || window.event;
				var oX = e.clientX -iX;
				var oY = e.clientY - iY;
				$(".popup").css({"left" : oX + "px" , "top" : oY + "px"});
				//return false;
			}			
		});
		$(document).mouseup(function(e){
			dragging = false;
		});
	});	
}
			