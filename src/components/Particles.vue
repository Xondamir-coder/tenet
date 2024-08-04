<template>
	<div id="soon" ref="sceneContainer" class="scene-container">
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
	{ text: 'Modernized', ref: 'label10' },
	{ text: 'Convenience', ref: 'label11' },
	{ text: 'Security', ref: 'label12' }
];

const particleLabels = [];

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

	const labeledParticleCount = 3; // 3 labeled particles per section
	const extraLabeledParticleCount = 2; // 2 extra labeled particles for bottom right
	const unnamedParticleCount = 3; // 3 unnamed particles per section
	const totalSections = 4;
	const totalParticleCount =
		labeledParticleCount * (totalSections - 1) +
		extraLabeledParticleCount +
		unnamedParticleCount * totalSections; // 4 sections
	const particles = [];
	const particleVelocities = new Float32Array(totalParticleCount * 3);

	// Define constellation positions for each section
	const sections = [
		{
			xRange: [-200, -100],
			yRange: [50, 100],
			particles: [],
			positions: [
				[-190, 90, 80],
				[-170, 80, 80],
				[-150, 70, 80],
				[-130, 60, 80],
				[-110, 50, 80],
				[-180, 80, 80]
			],
			connections: [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 5]
			]
		},
		{
			xRange: [100, 200],
			yRange: [50, 100],
			particles: [],
			positions: [
				[120, 90, 80],
				[140, 80, 80],
				[160, 70, 80],
				[180, 60, 80],
				[190, 50, 80],
				[110, 80, 80]
			],
			connections: [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 5]
			]
		},
		{
			xRange: [-200, -100],
			yRange: [-50, 0], // Adjusted yRange to be more visible
			particles: [],
			positions: [
				[-190, -20, 80],
				[-170, -10, 80],
				[-150, 0, 80],
				[-130, 10, 80],
				[-110, 20, 80],
				[-180, -10, 80]
			],
			connections: [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 5]
			]
		},
		{
			xRange: [100, 200],
			yRange: [-50, 0], // Adjusted yRange to be more visible
			particles: [],
			positions: [
				[110, -20, 80],
				[130, -10, 80],
				[150, -0, 80],
				[170, 10, 80],
				[180, 20, 80],
				[120, -10, 80],
				[140, 0, 80],
				[160, 10, 80]
			],
			connections: [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 5],
				[5, 6],
				[6, 7]
			]
		}
	];

	const updateLabelPosition = (label, x, y, z) => {
		const vector = new THREE.Vector3(x, y, z);
		vector.project(camera);

		const widthHalf = window.innerWidth / 2;
		const heightHalf = window.innerHeight / 2;

		label.style.left = `${vector.x * widthHalf + widthHalf}px`;
		label.style.top = `${-(vector.y * heightHalf) + heightHalf}px`;
	};

	const placeParticlesInSection = (section, labeledCount, unnamedCount) => {
		for (let i = 0; i < labeledCount + unnamedCount; i++) {
			const particleSize = Math.random() * 10 + 10; // Random size between 10 and 20 for better visibility
			const particlesGeometry = new THREE.BufferGeometry();
			const particlesMaterial = new THREE.PointsMaterial({
				size: particleSize,
				sizeAttenuation: true,
				alphaMap: starTexture,
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending
			});

			const particlePositions = new Float32Array(section.positions[i]);
			particlesGeometry.setAttribute(
				'position',
				new THREE.BufferAttribute(particlePositions, 3)
			);
			const particle = new THREE.Points(particlesGeometry, particlesMaterial);
			particles.push(particle);
			section.particles.push(particle);
			scene.add(particle);

			const particleIndex = particles.indexOf(particle);
			particleVelocities[particleIndex * 3] = (Math.random() - 0.5) * 2; // x velocity
			particleVelocities[particleIndex * 3 + 1] = (Math.random() - 0.5) * 2; // y velocity
			particleVelocities[particleIndex * 3 + 2] = 0; // z velocity is 0 to avoid depth movement

			if (i < labeledCount) {
				particleLabels.push({ particle, label: labels.shift() });
			}
		}
	};

	// Place labeled and unnamed particles in each section
	sections.forEach((section, index) => {
		if (index === 3) {
			// Bottom right section gets extra labeled particles
			placeParticlesInSection(
				section,
				labeledParticleCount + extraLabeledParticleCount,
				unnamedParticleCount
			);
		} else {
			placeParticlesInSection(section, labeledParticleCount, unnamedParticleCount);
		}
	});

	// Create lines
	const linesGeometry = new THREE.BufferGeometry();
	const linePositions = new Float32Array(totalParticleCount * 6); // max 1 connection per particle
	linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
	const linesMaterial = new THREE.LineBasicMaterial({
		color: 0xffffff,
		transparent: true,
		opacity: 0.8 // Increased opacity for better visibility
	});
	const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
	scene.add(lines);

	camera.position.z = 200;

	const animate = function () {
		requestAnimationFrame(animate);

		let lineIndex = 0; // Reset line index for each frame

		sections.forEach(section => {
			section.particles.forEach((particle, i) => {
				const positions = particle.geometry.attributes.position.array;
				const particleIndex = particles.indexOf(particle);

				positions[0] += particleVelocities[particleIndex * 3] * 0.1;
				positions[1] += particleVelocities[particleIndex * 3 + 1] * 0.1;

				// Wrap particles around if they go out of bounds
				if (positions[0] > section.xRange[1] || positions[0] < section.xRange[0])
					particleVelocities[particleIndex * 3] *= -1;
				if (positions[1] > section.yRange[1] || positions[1] < section.yRange[0])
					particleVelocities[particleIndex * 3 + 1] *= -1;

				particle.geometry.attributes.position.needsUpdate = true;

				// Update label positions
				particleLabels.forEach(({ particle: labeledParticle, label }, index) => {
					if (particle === labeledParticle) {
						const labelElement =
							sceneContainer.value?.querySelectorAll('.label')[index];
						if (labelElement) {
							updateLabelPosition(
								labelElement,
								positions[0],
								positions[1],
								positions[2]
							);
						}
					}
				});
			});

			// Create connections within the section
			section.connections.forEach(([startIndex, endIndex]) => {
				const startPos = section.particles[startIndex].geometry.attributes.position.array;
				const endPos = section.particles[endIndex].geometry.attributes.position.array;

				linePositions[lineIndex++] = startPos[0];
				linePositions[lineIndex++] = startPos[1];
				linePositions[lineIndex++] = startPos[2];
				linePositions[lineIndex++] = endPos[0];
				linePositions[lineIndex++] = endPos[1];
				linePositions[lineIndex++] = endPos[2];
			});
		});

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
	height: 400px;
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
