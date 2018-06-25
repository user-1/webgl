var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha : true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 0 )

document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 2, 2, 2 );
var material = new THREE.MeshLambertMaterial({ color: 0xd3d3d3 });
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var light = new THREE.PointLight(0xffffff);

light.position.set(10, 10, 25);
scene.add(light);

camera.position.z = 10;
camera.position.x = 2;
camera.position.y = 2;

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();

const SPEED = 0.2
const ROTATE = 5 // degrees

const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40

var direction = new THREE.Vector3( 0, 0, 0 );

function toRad(degrees){
    return degrees * Math.PI / 180    
}

$(document.body).keydown(function(e) {

    camera.getWorldDirection( direction )
    console.log(direction)
    
    var key = e.which
    if(LEFT == key){
	if(e.shiftKey){
	    camera.rotateY(toRad(ROTATE))
	} else {
	    camera.position.x -= SPEED * ( direction.x + 1 )
	    // TODO adjust for rotation
	}
	
    } else if(UP == key){

	if(e.shiftKey){
	    camera.rotateX(toRad(ROTATE))
	} else if(e.altKey){
	    camera.position.y += SPEED
	} else {
	    camera.position.x += SPEED * direction.x
	    camera.position.y += SPEED * direction.y
	    camera.position.z += SPEED * direction.z
	}
    } else if(RIGHT == key ){

	if(e.shiftKey){
	    camera.rotateY(toRad(-ROTATE))
	} else {
    	    camera.position.x += SPEED * ( direction.x + 1 )
	    // TODO adjust for rotation
	}
	
    } else if(DOWN == key){
	if(e.shiftKey){
	    camera.rotateX(toRad(-ROTATE) )
	} else if(e.altKey){
	    camera.position.y -= SPEED
	} else {
	    camera.position.x -= SPEED * direction.x
	    camera.position.y -= SPEED * direction.y
	    camera.position.z -= SPEED * direction.z
	}
    }

    e.preventDefault(); 

});
