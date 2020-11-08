dom = document.getElementById("cube");
dom.style.width = window.innerWidth / 2 + "px";
const scene = new THREE.Scene();
//takes fov, then aspect ratio, then near and far clipping ranges of the camera.
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / 2 / (window.innerHeight / 2),
  0.01,
  1000
);
//renderer, magic, we use webgl because it has the most features.
const renderer = new THREE.WebGLRenderer();
//we set the size of the renderer, and we use the width and height of however big our thing is.
//we then push the renderer's html code to our dom.\
dom.appendChild(renderer.domElement);

//the data for a cube is stored in three's box geometry function,
const geometry = new THREE.BoxGeometry();
//we set the mateerial to a basic mesh material (three has several but this is a basic one) and then we set the color to white
const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
//then we need to set our cube as the mixture of the geometry and the material
const cube = new THREE.Mesh(geometry, material);
const directionalLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
scene.add(directionalLight);
//we then add the cube to our scene
scene.add(cube);
//and position our camera a bit different so we arent inside the cuube.
camera.position.z = 5;

//then, we need to start a render loop.
function animate() {
  requestAnimationFrame(animate);
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  dom.style.width = window.innerWidth / 2 + "px";

  cube.rotation.x += 0.05;
  cube.rotation.y += 0.05;

  renderer.render(scene, camera);
}

animate();
