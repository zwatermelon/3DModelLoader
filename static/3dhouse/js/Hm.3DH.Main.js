if(!Detector.webgl){
	Detector.addGetWebGLMessage();
}				

var container,stats;
var camera,scene,renderer;
var controls; //申明控制器变量
var loader;
var isShowFPS = false;
var keyboard = new THREEx.KeyboardState();  

/************************SPRITE*******************************/
var ballSprite;

/*********************load  model path**************************/

var basicPath = "static/3dhouse/";

var basicModelPath = basicPath + "models/";
var basicPicPath = basicPath +"textures/";


var basicMiscPicPath = basicPicPath +"misc/";

var basicFloorPicPath = basicPicPath +"floor/"
var basicCeilPicPath = basicPicPath +"ceil/"
var basicWallPicPath = basicPicPath +"wall/"
var basicSkyboxPicPath = basicPicPath +"skybox/"
var redSpiritPath = basicPicPath + "sprite0.png";

/********************model**************************************/

//lei 2014/1/6 test loadmode begin
var loaderStartTime; //羊
var sleepModelPath = basicModelPath + "sleep_01.js";
var sleepPicPath = basicPicPath + "sleep_01.png";
var initSleepPic;

var maModelPath = basicModelPath + "ma_01.js";  //马
var maPicPath = basicPicPath + "ma_01.png";
var initMaPic;

var pigModelPath = basicModelPath + "Monster_2012.js";  //猪
var pigPicPath = basicPicPath + "Monster_2012.png";
var initPigPic;

var tuZiModelPath = basicModelPath + "tuzi_01.js";  //tuzi
var tuZiPicPath = basicPicPath + "tuzi_01.png";
var initTuZiPic;

var xueziModelPath = basicModelPath + "xuezi_01.js"; //鞋子
//lei 2014/1/6 test loadmode end


/*************************Method**********************/
init();
animate();

//FUNCTION
//2013/12/24 lei init() begin
function init(){
	initScene();        //初始化场景
	initImages();	    //初始化图片
	//imitMaterails();    //初始化材质
	loaderHouse();      //加载房子模型
	//paintStitch();      //绘制十字绣图片
	addEventLis(); //加载事件监听
}
//2013/12/24 lei animate begin
function animate(){  //每帧执行一次
	requestAnimationFrame( animate );
	controls.update();
	render();
};
//渲染
function render(){
	keyEvent();
	renderer.render( scene, camera );
	if(isShowFPS){
		stats.update();
	}
}
//初始化场景
function initScene(){
	//SCENE
	scene = new THREE.Scene();
	// CAMERA
	camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight , 1,20000);
	camera.position.set(0, 160,600);
	//camera.up = (0,0,1);
	//camera.scale.set(1,1,1);
	//camera.rotation.y =Math.PI * 0.5
	
	
	//LIGHT
	var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( ambientLight );
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	directionalLight.position.set( 0, 1, 0 );
	scene.add( directionalLight );
	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );
	
	//plane sprit
	plane = new THREE.Mesh(new THREE.PlaneGeometry(0.5 ,0.5, 8 , 8 ) , new THREE.MeshBasicMaterial({color : 0x000000 , opacity : 0.25 , transparent : false , wireframe : true}));
	plane.visible = true;
	plane.position.set(-2 , 1,0);
	//scene.add(plane);

	// RENDERER ,CONTAINER
	
	container = document.getElementById("container3d");
	//document.body.appendChild(container);
	renderer = new THREE.WebGLRenderer({antialias:true});
	//renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth,window.innerHeight);
	//renderer.setScissor( 200, 200, window.innerWidth, window.innerHeight );
	//renderer.setViewport( 300, 0, window.innerWidth, window.innerHeight );
	container.appendChild(renderer.domElement);

	//CONTROLS
	controls = new THREE.OrbitControls( camera );
	controls.addEventListener( 'change', render );
	
	// STATS  显示帧率
	if(isShowFPS){
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.bottom = '0px';
		stats.domElement.style.zIndex = 100;
		container.appendChild( stats.domElement );
	}

	// SKYBOX/FOG

	//scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
	var materialArray = [];
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basicSkyboxPicPath+"px.jpg" ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basicSkyboxPicPath+"nx.jpg" ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basicSkyboxPicPath+"py.jpg" ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basicSkyboxPicPath+"ny.jpg" ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basicSkyboxPicPath+"pz.jpg" ) }));
	materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( basicSkyboxPicPath+"nz.jpg" ) }));
	for (var i = 0; i < 6; i++){
	   materialArray[i].side = THREE.BackSide;
	}
	var skyboxMaterial = new THREE.MeshFaceMaterial( materialArray );
	var skyboxGeom = new THREE.CubeGeometry( 5000, 5000,5000, 1, 3, 1 );
	var skybox = new THREE.Mesh( skyboxGeom, skyboxMaterial );
	scene.add( skybox );
	////////////
	// CUSTOM //
	////////////
	/*初始化控制器控制摄像机*/
	/******************红小球***************/
	var ballTexture = THREE.ImageUtils.loadTexture(redSpiritPath);

	var ballMaterial = new THREE.SpriteMaterial({map : ballTexture , useScreenCoordinates : true , alignment : THREE.SpriteAlignment.center});

	ballSprite = new THREE.Sprite(ballMaterial);
	ballSprite.scale.set(32,32,1.0);
	ballSprite.position.set(50,50,0);
	//scene.add(ballSprite);	
};

