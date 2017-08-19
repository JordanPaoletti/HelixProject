//create scene
var scene = new THREE.Scene();

//creat camera
var camera = new THREE.PerspectiveCamera(75,
  window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*
//cube
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
*/


//curve
paraX = function(t) {
    return 10 * Math.cos(t);
}
paraY = function(t) {
    return t;
}
paraZ = function(t) {
    return 10 * Math.sin(t);
}

startPos = new THREE.Vector3(0, 0, 0);
var curve = new ParametricCurve(startPos.x, startPos.y, startPos.z);
curve.appendCurve(paraX, paraY, paraZ, 0, 25, 1000);
curve.end.x = 0;
curve.end.z = 0;
curve.appendCurve(paraZ, paraY, paraX, 0, 25, 1000);


var lineMat = new THREE.LineBasicMaterial( {color:0x0000ff,
                                            linewidth: 5});
var line = new THREE.Line(curve.geometry, lineMat);
scene.add(line);

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

  renderer.render(scene, camera);
}
render();
