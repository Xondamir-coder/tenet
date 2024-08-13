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

	// Load star texture
	const textureLoader = new THREE.TextureLoader();
	const starTexture = textureLoader.load(circleUrl);

	const labeledParticleCount = 3;
	const extraLabeledParticleCount = 2;
	const unnamedParticleCount = 3;
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
				[-40, 50, 80],
				[-70, 80, 80],
				[-130, 70, 80],
				[-120, 60, 80],
				[-170, 50, 80],
				[-190, 80, 80]
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
			xRange: [-200, -20], // Adjusted to stay away from center
			yRange: [-5, 0],
			particles: [],
			positions: [
				[-100, 3, 80],
				[-130, 0, 80],
				[-150, 10, 80],
				[-190, 20, 80],
				[-170, -10, 80],
				[-200, -10, 80]
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
			xRange: [20, 200], // Adjusted to stay away from center
			yRange: [50, 100],
			particles: [],
			positions: [
				[40, 70, 80],
				[70, 50, 80],
				[100, 60, 80],
				[130, 55, 80],
				[180, 60, 80],
				[190, 80, 80]
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
			xRange: [20, 200], // Adjusted to stay away from center
			yRange: [-50, 30],
			particles: [],
			positions: [
				[50, 15, 80],
				[80, -5, 80],
				[100, 10, 80],
				[120, 40, 80],
				[180, 25, 80],
				[120, -5, 80],
				[140, 5, 80],
				[160, 15, 80]
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

	const originalPositions = [];
	const originalSizes = [];

	const placeParticlesInSection = (section, labeledCount, unnamedCount) => {
		for (let i = 0; i < labeledCount + unnamedCount; i++) {
			const particleSize = Math.random() * 10 + 10;
			originalSizes.push(particleSize);

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
			originalPositions.push([...section.positions[i]]);
			particlesGeometry.setAttribute(
				'position',
				new THREE.BufferAttribute(particlePositions, 3)
			);
			const particle = new THREE.Points(particlesGeometry, particlesMaterial);
			particles.push(particle);
			section.particles.push(particle);
			scene.add(particle);

			const particleIndex = particles.indexOf(particle);
			particleVelocities[particleIndex * 3] = (Math.random() - 0.5) * 0.8; // Was 0.4
			particleVelocities[particleIndex * 3 + 1] = (Math.random() - 0.5) * 0.8; // Was 0.4
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

				positions[0] += particleVelocities[particleIndex * 3] * 0.1;
				positions[1] += particleVelocities[particleIndex * 3 + 1] * 0.1;

				// Updated boundary checks to ensure particles stay within their section and avoid center
				if (
					positions[0] > section.xRange[1] ||
					positions[0] < section.xRange[0] ||
					(positions[0] > -20 && positions[0] < 20) // Prevent crossing the center
				) {
					particleVelocities[particleIndex * 3] *= -1;
				}

				if (positions[1] > section.yRange[1] || positions[1] < section.yRange[0]) {
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
