<template>
	<div ref="sceneContainer" class="scene-container">
		<div v-for="(label, index) in labels" :key="index" class="label" :ref="label.ref">
			{{ label.text }}
		</div>
		<h1 class="title">скоро</h1>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import circleUrl from '@/assets/circle.png';

const sceneContainer = ref(null);

const labels = [
	{ text: 'Opportunity', ref: 'label1' },
	{ text: 'Pacification', ref: 'label2' },
	{ text: 'Comfort', ref: 'label3' },
	{ text: 'Harmony', ref: 'label4' },
	{ text: 'Force', ref: 'label5' },
	{ text: 'Faith', ref: 'label6' },
	{ text: 'Cosiness', ref: 'label7' },
	{ text: 'Stability', ref: 'label8' },
	{ text: 'Idea', ref: 'label9' },
	{ text: 'Modernized', ref: 'label10' }
];

onMounted(() => {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	const renderer = new THREE.WebGLRenderer();

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearAlpha(0.0);
	sceneContainer.value.appendChild(renderer.domElement);

	// Load star texture
	const textureLoader = new THREE.TextureLoader();
	const starTexture = textureLoader.load(circleUrl); // Adjust the path to your star image

	const labeledParticleCount = 10;
	const extraParticleCount = 10;
	const totalParticleCount = labeledParticleCount + extraParticleCount;

	// Create particles with random sizes
	const particles = [];
	const particleVelocities = new Float32Array(totalParticleCount * 3);

	for (let i = 0; i < totalParticleCount; i++) {
		const particleSize = Math.random() * 10 + 5; // Random size between 5 and 15
		const particlesGeometry = new THREE.BufferGeometry();
		const particlesMaterial = new THREE.PointsMaterial({
			size: particleSize,
			sizeAttenuation: true,
			alphaMap: starTexture,
			transparent: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending
		});

		const particlePositions = new Float32Array(3);
		particlePositions[0] = Math.random() * 400 - 200; // x position
		particlePositions[1] = Math.random() * 200 - 100; // y position
		particlePositions[2] = 80; // z position

		particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
		const particle = new THREE.Points(particlesGeometry, particlesMaterial);
		particles.push(particle);
		scene.add(particle);

		particleVelocities[i * 3] = (Math.random() - 0.5) * 2; // x velocity
		particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 2; // y velocity
	}

	// Create lines
	const linesGeometry = new THREE.BufferGeometry();
	const linePositions = new Float32Array(totalParticleCount * 6); // max 1 connection per particle
	linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
	const linesMaterial = new THREE.LineBasicMaterial({
		color: 0xffffff,
		transparent: true,
		opacity: 0.5
	});
	const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
	scene.add(lines);

	camera.position.z = 200;

	const updateLabelPosition = (label, x, y, z) => {
		const vector = new THREE.Vector3(x, y, z);
		vector.project(camera);

		const widthHalf = window.innerWidth / 2;
		const heightHalf = window.innerHeight / 2;

		label.style.left = `${vector.x * widthHalf + widthHalf}px`;
		label.style.top = `${-(vector.y * heightHalf) + heightHalf}px`;
	};

	const animate = function () {
		requestAnimationFrame(animate);

		const connections = new Array(totalParticleCount).fill(0); // track connections per particle
		let index = 0;
		const connectedPairs = new Set();

		for (let i = 0; i < totalParticleCount; i++) {
			const particle = particles[i];
			const positions = particle.geometry.attributes.position.array;

			positions[0] += particleVelocities[i * 3] * 0.1;
			positions[1] += particleVelocities[i * 3 + 1] * 0.1;
			positions[2] += particleVelocities[i * 3 + 2] * 0.1;

			// Wrap particles around if they go out of bounds
			if (positions[0] > 200 || positions[0] < -200) particleVelocities[i * 3] *= -1;
			if (positions[1] > 200 || positions[1] < -200) particleVelocities[i * 3 + 1] *= -1;
			if (positions[2] > 200 || positions[2] < -200) particleVelocities[i * 3 + 2] *= -1;

			particle.geometry.attributes.position.needsUpdate = true;

			// Update label positions for the first 10 particles only
			if (i < labeledParticleCount) {
				const label = sceneContainer.value.querySelectorAll('.label')[i];
				updateLabelPosition(label, positions[0], positions[1], positions[2]);
			}

			for (let j = i + 1; j < totalParticleCount; j++) {
				if (connections[i] < 2 && connections[j] < 2) {
					const pair = `${i}-${j}`;
					if (!connectedPairs.has(pair)) {
						connectedPairs.add(pair);
						const particleB = particles[j].geometry.attributes.position.array;
						linePositions[index++] = positions[0];
						linePositions[index++] = positions[1];
						linePositions[index++] = positions[2];
						linePositions[index++] = particleB[0];
						linePositions[index++] = particleB[1];
						linePositions[index++] = particleB[2];
						connections[i]++;
						connections[j]++;
					}
				}
			}
		}
		linesGeometry.attributes.position.needsUpdate = true;

		renderer.render(scene, camera);
	};

	animate();

	// Handle window resize
	const onWindowResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	};

	window.addEventListener('resize', onWindowResize);

	onUnmounted(() => {
		window.removeEventListener('resize', onWindowResize);
	});
});
</script>

<style scoped lang="scss">
.title {
	color: #fff;
	font-size: 10rem;
	letter-spacing: 20px;
	text-transform: uppercase;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	@media only screen and (max-width: 768px) {
		font-size: max(8rem, 60px);
	}
}
.scene-container {
	position: relative;
	width: 100%;
	height: 100vh;
	padding: 0 !important;
	overflow: hidden;
	background-image: url('@/assets/images/stars-bg.webp');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	/* background: black; To provide a better contrast for the stars */
}

.label {
	position: absolute;
	color: white;
	font-size: 2rem;
	padding-left: 20px;
	transform: translate(10px, -50%); /* Vertically center the label */
}
</style>
