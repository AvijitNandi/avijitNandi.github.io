let scene, camera, renderer, particles;
const particleCount = 3000;
let targetScroll = 0;
let currentScroll = 0;
let mouseX = 0, mouseY = 0;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('bg-canvas'),
        antialias: true,
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const geometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 30;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x00d2ff,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', () => {
        targetScroll = window.scrollY;
    });
}

function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    currentScroll += (targetScroll - currentScroll) * 0.1;

    particles.rotation.y += 0.0005 + (mouseX * 0.01);
    particles.rotation.x += 0.0002 + (-mouseY * 0.01);

    camera.position.z = 5 + (currentScroll * 0.002);
    camera.position.y = -(currentScroll * 0.001);

    renderer.render(scene, camera);
}

window.addEventListener("DOMContentLoaded", () => {
    init();
    animate();
});
