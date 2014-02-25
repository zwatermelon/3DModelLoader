if(!Detector.webgl){
	Detector.addGetWebGLMessage();
}				

var container,stats;
var camera,scene,renderer;
var controls; //��������������
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
var loaderStartTime; 
var miniModelPath = basicModelPath + "xuezi_01.js";  //��
var miniPicPath = basicPicPath + "sleep_01.png";
var initMiniPic;

//lei 2014/1/6 test loadmode end


/*************************Method**********************/
init();
animate();

//FUNCTION
//2013/12/24 lei init() begin
function init(){
	initScene();        //��ʼ������
	initImages();	    //��ʼ��ͼƬ
	//imitMaterails();    //��ʼ������
	loaderHouse();      //���ط���ģ��
	//paintStitch();      //����ʮ����ͼƬ
	addEventLis(); //�����¼�����
}
//2013/12/24 lei animate begin
function animate(){  //ÿִ֡��һ��
	requestAnimationFrame( animate );
	controls.update();
	render();
};
//��Ⱦ
function render(){
	keyEvent();
	renderer.render( scene, camera );
	if(isShowFPS){
		stats.update();
	}
}
//��ʼ������
function initScene(){
	//SCENE
	scene = new THREE.Scene();
	// CAMERA
	camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight , 1,20000);
	camera.position.set(0, 100,300);
	//camera.up = (0,0,1);
	//camera.scale.set(1,1,1);
	//camera.rotation.y =Math.PI * 0.5
	
	
	//LIGHT
	var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
	// directional lighting
	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, 10);
	scene.add(directionalLight);

	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, -10);
	scene.add(directionalLight);
	
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
	
	// STATS  ��ʾ֡��
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
	//scene.add( skybox );
	////////////
	// CUSTOM //
	////////////
	/*��ʼ�����������������*/
	/******************��С��***************/
	var ballTexture = THREE.ImageUtils.loadTexture(redSpiritPath);

	var ballMaterial = new THREE.SpriteMaterial({map : ballTexture , useScreenCoordinates : true , alignment : THREE.SpriteAlignment.center});

	ballSprite = new THREE.Sprite(ballMaterial);
	ballSprite.scale.set(32,32,1.0);
	ballSprite.position.set(50,50,0);
	//scene.add(ballSprite);	
};

function initImages(){
	/******************����ͼƬ************/	
	// test

	initMiniPic = THREE.ImageUtils.loadTexture( miniPicPath );
};

function loaderHouse(){
	//��������
	/**************beging**/
	loader = new THREE.JSONLoader(); 
	//test 
	
	
	loaderStartTime = Date.now();
	var callcackMini= function( geometry, materials  ) {
		var material =  materials[0];
		//console.log(material);
		//material.map = initMiniPic;
		mini = new THREE.Mesh( geometry, material ); 
		mini.position.set(0,0,0 ); 
		mini.scale.set( 10, 10, 10 );
		//mini.rotation.set(0,-Math.PI/4 , 0);
		//sleep.scale.set(100,100,100);
		mini.name = 'mini_model';
		scene.add( mini );

	};

	
	//test end

	loader.load(miniModelPath,callcackMini);

	/**********test(end)**********/
}


//������ť�¼�
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