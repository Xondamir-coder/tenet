<template>
	<section class="section-padding soon" id="soon">
		<h1 class="soon__title">{{ $t('soon-title') }}</h1>
		<p class="soon__text">{{ $t('soon-text') }}</p>
		<!-- <canvas ref="canvasRef"></canvas> -->
		<div class="soon__planet">
			<img src="@/assets/planet.webp" alt="planet" />
		</div>
	</section>
</template>

<!-- <script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import textureUrl from '@/assets/planet-texture.png';
import normal from '@/assets/normal.png';
import ao from '@/assets/ao.png';
import alpha from '@/assets/alpha.png';

// Reference to the canvas element
const canvasRef = ref(null);

onMounted(async () => {
	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / canvasRef.value.clientHeight,
		0.1,
		1000
	);
	camera.position.z = 5;

	// Renderer
	const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value });
	renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight);
	renderer.setClearAlpha(0.0);

	// Load the texture for the planet
	const textureLoader = new THREE.TextureLoader();
	const planetTexture = textureLoader.load(textureUrl);
	const normalMap = textureLoader.load(normal);
	const aoMap = textureLoader.load(ao);
	const alphaMap = textureLoader.load(alpha);

	// Sphere geometry
	const geometry = new THREE.SphereGeometry(2, 64, 64); // Increased segments to 64 for smoother geometry

	// Use a more advanced material like MeshStandardMaterial for better lighting and reflections
	const material = new THREE.MeshStandardMaterial({
		map: planetTexture,
		normalMap: normalMap,
		aoMap: aoMap,
		alphaMap: alphaMap
	});

	// Create the sphere
	const sphere = new THREE.Mesh(geometry, material);

	// Position the sphere to the right
	sphere.position.set(3, 0, 0);
	scene.add(sphere);

	// Add a stronger ambient light
	const ambientLight = new THREE.AmbientLight(0xff0000, 0.4); // Increased intensity to 0.8
	scene.add(ambientLight);

	// Add a directional light for better shading
	const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // Strong directional light
	directionalLight.position.set(5, 5, 5); // Position the light to create realistic shadows
	scene.add(directionalLight);

	function animate() {
		requestAnimationFrame(animate);

		// Rotate cube
		sphere.rotation.x += 0.01 * 0.3;
		sphere.rotation.y += 0.01 * 0.3;

		renderer.render(scene, camera);
	}
	animate();

	// Handle window resize
	window.addEventListener('resize', () => {
		camera.aspect = canvasRef.value.clientWidth / canvasRef.value.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight);
	});
});
</script> -->

<style lang="scss" scoped>
.soon {
	min-height: 200px;
	width: 100%;
	background-image: url('@/assets/images/soon-bg.jpg');
	background-size: cover;
	background-position: center;
	color: #fff;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
	gap: 3.2rem;
	padding-top: 3rem;
	padding-bottom: 3rem;
	position: relative;
	overflow: hidden;
	@media only screen and (max-width: 768px) {
		gap: 1.5rem;
		justify-content: start;
	}
	&__title {
		font-size: 12rem;
		font-weight: 400;
		line-height: 7.8rem;
		font-family: var(--font-bebas);
		line-height: 0.9;
		z-index: 1;
		text-shadow: 7px 7px 20px #63b9da;

		@media only screen and (max-width: 500px) {
			font-size: 6rem;
			max-width: 180px;
		}
	}
	&__text {
		padding: 1rem 2rem;
		border-radius: 99px;
		font-size: 3rem;
		font-weight: 700;
		line-height: 2.6rem;
		background: var(--gradient);
		cursor: pointer;
		z-index: 1;
		@media only screen and (max-width: 768px) {
			font-size: 2rem;
		}
	}

	&__planet {
		position: absolute;
		top: 50%;
		right: 0;
		translate: 30% -28%;
		animation: rotation 300s linear infinite; /* Smooth, continuous rotation */
		transform-origin: center center;
		scale: 0.9;

		@media only screen and (max-width: 500px) {
			scale: 1.4;
		}

		img {
			width: 100%;
			height: auto;
			object-fit: cover;
		}
	}
}

@keyframes rotation {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
