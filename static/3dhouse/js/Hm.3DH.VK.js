/*************************监听虚拟键盘事件******************************/
$(document).ready(function(e) {
    bindVKEvent();
});
//绑定键盘事件
function bindVKEvent() {
	$("#up_key").bind("vmousedown", onUpKeyDown);
	$("#right_key").bind("vmousedown", onRightKeyDown);
	$("#down_key").bind("vmousedown", onDownKeyDown);
	$("#left_key").bind("vmousedown", onLeftKeyDown);
	$("#ror_key").bind("vmousedown", onRorKeyDown);
	$("#rol_key").bind("vmousedown", onRolKeyDown);
	$("#minus_key").bind("vmousedown", onMinusKeyDown);
	$("#plus_key").bind("vmousedown", onPlusKeyDown);
	//$("#bar").bind("vmousedown",onBarKeyDown);
	$("#reset_key").bind("vmousedown",onResetKeyDown);

		
	$("#up_key").bind("vmouseup", onUpKeyUp);
	$("#right_key").bind("vmouseup", onRightKeyUp);
	$("#down_key").bind("vmouseup", onDownKeyUp);
	$("#left_key").bind("vmouseup", onLeftKeyUp);
	$("#ror_key").bind("vmouseup", onRorKeyUp);
	$("#rol_key").bind("vmouseup", onRolKeyUp);
	$("#minus_key").bind("vmouseup", onMinusKeyUp);
	$("#plus_key").bind("vmouseup", onPlusKeyUp);
	//$("#bar").bind("vmouseup",onBarKeyUp);
	$("#reset_key").bind("vmouseup",onResetKeyUp);
}
//按钮按下,并处理对应事件
function onUpKeyDown() {  //up
	$(".up").addClass("up_bg");
	INTERSECTED = "";
	camera.translateZ(-8);
}
function onRightKeyDown() { //right
	INTERSECTED = "";
	$(".right").addClass("right_bg");
	camera.translateX(8);
}
function onDownKeyDown() { //down
	INTERSECTED = "";
	$(".down").addClass("down_bg");
	camera.translateZ(8);
}
function onLeftKeyDown() { //left
	INTERSECTED = "";
	$(".left").addClass("left_bg");
	camera.translateX(-8);
}

function onRorKeyDown() { //rotation right
	INTERSECTED = "";
	$(".ror").addClass("ror_bg");
	camera.rotation.y -= 0.01 * Math.PI;

}
function onRolKeyDown() { //rotation left
	INTERSECTED = "";
	$(".rol").addClass("rol_bg");
	camera.rotation.y +=  0.01 * Math.PI;
}

//function onBarKeyDown() {}
function onMinusKeyDown() { //minus
	INTERSECTED = "";
	$(".minus").addClass("minus_bg");

}
function onPlusKeyDown() {//plus
	INTERSECTED = "";
	$(".plus").addClass("plus_bg");

}
function onResetKeyDown() { //reset
	INTERSECTED = "";
	$(".reset").addClass("reset_bg");
	$("#bar").css({left : 133})
	resetScene();

}
//按钮弹起
function onUpKeyUp() {
	clearSelect();
}
function onRightKeyUp() {
	clearSelect();
}
function onDownKeyUp() {
	clearSelect();
}
function onLeftKeyUp() {
	clearSelect();
}
function onRorKeyUp() {
	clearSelect();
}
function onRolKeyUp() {
	clearSelect();
}
function onMinusKeyUp() {
	clearSelect();
}
function onPlusKeyUp() {
	clearSelect();
}
//function onBarKeyUp() {}
function onResetKeyUp() {
	clearSelect();
}
function clearSelect() {
	$(".up").removeClass("up_bg");
	$(".right").removeClass("right_bg");
	$(".down").removeClass("down_bg");
	$(".left").removeClass("left_bg");
	$(".ror").removeClass("ror_bg");
	$(".rol").removeClass("rol_bg");
	$(".minus").removeClass("minus_bg");
	$(".plus").removeClass("plus_bg");
	$(".reset").removeClass("reset_bg");
}