function initImages(){
	/******************加载图片************/	
	// test
	//initDeerPic = THREE.ImageUtils.loadTexture( deerPicPath );
	//initSleepPic = THREE.ImageUtils.loadDDSTexture( sleepPicPath );
	initSleepPic = THREE.ImageUtils.loadTexture( sleepPicPath );
	initMaPic = THREE.ImageUtils.loadTexture( maPicPath );
	initPigPic = THREE.ImageUtils.loadTexture( pigPicPath );
	initTuZiPic = THREE.ImageUtils.loadTexture( tuZiPicPath );
};

function loaderHouse(){
	//创建房子
	/**************beging**/
	loader = new THREE.JSONLoader(); 
	//test 
	
	
	loaderStartTime = Date.now();
	var callbackSleep = function( geometry, materials  ) {
		//for(var i = 0 ; i < 100 ; i++){
			sleep = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({map : initSleepPic}) ); 
			sleep.position.set( 100,0,0 ); 
			sleep.scale.set( 1, 1, 1 );
			sleep.rotation.set(0,-Math.PI/2 , 0);
			//sleep.scale.set(100,100,100);
			sleep.name = 'sleep';
			scene.add( sleep );
		//}
		console.debug(Date.now() - loaderStartTime);
		//canHitObjects.push( wall );
	};
	var callcackXueZi = function( geometry, materials  ) {
		//for(var i = 0 ; i < 100 ; i++){
			xuezi = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color : 0x000000}) ); 
			xuezi.position.set( 300,0,0 ); 
			xuezi.scale.set( 10, 10, 10 );
			xuezi.rotation.set(0,-Math.PI/2 , 0);
			//sleep.scale.set(100,100,100);
			sleep.name = 'xuezi';
			scene.add( xuezi );
		//}
		console.debug(Date.now() - loaderStartTime);
		//canHitObjects.push( wall );
	};
	var callcackMa= function( geometry, materials  ) {

		ma = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({map : initMaPic}) ); 
		ma.position.set( -300,0,0 ); 
		ma.scale.set( 1, 1, 1 );
		ma.rotation.set(0,-Math.PI/2 , 0);
		//sleep.scale.set(100,100,100);
		ma.name = 'ma';
		scene.add( ma );

	};
	var callcackPig= function( geometry, materials  ) {
		pig = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({map : initPigPic}) ); 
		pig.position.set( 100,0,-100 ); 
		pig.scale.set( 1, 1, 1 );
		pig.rotation.set(0,-Math.PI/2 , 0);
		//sleep.scale.set(100,100,100);
		pig.name = 'pig';
		scene.add( pig );

	};
	var callcackTuZi= function( geometry, materials  ) {
		tuzi = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({map : initTuZiPic}) ); 
		tuzi.position.set( 100,0,-200 ); 
		tuzi.scale.set( 1, 1, 1 );
		tuzi.rotation.set(0,-Math.PI/2 , 0);
		//sleep.scale.set(100,100,100);
		tuzi.name = 'tuzi';
		scene.add( tuzi );

	};
	
	//test end
	//loader.load(deerModelPath , callbackDeer);
	
	loader.load(sleepModelPath , callbackSleep);
	loader.load(xueziModelPath,callcackXueZi);
	loader.load(maModelPath,callcackMa);
	loader.load(pigModelPath,callcackPig);
	loader.load(tuZiModelPath,callcackTuZi);
	/**********test(end)**********/
}


//监听按钮事件
function keyEvent(){
	if ( keyboard.pressed("w") ) 
	{ 
		//if(camera.position.x > -2.5)
			camera.translateZ(-8);
	}

	if ( keyboard.pressed("s") ) 
	{ 
		//if(camera.position.x < 2.5)
			camera.translateZ(8);
	}
	if ( keyboard.pressed("a") ) 
	{ 
		//if(camera.position.z < 2.5)
			camera.translateX(-8);
	}
	
	if ( keyboard.pressed("d") ) 
	{ 
		//if(camera.position.z > -2.5)
			camera.translateX(8 );
	}
	
	if ( keyboard.pressed("left") ) 
	{ 
			camera.rotation.y += 0.01 * Math.PI * 0.5;
	}

	if ( keyboard.pressed("right") ) 
	{ 
			camera.rotation.y -= 0.01 * Math.PI * 0.5;
	}
}
//2013/12/24 lei animate end
function addEventLis(){
	// EVENTS
	THREEx.WindowResize(renderer, camera);
};