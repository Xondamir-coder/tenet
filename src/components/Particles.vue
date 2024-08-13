<template>
	<div id="soon" ref="sceneContainer" class="scene-container">
		<img :src="imgSrc" alt="bg" />
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
import sunUrl from '@/assets/sun.png';
import bigParticleBg from '@/assets/images/particle-bg.avif';
import smallParticleBg from '@/assets/images/small-particle-bg.jpg';

const sceneContainer = ref(null);

const isBig = window.innerWidth > 768;
const imgSrc = isBig ? bigParticleBg : smallParticleBg;
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
	const initialWidth = window.innerWidth;
	const initialHeight = window.innerHeight;

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	const renderer = new THREE.WebGLRenderer({ antialias: true });

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearAlpha(0.0);
	sceneContainer.value.appendChild(renderer.domElement);

	// Load star and sun textures
	const textureLoader = new THREE.TextureLoader();
	const starTexture = textureLoader.load(circleUrl);
	const sunTexture = textureLoader.load(sunUrl);

	const labeledParticleCount = 3;
	const extraLabeledParticleCount = 2;
	const unnamedParticleCount = 6; // Updated to reflect the 3 additional particles
	const totalSections = 4;
	const totalParticleCount =
		labeledParticleCount * (totalSections - 1) +
		extraLabeledParticleCount +
		unnamedParticleCount * totalSections;

	const particles = [];
	const particleVelocities = new Float32Array(totalParticleCount * 3);

	const sections = [
		{
			xRange: [-150, -50], // Narrower range to keep particles closer
			yRange: [60, 80], // Narrower range to limit vertical movement
			particles: [],
			positions: [
				[-40, 70, 80],
				[-70, 75, 80],
				[-90, 60, 80],
				[-110, 90, 80],
				[-130, 85, 80],
				[-150, 80, 80],
				[-170, 55, 80], // New particle
				[-190, 70, 80], // New particle
				[-250, 80, 80] // New particle
			],
			connections: [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 5],
				[5, 6], // New connection
				[6, 7], // New connection
				[7, 8] // New connection
			]
		},
		{
			xRange: [-200, -20], // Adjusted to stay away from center
			yRange: [-5, 0],
			particles: [],
			positions: [
				[-40, 3, 80],
				[-80, 0, 80],
				[-100, 20, 80],
				[-140, 30, 80],
				[-120, -10, 80],
				[-150, -15, 80],
				[-170, 5, 80], // New particle
				[-180, 20, 80], // New particle
				[-190, 15, 80] // New particle
			],
			connections: [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 5],
				[5, 6], // New connection
				[6, 7], // New connection
				[7, 8] // New connection
			]
		},
		{
			xRange: [20, 200], // Adjusted to stay away from center
			yRange: [50, 100],
			particles: [],
			positions: [
				[40, 70, 80],
				[70, 70, 80],
				[80, 50, 80],
				[100, 52, 80],
				[120, 70, 80],
				[140, 80, 80],
				[155, 83, 80], // New particle
				[170, 90, 80], // New particle
				[185, 80, 80] // New particle
			],
			connections: [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 5],
				[5, 6], // New connection
				[6, 7], // New connection
				[7, 8] // New connection
			]
		},
		{
			xRange: [20, 250], // Adjusted to stay away from center
			yRange: [-50, 30],
			particles: [],
			positions: [
				[50, 15, 80],
				[80, -5, 80],
				[100, 10, 80],
				[120, 20, 80],
				[140, 25, 80],
				[150, -5, 80],
				[160, 5, 80],
				[170, 15, 80],
				[190, 20, 80], // New particle
				[210, 10, 80], // New particle
				[230, 5, 80] // New particle
			],
			connections: [
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 5],
				[5, 6],
				[6, 7],
				[7, 8], // New connection
				[8, 9], // New connection
				[9, 10] // New connection
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

	const originalPositions = [];
	const originalSizes = [];

	const placeParticlesInSection = (section, labeledCount, unnamedCount) => {
		// Determine the rightmost and leftmost positions for normalization
		const rightmostX = Math.max(...section.positions.map(pos => pos[0]));
		const leftmostX = Math.min(...section.positions.map(pos => pos[0]));

		for (let i = 0; i < labeledCount + unnamedCount; i++) {
			const [x, y, z] = section.positions[i];

			// Check if any position is NaN and log it
			if (isNaN(x) || isNaN(y) || isNaN(z)) {
				console.error(`NaN value found in positions: x=${x}, y=${y}, z=${z}`);
				continue; // Skip this iteration if NaN is found
			}

			let particleSize;
			let texture; // Declare a variable to hold the texture

			// Randomly assign the texture
			if (Math.random() > 0.5) {
				texture = starTexture;
			} else {
				texture = sunTexture;
			}

			// Determine if this section is on the left or right side of the canvas
			if (section.xRange[0] < 0) {
				// Left side: Bigger on the right, smaller on the left
				const normalizedX = (x - leftmostX) / (rightmostX - leftmostX);
				particleSize = 5 + (15 - 5) * normalizedX; // Adjusted size range
			} else {
				// Right side: Bigger on the left, smaller on the right
				const normalizedX = (x - leftmostX) / (rightmostX - leftmostX);
				particleSize = 15 - (15 - 5) * normalizedX; // Adjusted size range
			}

			originalSizes.push(particleSize);

			const particlesGeometry = new THREE.BufferGeometry();
			const particlesMaterial = new THREE.PointsMaterial({
				size: particleSize,
				sizeAttenuation: true,
				alphaMap: texture, // Use the randomly assigned texture
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending
			});

			const particlePositions = new Float32Array([x, y, z]);
			originalPositions.push([x, y, z]);
			particlesGeometry.setAttribute(
				'position',
				new THREE.BufferAttribute(particlePositions, 3)
			);
			const particle = new THREE.Points(particlesGeometry, particlesMaterial);
			particles.push(particle);
			section.particles.push(particle);
			scene.add(particle);

			const particleIndex = particles.indexOf(particle);
			particleVelocities[particleIndex * 3] = (Math.random() - 0.5) * 0.8;
			particleVelocities[particleIndex * 3 + 1] = (Math.random() - 0.5) * 0.8;
			particleVelocities[particleIndex * 3 + 2] = 0;

			if (i < labeledCount) {
				particleLabels.push({ particle, label: labels.shift() });
			}
		}
	};

	sections.forEach((section, index) => {
		if (index === 3) {
			placeParticlesInSection(
				section,
				labeledParticleCount + extraLabeledParticleCount,
				unnamedParticleCount
			);
		} else {
			placeParticlesInSection(section, labeledParticleCount, unnamedParticleCount);
		}
	});

	const linesGeometry = new THREE.BufferGeometry();
	const linePositions = new Float32Array(totalParticleCount * 6);
	linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
	const linesMaterial = new THREE.LineBasicMaterial({
		color: 0xffffff,
		transparent: true,
		opacity: 0.8
	});
	const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
	scene.add(lines);

	camera.position.z = 200;

	const animate = function () {
		requestAnimationFrame(animate);

		let lineIndex = 0;

		sections.forEach(section => {
			section.particles.forEach((particle, i) => {
				const positions = particle.geometry.attributes.position.array;
				const particleIndex = particles.indexOf(particle);

				// Adjust velocity to be smaller
				positions[0] += particleVelocities[particleIndex * 3] * 0.05; // Reduced speed
				positions[1] += particleVelocities[particleIndex * 3 + 1] * 0.05; // Reduced speed

				// Constraint to keep particles close to their original position
				const originalX = originalPositions[particleIndex][0];
				const originalY = originalPositions[particleIndex][1];

				const distanceX = positions[0] - originalX;
				const distanceY = positions[1] - originalY;

				// If the particle moves too far from its original position, reverse the velocity
				if (Math.abs(distanceX) > 10) {
					particleVelocities[particleIndex * 3] *= -1;
				}

				if (Math.abs(distanceY) > 10) {
					particleVelocities[particleIndex * 3 + 1] *= -1;
				}

				particle.geometry.attributes.position.needsUpdate = true;

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

	const onWindowResize = () => {
		const widthRatio = window.innerWidth / initialWidth;
		const heightRatio = window.innerHeight / initialHeight;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);

		particles.forEach((particle, index) => {
			const positions = particle.geometry.attributes.position.array;
			positions[0] = originalPositions[index][0] * widthRatio;
			positions[1] = originalPositions[index][1] * heightRatio;
			positions[2] = originalPositions[index][2]; // Assuming z-axis remains the same
			particle.geometry.attributes.position.needsUpdate = true;

			const material = particle.material;
			material.size = originalSizes[index] * Math.min(widthRatio, heightRatio);
			material.needsUpdate = true;
		});
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
	@media only screen and (max-width: 768px) {
		height: 200px;
	}
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		position: absolute;
		inset: 0;
		z-index: -1;
	}
	// background-image: url('@/assets/images/particle-bg.avif');
	// background-repeat: no-repeat;
	// background-size: cover;
	// background-position: center;
}

.label {
	position: absolute;
	color: white;
	font-size: 2rem;
	padding-left: 20px;
	transform: translate(10px, -50%); /* Vertically center the label */
}
</style>
