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

//lighting
var light = new THREE.AmbientLight(0x404040);
scene.add(light);

var directLight = new THREE.DirectionalLight(0xffffff, 0.5);
directLight.position.x = 1;
directLight.position.z = 1;
scene.add(directLight);

//controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);

//segs
var seg1 = new PipeSeg(0.5, 50, 0.5, Math.PI / 4);
var seg2 = new PipeSeg(0.5, 50, 0.5, Math.PI / 5);
var seg3 = new PipeSeg(0.5, 50, 0.5,  Math.PI / 3.5);

//materials
var joMat = new THREE.MeshLambertMaterial( {color: 0x00ff00});
var jMat = new THREE.MeshLambertMaterial( {color: 0xff00ff});
var nMat = new THREE.MeshLambertMaterial( {color: 0x0000ff});

//meshs
var mesh1 = seg1.mesh;
var mesh2 = seg2.mesh;
var mesh3 = seg3.mesh;

seg1.addToScene(scene);
mesh1.position.x = -2;

seg2.addToScene(scene);
//mesh2.rotation.z = -Math.PI / 2;
//mesh2.position.x = -2 + 0.5 + 0.5;
//mesh2.position.y = seg1.geom.vertices[seg1.geom.vertices.length - 1].y;
seg2.attachTo(seg3);

seg3.addToScene(scene);
mesh3.position.x = 2;

console.log(seg1.getEndPoint());
console.log(seg1.getEndNormal());

console.log(seg2.getEndPoint());
console.log(seg2.getEndNormal());

console.log(seg3.getEndPoint());
console.log(seg3.getEndNormal());

console.log("==============================");
console.log(seg1.getEndRotation());

var axis = new THREE.Vector3(1, 0, 0);

function render() {
    requestAnimationFrame(render);

    mesh2.position.x += 0.05;
    //seg2.rotate(axis, 0.05);

    renderer.render(scene, camera);
}
render();
