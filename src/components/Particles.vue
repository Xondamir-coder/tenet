<template>
	<div ref="sceneContainer" class="scene-container">
		<div v-for="(label, index) in labels" :key="index" class="label" :ref="label.ref">
			{{ label.text }}
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import starUrl from '@/assets/star.png';

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
	sceneContainer.value.appendChild(renderer.domElement);

	// Load star texture
	const textureLoader = new THREE.TextureLoader();
	const starTexture = textureLoader.load(starUrl); // Adjust the path to your star image

	// Create particles
	const particlesGeometry = new THREE.BufferGeometry();
	const particlesMaterial = new THREE.PointsMaterial({
		size: 10,
		sizeAttenuation: true,
		alphaMap: starTexture,
		transparent: true,
		depthWrite: false,
		blending: THREE.AdditiveBlending
	});

	const labeledParticleCount = 10;
	const extraParticleCount = 10;
	const totalParticleCount = labeledParticleCount + extraParticleCount;
	const particlePositions = new Float32Array(totalParticleCount * 3);
	const particleVelocities = new Float32Array(totalParticleCount * 3);

	for (let i = 0; i < totalParticleCount * 3; i += 3) {
		particlePositions[i] = Math.random() * 400 - 200; // x position
		particlePositions[i + 1] = Math.random() * 400 - 200; // y position
		particlePositions[i + 2] = 80; // z position

		particleVelocities[i] = (Math.random() - 0.5) * 2; // x velocity
		particleVelocities[i + 1] = (Math.random() - 0.5) * 2; // y velocity
	}

	particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
	const particles = new THREE.Points(particlesGeometry, particlesMaterial);
	scene.add(particles);

	// Create lines
	const linesGeometry = new THREE.BufferGeometry();
	const linePositions = new Float32Array(totalParticleCount * totalParticleCount * 3);
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

		const positions = particlesGeometry.attributes.position.array;
		const linePositions = linesGeometry.attributes.position.array;

		for (let i = 0; i < totalParticleCount * 3; i += 3) {
			positions[i] += particleVelocities[i] * 0.1;
			positions[i + 1] += particleVelocities[i + 1] * 0.1;
			positions[i + 2] += particleVelocities[i + 2] * 0.1;

			// Wrap particles around if they go out of bounds
			if (positions[i] > 200 || positions[i] < -200) particleVelocities[i] *= -1;
			if (positions[i + 1] > 200 || positions[i + 1] < -200) particleVelocities[i + 1] *= -1;
			if (positions[i + 2] > 200 || positions[i + 2] < -200) particleVelocities[i + 2] *= -1;
		}

		particlesGeometry.attributes.position.needsUpdate = true;

		// Update line positions
		let index = 0;
		for (let i = 0; i < totalParticleCount; i++) {
			for (let j = i + 1; j < totalParticleCount; j++) {
				linePositions[index++] = positions[i * 3];
				linePositions[index++] = positions[i * 3 + 1];
				linePositions[index++] = positions[i * 3 + 2];
				linePositions[index++] = positions[j * 3];
				linePositions[index++] = positions[j * 3 + 1];
				linePositions[index++] = positions[j * 3 + 2];
			}
		}
		linesGeometry.attributes.position.needsUpdate = true;

		// Update label positions for the first 10 particles only
		for (let i = 0; i < labeledParticleCount; i++) {
			const label = sceneContainer.value.querySelectorAll('.label')[i];
			updateLabelPosition(
				label,
				positions[i * 3],
				positions[i * 3 + 1],
				positions[i * 3 + 2]
			);
		}

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

<style scoped>
.scene-container {
	position: relative;
	width: 100%;
	height: 100vh;
	padding: 0 !important;
	overflow: hidden;
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
