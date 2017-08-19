var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(45,
    window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var scene = new THREE.Scene();

//create a blue LineBasicMaterial
var material = new THREE.LineBasicMaterial( {
  color: 0x0000ff
})

var geometry = new THREE.Geometry();
//geometry.vertices.push(new THREE.Vector3(-40, 0, 0));
//geometry.vertices.push(new THREE.Vector3(0, 10, 0));
//geometry.vertices.push(new THREE.Vector3(40, 0, 0));

//curve
paraX = function(t) {
    return 10 + t;
}
paraY = function(t) {
    return t;
}
paraZ = function(t) {
    return 10 +t ;
}

startPos = new THREE.Vector3(0, 0, 0);
var curve = new ParametricCurve(startPos.x, startPos.y, startPos.z);
curve.appendCurve(paraX, paraY, paraZ, 0, 25, 25);

var start = -40;
var end = 40;
var vertCount = 2000;
var delta = (end - start) / vertCount;
var amplitude = 10;
var freq = 2.5;

for (var i = 0 ; i < vertCount ; ++i) {
  var x = start + i * delta;
  var y = amplitude * Math.cos(freq * x);
  var z = 10 * Math.sin(x);

  geometry.vertices.push(new THREE.Vector3(x, y, z));
}

console.log(geometry);
console.log(curve.geometry);
console.log(curve.geometry.clone());

var line = new THREE.Line(curve.geometry, material);

scene.add(line);
renderer.render(scene, camera);

var cameraMoveCount = 0;
var moveAmount = 1;

function updateCamPosition() {
    if (cameraMoveCount < 50) {
        camera.position.set(0, cameraMoveCount * moveAmount, 100);
        cameraMoveCount++;
    }
}

function render() {
  requestAnimationFrame(render);

  updateCamPosition();

  renderer.render(scene, camera);
}
