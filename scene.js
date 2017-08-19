//scene
var scene = new THREE.Scene();

//camera
var camera = new THREE.PerspectiveCamera(75,
    window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//cube
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//pipe
var pipeGeo = new PipeGeometry(1, 100, 2);
var pipeSeg= new PipeSeg(1, 50, 1, Math.PI / 5);
var pipeMat = new THREE.MeshLambertMaterial( {color: 0xffffff});
var pipe = new THREE.Mesh(pipeSeg.geom, pipeMat);
pipe.position.x = 2;
scene.add(pipe);


//lighting
var light = new THREE.AmbientLight(0x404040);
scene.add(light);

var directLight = new THREE.DirectionalLight(0xffffff, 0.5);
directLight.position.x = 1;
directLight.position.z = 1;
scene.add(directLight);

//controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);




function render() {
    requestAnimationFrame(render);

    cube.rotation.z += 0.01;
    cube.rotation.y -= 0.01;

    pipe.rotation.y += 0.01;
    pipe.rotation.x = 1;


    renderer.render(scene, camera);
}
render();
